create extension if not exists "pgcrypto";

create type public.user_role as enum ('user', 'agent', 'admin');
create type public.listing_type as enum ('sale', 'rent');
create type public.property_type as enum ('house', 'apartment', 'villa', 'townhouse', 'penthouse', 'land');
create type public.property_status as enum ('draft', 'pending', 'published', 'rejected', 'archived');
create type public.inquiry_status as enum ('new', 'contacted', 'closed');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  avatar_url text,
  role public.user_role not null default 'user',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.agents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles(id) on delete cascade,
  display_name text not null,
  bio text default '',
  phone text,
  company text,
  license_number text,
  location text,
  years_experience integer not null default 0 check (years_experience >= 0),
  verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.properties (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid references public.agents(id) on delete set null,
  title text not null,
  slug text not null unique,
  description text not null default '',
  listing_type public.listing_type not null,
  property_type public.property_type not null,
  status public.property_status not null default 'draft',
  price numeric(18,2) not null check (price >= 0),
  currency text not null default '₦',
  bedrooms integer not null default 0 check (bedrooms >= 0),
  bathrooms numeric(5,1) not null default 0 check (bathrooms >= 0),
  area numeric(12,2) not null default 0 check (area >= 0),
  area_unit text not null default 'sqm',
  year_built integer,
  parking_spaces integer not null default 0 check (parking_spaces >= 0),
  address text not null default '',
  city text not null default '',
  state text not null default '',
  country text not null default '',
  postal_code text,
  latitude numeric(10,7),
  longitude numeric(10,7),
  is_featured boolean not null default false,
  is_verified boolean not null default false,
  rejection_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.property_images (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  storage_path text not null,
  public_url text not null,
  alt_text text,
  sort_order integer not null default 0,
  is_cover boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.amenities (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  icon text,
  created_at timestamptz not null default now()
);

create table public.property_amenities (
  property_id uuid not null references public.properties(id) on delete cascade,
  amenity_id uuid not null references public.amenities(id) on delete cascade,
  primary key (property_id, amenity_id)
);

create table public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(user_id, property_id)
);

create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete set null,
  agent_id uuid references public.agents(id) on delete set null,
  name text not null,
  email text not null,
  phone text,
  message text not null,
  status public.inquiry_status not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.property_views (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete set null,
  session_id text,
  created_at timestamptz not null default now()
);

create index properties_status_idx on public.properties(status);
create index properties_listing_type_idx on public.properties(listing_type);
create index properties_property_type_idx on public.properties(property_type);
create index properties_city_idx on public.properties(city);
create index properties_price_idx on public.properties(price);
create index properties_bedrooms_idx on public.properties(bedrooms);
create index properties_created_at_idx on public.properties(created_at desc);
create index properties_agent_idx on public.properties(agent_id);
create index favorites_user_idx on public.favorites(user_id);
create index inquiries_agent_idx on public.inquiries(agent_id);
create index inquiries_property_idx on public.inquiries(property_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.is_agent()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('agent', 'admin')
  );
$$;

alter table public.profiles enable row level security;
alter table public.agents enable row level security;
alter table public.properties enable row level security;
alter table public.property_images enable row level security;
alter table public.amenities enable row level security;
alter table public.property_amenities enable row level security;
alter table public.favorites enable row level security;
alter table public.inquiries enable row level security;
alter table public.property_views enable row level security;

create policy "profiles own read" on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "profiles own update" on public.profiles for update using (id = auth.uid() or public.is_admin()) with check (id = auth.uid() or public.is_admin());

create policy "agents public read" on public.agents for select using (true);
create policy "agents own update" on public.agents for update using (user_id = auth.uid() or public.is_admin()) with check (user_id = auth.uid() or public.is_admin());
create policy "agents own insert" on public.agents for insert with check (user_id = auth.uid() or public.is_admin());

create policy "published properties public read" on public.properties for select using (status = 'published' or public.is_admin() or exists (
  select 1 from public.agents a where a.id = agent_id and a.user_id = auth.uid()
));
create policy "agents create properties" on public.properties for insert with check (
  public.is_admin() or exists (select 1 from public.agents a where a.id = agent_id and a.user_id = auth.uid())
);
create policy "agents update properties" on public.properties for update using (
  public.is_admin() or exists (select 1 from public.agents a where a.id = agent_id and a.user_id = auth.uid())
) with check (
  public.is_admin() or exists (select 1 from public.agents a where a.id = agent_id and a.user_id = auth.uid())
);
create policy "agents delete properties" on public.properties for delete using (
  public.is_admin() or exists (select 1 from public.agents a where a.id = agent_id and a.user_id = auth.uid())
);

create policy "property images public read" on public.property_images for select using (
  exists (select 1 from public.properties p where p.id = property_id and p.status = 'published') or public.is_admin()
);
create policy "property image owner insert" on public.property_images for insert with check (
  public.is_admin() or exists (
    select 1 from public.properties p join public.agents a on a.id = p.agent_id
    where p.id = property_id and a.user_id = auth.uid()
  )
);

create policy "amenities public read" on public.amenities for select using (true);
create policy "amenities admin manage" on public.amenities for all using (public.is_admin()) with check (public.is_admin());

create policy "property amenities public read" on public.property_amenities for select using (true);
create policy "property amenities owner manage" on public.property_amenities for all using (
  public.is_admin() or exists (
    select 1 from public.properties p join public.agents a on a.id = p.agent_id
    where p.id = property_id and a.user_id = auth.uid()
  )
) with check (
  public.is_admin() or exists (
    select 1 from public.properties p join public.agents a on a.id = p.agent_id
    where p.id = property_id and a.user_id = auth.uid()
  )
);

create policy "favorites own manage" on public.favorites for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "inquiries create" on public.inquiries for insert with check (user_id is null or user_id = auth.uid());
create policy "inquiries owner read" on public.inquiries for select using (
  user_id = auth.uid() or public.is_admin() or exists (select 1 from public.agents a where a.id = agent_id and a.user_id = auth.uid())
);
create policy "inquiries agent update" on public.inquiries for update using (
  public.is_admin() or exists (select 1 from public.agents a where a.id = agent_id and a.user_id = auth.uid())
);

create policy "property views insert" on public.property_views for insert with check (user_id is null or user_id = auth.uid());
create policy "property views admin read" on public.property_views for select using (public.is_admin());

insert into public.amenities (name, slug) values
('Swimming pool', 'swimming-pool'),
('Generator', 'generator'),
('Smart home', 'smart-home'),
('Garden', 'garden'),
('Security', 'security'),
('Parking', 'parking'),
('Gym', 'gym'),
('Elevator', 'elevator'),
('Concierge', 'concierge'),
('Ocean view', 'ocean-view')
on conflict (slug) do nothing;

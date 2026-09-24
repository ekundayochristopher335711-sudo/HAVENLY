import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export function useFavorites() {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    if (!user || !supabase) {
      setFavorites([])
      return
    }
    supabase.from('favorites').select('property_id').eq('user_id', user.id).then(({ data }) => {
      setFavorites((data ?? []).map((item) => item.property_id))
    })
  }, [user])

  async function toggle(propertyId: string) {
    if (!user || !supabase) return false
    const exists = favorites.includes(propertyId)
    if (exists) {
      await supabase.from('favorites').delete().eq('user_id', user.id).eq('property_id', propertyId)
      setFavorites((current) => current.filter((id) => id !== propertyId))
    } else {
      await supabase.from('favorites').insert({ user_id: user.id, property_id: propertyId })
      setFavorites((current) => [...current, propertyId])
    }
    return !exists
  }

  return { favorites, toggle }
}

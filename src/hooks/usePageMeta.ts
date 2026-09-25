import { useEffect } from 'react'

/**
 * Keeps the document title and meta description in sync with the current page,
 * so every route presents itself properly in search results and browser tabs.
 */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title
    if (description) {
      const tag = document.querySelector('meta[name="description"]')
      tag?.setAttribute('content', description)
    }
  }, [title, description])
}
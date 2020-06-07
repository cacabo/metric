/**
 * Fix current body position so it can't scroll
 */
export const disableBodyScroll = (): void => {
  const scrollY = window.scrollY
  document.body.style.position = 'fixed'
  document.body.style.top = `-${scrollY}px`
}

/**
 * Reset body styling to allow scrolling
 */
export const enableBodyScroll = (): void => {
  const scrollY = document.body.style.top
  document.body.style.position = ''
  document.body.style.top = ''
  window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
}

declare global {
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  interface Window {
    __LUNR__: any
  }
}

export interface ISearchResult {
  excerpt: string
  slug: string
  title: string
}

export const getSearchResults = (query: string): ISearchResult[] => {
  // eslint-disable-next-line no-underscore-dangle
  if (!query || !window.__LUNR__) {
    return []
  }

  // eslint-disable-next-line no-underscore-dangle
  const lunrIndex = window.__LUNR__.en

  const searchResults: lunr.Index.Result[] = (lunrIndex.index as lunr.Index).search(
    query,
  )
  return searchResults.map(
    ({ ref }: { ref: string }): ISearchResult =>
      (lunrIndex.store as Record<string, ISearchResult>)[ref],
  )
}

/**
 * Authors
 */

export interface IAuthor {
  id: string
  slug: string
  bio?: string
  facebook?: string
  location?: string
  name: string
  postCount: number
  profile_image?: string
  twitter?: string
  website?: string
}

export interface IAuthorPreview {
  id: string
  slug: string
  name: string
  location?: string
  profile_image?: string
}

/**
 * Tags
 */

export interface ITag {
  id: string
  slug: string
  name: string
}

/**
 * Articles
 */

export interface IArticlePreview {
  id: string
  title: string
  excerpt?: string
  slug: string
  feature_image?: string
  published_at: string
  reading_time: number
  authors: IAuthorPreview[]
  tags: ITag[]
}

export interface IArticle {
  title: string
  feature_image?: string
  localImage: {
    childImageSharp: {
      fluid: IFluidObject
    }
  }
  html: string
  // codeinjection_head: string
  // codeinjection_foot: string
  excerpt: string
  reading_time: number
  published_at: string
  tags: ITag[]
  authors: IAuthorPreview[]
}

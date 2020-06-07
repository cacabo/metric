import * as React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'

import {
  P,
  MediumContainer,
  H1,
  WideContainer,
  ResponsiveSpacer,
  TextList,
  Spacer,
  HR,
} from '../shared'
import { Layout } from '../components/Layout'
import { Meta } from '../components/Meta'
import { TAG_ROUTE } from '../constants/routes'
import { Authors } from '../components/Article/Authors'
import { ArticlePreview } from '../components/Article/ArticlePreview'

import './article.css'
import { AuthorPreview } from '../components/Article/AuthorPreview'
import { IAuthorPreview, IArticle, IArticlePreview } from '../types'
import { M4 } from '../constants/measurements'
import { ShareArticle } from '../components/Article/ShareArticle'
import { ArticleComments } from '../components/Article/ArticleComments'

interface IArticleTemplateProps {
  data: {
    ghostPost: IArticle
    allGhostAuthor: {
      nodes: IAuthorPreview[]
    }
  }
  pageContext: {
    next?: IArticlePreview
    prev?: IArticlePreview
  }
}

const ArticleTemplate = ({
  data,
  pageContext,
}: IArticleTemplateProps): React.ReactElement => {
  const {
    ghostPost: {
      title,
      feature_image,
      localImage: { childImageSharp: { fluid = undefined } = {} } = {},
      slug,
      html,
      excerpt,
      reading_time: readingTime,
      published_at: publishedAt,
      tags,
    },
    allGhostAuthor: { nodes: authors },
  } = data
  const { next, prev } = pageContext

  const htmlContent = html

  return (
    <Layout>
      <Meta title={title} description={excerpt} image={feature_image} />

      <article>
        <header style={{ width: '100%' }}>
          <ResponsiveSpacer hiddenOnMobile />
          <Spacer onlyOnMobile />
          <MediumContainer>
            <H1 mb2>{title}</H1>
            <P lg light condensedLineHeight>
              {excerpt}
            </P>
            {tags && tags.length && (
              <P sm lighter mb1>
                {'In '}
                <TextList>
                  {tags.map(({ name, slug: tagSlug }) => (
                    <Link to={TAG_ROUTE(tagSlug)} key={tagSlug}>
                      {name}
                    </Link>
                  ))}
                </TextList>
              </P>
            )}
            <P sm lightest>
              Published {publishedAt} &#183; {readingTime} min read
            </P>
            <Authors authors={authors} />
            <Spacer />
          </MediumContainer>
          {fluid && (
            <WideContainer>
              <Img fluid={fluid} style={{ width: '100%' }} />
            </WideContainer>
          )}
          <Spacer />
        </header>

        <MediumContainer>
          <div className="post-full-content content">
            <section
              className="post-content"
              dangerouslySetInnerHTML={{
                __html: htmlContent,
              }}
            />
          </div>
          <ShareArticle title={title} />
        </MediumContainer>
      </article>
      <WideContainer>
        <footer>
          <HR />
          <P lighter>
            {authors && authors.length === 1 ? 'Author' : 'Authors'}
          </P>
          {authors.map(
            (a: IAuthorPreview): React.ReactElement => (
              <div key={a.slug} style={{ marginBottom: M4 }}>
                <AuthorPreview {...a} />
              </div>
            ),
          )}

          <HR />
          <P lighter>More reading</P>
          {prev && <ArticlePreview {...prev} />}
          {next && <ArticlePreview {...next} />}

          <HR />
          <P lighter>Comments</P>
          <ArticleComments title={title} slug={slug} />
        </footer>
      </WideContainer>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!, $authorSlugs: [String!]!) {
    ghostPost(slug: { eq: $slug }) {
      ...Article
    }
    allGhostAuthor(filter: { slug: { in: $authorSlugs } }) {
      nodes {
        ...AuthorPreview
      }
    }
  }
`

export default ArticleTemplate

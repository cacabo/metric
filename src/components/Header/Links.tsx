import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import {
  maxWidth,
  minWidth,
  PHONE,
  DESKTOP,
  SHORT_ANIMATION_DURATION,
  HEADER_CONTENT_HEIGHT,
} from '../../constants/measurements'
import { WHITE } from '../../constants/colors'
import { DISPLAY_FONT } from '../../constants/fonts'
import { HOME_ROUTE, ABOUT_ROUTE, ARTICLES_ROUTE } from '../../constants/routes'

// TODO facebook, linkedin, search, articles dropdown

interface ILinksProps {
  active: boolean
}

const LinksWrapper = styled.div<ILinksProps>`
  flex: 1;
  height: ${HEADER_CONTENT_HEIGHT};
  align-items: center;
  display: flex;
  justify-content: flex-end;

  ${maxWidth(PHONE)} {
    height: auto;
    flex: none;
    display: block;
    overflow: hidden;
    transition: max-height ${SHORT_ANIMATION_DURATION}ms ease,
      opacity ${SHORT_ANIMATION_DURATION}ms ease;
    max-height: ${({ active }): string => (active ? '100vh' : '0')};
    opacity: ${({ active }): string => (active ? '1' : '0')};
  }
`

const Spacer = styled.div<{}>`
  display: none;

  ${maxWidth(PHONE)} {
    display: block;
    width: 100%;
    height: 0.5rem;
  }
`

const StyledLink = styled(Link)<{}>`
  line-height: 1;
  display: inline-block;
  margin-left: 1rem;
  color: ${WHITE} !important;
  opacity: 0.64;
  text-decoration: none !important;
  cursor: pointer;
  transition: opacity ${SHORT_ANIMATION_DURATION}ms ease;
  font-family: ${DISPLAY_FONT};
  margin-bottom: 2px;

  &:hover,
  &:active {
    opacity: 1;
  }

  ${minWidth(DESKTOP)} {
    margin-left: calc(1rem + 1.25vw);
  }

  ${maxWidth(PHONE)} {
    margin-bottom: 0;
    width: 100%;
    text-align: center;
    display: block;
    margin: 0.5rem 0;
    line-height: 2rem;
    font-size: 1.2rem;
  }
`

const links: string[][] = [
  ['Home', HOME_ROUTE],
  ['About', ABOUT_ROUTE],
  ['Articles', ARTICLES_ROUTE],
]

export const Links = ({ active }: ILinksProps): React.ReactElement => (
  <LinksWrapper active={active}>
    <Spacer />
    {links.map(([text, link]) => (
      <StyledLink to={link} key={link}>
        {text}
      </StyledLink>
    ))}
  </LinksWrapper>
)

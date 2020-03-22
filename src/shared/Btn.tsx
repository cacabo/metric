import React, { ReactNode } from 'react'
import s, { css, FlattenSimpleInterpolation } from 'styled-components'
import { Link } from 'gatsby'

import {
  BLUE,
  WHITE,
  TRANSLUCENT_BLUE,
  DARK_BLUE,
  RED,
  DARK_RED,
  OUTLINE,
} from '../constants/colors'
import {
  maxWidth,
  PHONE,
  BORDER_RADIUS,
  SHORT_ANIMATION_DURATION,
} from '../constants/measurements'

export enum EBtnKind {
  Primary,
  Secondary,
  Danger,
}

export enum EBtnSize {
  LG,
  MD,
  SM,
}

export interface IBtnProps {
  fullWidth?: boolean
  disabled?: boolean
  bordered?: boolean
  size?: EBtnSize
  kind?: EBtnKind
  children?: ReactNode
  onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void
  marginBottom?: string
  style?: React.CSSProperties
}

const getKindStyles = (kind?: EBtnKind, disabled?: boolean): string => {
  if (kind === EBtnKind.Secondary) {
    return `
      background: transparent;
      color: ${BLUE} !important;
      border-color: ${TRANSLUCENT_BLUE};

      &:hover,
      &:active,
      &:focus {
        background: ${disabled ? 'transparent' : TRANSLUCENT_BLUE};
      }`
  }

  if (kind === EBtnKind.Danger) {
    return `
      background: ${RED};
      color: ${WHITE} !important;
      border-color: ${DARK_RED};

      &:hover,
      &:active,
      &:focus {
        background: ${disabled ? RED : DARK_RED};
      }`
  }

  return `
    background: ${BLUE};
    color: ${WHITE} !important;
    border-color: ${DARK_BLUE};

    &:hover,
    &:active,
    &:focus {
      background: ${disabled ? BLUE : DARK_BLUE};
    }`
}

const Btn = ({
  size,
  marginBottom,
  bordered,
  disabled,
  fullWidth,
  kind,
}: IBtnProps): FlattenSimpleInterpolation => css`
  border: none;
  border-radius: ${BORDER_RADIUS};
  padding: ${
    size === EBtnSize.LG
      ? '0.75rem 1rem'
      : size === EBtnSize.SM
      ? '0.25rem 0.75rem'
      : '0.5rem 1rem'
  };
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  font-weight: 500;
  transition: all ${SHORT_ANIMATION_DURATION}ms ease;

  margin-bottom: ${marginBottom || '1rem'};
  border-width: ${bordered ? '2px' : '0'};
  border-style: solid;

  font-size: ${
    size === EBtnSize.LG ? '120%' : size === EBtnSize.SM ? '80%' : 'inherit'
  };

  &:visited {
    text-decoration: none;
  }

  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem ${OUTLINE};
  }

  ${maxWidth(PHONE)} {
    padding: 0.5rem 0.75rem;
  }

  ${disabled && 'opacity: 0.5; cursor: not-allowed; user-select: none;'}
  ${fullWidth && 'width: 100%; text-align: center;'}

  ${getKindStyles(kind, disabled)}
`

export const BtnBtn = s.button<IBtnProps>(Btn)

export const BtnAnchor = s.a<IBtnProps>(Btn)

interface ILinkProps {
  to: string
  style?: React.CSSProperties
}

type IBtnLinkProps = IBtnProps & ILinkProps

const BtnLinkLink = s(Link)`
  &:focus {
    outline: 0;
    box-shadow: none;

    button {
      box-shadow: 0 0 0 0.2rem ${OUTLINE};
    }
  }
`

// Structure the link differently so that styling props are not passed
// to the DOM where they might cause rendering errors
export const BtnLink = ({
  to,
  fullWidth,
  ...rest
}: IBtnLinkProps): React.ReactElement => (
  <BtnLinkLink to={to}>
    <BtnBtn fullWidth={fullWidth} {...rest} tabIndex={-1} />
  </BtnLinkLink>
)

interface IInputProps {
  type?: string
  value?: any
  onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void
}

type IBtnInputProps = IBtnProps & IInputProps

const BtnInputTag = s.input<IBtnInputProps>(Btn)

export const BtnInput = ({
  style,
  ...rest
}: IBtnInputProps): React.ReactElement => (
  <BtnInputTag style={{ ...style, marginBottom: 0 }} {...rest} />
)

import { Container, HeaderText, LeftArray } from './styled'

import React from 'react'
import { SearchInput } from '../../components/generic/input'

const Header = ({ title, isSearchable = true }) => {
  return (
    <>
      <Container>
        <LeftArray />
        <HeaderText>{title}</HeaderText>
      </Container>
      {isSearchable && <SearchInput />}
    </>
  )
}
export default Header

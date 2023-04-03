import LeftArrowIcon from '../../assets/svgs/arrow-left.svg'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  padding-left: 10px;
  border: 1px solid gray;
  background: gray;
`

export const LeftArray = () => {
  return <img src={LeftArrowIcon} alt='downloading' style={{ width: '50px' }} />
}

export const HeaderText = styled.h3`
    margin-left: 20px;
`

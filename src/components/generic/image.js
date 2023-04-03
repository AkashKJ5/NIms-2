import styled from "styled-components"

export const Image = ({ icon, size }) => {
  return <img src={icon} style={{ width: size }} alt='load' />
}

export const Logo = styled.img`
width: 100%; 
max-width: 80%;
`;

import styled from 'styled-components'

const Div = styled.div`
  padding: 1rem;
  background: aqua;
  width: 5rem;
  margin: auto;
  margin-top: 2rem;
  border-radius: 3rem;
`

export const Icon = ({ icon }) => {
  return (
    <Div>
      <i className={`pi ${icon}`} style={{ fontSize: '2em' }} />
    </Div>
  )
}

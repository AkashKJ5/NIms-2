import { InputText } from 'primereact/inputtext'
import styled from 'styled-components'

export const Input = styled(InputText)`
  width: 18rem;
`

export const Label = styled.label`
  display: block;
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 0.5rem;
`

export const Image = styled.img``

export const NemmadiLogo = styled.img`
  width: 8rem;
  height: 2rem;
`

export const InputTextField = ({ value, label }) => {
  return (
    <span className='p-float-label' style={{ marginTop: '30px' }}>
      <Input id='in' value={value} style={{ width: '18rem' }} />
      <label htmlFor='in' style={{ fontSize: '1rem', marginLeft: '2rem' }}>
        {label}
      </label>
    </span>
  )
}

import { InputText } from 'primereact/inputtext'

export const SearchInput = () => {
  return (
    <div style={{ marginTop: 10 }}>
      <InputText
        id='project'
        type='text'
        style={{ width: '100%', height: '60px' }}
        placeholder='Search projects'
      />
    </div>
  )
}

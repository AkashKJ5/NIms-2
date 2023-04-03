import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const BaseButton = ({ label, variant, urlText }) => {
  const navigate = useNavigate()
  return (
    <Button
      variant={variant}
      onClick={() => {
        navigate(`/${urlText}`)
      }}
    >
      {label}
    </Button>
  )
}

import { Alert as BaseAlert } from '@mui/material'

export const Alert = ({ label, onClose, severity }) => {
  return (
    <BaseAlert onClose={onClose} severity={severity}>
      {label}
    </BaseAlert>
  )
}

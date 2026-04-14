import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material'
import type { ReactNode } from 'react'
import { ValidationError } from '#/api/admin/client'
import { t } from './i18n'

export function PageHeader({
  title,
  actions,
}: {
  title: ReactNode
  actions?: ReactNode
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
      }}
    >
      <Typography variant="h5" component="h1">
        {title}
      </Typography>
      {actions && (
        <Box sx={{ display: 'flex', gap: 1 }}>{actions}</Box>
      )}
    </Box>
  )
}

export function ErrorAlert({ error }: { error: unknown }) {
  if (!error) return null
  const message =
    error instanceof Error ? error.message : 'Сталася невідома помилка'
  const validation =
    error instanceof ValidationError ? error.errors : undefined
  return (
    <Alert severity="error" sx={{ mb: 2 }}>
      <Box>{message}</Box>
      {validation && (
        <Box component="ul" sx={{ m: 0, pl: 2 }}>
          {Object.entries(validation).map(([field, msgs]) => (
            <li key={field}>
              <strong>{field}:</strong> {msgs.join(', ')}
            </li>
          ))}
        </Box>
      )}
    </Alert>
  )
}

export function ConfirmDialog({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  loading,
}: {
  open: boolean
  title?: string
  message?: string
  onConfirm: () => void
  onCancel: () => void
  loading?: boolean
}) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title ?? t.confirmDelete}</DialogTitle>
      {message && (
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={onCancel} disabled={loading}>
          {t.cancel}
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          disabled={loading}
        >
          {t.delete}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export function LoadingBlock() {
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography>{t.loading}</Typography>
    </Box>
  )
}

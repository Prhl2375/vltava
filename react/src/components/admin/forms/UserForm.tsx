import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { useState, type FormEvent } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUser, updateUser, usersKey } from '#/api/admin/users'
import type { AdminUser, UserRole } from '#/types/admin'
import { ErrorAlert } from '../common'
import { t } from '../i18n'

interface UserFormProps {
  user?: AdminUser
}

const ROLES: Array<UserRole> = ['admin', 'moderator', 'user']

export function UserForm({ user }: UserFormProps) {
  const navigate = useNavigate()
  const qc = useQueryClient()
  const isEdit = !!user

  const [name, setName] = useState(user?.name ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<UserRole>(user?.role ?? 'user')

  const mutation = useMutation({
    mutationFn: async () => {
      const body: {
        name: string
        email: string
        role: UserRole
        password?: string
      } = { name, email, role }
      if (password) body.password = password
      return isEdit ? updateUser(user!.id, body) : createUser(body as never)
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: [usersKey] })
      navigate({ to: '/admin/users' as string })
    },
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    mutation.mutate()
  }

  return (
    <Paper sx={{ p: 3 }} component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {isEdit ? t.edit : t.create}
      </Typography>
      <ErrorAlert error={mutation.error} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label={t.fullName}
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label={t.email}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label={isEdit ? t.passwordLeaveEmpty : t.password}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required={!isEdit}
        />
        <FormControl fullWidth>
          <InputLabel>{t.role}</InputLabel>
          <Select
            value={role}
            label={t.role}
            onChange={(e) => setRole(e.target.value as UserRole)}
          >
            {ROLES.map((r) => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={mutation.isPending}
          >
            {t.save}
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate({ to: '/admin/users' as string })}
          >
            {t.cancel}
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}

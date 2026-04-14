import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { useState, type FormEvent } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  categoriesKey,
  categoryTypesQueryOptions,
  createCategory,
  updateCategory,
} from '#/api/admin/categories'
import type { AdminCategory } from '#/types/admin'
import { ErrorAlert } from '../common'
import { t } from '../i18n'

interface CategoryFormProps {
  category?: AdminCategory
}

export function CategoryForm({ category }: CategoryFormProps) {
  const navigate = useNavigate()
  const qc = useQueryClient()
  const isEdit = !!category

  const [name, setName] = useState(category?.name ?? '')
  const [slug, setSlug] = useState(category?.slug ?? '')
  const [enabled, setEnabled] = useState(category?.enabled ?? true)
  const [type, setType] = useState(category?.type ?? '')

  const { data: typesRes } = useQuery(categoryTypesQueryOptions())
  const types = typesRes?.data ?? []

  const mutation = useMutation({
    mutationFn: async () => {
      const body = { name, slug: slug || undefined, enabled, type }
      return isEdit
        ? updateCategory(category!.id, body)
        : createCategory(body)
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: [categoriesKey] })
      navigate({ to: '/admin/categories' as string })
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
          label={t.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          label={t.slug}
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>{t.type}</InputLabel>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
            label={t.type}
          >
            {types.map((typeValue) => (
              <MenuItem key={typeValue} value={typeValue}>
                {typeValue}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Switch
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
            />
          }
          label={t.enabled}
        />
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
            onClick={() => navigate({ to: '/admin/categories' as string })}
          >
            {t.cancel}
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}

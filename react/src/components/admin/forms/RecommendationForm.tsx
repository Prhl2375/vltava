import {
  Autocomplete,
  Box,
  Button,
  FormControlLabel,
  Paper,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { useState, type FormEvent } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { productOptionsQueryOptions } from '#/api/admin/products'
import {
  createRecommendation,
  recommendationsKey,
  updateRecommendation,
} from '#/api/admin/recommendations'
import type { AdminRecommendation } from '#/types/admin'
import { ErrorAlert } from '../common'
import { t } from '../i18n'

interface RecommendationFormProps {
  record?: AdminRecommendation
}

export function RecommendationForm({ record }: RecommendationFormProps) {
  const navigate = useNavigate()
  const qc = useQueryClient()
  const isEdit = !!record

  const [productId, setProductId] = useState<number | null>(
    record?.product_id ?? null,
  )
  const [enabled, setEnabled] = useState(record?.enabled ?? true)

  const { data: optionsRes } = useQuery(productOptionsQueryOptions())
  const options = optionsRes?.data ?? []

  const mutation = useMutation({
    mutationFn: async () => {
      if (!productId) throw new Error(t.required)
      const body = { product_id: productId, enabled }
      return isEdit
        ? updateRecommendation(record!.id, body)
        : createRecommendation(body)
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: [recommendationsKey] })
      navigate({ to: '/admin/recommendations' as string })
    },
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    mutation.mutate()
  }

  const selected = options.find((o) => o.id === productId) ?? null

  return (
    <Paper sx={{ p: 3 }} component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {isEdit ? t.edit : t.create}
      </Typography>
      <ErrorAlert error={mutation.error} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Autocomplete
          options={options}
          value={selected}
          getOptionLabel={(o) => o.name}
          onChange={(_, val) => setProductId(val?.id ?? null)}
          renderInput={(params) => (
            <TextField {...params} label={t.product} />
          )}
        />
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
            onClick={() =>
              navigate({ to: '/admin/recommendations' as string })
            }
          >
            {t.cancel}
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}

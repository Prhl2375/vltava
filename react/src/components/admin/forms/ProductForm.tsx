import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { Plus, Trash2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { categoryOptionsQueryOptions } from '#/api/admin/categories'
import {
  createProduct,
  productsKey,
  updateProduct,
} from '#/api/admin/products'
import type { AdminProduct } from '#/types/admin'
import { storageUrl } from '#/api/client'
import { ErrorAlert } from '../common'
import { SortableList } from '../SortableList'
import { t } from '../i18n'

interface ProductFormProps {
  product?: AdminProduct
}

interface ImageItem {
  id: number // stable client id (negative for new)
  existingId?: number
  path?: string
  file?: File
  preview?: string
}

interface VariantItem {
  id: number
  existingId?: number
  name: string
  price: string
  weight: string
  volume: string
}

let nextClientId = -1
const newClientId = () => nextClientId--

export function ProductForm({ product }: ProductFormProps) {
  const navigate = useNavigate()
  const qc = useQueryClient()
  const isEdit = !!product

  const [name, setName] = useState(product?.name ?? '')
  const [slug, setSlug] = useState(product?.slug ?? '')
  const [description, setDescription] = useState(product?.description ?? '')
  const [categoryId, setCategoryId] = useState<number | ''>(
    product?.category_id ?? '',
  )
  const [enabled, setEnabled] = useState(product?.enabled ?? true)

  const [images, setImages] = useState<ImageItem[]>(() =>
    (product?.images ?? []).map((img) => ({
      id: img.id,
      existingId: img.id,
      path: img.image,
    })),
  )
  const [variants, setVariants] = useState<VariantItem[]>(() =>
    (product?.variants ?? []).map((v) => ({
      id: v.id,
      existingId: v.id,
      name: v.name,
      price: String(v.price ?? ''),
      weight: v.weight != null ? String(v.weight) : '',
      volume: v.volume != null ? String(v.volume) : '',
    })),
  )

  const { data: categoryOptionsRes } = useQuery(categoryOptionsQueryOptions())
  const categoryOptions = categoryOptionsRes?.data ?? []

  const addImage = (file: File) => {
    const preview = URL.createObjectURL(file)
    setImages((prev) => [
      ...prev,
      { id: newClientId(), file, preview },
    ])
  }

  const removeImage = (id: number) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
  }

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      {
        id: newClientId(),
        name: '',
        price: '',
        weight: '',
        volume: '',
      },
    ])
  }

  const updateVariant = (id: number, patch: Partial<VariantItem>) => {
    setVariants((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...patch } : v)),
    )
  }

  const removeVariant = (id: number) => {
    setVariants((prev) => prev.filter((v) => v.id !== id))
  }

  const mutation = useMutation({
    mutationFn: async () => {
      const fd = new FormData()
      fd.append('name', name)
      if (slug) fd.append('slug', slug)
      fd.append('description', description)
      if (categoryId !== '') fd.append('category_id', String(categoryId))
      fd.append('enabled', enabled ? '1' : '0')

      images.forEach((img, idx) => {
        if (img.existingId) {
          fd.append(`existing_images[${idx}][id]`, String(img.existingId))
          fd.append(`existing_images[${idx}][order]`, String(idx))
        } else if (img.file) {
          fd.append(`new_images[${idx}][file]`, img.file)
          fd.append(`new_images[${idx}][order]`, String(idx))
        }
      })

      variants.forEach((v, idx) => {
        if (v.existingId)
          fd.append(`variants[${idx}][id]`, String(v.existingId))
        fd.append(`variants[${idx}][name]`, v.name)
        fd.append(`variants[${idx}][price]`, v.price)
        if (v.weight) fd.append(`variants[${idx}][weight]`, v.weight)
        if (v.volume) fd.append(`variants[${idx}][volume]`, v.volume)
      })

      return isEdit
        ? updateProduct(product!.id, fd)
        : createProduct(fd)
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: [productsKey] })
      navigate({ to: '/admin/products' as string })
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
          required
          fullWidth
        />
        <TextField
          label={t.slugHint}
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          fullWidth
        />
        <TextField
          label={t.description}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={3}
        />
        <FormControl fullWidth>
          <InputLabel>{t.category}</InputLabel>
          <Select
            value={categoryId}
            label={t.category}
            onChange={(e) => {
              const raw = e.target.value as unknown as string | number
              const str = String(raw)
              setCategoryId(str === '' ? '' : Number(str))
            }}
          >
            <MenuItem value="">—</MenuItem>
            {categoryOptions.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: 1,
            }}
          >
            <Typography variant="subtitle1">{t.images}</Typography>
            <Button
              component="label"
              size="small"
              startIcon={<Plus size={16} />}
            >
              {t.addImage}
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0]
                  if (f) addImage(f)
                  e.target.value = ''
                }}
              />
            </Button>
          </Box>
          <Typography variant="caption" color="text.secondary">
            {t.reorderHint}
          </Typography>
          {images.length > 0 && (
            <Box sx={{ mt: 1 }}>
              <SortableList
                items={images}
                onReorder={setImages}
                renderItem={(img) => (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <Box
                      component="img"
                      src={
                        img.preview ??
                        (img.path ? storageUrl(img.path) : '')
                      }
                      alt=""
                      sx={{
                        width: 80,
                        height: 60,
                        objectFit: 'cover',
                        borderRadius: 1,
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2">
                        {img.file?.name ?? img.path}
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => removeImage(img.id)}
                    >
                      <Trash2 size={16} />
                    </IconButton>
                  </Box>
                )}
              />
            </Box>
          )}
        </Box>

        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: 1,
            }}
          >
            <Typography variant="subtitle1">{t.variants}</Typography>
            <Button
              size="small"
              startIcon={<Plus size={16} />}
              onClick={addVariant}
            >
              {t.addVariant}
            </Button>
          </Box>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            {variants.map((v) => (
              <Paper
                key={v.id}
                variant="outlined"
                sx={{
                  p: 2,
                  display: 'grid',
                  gridTemplateColumns:
                    '2fr 1fr 1fr 1fr auto',
                  gap: 2,
                  alignItems: 'center',
                }}
              >
                <TextField
                  size="small"
                  label={t.name}
                  value={v.name}
                  onChange={(e) =>
                    updateVariant(v.id, { name: e.target.value })
                  }
                />
                <TextField
                  size="small"
                  label={t.price}
                  type="number"
                  value={v.price}
                  onChange={(e) =>
                    updateVariant(v.id, { price: e.target.value })
                  }
                />
                <TextField
                  size="small"
                  label={t.weight}
                  type="number"
                  value={v.weight}
                  onChange={(e) =>
                    updateVariant(v.id, { weight: e.target.value })
                  }
                />
                <TextField
                  size="small"
                  label={t.volume}
                  type="number"
                  value={v.volume}
                  onChange={(e) =>
                    updateVariant(v.id, { volume: e.target.value })
                  }
                />
                <IconButton
                  color="error"
                  onClick={() => removeVariant(v.id)}
                >
                  <Trash2 size={16} />
                </IconButton>
              </Paper>
            ))}
          </Box>
        </Box>

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
            onClick={() => navigate({ to: '/admin/products' as string })}
          >
            {t.cancel}
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}

import {
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
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  bannersKey,
  createBanner,
  updateBanner,
} from '#/api/admin/banners'
import type { AdminBanner } from '#/types/admin'
import { ErrorAlert } from '../common'
import { FileUploadField } from '../FileUploadField'
import { t } from '../i18n'

interface BannerFormProps {
  banner?: AdminBanner
}

export function BannerForm({ banner }: BannerFormProps) {
  const navigate = useNavigate()
  const qc = useQueryClient()
  const isEdit = !!banner

  const [name, setName] = useState(banner?.name ?? '')
  const [text, setText] = useState(banner?.text ?? '')
  const [enabled, setEnabled] = useState(banner?.enabled ?? true)
  const [mobileImage, setMobileImage] = useState<File | null>(null)
  const [desktopImage, setDesktopImage] = useState<File | null>(null)
  const [clearMobile, setClearMobile] = useState(false)
  const [clearDesktop, setClearDesktop] = useState(false)

  const mutation = useMutation({
    mutationFn: async () => {
      const fd = new FormData()
      fd.append('name', name)
      fd.append('text', text)
      fd.append('enabled', enabled ? '1' : '0')
      if (mobileImage) fd.append('mobile_image', mobileImage)
      if (desktopImage) fd.append('desktop_image', desktopImage)
      if (clearMobile) fd.append('clear_mobile_image', '1')
      if (clearDesktop) fd.append('clear_desktop_image', '1')
      return isEdit ? updateBanner(banner!.id, fd) : createBanner(fd)
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: [bannersKey] })
      navigate({ to: '/admin/banners' as string })
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
          label={t.text}
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={6}
          fullWidth
          helperText={t.bannerHint}
        />
        <FileUploadField
          label={t.mobileImage}
          currentPath={clearMobile ? null : banner?.mobile_image}
          value={mobileImage}
          onChange={(f) => {
            setMobileImage(f)
            setClearMobile(f === null && !!banner?.mobile_image)
          }}
        />
        <FileUploadField
          label={t.desktopImage}
          currentPath={clearDesktop ? null : banner?.desktop_image}
          value={desktopImage}
          onChange={(f) => {
            setDesktopImage(f)
            setClearDesktop(f === null && !!banner?.desktop_image)
          }}
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
            onClick={() => navigate({ to: '/admin/banners' as string })}
          >
            {t.cancel}
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}

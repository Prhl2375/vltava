import { Box, Button, IconButton, Typography } from '@mui/material'
import { Trash2, Upload } from 'lucide-react'
import { useRef, useState } from 'react'
import { storageUrl } from '#/api/client'

interface FileUploadFieldProps {
  label: string
  currentPath?: string | null
  value: File | null
  onChange: (file: File | null) => void
  accept?: string
}

export function FileUploadField({
  label,
  currentPath,
  value,
  onChange,
  accept = 'image/*',
}: FileUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handlePick = (file: File | null) => {
    onChange(file)
    if (preview) URL.revokeObjectURL(preview)
    setPreview(file ? URL.createObjectURL(file) : null)
  }

  const displaySrc = preview ?? (currentPath ? storageUrl(currentPath) : null)

  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 1 }}>
        {label}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {displaySrc && (
          <Box
            component="img"
            src={displaySrc}
            alt={label}
            sx={{
              maxWidth: 120,
              maxHeight: 80,
              objectFit: 'contain',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
            }}
          />
        )}
        <Button
          variant="outlined"
          startIcon={<Upload size={16} />}
          onClick={() => inputRef.current?.click()}
        >
          {value?.name ?? label}
        </Button>
        {(value || currentPath) && (
          <IconButton
            size="small"
            onClick={() => handlePick(null)}
            color="error"
          >
            <Trash2 size={16} />
          </IconButton>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          style={{ display: 'none' }}
          onChange={(e) => handlePick(e.target.files?.[0] ?? null)}
        />
      </Box>
    </Box>
  )
}

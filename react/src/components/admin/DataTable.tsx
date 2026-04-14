import {
  Box,
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { Pencil, Trash2 } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useState, type ReactNode } from 'react'
import { t } from './i18n'

export interface Column<T> {
  id: string
  label: string
  render: (row: T) => ReactNode
}

interface DataTableProps<T extends { id: number }> {
  rows: T[]
  total: number
  page: number
  perPage: number
  loading?: boolean
  columns: Array<Column<T>>
  onPageChange: (page: number) => void
  onPerPageChange: (perPage: number) => void
  onSearch?: (value: string) => void
  searchValue?: string
  editPath?: (row: T) => string
  onDelete?: (row: T) => void
  selectable?: boolean
  selected?: number[]
  onSelectedChange?: (ids: number[]) => void
  toolbar?: ReactNode
  bulkActions?: ReactNode
  filters?: ReactNode
}

export function DataTable<T extends { id: number }>({
  rows,
  total,
  page,
  perPage,
  loading,
  columns,
  onPageChange,
  onPerPageChange,
  onSearch,
  searchValue,
  editPath,
  onDelete,
  selectable,
  selected = [],
  onSelectedChange,
  toolbar,
  bulkActions,
  filters,
}: DataTableProps<T>) {
  const [localSearch, setLocalSearch] = useState(searchValue ?? '')
  const allSelected = rows.length > 0 && selected.length === rows.length
  const someSelected = selected.length > 0 && !allSelected

  const toggleAll = () => {
    if (!onSelectedChange) return
    onSelectedChange(allSelected ? [] : rows.map((r) => r.id))
  }

  const toggleRow = (id: number) => {
    if (!onSelectedChange) return
    onSelectedChange(
      selected.includes(id)
        ? selected.filter((x) => x !== id)
        : [...selected, id],
    )
  }

  const actionColSpan = (editPath || onDelete) ? 1 : 0
  const totalCols = columns.length + (selectable ? 1 : 0) + actionColSpan

  return (
    <Paper>
      {(onSearch || toolbar) && (
        <Box
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          {onSearch && (
            <TextField
              size="small"
              placeholder={t.search}
              value={localSearch}
              onChange={(e) => {
                setLocalSearch(e.target.value)
                onSearch(e.target.value)
              }}
            />
          )}
          <Box sx={{ flex: 1 }} />
          {toolbar}
        </Box>
      )}
      {filters && <Box sx={{ px: 2, pb: 2 }}>{filters}</Box>}
      {selected.length > 0 && bulkActions && (
        <Box
          sx={{
            px: 2,
            py: 1,
            bgcolor: 'action.selected',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2">
            {t.rowsSelected(selected.length)}
          </Typography>
          {bulkActions}
        </Box>
      )}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {selectable && (
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={toggleAll}
                  />
                </TableCell>
              )}
              {columns.map((col) => (
                <TableCell key={col.id}>{col.label}</TableCell>
              ))}
              {actionColSpan > 0 && (
                <TableCell align="right">{t.actions}</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={totalCols} align="center">
                  {t.loading}
                </TableCell>
              </TableRow>
            )}
            {!loading && rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={totalCols} align="center">
                  {t.noData}
                </TableCell>
              </TableRow>
            )}
            {!loading &&
              rows.map((row) => (
                <TableRow key={row.id} hover>
                  {selectable && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selected.includes(row.id)}
                        onChange={() => toggleRow(row.id)}
                      />
                    </TableCell>
                  )}
                  {columns.map((col) => (
                    <TableCell key={col.id}>{col.render(row)}</TableCell>
                  ))}
                  {actionColSpan > 0 && (
                    <TableCell align="right">
                      <Box
                        sx={{
                          display: 'flex',
                          gap: 1,
                          justifyContent: 'flex-end',
                        }}
                      >
                        {editPath && (
                          <Link to={editPath(row)}>
                            <IconButton size="small">
                              <Pencil size={16} />
                            </IconButton>
                          </Link>
                        )}
                        {onDelete && (
                          <IconButton
                            size="small"
                            onClick={() => onDelete(row)}
                            color="error"
                          >
                            <Trash2 size={16} />
                          </IconButton>
                        )}
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={total}
        page={Math.max(0, page - 1)}
        onPageChange={(_, p) => onPageChange(p + 1)}
        rowsPerPage={perPage}
        onRowsPerPageChange={(e) => onPerPageChange(parseInt(e.target.value, 10))}
        labelRowsPerPage={t.rowsPerPage}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}–${to} ${t.of} ${count}`
        }
      />
    </Paper>
  )
}

import { Outlet, createFileRoute } from '@tanstack/react-router'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'

const adminTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#0d5733' },
  },
  shape: { borderRadius: 6 },
})

export const Route = createFileRoute('/admin')({
  component: AdminRoot,
})

function AdminRoot() {
  return (
    <ThemeProvider theme={adminTheme}>
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  )
}

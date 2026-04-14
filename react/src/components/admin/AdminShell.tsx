import {
  AppBar,
  Box,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import { Link, useLocation, useNavigate } from '@tanstack/react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  LayoutDashboard,
  Image as ImageIcon,
  Tag,
  Package,
  Star,
  Users,
  LogOut,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { logout, meQueryOptions } from '#/api/admin/auth'
import { setAuthUser } from '#/stores/auth'
import { t } from './i18n'

const DRAWER_WIDTH = 240

interface NavItem {
  to: string
  label: string
  icon: ReactNode
}

const navItems: Array<NavItem> = [
  { to: '/admin', label: t.dashboard, icon: <LayoutDashboard size={20} /> },
  { to: '/admin/banners', label: t.banners, icon: <ImageIcon size={20} /> },
  { to: '/admin/categories', label: t.categories, icon: <Tag size={20} /> },
  { to: '/admin/products', label: t.products, icon: <Package size={20} /> },
  {
    to: '/admin/recommendations',
    label: t.recommendations,
    icon: <Star size={20} />,
  },
  { to: '/admin/users', label: t.users, icon: <Users size={20} /> },
]

export function AdminShell({
  children,
  userName,
}: {
  children: ReactNode
  userName?: string
}) {
  const location = useLocation()
  const navigate = useNavigate()
  const qc = useQueryClient()

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      setAuthUser(null)
      await qc.resetQueries({ queryKey: meQueryOptions().queryKey })
      navigate({ to: '/admin/login' as string })
    },
  })

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
          ml: `${DRAWER_WIDTH}px`,
          bgcolor: 'background.paper',
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: 'divider',
          boxShadow: 'none',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">{t.appTitle}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {userName && (
              <Typography variant="body2">{t.welcome(userName)}</Typography>
            )}
            <Button
              color="inherit"
              startIcon={<LogOut size={18} />}
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
            >
              {t.logout}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar sx={{ px: 2 }}>
          <Typography variant="h6" noWrap>
            Vltava
          </Typography>
        </Toolbar>
        <List>
          {navItems.map((item) => {
            const selected =
              item.to === '/admin'
                ? location.pathname === '/admin' ||
                  location.pathname === '/admin/'
                : location.pathname.startsWith(item.to)
            const LinkListButton = ListItemButton as unknown as React.FC<
              Record<string, unknown>
            >
            return (
              <LinkListButton
                key={item.to}
                component={Link}
                to={item.to}
                selected={selected}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </LinkListButton>
            )
          })}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
          mt: 8,
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

import { Store } from '@tanstack/store'
import type { AuthUser } from '#/types/admin'

export interface AuthState {
  user: AuthUser | null
  status: 'idle' | 'loading' | 'authenticated' | 'unauthenticated'
}

export const authStore = new Store<AuthState>({
  user: null,
  status: 'idle',
})

export function setAuthUser(user: AuthUser | null) {
  authStore.setState(() => ({
    user,
    status: user ? 'authenticated' : 'unauthenticated',
  }))
}

export function setAuthStatus(status: AuthState['status']) {
  authStore.setState((s) => ({ ...s, status }))
}

export const BACKEND_URL = 'http://localhost:80'

const API_BASE = '/api'

async function request<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`)
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`)
  }
  return response.json() as Promise<T>
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint),
}

export function storageUrl(path: string): string {
  return `${BACKEND_URL}/storage/${path}`
}

export function assetUrl(path: string): string {
  return `${BACKEND_URL}/${path}`
}

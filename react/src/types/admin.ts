import type {
  Banner,
  Product,
  ProductCategory,
  ProductImage,
  ProductRecommendation,
  ProductVariant,
} from '#/types'

export type UserRole = 'admin' | 'moderator' | 'user'

export interface AuthUser {
  id: number
  name: string
  email: string
  role: UserRole
}

export interface Paginated<T> {
  data: T[]
  meta: {
    total: number
    page: number
    per_page: number
    last_page: number
  }
}

export interface Single<T> {
  data: T
}

export interface ListParams extends Record<string, unknown> {
  page?: number
  per_page?: number
  search?: string
  sort?: string
  filter?: Record<string, string | number | undefined>
}

export type AdminBanner = Banner & {
  enabled: boolean
  updated_at?: string
  order: number
}

export type AdminCategory = ProductCategory

export type AdminProduct = Product & {
  category?: ProductCategory | null
  prices?: string
}

export type AdminRecommendation = ProductRecommendation

export interface AdminUser {
  id: number
  name: string
  email: string
  role: UserRole
  created_at?: string
  updated_at?: string
  email_verified_at?: string | null
}

export type { Banner, Product, ProductCategory, ProductImage, ProductRecommendation, ProductVariant }

export interface ValidationErrorBody {
  message: string
  errors: Record<string, string[]>
}

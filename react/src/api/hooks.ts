import { queryOptions } from '@tanstack/react-query'
import { api } from './client'
import type {
  About,
  Banner,
  CategoriesResponse,
  Product,
} from '#/types'

export const aboutQueryOptions = () =>
  queryOptions({
    queryKey: ['about'],
    queryFn: () => api.get<About>('/about'),
  })

export const bannersQueryOptions = () =>
  queryOptions({
    queryKey: ['banners'],
    queryFn: () => api.get<Banner[]>('/banners'),
  })

export const recommendedProductsQueryOptions = () =>
  queryOptions({
    queryKey: ['products', 'recommended'],
    queryFn: () => api.get<Product[]>('/products/recommended'),
  })

export const categoriesQueryOptions = () =>
  queryOptions({
    queryKey: ['categories'],
    queryFn: () => api.get<CategoriesResponse>('/categories'),
  })

export const categoryProductsQueryOptions = (categorySlug: string) =>
  queryOptions({
    queryKey: ['categories', categorySlug, 'products'],
    queryFn: () =>
      api.get<Product[]>(`/categories/${categorySlug}/products`),
    enabled: !!categorySlug,
  })

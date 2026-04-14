export interface Banner {
  id: number
  name: string
  mobile_image: string
  desktop_image: string
  text: string
  order: number
}

export interface ProductImage {
  id: number
  product_id: number
  main: boolean
  image: string
}

export interface ProductVariant {
  id: number
  product_id: number
  name: string
  price: number
  weight: number | null
  volume: number | null
}

export interface Product {
  id: number
  name: string
  slug: string
  description: string
  enabled: boolean
  category_id: number
  images: ProductImage[]
  variants: ProductVariant[]
}

export interface ProductCategory {
  id: number
  name: string
  slug: string
  enabled: boolean
  type: string
  products?: Product[]
}

export interface CategoriesResponse {
  categories: ProductCategory[]
  categoryTypes: string[]
}

export interface ProductRecommendation {
  id: number
  order: number
  enabled: boolean
  product_id: number
  product: Product
}

import { styled } from '@mui/material/styles'
import VltavaProductCard from './VltavaProductCard'
import type { Product } from '#/types'

const Grid = styled('div')({
  display: 'grid',
  width: '100%',
  paddingTop: 25,
  paddingBottom: 25,
  gap: 20,
  justifyContent: 'center',
  gridTemplateColumns: 'repeat(auto-fit, 250px)',
})

interface VltavaGridProps {
  products: Product[]
}

export default function VltavaGrid({ products }: VltavaGridProps) {
  return (
    <Grid>
      {products.map((product) => (
        <VltavaProductCard key={product.id} product={product} />
      ))}
    </Grid>
  )
}

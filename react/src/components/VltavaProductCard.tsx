import { styled } from '@mui/material/styles'
import { storageUrl } from '#/api/client'
import type { Product } from '#/types'

const CardLink = styled('a')({
  textDecoration: 'none',
  color: 'black',
  width: 250,
  height: 400,
})

const CardContent = styled('div')({
  background: "rgba(255,255,255,1)",
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  border: '3px solid rgb(255, 255, 255)',
  borderRadius: 10,
  boxShadow: '0px 0px 25px 0px rgba(0, 0, 0, 0.25)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'transform 0.1s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
})

const imageBaseStyles = {
  width: '90%',
  height: '35%',
  marginTop: '5%',
  borderRadius: 10,
}

const CardImage = styled('img')({
  ...imageBaseStyles,
  objectFit: 'cover' as const,
})

const CardImagePlaceholder = styled('div')({
  ...imageBaseStyles,
  backgroundColor: 'rgba(13, 87, 51, 1)',
  opacity: 0.3,
  display: 'flex',
  color: 'white',
  fontSize: 45,
  fontWeight: 900,
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
})

const CardTitle = styled('h3')({
  marginTop: '2.5%',
  marginBottom: 0,
  fontSize: '1.17em',
  fontWeight: 'bold',
})

const CardDescription = styled('div')({
  width: '80%',
  marginLeft: '10%',
  marginRight: '10%',
  marginTop: '5%',
  fontSize: 14,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

const CardPriceButton = styled('div')({
  width: '90%',
  height: 30,
  marginBottom: '5%',
  border: '3.15px solid rgb(13, 87, 51)',
  borderRadius: 10,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 'bold',
})

interface VltavaProductCardProps {
  product: Product
}

export default function VltavaProductCard({
  product,
}: VltavaProductCardProps) {
  console.log(product);
  return (
    <CardLink href="#">
      <CardContent>
        {product.images?.length > 0 ? (
          <CardImage src={storageUrl(product.images[0].image)} alt={product.name} />
        ) : (
          <CardImagePlaceholder>{product.name}</CardImagePlaceholder>
        )}
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
        <CardPriceButton>
          {product.variants.map((variant, i) => (
            <span key={variant.id}>
              {variant.price}₴{i < product.variants.length - 1 ? ' | ' : ''}
            </span>
          ))}
        </CardPriceButton>
      </CardContent>
    </CardLink>
  )
}

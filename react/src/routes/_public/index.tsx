import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { styled } from '@mui/material/styles'
import VltavaBanner from '#/components/VltavaBanner'
import VltavaSeparator from '#/components/VltavaSeparator'
import VltavaGrid from '#/components/VltavaGrid'
import VltavaButton from '#/components/VltavaButton'
import VltavaService from '#/components/VltavaService'
import VltavaMap from '#/components/VltavaMap'
import {
  aboutQueryOptions,
  bannersQueryOptions,
  recommendedProductsQueryOptions,
} from '#/api/hooks'

const Container = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: '100%',
  margin: '0 auto',
  padding: '0 15px',
  [theme.breakpoints.up('xs')]: {
    maxWidth: '100%',
  },
  [theme.breakpoints.up('sm')]: { maxWidth: 720 },
  [theme.breakpoints.up('md')]: { maxWidth: 960 },
  [theme.breakpoints.up('lg')]: { maxWidth: 1140 },
  [theme.breakpoints.up('xl')]: { maxWidth: 1320 },
}))

export const Route = createFileRoute('/_public/')({
  component: HomePage,
})

function HomePage() {
  const { data: banners = [] } = useQuery(bannersQueryOptions())
  const { data: products = [] } = useQuery(recommendedProductsQueryOptions())
  const { data: about } = useQuery(aboutQueryOptions())

  return (
    <>
      <section>
        <VltavaBanner banners={banners} />
      </section>
      <Container>
        <VltavaSeparator>
          <h3>DA СМАЧНО!</h3>
        </VltavaSeparator>
        <VltavaGrid products={products} />
        <VltavaButton to="/menu">Більше страв</VltavaButton>
        <VltavaSeparator>
          <h3>СЕРВІС</h3>
        </VltavaSeparator>
        <VltavaService />
        <VltavaSeparator>
          <h3>ДЕ НАС ЗНАЙТИ</h3>
        </VltavaSeparator>
        <VltavaMap about={about} />
        <VltavaSeparator />
      </Container>
    </>
  )
}

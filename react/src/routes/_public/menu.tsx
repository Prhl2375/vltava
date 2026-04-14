import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { styled } from '@mui/material/styles'
import VltavaMenuNav from '#/components/VltavaMenuNav'
import VltavaGrid from '#/components/VltavaGrid'
import VltavaSeparator from '#/components/VltavaSeparator'
import {
  categoriesQueryOptions,
  categoryProductsQueryOptions,
} from '#/api/hooks'
import type { ProductCategory } from '#/types'

const MenuContainer = styled('div')({
  margin: '0 auto',
  width: '95vw',
})

const MenuLayout = styled('div')({
  marginTop: 65,
  paddingTop: '5vh',
  display: 'flex',
  gap: 24,
  alignItems: 'flex-start',
})

const MenuLeft = styled('div')({
  flexShrink: 0,
  position: 'sticky',
  top: 65,
})

const MenuRight = styled('div')({
  flex: 1,
  minWidth: 0,
})

export const Route = createFileRoute('/_public/menu')({
  component: MenuPage,
})

function MenuPage() {
  const { data = { categories: [], categoryTypes: [] } } = useQuery(
    categoriesQueryOptions(),
  )

  const { categories, categoryTypes } = data

  const [activeTab, setActiveTab] = useState<string>('')
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory | null>(null)

  const currentTab = activeTab || categoryTypes[0] || ''
  const tabCategories = categories.filter((c) => c.type === currentTab)
  const activeCategory =
    selectedCategory?.type === currentTab
      ? selectedCategory
      : (tabCategories[0] ?? null)
  const activeCategorySlug = activeCategory?.slug ?? ''

  const { data: products = [] } = useQuery(
    categoryProductsQueryOptions(activeCategorySlug),
  )

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setSelectedCategory(null)
  }

  return (
    <MenuContainer>
      <MenuLayout>
        <MenuLeft>
          <VltavaMenuNav
            categories={categories}
            categoryTypes={categoryTypes}
            activeCategory={activeCategorySlug}
            activeTab={currentTab}
            onTabChange={handleTabChange}
            onCategorySelect={(cat) => setSelectedCategory(cat)}
          />
        </MenuLeft>
        <MenuRight>
          {activeCategory && (
            <>
              <VltavaSeparator>
                <h3>{activeCategory.name}</h3>
              </VltavaSeparator>
              <VltavaGrid products={products} />
            </>
          )}
        </MenuRight>
      </MenuLayout>
    </MenuContainer>
  )
}

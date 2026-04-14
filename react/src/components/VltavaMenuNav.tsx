import { styled } from '@mui/material/styles'
import VltavaButton from './VltavaButton'
import type { ProductCategory } from '#/types'

const GREEN = '#006640'
const RADIUS = 6

const Sidebar = styled('nav')({
  maxHeight: 'calc(85vh - 65px)',
  width: 300,
  background: '#ffffff',
  borderRadius: RADIUS,
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.25)',
  padding: '6px 4px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontFamily: "'Inter', sans-serif",
})

const TabsContainer = styled('div')({
  display: 'flex',
  width: '100%',
  marginBottom: 4,
})

const Tab = styled('button')<{ active?: boolean }>(({ active }) => ({
  flex: '1 1 50%',
  padding: '6px 0',
  border: 0,
  borderRadius: `${RADIUS}px ${RADIUS}px 0 0`,
  background: active ? '#ffffff' : 'linear-gradient(#fefefe, #eaeaea)',
  borderBottom: active ? `3px solid ${GREEN}` : 'none',
  color: active ? GREEN : 'inherit',
  boxShadow: active ? '0 3px 4px rgba(0, 0, 0, 0.15) inset' : 'none',
  fontWeight: 600,
  cursor: 'pointer',
  '&:hover': active
    ? {}
    : {
      background: '#f5f5f5',
    },
}))

const Pointer = styled('span')<{ direction: 'up' | 'down' }>(
  ({ direction }) => ({
    width: 0,
    height: 0,
    borderLeft: '8px solid transparent',
    borderRight: '8px solid transparent',
    margin: '4px 0',
    ...(direction === 'up'
      ? { borderBottom: `8px solid ${GREEN}` }
      : { borderTop: `8px solid ${GREEN}` }),
  }),
)

const CategoryList = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  width: '100%',
  overflowY: 'auto',
})

const CategoryItem = styled('li')({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  margin: '8px 8px',
})

interface VltavaMenuNavProps {
  categories: ProductCategory[]
  categoryTypes: string[]
  activeCategory?: string
  activeTab: string
  onTabChange: (tab: string) => void
  onCategorySelect?: (category: ProductCategory) => void
}

export default function VltavaMenuNav({
  categories,
  categoryTypes,
  activeCategory,
  activeTab,
  onTabChange,
  onCategorySelect,
}: VltavaMenuNavProps) {
  const currentCategories = categories.filter((c) => c.type === activeTab)

  return (
    <Sidebar>
      <TabsContainer>
        {categoryTypes.map((type) => (
          <Tab
            key={type}
            active={activeTab === type}
            onClick={() => onTabChange(type)}
          >
            {type}
          </Tab>
        ))}
      </TabsContainer>

      {/* <Pointer direction="up" /> */}

      <CategoryList>
        {currentCategories.map((category) => (
          <CategoryItem key={category.id}>
            <VltavaButton
              styles={{ width: "100%" }}
              active={activeCategory === category.slug}
              onClick={() => onCategorySelect?.(category)}
            >
              {category.name}
            </VltavaButton>
          </CategoryItem>
        ))}
      </CategoryList>

      {/* <Pointer direction="down" /> */}
    </Sidebar>
  )
}

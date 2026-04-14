import { styled } from '@mui/material/styles'
import { Link } from '@tanstack/react-router'
import { assetUrl } from '#/api/client'
import VltavaButton from './VltavaButton'

const StyledHeader = styled('header')({
  zIndex: 100,
  position: 'absolute',
  width: '100%',
  height: 100,
  left: 0,
  top: 0,
  background: 'rgba(255, 255, 255, 0.3)',
  backdropFilter: 'blur(6.1px)',
  display: 'flex',
  alignItems: 'center',
})

const HeaderContainer = styled('div')({
  position: 'absolute',
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
})

const Logo = styled('div')({
  width: 250,
  height: 80,
  borderRadius: 11.25,
  marginLeft: 50,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& img': {
    height: '100%',
    width: '100%',
    objectFit: 'contain' as const,
  },
})

const HeaderRight = styled('div')({
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 50,
  gap: 15,
})

const LanguageDropdown = styled('div')({
  boxSizing: 'border-box',
  border: '3px solid rgb(13, 87, 51)',
  borderRadius: 5,
  background: 'white',
  color: 'black',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '5px 10px',
  fontStyle: 'italic',
  fontSize: 18,
  fontWeight: 700,
})

interface VltavaHeaderProps {
  variant?: 'default' | 'menu'
  headerTitle?: React.ReactNode
}

export default function Header({
  variant = 'default',
  headerTitle,
}: VltavaHeaderProps) {
  return (
    <StyledHeader
      sx={
        variant === 'menu'
          ? {
            height: 65,
            background: 'none',
            backdropFilter: 'none',
            boxShadow: 'none',
          }
          : {}
      }
    >
      <HeaderContainer>
        <Logo
          sx={
            variant === 'menu' ? { width: 200, height: 64 } : {}
          }
        >
          <Link to="/">
            <img src={assetUrl('images/logo.png')} alt="logo" />
          </Link>
        </Logo>
        <HeaderRight>
          <VltavaButton>Аккаунт</VltavaButton>
          <VltavaButton to="/menu">Меню</VltavaButton>
          <LanguageDropdown>UA▼</LanguageDropdown>
        </HeaderRight>
      </HeaderContainer>
      {headerTitle}
    </StyledHeader>
  )
}

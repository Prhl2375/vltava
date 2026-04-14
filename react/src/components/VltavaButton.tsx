import { styled } from '@mui/material/styles'
import { Link } from '@tanstack/react-router'

interface VltavaButtonProps {
  to?: string
  href?: string
  className?: string
  active?: boolean
  children: React.ReactNode
  onClick?: () => void
  styles?: any
}

const StyledButtonContent = styled('div')<{ active?: boolean }>(
  ({ active }) => ({
    boxSizing: 'border-box',
    borderRadius: 5,
    background: active ? 'rgb(13, 87, 51)' : 'white',
    display: 'flex',
    flex: '0 0 auto',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5px 10px',
    outline: '2px solid rgb(13, 87, 51)',
    transition: '0.25s ease',
    color: active ? 'white' : 'black',
    '&:hover': {
      backgroundColor: 'rgb(13, 87, 51)',
      outline: '2px solid white',
      color: 'white',
    },
  }),
)

const StyledLink = styled(Link)({
  color: 'black',
  textDecoration: 'none',
  fontWeight: 700,
  fontSize: 18,
  fontStyle: 'italic',
})

const StyledAnchor = styled('a')({
  color: 'black',
  textDecoration: 'none',
  fontWeight: 700,
  fontSize: 18,
  fontStyle: 'italic',
})

const StyledButton = styled('button')({
  color: 'black',
  textDecoration: 'none',
  fontWeight: 700,
  fontSize: 18,
  fontStyle: 'italic',
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
})

export default function VltavaButton({
  to,
  href,
  className,
  active,
  children,
  onClick,
  styles
}: VltavaButtonProps) {
  const content = (
    <StyledButtonContent active={active} className={className}>
      {children}
    </StyledButtonContent>
  )

  if (to) {
    return <StyledLink to={to}>{content}</StyledLink>
  }

  if (href) {
    return <StyledAnchor href={href}>{content}</StyledAnchor>
  }

  return <StyledButton style={styles} onClick={onClick}>{content}</StyledButton>
}

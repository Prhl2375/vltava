import { styled } from '@mui/material/styles'

const SeparatorWrapper = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

const SeparatorLine = styled('div')({
  width: 500,
  maxWidth: '90%',
  height: 5,
  background: 'rgb(13, 87, 51)',
})

interface VltavaSeparatorProps {
  children?: React.ReactNode
}

export default function VltavaSeparator({ children }: VltavaSeparatorProps) {
  return (
    <SeparatorWrapper>
      {children}
      <SeparatorLine />
    </SeparatorWrapper>
  )
}

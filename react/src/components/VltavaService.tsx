import { styled } from '@mui/material/styles'
import { assetUrl } from '#/api/client'

const ServiceWrapper = styled('div')({
  marginTop: 25,
  marginBottom: 25,
  color: 'rgb(13, 87, 51)',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 35,
})

const ServiceCardContent = styled('div')({
  position: 'relative',
  width: 325,
  height: 300,
  boxShadow: '0px 0px 25px 0px rgba(0, 0, 0, 0.5)',
  borderRadius: 10,
  transition: 'transform 0.1s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
})

const ServiceCardImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
  borderRadius: 10,
})

const ServiceCardLabel = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  top: 25,
  marginLeft: 50,
  position: 'absolute',
  height: 40,
  width: 225,
  border: '3px solid rgb(13, 87, 51)',
  borderRadius: 10,
  background: 'white',
  textDecoration: 'none',
  color: 'rgb(13, 87, 51)',
  fontWeight: 'bold',
  fontSize: 17,
})

const ServiceLink = styled('a')({
  textDecoration: 'none',
  color: 'inherit',
})

const services = [
  { image: assetUrl('images/service1.png'), label: 'Залишити відгук' },
  { image: assetUrl('images/service2.png'), label: 'Забронювати столик' },
  { image: assetUrl('images/service3.png'), label: 'Співпраця/Вакансії' },
]

export default function VltavaService() {
  return (
    <ServiceWrapper>
      {services.map((service) => (
        <ServiceLink href="#" key={service.label}>
          <ServiceCardContent>
            <ServiceCardImage src={service.image} alt={service.label} />
            <ServiceCardLabel>
              <span>{service.label}</span>
            </ServiceCardLabel>
          </ServiceCardContent>
        </ServiceLink>
      ))}
    </ServiceWrapper>
  )
}

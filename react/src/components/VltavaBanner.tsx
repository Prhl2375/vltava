import { styled } from '@mui/material/styles'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import { storageUrl } from '#/api/client'
import type { Banner } from '#/types'

const BannerWrapper = styled('div')({
  '& .swiper': {
    '--swiper-navigation-color': 'white',
    '--swiper-navigation-size': '13px',
    '--swiper-theme-color': 'rgba(13, 87, 51, 1)',
    width: '100%',
    height: '70vh',
    '@media (max-width: 768px)': {
      height: 'auto',
      aspectRatio: '600 / 750',
    },
  },
  '& .swiper-button-prev, & .swiper-button-next': {
    width: '35px !important',
    height: '35px !important',
    backgroundColor: 'rgba(13, 87, 51, 1)',
    borderRadius: 5,
    '& svg': {
      height: 15,
    },
  },
  '& .swiper-pagination-bullet': {
    width: '32px !important',
    height: '8px !important',
    borderRadius: '4px !important',
  },
  '& .swiper-pagination-bullet-active': {
    backgroundColor: 'rgba(13, 87, 51, 1) !important',
  },
})

const SlideImageDesktop = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
  '@media (max-width: 768px)': {
    display: 'none',
  },
})

const SlideImageMobile = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'none',
  '@media (max-width: 768px)': {
    display: 'block',
  },
})

const SlideContent = styled('div')({
  position: 'absolute',
  top: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999,
  background: 'none',
  width: '100%',
  height: '100%',
})

interface VltavaBannerProps {
  banners: Banner[]
}

export default function VltavaBanner({ banners }: VltavaBannerProps) {
  return (
    <BannerWrapper>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 10000, disableOnInteraction: true }}
        loop={banners.length > 1}
        navigation
        pagination={{ clickable: true }}
        slidesPerView={1}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <SlideImageDesktop
              src={storageUrl(banner.desktop_image)}
              alt={banner.name}
            />
            <SlideImageMobile
              src={storageUrl(banner.mobile_image)}
              alt={banner.name}
            />
            <SlideContent
              dangerouslySetInnerHTML={{ __html: banner.text }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </BannerWrapper>
  )
}

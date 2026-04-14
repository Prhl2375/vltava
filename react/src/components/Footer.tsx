import { styled } from '@mui/material/styles'
import { assetUrl } from '#/api/client'

const StyledFooter = styled('footer')({
  marginTop: 25,
  width: '100%',
  minHeight: 175,
  '& h2': {
    margin: 0,
    fontSize: 15,
    color: 'rgb(13, 87, 51)',
    textAlign: 'center',
  },
  '& p': {
    margin: 0,
    fontSize: 14,
    textAlign: 'center',
  },
})

const FooterLine = styled('div')({
  width: '100%',
  boxSizing: 'border-box',
  border: '3px dashed rgb(13, 87, 51)',
})

const FooterContent = styled('div')({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
})

const FooterLogo = styled('img')({
  width: 125,
  height: 125,
  marginTop: 25,
  marginBottom: 25,
  marginLeft: 25,
  borderRadius: 10,
})

const FooterLeft = styled('div')({
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
})

const FooterLeftSection = styled('section')({
  margin: 10,
  width: 120,
})

const FooterRightSection = styled('section')({
  height: '100%',
  maxWidth: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  paddingRight: 25,
  '& img': {
    width: 50,
    height: 50,
  },
})

const SocialIcons = styled('div')({
  display: 'flex',
  gap: 10,
})

export default function Footer() {
  return (
    <StyledFooter>
      <FooterLine />
      <FooterContent>
        <FooterLeft>
          <FooterLogo src={assetUrl('images/footerLogo.jpg')} alt="vltava footer logo" />
          <FooterLeftSection>
            <h2>Адреса</h2>
            <p>
              м. Вінниця
              <br />
              вул. Визволення, 8
            </p>
          </FooterLeftSection>
          <FooterLeftSection>
            <h2>Графік роботи</h2>
            <p>
              щодня
              <br />з 11:00 до 24:00
            </p>
          </FooterLeftSection>
          <FooterLeftSection>
            <h2>Контакти</h2>
            <p>
              (096) 417-93-25
              <br />
              vltava.vn@gmail.com
            </p>
          </FooterLeftSection>
          <FooterLeftSection>
            <h2>Особистий кабінет</h2>
            <p>
              Вхід
              <br />
              Реєстрація
            </p>
          </FooterLeftSection>
        </FooterLeft>
        <FooterRightSection>
          <h2>Соціальні мережі</h2>
          <SocialIcons>
            <a href="#">
              <img src={assetUrl('images/facebookIcon.svg')} alt="Facebook" />
            </a>
            <a href="#">
              <img src={assetUrl('images/instagramIcon.svg')} alt="Instagram" />
            </a>
            <a href="#">
              <img src={assetUrl('images/telegramIcon.svg')} alt="Telegram" />
            </a>
          </SocialIcons>
        </FooterRightSection>
      </FooterContent>
    </StyledFooter>
  )
}

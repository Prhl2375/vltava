import type { About } from '#/types';
import { styled } from '@mui/material/styles'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { storageUrl } from '#/api/client';

const SHOP_POSITION: [number, number] = [49.234643, 28.475651];

const MapWrapper = styled('div')({
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
});

const MapLeft = styled('div')({
  width: "60%",
  display: "flex",
  flexDirection: "column",
  gap: 35,
  '@media (max-width: 768px)': {
    width: "100%",
  },
});

const MapAbout = styled('div')({
  border: "2px solid rgb(13, 87, 51)",
  fontSize: "20px",
  padding: 15,
  width: "100%",
  minHeight: 150,
  boxShadow: '0px 0px 25px 0px rgba(0, 0, 0, 0.5)',
  borderRadius: 10,
  transition: 'transform 0.1s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  "& div": {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  "& span": {
    color: 'rgb(13, 87, 51)',
    flexShrink: 0,
  },
  "& p": {
    color: 'black',
    margin: 0,
  },
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  '@media (max-width: 768px)': {
    minHeight: 200,
    fontSize: "18px",
  },
});

const MapContent = styled('div')({
  padding: 2,
  border: "2px solid rgb(13, 87, 51)",
  width: "100%",
  height: 340,
  boxShadow: '0px 0px 25px 0px rgba(0, 0, 0, 0.5)',
  borderRadius: 10,
  transition: 'transform 0.1s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const MapVideo = styled('div')({
  padding: 2,
  background: "black",
  border: "2px solid rgb(13, 87, 51)",
  width: "35%",
  boxShadow: '0px 0px 25px 0px rgba(0, 0, 0, 0.5)',
  borderRadius: 10,
  transition: 'transform 0.1s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

interface VltavaMapProps {
  about: About
}


export default function VltavaMap({ about }: VltavaMapProps) {
  console.log(about);
  return (
    <MapWrapper>
      <MapLeft>
        <MapAbout>
          <div>
            <span>Адреса:</span>
            <p>{about?.address}</p>
          </div>
          <div>
            <span>Графік роботи:</span>
            <p>щодня з {about?.opens_at} до {about?.closes_at}</p>
          </div>
          <div>
            <span>Контакти:</span>
            <p>{about?.phone}  {about?.email}</p>
          </div>
        </MapAbout>
        <MapContent>
          <MapContainer
            center={SHOP_POSITION}
            zoom={16}
            scrollWheelZoom={false}
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <Marker position={SHOP_POSITION}>
              <Popup>
                Ласкаво просимо до ресторану Влтава!
              </Popup>
            </Marker>
          </MapContainer>
        </MapContent>
      </MapLeft>
      <MapVideo>
        <video
          style={{
            height: "100%",
            width: "100%"
          }}
          src={storageUrl(about?.video_guide)}
          controls
        />
      </MapVideo>
    </MapWrapper>
  )
}

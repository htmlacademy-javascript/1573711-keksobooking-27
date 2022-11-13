import {makeActive} from './form.js';
import {createArray} from './data.js';
import {createCard} from './ads_generator.js';

const CENTER_COORDINATES = {
  lat: 35.68950,
  lng: 139.69171,
};

const address = document.querySelector('#address');
address.setAttribute('disabled', true);

const map = L.map('map-canvas')
  .on('load', () => {
    makeActive();
  })
  .setView(CENTER_COORDINATES, 12);

// добавляю слой с картой
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// большая иконка
const icon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

// маленькая иконка
const similarIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// добавляю основной большой маркер в центр Токио
const marker = L.marker(
  CENTER_COORDINATES,
  {
    draggable: true,
    icon: icon,
  },
  address.value = `${CENTER_COORDINATES.lat} ${CENTER_COORDINATES.lng}`
);

marker.addTo(map);

// делаю маркер подвижным и записываю координаты в поле адреса формы
marker.on('moveend', (evt) => {
  const latLng = evt.target.getLatLng();
  const lat = latLng.lat.toFixed(5);
  const lng = latLng.lng.toFixed(5);

  address.value = `${lat}, ${lng}`;
});

const adsArray = createArray();

// создаю маленькие маркеры с попапами объявлений
const createMarker = (offer) => {
  const markerSmall = L.marker(
    {
      lat: offer.location.lat,
      lng: offer.location.lng,
    },
    {
      similarIcon,
    }
  );

  markerSmall
    .addTo(map)
    .bindPopup(createCard(offer));
};

adsArray.forEach((offer) => {
  createMarker(offer);
});

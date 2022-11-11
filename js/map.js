import {makeActive} from './form.js';
import {createArrow} from './data.js';
import {changeRequiredItems, changeFeatures, checkDescription, checkPhotos} from './ads_generator.js';


const address = document.querySelector('#address');
address.setAttribute('disabled', true);
address.value = '35.68950, 139.69171';

const map = L.map('map-canvas')
  .on('load', () => {
    makeActive();
  })
  .setView({
    lat: 35.68950,
    lng: 139.69171,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const icon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const similarIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const marker = L.marker(
  {
    lat: 35.68950,
    lng: 139.69171,
  },
  {
    draggable: true,
    icon: icon,
  },
);

marker.addTo(map);

marker.on('moveend', (evt) => {
  const latLng = evt.target.getLatLng();
  const lat = latLng.lat.toFixed(5);
  const lng = latLng.lng.toFixed(5);

  address.value = `${lat}, ${lng}`;
});

const adsArrow = createArrow();

// Перенесла функцию из ads_generator сюда
// Пытаюсь перенести все функцию в одну для отрисовки попапа

const createPopup = () => {
  const card = document.querySelector('#card').content;
  const popup = card.querySelector('.popup');
  const popupClone = popup.cloneNode(true);

  changeRequiredItems(adsArrow);
  changeFeatures();
  checkDescription();
  checkPhotos();

  return popupClone;
};

adsArrow.forEach((offer) => {
  const lat = offer.location.lat;
  const lng = offer.location.lng;

  const adMarker = L.marker({
    lat,
    lng,
  },
  {
    icon: similarIcon,
  });

  adMarker
    .addTo(map)
    .bindPopup(createPopup());

// Функция выше не работает
// В попап вообще ничего не отрисовывается
});

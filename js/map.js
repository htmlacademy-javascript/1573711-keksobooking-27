import { setFormState } from './form.js';
import { createCard } from './ads_generator.js';
import { avatarImage, photoElement, DEFAULT_AVATAR } from './photos.js';
import { getData } from './server.js';
import { adForm, sliderElement, pristine, filtersForm } from './ad_form.js';
import { onError } from './util.js';


const centerCoordinates = {
  lat: 35.68950,
  lng: 139.69171,
};
const MAP_SCALE = 12;

const buttonReset = document.querySelector('.ad-form').querySelector('.ad-form__reset');
const address = document.querySelector('#address');
address.setAttribute('readonly', true);


const map = L.map('map-canvas')
  .on('load', () => {
    setFormState(true);
  })
  .setView(centerCoordinates, MAP_SCALE);

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
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// добавляю основной большой маркер в центр Токио
const marker = L.marker(
  centerCoordinates,
  {
    draggable: true,
    icon: icon,
  },
  address.value = `${centerCoordinates.lat} ${centerCoordinates.lng}`
);

marker.addTo(map);

// делаю маркер подвижным и записываю координаты в поле адреса формы
marker.on('moveend', (evt) => {
  const latLng = evt.target.getLatLng();
  const lat = latLng.lat.toFixed(5);
  const lng = latLng.lng.toFixed(5);

  address.value = `${lat}, ${lng}`;
});

// создаю маленькие маркеры с попапами объявлений

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (offer) => {
  const markerSmall = L.marker(
    {
      lat: offer.location.lat,
      lng: offer.location.lng,
    },
    {
      icon: similarIcon,
    }
  );

  markerSmall
    .addTo(markerGroup)
    .bindPopup(createCard(offer));
};

// удаление маркеров

const removeAllMarkers = () => {
  markerGroup.clearLayers();
};

// Ставит карту на место при очистке

const onButtonResetClick = () => {
  // очистка форм и валидации
  adForm.reset();
  filtersForm.reset();
  pristine.reset();
  sliderElement.noUiSlider.set(1000);
  // ставит карту на место
  address.value = `${centerCoordinates.lat} ${centerCoordinates.lng}`;
  marker.setLatLng(centerCoordinates);
  map.setView(centerCoordinates, MAP_SCALE);
  map.closePopup();
  // убирает превью фото
  avatarImage.src = DEFAULT_AVATAR;
  photoElement.src = DEFAULT_AVATAR;
  // перерисовывает маркеры
  removeAllMarkers();
  getData(onError);
};

buttonReset.addEventListener('click', onButtonResetClick);


export { createMarker, removeAllMarkers };

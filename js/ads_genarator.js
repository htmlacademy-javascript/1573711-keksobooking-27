import {createArrow, AD_FEATURES, AD_PHOTOS} from './data.js';

const notice = createArrow().shift();

const TYPE_DICTIONARY = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const card = document.querySelector('#card').content;
const popup = card.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');

const popupClone = popup.cloneNode(true);
mapCanvas.append(popupClone);

const offerTitle = document.querySelector('.popup__title');
const offerAdress = document.querySelector('.popup__text--address');
const offerPrice = document.querySelector('.popup__text--price');
const offerType = document.querySelector('.popup__type');
const offerCapacity = document.querySelector('.popup__text--capacity');
const offerTime = document.querySelector('.popup__text--time');
const offerFeatures = document.querySelector('.popup__features');
const offerDescription = document.querySelector('.popup__description');
const offerPhotos = document.querySelector('.popup__photos');
const offerPhoto = document.querySelector('.popup__photo');
const offerAvatar = document.querySelector('.popup__avatar');

const changeRequiredItems = () => {
  offerTitle.textContent = notice.offer.title;
  offerAdress.textContent = notice.offer.adress;
  offerPrice.textContent = `${notice.offer.price} ₽/ночь`;
  offerType.textContent = TYPE_DICTIONARY[notice.offer.type];

  offerCapacity.textContent = `${notice.offer.rooms} комнаты для ${notice.offer.guests} гостей`;
  offerTime.textContent = `Заезд после ${notice.offer.checkin}, выезд до ${notice.offer.checkout}`;

  // Всегда один и тот же ID
  offerAvatar.src = notice.author.avatar;
};

const changeFeatures = () => {
  const featureList = offerFeatures.querySelectorAll('.popup__feature');
  const featureModifiers = AD_FEATURES.map((feature) => `popup__feature--${feature}`);

  featureList.forEach((featureItem) => {
    const modifier = featureItem.classList[1];

    if (!featureModifiers.includes(modifier)) {
      featureItem.remove();
    }
  });
};

const checkDescription = () => {
  if (!offerDescription.textContent) {
    offerDescription.classList.add('hidden');
  }
};

const checkPhotos = () => {
  offerPhotos.innerHTML = '';

  AD_PHOTOS.forEach((item) => {
    const photoElement = offerPhoto.cloneNode(true);
    photoElement.src = item;
    offerPhotos.appendChild(photoElement);
  });
};

changeRequiredItems();
changeFeatures();
checkDescription();
checkPhotos();

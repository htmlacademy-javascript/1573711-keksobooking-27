const TYPE_DICTIONARY = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const popupTemplate = document.querySelector('#card').content;
const popup = popupTemplate.querySelector('.popup');

const createCard = ({author, offer}) => {
  // Клонирую шаблон попапа
  const popupElement = popup.cloneNode(true);

  // Редактирую содержимое склонированного попапа
  popupElement.querySelector('.popup__title').textContent = offer.title;
  popupElement.querySelector('.popup__text--address').textContent = offer.adress;
  popupElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  popupElement.querySelector('.popup__type').textContent = TYPE_DICTIONARY[offer.type];
  popupElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  popupElement.querySelector('.popup__avatar').src = author.avatar;

  // проверяю наличие особенностей
  const offerFeatures = popupElement.querySelector('.popup__features');
  const featureList = offerFeatures.querySelectorAll('.popup__feature');

  if (offer.features) {
    const featureModifiers = offer.features.map((feature) => `popup__feature--${feature}`);
    featureList.forEach((featureItem) => {
      const modifier = featureItem.classList[1];
      if (!featureModifiers.includes(modifier)) {
        featureItem.remove();
      }
    });
  }
  if (!offer.features) {
    offerFeatures.remove();
  }

  // проверяю наличие описания
  const offerDescription = popupElement.querySelector('.popup__description');
  if (!offerDescription.textContent) {
    offerDescription.classList.add('hidden');
  }

  // Проверяю фото
  const offerPhotos = popupElement.querySelector('.popup__photos');
  const offerPhoto = popupElement.querySelector('.popup__photo');

  if(offer.photos) {
    offerPhotos.innerHTML = '';
    offer.photos.forEach((item) => {
      const photoElement = offerPhoto.cloneNode(true);
      photoElement.src = item;
      offerPhotos.appendChild(photoElement);
    });
  }

  return popupElement;
};

export {createCard};

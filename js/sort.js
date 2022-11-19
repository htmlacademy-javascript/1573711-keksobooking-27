import { getData } from './server.js';
import { onError } from './util.js';
import { createMarker } from './map.js';


const findPrice = (price) => {
  if (price >= 0 && price < 10000) {
    return 'low';
  }
  if (price >= 10000 && price < 50000) {
    return 'middle';
  }
  return 'high';
};

const getAdRank = (ad) => {
  // нашла все инпуты формы фильтрации
  const housingTypeInput = document.querySelector('#housing-type');
  const housingPriceInput = document.querySelector('#housing-price');
  const housingRoomsInput = document.querySelector('#housing-rooms');
  const housingGuestsInput = document.querySelector('#housing-guests');
  const housingFeaturesCheckbox = document.querySelectorAll('.map__checkbox');

  // считаю рейтинг объявления
  let rank = 0;

  // тип
  if (ad.offer.type === housingTypeInput.value || ad.offer.type === 'any') {
    rank += 1;
  }
  // цена
  const priceRange = findPrice(ad.offer.price);
  if (priceRange === housingPriceInput.value || ad.offer.type === 'any') {
    rank += 1;
  }
  // комнаты
  if (ad.offer.rooms === housingRoomsInput.value || ad.offer.type === 'any') {
    rank += 1;
  }
  // гости
  if (ad.offer.guests === housingGuestsInput.value || ad.offer.type === 'any') {
    rank += 1;
  }
  // особенности
  housingFeaturesCheckbox.forEach((feature) => {
    if (feature.checked) {
      rank += 1;
    }
  });

  return rank;
};

// функция сортировки

const compareAdds = (firstAd, secondAd) => {
  const firasRank = getAdRank(firstAd);
  const secondRank = getAdRank(secondAd);

  return secondRank - firasRank;
};

const onFilterInputChange = (array) => {
  const newArray = array.sort(compareAdds).slice(0, 10);
  createMarker(newArray);
};

const sortAddsArray = (array) => {
  const form = document.querySelector('.map__filters');
  form.addEventListener('change', onFilterInputChange(array));
};

getData(sortAddsArray, onError);

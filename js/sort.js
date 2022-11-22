import { debounce } from './debounce.js';
import { createMarker, removeAllMarkers } from './map.js';


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
  const housingFeaturesCheckbox = document.querySelectorAll('.map__checkbox:checked');

  // считаю рейтинг объявления
  let rank = 0;

  // тип
  if (ad.offer.type === housingTypeInput.value) {
    rank += 1;
  }

  // цена
  const priceRange = findPrice(ad.offer.price);
  if (priceRange === housingPriceInput.value) {
    rank += 1;
  }

  // комнаты
  if (ad.offer.rooms.toString() === housingRoomsInput.value.toString()) {
    rank += 1;
  }

  // гости
  if (ad.offer.guests.toString() === housingGuestsInput.value.toString()) {
    rank += 1;
  }

  // особенности
  if (ad.offer.features) {
    const featureModifiers = ad.offer.features.map((feature) => `filter-${feature}`);

    housingFeaturesCheckbox.forEach((element) => {
      if (featureModifiers.includes(element.id)) {
        rank += 1;
      }
    });
  }
  return rank;
};

// функция сортировки

const compareAdds = (firstAd, secondAd) => {
  const firstRank = getAdRank(firstAd);
  const secondRank = getAdRank(secondAd);

  return secondRank - firstRank;
};

// фильтрация массива

const addsFiltering = (array) => {
  const housingTypeInput = document.querySelector('#housing-type');
  const housingPriceInput = document.querySelector('#housing-price');
  const housingRoomsInput = document.querySelector('#housing-rooms');
  const housingGuestsInput = document.querySelector('#housing-guests');

  const filter = array.filter((ad) => {
    const priceRange = findPrice(ad.offer.price);

    const conditions = ad.offer.type === housingTypeInput.value || housingTypeInput.value === 'any' &&
      priceRange === housingPriceInput.value || housingPriceInput.value === 'any' &&
      ad.offer.rooms.toString() === housingRoomsInput.value.toString() || housingRoomsInput.value === 'any' &&
      ad.offer.guests.toString() === housingGuestsInput.value.toString() || housingGuestsInput.value === 'any';

    return conditions;
  });
  console.log(filter);
};

// сортирует массив, полученный с сервера, и отрисовывает маркеры

const sortAddsArray = (array) => {
  const form = document.querySelector('.map__filters');

  form.addEventListener('change', debounce(() => {
    removeAllMarkers();
    const sortArray = array.sort(compareAdds).slice(0, 10);
    console.log(addsFiltering(sortArray));
    sortArray.forEach((ad) => createMarker(ad));
  }, 500));
};

export { sortAddsArray, compareAdds };

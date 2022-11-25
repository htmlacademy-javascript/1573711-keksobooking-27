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

// фильтрация массива

const addsFiltering = (array) => {
  const housingTypeInput = document.querySelector('#housing-type');
  const housingPriceInput = document.querySelector('#housing-price');
  const housingRoomsInput = document.querySelector('#housing-rooms');
  const housingGuestsInput = document.querySelector('#housing-guests');
  const housingFeaturesCheckbox = Array.from(document.querySelectorAll('.map__checkbox:checked'));

  const filter = array.filter((ad) => {
    const priceRange = findPrice(ad.offer.price);

    const featuresCheck = () => {
      if (ad.offer.features) {
        return housingFeaturesCheckbox.every((element) => ad.offer.features.includes(element.value));
      }
    };

    const type = ad.offer.type === housingTypeInput.value || housingTypeInput.value === 'any';
    const price = priceRange === housingPriceInput.value || housingPriceInput.value === 'any';
    const rooms = ad.offer.rooms.toString() === housingRoomsInput.value.toString() || housingRoomsInput.value === 'any';
    const guests = ad.offer.guests.toString() === housingGuestsInput.value.toString() || housingGuestsInput.value === 'any';
    const features = featuresCheck();

    const conditions = type && price && rooms && guests && features;
    return conditions;
  });
  return filter;
};

// сортирует массив, полученный с сервера, и отрисовывает маркеры

const sortAddsArray = (array) => {
  const form = document.querySelector('.map__filters');

  form.addEventListener('change', debounce(() => {
    removeAllMarkers();
    // const sortArray = array.sort(compareAdds).slice(0, 10);
    const filterArray = addsFiltering(array).slice(0, 10);
    filterArray.forEach((ad) => createMarker(ad));
  }, 500));
};

export { sortAddsArray };

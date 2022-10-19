import {getRandomNumber, getRandomArbitrary} from'./util.js';

const AD_TITLE = [
  'Есть свободные места',
  'Предлагается жилье',
  'Недалеко от вас'
];

const AD_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const AD_CHECK_IN = [
  '12:00',
  '13:00',
  '14:00'
];

const AD_CHECK_OUT = [
  '12:00',
  '13:00',
  '14:00'
];

const AD_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const AD_DESCRIPTION = [
  'Переночуйте и уезжайте, ну а что вы хотели за такие деньги',
  'Неплохое жилье, почти на 3 звезды',
  'Хорошее жилье по цене-качеству, даже душ в номере есть',
  'Если у вас много денег, то вам нужно именно это'
];

const AD_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;

const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;

const makeCounter = () => {
  let count = 0;

  return () => {
    count++;

    return count;
  };
};

const counter = makeCounter();

const createDeclarations = () => {
  const RANDOM_LAT = getRandomArbitrary(MIN_LAT, MAX_LAT, 4);
  const RANDOM_LNG = getRandomArbitrary(MIN_LNG, MAX_LNG, 4);

  return {
    autor:
    {
      avatar: `img/avatars/user${counter().toString().padStart(2, '0')}.png`
    },
    offer:
    {
      title: AD_TITLE[getRandomNumber(0, AD_TITLE.length - 1)],
      adress: `${RANDOM_LAT}, ${RANDOM_LNG}`,
      price: getRandomNumber(1, 100000),
      type: AD_TYPE[getRandomNumber(0, AD_TYPE.length - 1)],
      rooms: getRandomNumber(1, 10),
      guests: getRandomNumber(1, 10),
      checkin: AD_CHECK_IN[getRandomNumber(0, AD_CHECK_IN.length - 1)],
      checkout: AD_CHECK_OUT[getRandomNumber(0, AD_CHECK_OUT.length - 1)],
      features: AD_FEATURES[getRandomNumber(0, AD_FEATURES.length - 1)],
      description: AD_DESCRIPTION[getRandomNumber(0, AD_DESCRIPTION.length - 1)],
      photos: AD_PHOTOS[getRandomNumber(0, AD_PHOTOS.length - 1)]
    },
    location:
    {
      lat: RANDOM_LAT,
      lng: RANDOM_LNG
    }
  };
};

const createArrow = () => Array.from({ length: 10 }, createDeclarations);

createArrow();

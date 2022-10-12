// Функция, возвращающая случайное целое число (взято с mdn web docs)
function getRandomNumber(min, max) {
  if (min < 0 || max < 0 || min > max || min === max) {
    return NaN;
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
}

getRandomNumber(1, 20);

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно (сделала сама)

function getRandomArbitrary(min, max, decimal) {
  if (min < 0 || max < 0 || min > max || min === max) {
    return NaN;
  }
  // Получить случайное число и уножить на 10 в степени знаков после запятой
  let number = (Math.random() * (max - min) + min) * Math.pow(10, decimal);
  // Округлить
  number = Math.floor(number);
  // Разделить на количество знаков после запятой
  number = number / Math.pow(10, decimal);

  return number;
}

getRandomArbitrary(1, 10, 3);

//Пишет путь аватарки автора
function getAvatar() {
  const someNumber = getRandomNumber(1, 10);
  let authorAvatar = '';

  if (someNumber < 10) {
    authorAvatar = `img/avatars/user0${someNumber}.png`;
    return authorAvatar;
  }

  authorAvatar = `img/avatars/user${someNumber}.png`;
  return authorAvatar;
}

const adTitle = [
  'Есть свободные места',
  'Предлагается жилье',
  'Недалеко от вас'
];

const adType = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const adCheckin = [
  '12:00',
  '13:00',
  '14:00'
];

const adCheckout = [
  '12:00',
  '13:00',
  '14:00'
];

const adFeatures = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const adDescription = [
  'Переночуйте и уезжайте, ну а что вы хотели за такие деньги',
  'Неплохое жилье, почти на 3 звезды',
  'Хорошее жилье по цене-качеству, даже душ в номере есть',
  'Если у вас много денег, то вам нужно именно это'
];

const adPhotos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

// const author =
// {
//   avatar: getAvatar()
// };

// const declarationLocation =
// {
//   lat: getRandomArbitrary(35.65000, 35.70000, 4),
//   lng: getRandomArbitrary(139.70000, 139.80000, 4)
// };

// const offer =
// {
//   title: adTitle[getRandomNumber(0, adTitle.length - 1)],
//   adress: `${declarationLocation.lat}, ${declarationLocation.lng}`,
//   price: getRandomNumber(1, 100000),
//   type: adType[getRandomNumber(0, adType.length - 1)],
//   rooms: getRandomNumber(1, 10),
//   guests: getRandomNumber(1, 10),
//   checkin: adCheckin[getRandomNumber(0, adCheckin.length - 1)],
//   checkout: adCheckout[getRandomNumber(0, adCheckout.length - 1)],
//   features: adFeatures[getRandomNumber(0, adFeatures.length - 1)],
//   description: adDescription[getRandomNumber(0, adDescription.length - 1)],
//   photos: adPhotos[getRandomNumber(0, adPhotos.length - 1)]
// };

const createDeclarations = () => ({
  autor:
  {
    avatar: getAvatar()
  },
  offer:
  {
    title: adTitle[getRandomNumber(0, adTitle.length - 1)],
    adress: `${declarationLocation.lat}, ${declarationLocation.lng}`,
    price: getRandomNumber(1, 100000),
    type: adType[getRandomNumber(0, adType.length - 1)],
    rooms: getRandomNumber(1, 10),
    guests: getRandomNumber(1, 10),
    checkin: adCheckin[getRandomNumber(0, adCheckin.length - 1)],
    checkout: adCheckout[getRandomNumber(0, adCheckout.length - 1)],
    features: adFeatures[getRandomNumber(0, adFeatures.length - 1)],
    description: adDescription[getRandomNumber(0, adDescription.length - 1)],
    photos: adPhotos[getRandomNumber(0, adPhotos.length - 1)]
  },
  location:
  {
    lat: getRandomArbitrary(35.65000, 35.70000, 4),
    lng: getRandomArbitrary(139.70000, 139.80000, 4)
  }
});

const declarations = Array.from({length: 10}, createDeclarations);

console.log(declarations);

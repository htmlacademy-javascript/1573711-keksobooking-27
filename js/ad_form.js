const adForm = document.querySelector('.ad-form');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'text-help',
});

const adFormTitle = adForm.querySelector('#title');

function validateTitle (value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator(
  adFormTitle,
  validateTitle,
  'Введите от 30 до 100 символов');

const adFormPrice = adForm.querySelector('#price');
const MAX_PRICE = 100000;

function validatePrice () {
  return adFormPrice.value <= MAX_PRICE;
}

pristine.addValidator(
  adFormPrice,
  validatePrice,
  'Цена не должна превышать 100000!');

const adFormRooms = adForm.querySelector('#room_number');
const adFormCapacity = adForm.querySelector('#capacity');
const roomsOption = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

function validateCapacity () {
  return roomsOption[adFormRooms.value].includes(adFormCapacity.value);
}

pristine.addValidator(
  adFormRooms,
  validateCapacity,
  'Выберите жилье попросторнее');

pristine.addValidator(
  adFormCapacity,
  validateCapacity,
  'Вы вряд ли сюда влезете');

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

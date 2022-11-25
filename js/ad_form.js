import { sendData } from './server.js';
import { formSendError, formSendSuccess } from './util.js';

const ROOMS_ERROR = 'Выберите жилье попросторнее';
const TITLE_ERROR = 'Введите от 30 до 100 символов';
const PRICE_ERROR = 'Цена не должна превышать 100000!';
const CAPACITY_ERROR = 'Вы вряд ли сюда влезете';

const adForm = document.querySelector('.ad-form');
const adFormTitle = adForm.querySelector('#title');
const adFormPrice = adForm.querySelector('#price');
const MAX_PRICE = 100000;
const adFormRooms = adForm.querySelector('#room_number');
const adFormCapacity = adForm.querySelector('#capacity');
const adFormType = adForm.querySelector('#type');
const sliderElement = document.querySelector('.ad-form__slider');
const adFormTimeIn = adForm.querySelector('#timein');
const adFormTimeOut = adForm.querySelector('#timeout');
const filtersForm = document.querySelector('.map__filters');
const buttonSubmit = adForm.querySelector('.ad-form__submit');

const typeOption = {
  'bungalow': '0',
  'flat': '1000',
  'hotel': '3000',
  'house': '5000',
  'palace': '10000',
};

const roomsOption = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'text-help',
});

// Validate title

function validateTitle(value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator(
  adFormTitle,
  validateTitle,
  TITLE_ERROR);

function validatePrice() {
  return adFormPrice.value <= MAX_PRICE;
}

pristine.addValidator(
  adFormPrice,
  validatePrice,
  PRICE_ERROR);

// Validate room and capacity

function validateCapacity() {
  return roomsOption[adFormRooms.value].includes(adFormCapacity.value);
}

pristine.addValidator(
  adFormRooms,
  validateCapacity,
  ROOMS_ERROR);

pristine.addValidator(
  adFormCapacity,
  validateCapacity,
  CAPACITY_ERROR);

// Validate Type and Price

function onTypeChange() {
  adFormPrice.placeholder = typeOption[adFormType.value];
}

adFormType.addEventListener('change', onTypeChange);

function validateType() {
  return adFormPrice.value >= typeOption[adFormType.value];
}

function validateTypeDescription() {
  return `Сумма должна быть выше ${typeOption[adFormType.value]}`;
}

pristine.addValidator(
  adFormPrice,
  validateType,
  validateTypeDescription
);

// No UI Price slider

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 1000,
  step: 10,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  adFormPrice.value = sliderElement.noUiSlider.get();
  pristine.validate(adFormPrice);
});

// Validate checkin and checkout

const onTimeChange = (time, timeChange) => {
  time.value = timeChange.value;
};

function validateTimeIn() {
  adFormTimeOut.addEventListener(
    'change',
    onTimeChange(adFormTimeOut, adFormTimeIn));

  return adFormTimeOut.value === adFormTimeIn.value;
}

function validateTimeOut() {
  adFormTimeIn.addEventListener(
    'change',
    onTimeChange(adFormTimeIn, adFormTimeOut
    ));

  return adFormTimeIn.value === adFormTimeOut.value;
}

pristine.addValidator(
  adFormTimeIn,
  validateTimeIn
);

pristine.addValidator(
  adFormTimeOut,
  validateTimeOut
);

// Block submit button
const blockSubmitButton = () => {
  buttonSubmit.setAttribute('disabled', true);
  buttonSubmit.textContent = 'Публикуется...';
};

// Unblock submit button
const unblockSubmitButton = () => {
  buttonSubmit.removeAttribute('disabled');
  buttonSubmit.textContent = 'Опубликовать';
};

const setUserFormSubmit = (onSuccess, onFail) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      const formData = new FormData(adForm);
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          onFail();
          unblockSubmitButton();
        },
        formData);
    }
  });
};

setUserFormSubmit(formSendSuccess, formSendError);

export { adForm, sliderElement, pristine, filtersForm };

const adForm = document.querySelector('.ad-form');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'text-help',
});

// Validate title

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

// Validate room and capacity

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

// module8-task2 beginning

// Validate Type and Price

const adFormType = adForm.querySelector('#type');
const typeOption = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

function validateType () {
  adFormPrice.placeholder = typeOption[adFormType.value];
  return adFormPrice.value >= typeOption[adFormType.value];
}

function validateTypeDescription () {
  return `Сумма должна быть выше ${typeOption[adFormType.value]}`;
}

pristine.addValidator(
  adFormPrice,
  validateType,
  validateTypeDescription
);

// Validate checkin and checkout

const adFormTimeIn = adForm.querySelector('#timein');
const adFormTimeOut = adForm.querySelector('#timeout');

const onTimeChange = (time, timeChange) => {
  time.value = timeChange.value;
};

function validateTimeIn () {
  adFormTimeOut.addEventListener(
    'change',
    onTimeChange(adFormTimeOut, adFormTimeIn));

  return adFormTimeOut.value === adFormTimeIn.value;
}

function validateTimeOut () {
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

// module8-task2 ending

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

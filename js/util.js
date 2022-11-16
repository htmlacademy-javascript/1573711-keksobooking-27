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

const getRandomArray = (features) => {
  const maxLengthArray = features.length;
  const lengthOfArray = getRandomNumber(1, maxLengthArray);
  const randomArray = [];

  while (randomArray.length < lengthOfArray) {
    const indexOfElement = getRandomNumber(0, maxLengthArray - 1);
    const element = features[indexOfElement];

    if (!randomArray.includes(element)) {
      randomArray.push(element);
    }
  }
  return randomArray;
};

const makeCounter = () => {
  let count = 0;

  return () => {
    count++;

    return count;
  };
};

const onError = (message) => {
  const errorContainer = document.createElement('div');
  errorContainer.style.zIndex = '100';
  errorContainer.style.position = 'absolute';
  errorContainer.style.left = '0';
  errorContainer.style.top = '0';
  errorContainer.style.right = '0';
  errorContainer.style.padding = '10px 3px';
  errorContainer.style.fontSize = '30px';
  errorContainer.style.textAlign = 'center';
  errorContainer.style.backgroundColor = 'red';
  errorContainer.style.color = 'white';

  errorContainer.textContent = message;

  document.body.append(errorContainer);

  setTimeout(() => {
    errorContainer.remove();
  }, 5000);
};

// Успешная отправка формы

const isEscapeKey = (evt) => evt.key === 'Escape';

const formSendSuccess = () => {
  const pageBody = document.querySelector('body');
  const successContent = document.querySelector('#success').content;
  const successElement = successContent.querySelector('.success');
  const newSuccessElement = pageBody.appendChild(successElement);

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      newSuccessElement.remove();
    }
  });

  document.addEventListener('click', () => {
    newSuccessElement.remove();
  });
};

// Неуспешная отправка формы

const onErrorButtonClick = (element) => {
  element.remove();
};

const formSendError = () => {
  const pageBody = document.querySelector('body');
  const errorContent = document.querySelector('#error').content;
  const errorElement = errorContent.querySelector('.error');
  const errorButton = errorContent.querySelector('.error__button');

  const newErrorElement = pageBody.appendChild(errorElement);

  errorButton.addEventListener('click', onErrorButtonClick(newErrorElement));

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      newErrorElement.remove();
    }
  });

  document.addEventListener('click', () => {
    newErrorElement.remove();
  });
  // document.addEventListener('keydown', onEscapeKeydown(newErrorElement));
};

export { getRandomNumber, getRandomArbitrary, makeCounter, getRandomArray, onError, formSendError, formSendSuccess };

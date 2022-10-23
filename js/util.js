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

const makeCounter = () => {
  let count = 0;

  return () => {
    count++;

    return count;
  };
};

export {getRandomNumber, getRandomArbitrary, makeCounter};

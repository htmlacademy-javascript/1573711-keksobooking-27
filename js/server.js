import { getRandomArray } from './util.js';

const GET_URL = 'https://27.javascript.pages.academy/keksobooking/data';
const SEND_URL = 'https://27.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onFail) => fetch(GET_URL)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((adds) => {
    getRandomArray(adds)
      .slice(0, 10)
      .forEach((offer) => {
        onSuccess(offer);
      });
  })
  .catch(() => {
    onFail('Произошла ошибка при загрузке. Попробуйте снова.');
  });

const sendData = (onSuccess, onFail, body) =>
  fetch(SEND_URL,
    {
      method: 'POST',
      credentials: 'same-origin',
      body,
    }
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      }
      else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });

export { getData, sendData };

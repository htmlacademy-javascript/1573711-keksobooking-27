import { sortAddsArray } from './sort.js';
import { createMarker } from './map.js';
import { onError } from './util.js';

const GET_URL = 'https://27.javascript.pages.academy/keksobooking/data';
const SEND_URL = 'https://27.javascript.pages.academy/keksobooking';

const getData = (onFail) => fetch(GET_URL)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((adds) => {
    adds.slice(0,10).forEach((ad) => createMarker(ad));
    sortAddsArray(adds);
  })
  .catch(() => {
    onFail('Произошла ошибка при загрузке. Попробуйте снова.');
  });

getData(onError);

const sendData = (onSuccess, onFail, body) =>
  fetch(SEND_URL,
    {
      method: 'POST',
      credentials: 'same-origin',
      body: body,
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      onSuccess();
    })
    .catch(() => onFail());

export { sendData, getData };

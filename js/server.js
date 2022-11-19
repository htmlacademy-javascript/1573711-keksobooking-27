// import {sortAddsArray, compareAdds} from './sort.js';

const GET_URL = 'https://27.javascript.pages.academy/keksobooking/data';
const SEND_URL = 'https://27.javascript.pages.academy/keksobooking';

const getData = (onFail) => fetch(GET_URL)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .then((adds) => {
    console.log(adds);
    // console.log(adds.sort(compareAdds));
  })
  .catch(() => {
    onFail('Произошла ошибка при загрузке. Попробуйте снова.');
  });

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

export { getData, sendData };

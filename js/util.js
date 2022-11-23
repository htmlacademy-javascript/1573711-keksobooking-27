const pageBody = document.querySelector('body');
const errorContent = document.querySelector('#error').content;
const errorElement = errorContent.querySelector('.error');

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

// нахожу шаблон успеха
const successContent = document.querySelector('#success').content;
const successElement = successContent.querySelector('.success');

// нахожу шаблон ошибки

const formSendSuccess = () => {
  const newSuccessElement = successElement.cloneNode(true);

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      newSuccessElement.remove();
    }
  });
  document.addEventListener('click', () => {
    newSuccessElement.remove();
  });

  pageBody.appendChild(newSuccessElement);
};

// Неуспешная отправка формы

const formSendError = () => {
  const newErrorElement = errorElement.cloneNode(true);

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      newErrorElement.remove();
    }
  });

  document.addEventListener('click', () => {
    newErrorElement.remove();
  });

  pageBody.appendChild(newErrorElement);
};

export { onError, formSendError, formSendSuccess };

const pageBody = document.querySelector('body');
const successContent = document.querySelector('#success').content;
const successElement = successContent.querySelector('.success');
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

// Успешная/неуспешная отправка формы

const isEscapeKey = (evt) => evt.key === 'Escape';

const showMessage = (element) => {
  pageBody.appendChild(element);

  const onModalClose = (evt) => {
    if(evt.type === 'click' || isEscapeKey(evt)) {
      evt.preventDefault();
      element.remove();
      document.removeEventListener('click', onModalClose);
      document.removeEventListener('keydown', onModalClose);
    }
  };

  document.addEventListener('keydown', onModalClose);
  document.addEventListener('click', onModalClose);
};

const formSendSuccess = () => {
  const newSuccessElement = successElement.cloneNode(true);
  showMessage(newSuccessElement);
};

const formSendError = () => {
  const newErrorElement = errorElement.cloneNode(true);
  showMessage(newErrorElement);
};

export { onError, formSendError, formSendSuccess };

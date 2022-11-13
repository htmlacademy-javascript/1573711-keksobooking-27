const adFormElements = document.querySelectorAll('.ad-form__element');

const makeDisabled = () => {
  adFormElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

const makeActive = () => {
  adFormElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

makeDisabled();

export {makeActive};

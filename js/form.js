const adFormElements = document.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelectorAll('.map__filter');

const makeDisabled = () => {
  adFormElements.forEach((element) => {
    element.setAttribute('disabled', true);
  });
  mapFilters.forEach ((element) => {
    element.setAttribute('disabled', true);
  });
};

const makeActive = () => {
  adFormElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
  mapFilters.forEach ((element) => {
    element.removeAttribute('disabled', true);
  });
};

makeDisabled();

export {makeActive};

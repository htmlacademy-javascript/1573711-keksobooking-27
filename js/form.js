const adFormElements = document.querySelector('.ad-form');
const adFormElement = document.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const mapFilter = document.querySelectorAll('.map__filter');
const mapFeatures = document.querySelector('.map__features');

const makeDisabled = () => {
  adFormElements.classList.add('ad-form--disabled');
  adFormElement.forEach((element) => {
    element.setAttribute('disabled', true);
  });
  mapFilters.classList.add('map__filters--disabled');
  mapFilter.forEach ((element) => {
    element.setAttribute('disabled', true);
  });
  mapFeatures.setAttribute('disabled', true);
};

const makeActive = () => {
  adFormElements.classList.remove('ad-form--disabled');
  adFormElement.forEach((element) => {
    element.removeAttribute('disabled');
  });
  mapFilters.classList.remove('map__filters--disabled');
  mapFilter.forEach ((element) => {
    element.removeAttribute('disabled', true);
  });
  mapFeatures.removeAttribute('disabled');
};

makeDisabled();

export {makeActive};

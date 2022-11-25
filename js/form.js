const adFormElements = document.querySelector('.ad-form');
const adFormElement = document.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const mapFilter = document.querySelectorAll('.map__filter');
const mapFeatures = document.querySelector('.map__features');

const disableForm = () => {
  adFormElements.classList.add('ad-form--disabled');
  adFormElement.forEach((element) => {
    element.setAttribute('disabled', true);
  });
};

const disableFilterForm = () => {
  mapFilters.classList.add('map__filters--disabled');
  mapFilter.forEach((element) => {
    element.setAttribute('disabled', true);
  });
  mapFeatures.setAttribute('disabled', true);
};


const enableForm = () => {
  adFormElements.classList.remove('ad-form--disabled');
  adFormElement.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

const enableFilterForm = () => {
  mapFilters.classList.remove('map__filters--disabled');
  mapFilter.forEach ((element) => {
    element.removeAttribute('disabled', true);
  });
  mapFeatures.removeAttribute('disabled');
};

disableForm();
disableFilterForm();

export {enableForm, enableFilterForm};

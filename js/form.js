const adFormElements = document.querySelector('.ad-form');
const adFormElement = document.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const mapFilter = document.querySelectorAll('.map__filter');
const mapFeatures = document.querySelector('.map__features');

const setFormState = (active) => {
  adFormElements.classList.toggle('ad-form--disabled', !active);

  adFormElement.forEach((formElement) => {
    formElement.disabled = !active;
  });

  mapFilters.classList.toggle('map__filters--disabled', !active);

  mapFilter.forEach((mapFormFilter) => {
    mapFormFilter.disabled = !active;
  });

  mapFeatures.disabled = !active;
};

setFormState(false);

export { setFormState };

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const avatar = document.querySelector('#avatar');
const avatarImage = document.querySelector('.ad-form-header__preview-image');
const image = document.querySelector('#images');
const photoElement = document.querySelector('.ad-form__photo-preview');

// показывает превью аватарки

avatar.addEventListener('change', () => {
  const file = avatar.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarImage.src = URL.createObjectURL(file);
  }
});

// показывает превью фото для объявления

image.addEventListener('change', () => {
  const file = image.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    photoElement.src = URL.createObjectURL(file);
  }
});

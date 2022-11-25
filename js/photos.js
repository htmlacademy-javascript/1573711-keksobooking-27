const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const avatar = document.querySelector('#avatar');
const avatarImage = document.querySelector('.ad-form-header__preview-image');
const image = document.querySelector('#images');
const photoElement = document.querySelector('.ad-form__photo-preview');

// показывает превью аватарки

const onAvatarChange = () => {
  const file = avatar.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarImage.src = URL.createObjectURL(file);
  }
};

avatar.addEventListener('change', onAvatarChange);

// показывает превью фото для объявления

const onImageChange = () => {
  const file = image.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    photoElement.src = URL.createObjectURL(file);
  }
};

image.addEventListener('change', onImageChange);

export { avatarImage, photoElement, DEFAULT_AVATAR };

import {sendData} from './api.js';
import {appendNotification} from './notifications-form.js';
import {onUploadCloseClick} from './photo-upload-form.js';
import {pristine, textCommentsElement, textHashtagsElement} from './validaty-hashtags.js';

const imgUploadElement = document.querySelector('.img-upload');
const imgUploadFormElement = imgUploadElement.querySelector('.img-upload__form');
const submitButtonElement = imgUploadFormElement.querySelector('.img-upload__submit');
const bodyElement = document.querySelector('body');
const templateSuccess = bodyElement.querySelector('#success').content;
const templateError = bodyElement.querySelector('#error').content;

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Сохраняю...'
};

const blockSubmitButton = () => {
  submitButtonElement.toggleAttribute('disabled');
  submitButtonElement.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButtonElement.toggleAttribute('disabled');
  submitButtonElement.textContent = SubmitButtonText.IDLE;
};

const sendFormData = async (formElement) => {

  if (pristine.validate()) {
    blockSubmitButton();
    textHashtagsElement.value = textHashtagsElement.value.trim().replaceAll(/\s+/g, ' ');
    textCommentsElement.value = textCommentsElement.value.trim().replaceAll(/\s+/g, ' ');
    try {
      await sendData(new FormData(formElement));
      appendNotification(templateSuccess, () => onUploadCloseClick());
    } catch {
      appendNotification(templateError);
    } finally {
      unblockSubmitButton();
    }
  }
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendFormData(evt.target);
};

const initSendForm = () => {
  imgUploadFormElement.addEventListener('submit', onFormSubmit);
};

export{initSendForm};

export { enableValidation, clearValidation, enableSt };
const enableSt = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(enableSt.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(enableSt.errorClass);
};
const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(enableSt.inputErrorClass);
  errorElement.classList.remove(enableSt.errorClass);
  errorElement.textContent = "";
};
const checkValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideError(formElement, inputElement);
  }
};
const enableValidation = (enableSt) => {
  const formList = document.querySelectorAll(enableSt.formSelector);
  formList.forEach((formElement) => {
    formElement.setEventListeners("submit", function (evt) {
      evt.preventDefault();
    });
    setListener(formElement, enableSt);
  });
};
const clearValidation = (formElement, enableSt) => {
  const inputList = Array.from(
    formElement.querySelectorAll(enableSt.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    enableSt.submitButtonSelector
  );
  inputList.forEach((inputElement) => {
    inputElement.value = "";
    hideError(formElement, inputElement);
  });
  buttonElement.classList.add(enableSt.inactiveButtonClass);
};
const setListener = (formElement, enableSt) => {
  const inputList = Array.from(
    formElement.querySelectorAll(enableSt.inputSelector),
  );
  const buttonElement = formElement.querySelector(
    enableSt.submitButtonSelector,
  );
  toggleButton(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkValidity(formElement, inputElement, enableSt);
      toggleButton(inputList, buttonElement);
    });
  });
};
function toggleButton(inputList, buttonElement) {
  if (hasInvalid(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(enableSt.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(enableSt.inactiveButtonClass);
  }
}
function hasInvalid(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
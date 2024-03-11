export const validationSt = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
export const enableValidation = (validationSt) => {
  const formList = Array.from(
    document.querySelectorAll(validationSt.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setListener(formElement, validationSt);
  });
};
export const clearValidation = (formElement, validationSt) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationSt.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationSt.submitButtonSelector
  );
  inputList.forEach((inputElement, validationSt) => {
    hideInputError(formElement, inputElement, validationSt);
    inputElement.value = "";
  });
  disabledButton(buttonElement, validationSt);
};
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  validationSt
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationSt.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSt.errorClass);
};
const hideInputError = (formElement, inputElement, validationSt) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationSt.inputErrorClass);
  errorElement.classList.remove(validationSt.errorClass);
  errorElement.textContent = "";
};
const isValid = (formElement, inputElement, validationSt) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationSt
    );
  } else {
    hideInputError(formElement, inputElement, validationSt);
  }
};
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
const disabledButton = (buttonElement, validationSt) => {
  buttonElement.classList.add(validationSt.inactiveButtonClass);
  buttonElement.disabled = true;
};
const toggleButton = (inputList, buttonElement, validationSt) => {
  if (hasInvalidInput(inputList)) {
    disabledButton(buttonElement, validationSt);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationSt.inactiveButtonClass);
  }
};
const setListener = (formElement, validationSt) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationSt.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationSt.submitButtonSelector
  );
  toggleButton(inputList, buttonElement, validationSt);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, validationSt);
      toggleButton(inputList, buttonElement, validationSt);
    });
  });
};

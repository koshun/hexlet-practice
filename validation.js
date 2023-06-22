const inputMap = {
  login,
  email,
  password,
};

function removeErrors(classPrefix) {
  const parent = inputMap[classPrefix].parentNode;
  parent.querySelectorAll(`.${classPrefix}-error-label`).forEach((el) => el.remove());
  inputMap[classPrefix].classList.remove('error-border');
}

function createErrors(err) {
  const parent = inputMap[err.field].parentNode;
  const errorLabel = document.createElement('label');
  errorLabel.classList.add(`${err.field}-error-label`);
  errorLabel.textContent = err.message;
  parent.append(errorLabel);
  inputMap[err.field].classList.add('error-border');
}

const validate = async (schema, object) => {
  try {
    await schema.validate(object, { abortEarly: false });
  } catch ({ errors }) {
    errors.forEach((err) => createErrors(err));
  }
};

export {
  inputMap,
  removeErrors,
  createErrors,
  validate,
};

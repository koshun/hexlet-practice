function removeErrors(input) {
  const parent = input.parentNode;
  parent.querySelectorAll(`.${input.id}-error-label`).forEach((el) => el.remove());
  input.classList.remove('error-border');
}

function createErrors(err, input) {
  const parent = input.parentNode;
  const errorLabel = document.createElement('label');
  errorLabel.classList.add(`${err.field}-error-label`);
  errorLabel.textContent = err.message;
  parent.append(errorLabel);
  input.classList.add('error-border');
}

const validate = async (schema, input) => {
  removeErrors(input);
  try {
    await schema.validate(input.value, { abortEarly: false });
  } catch ({ errors }) {
    errors.forEach((err) => createErrors(err, input));
  }
};

export {
  removeErrors,
  createErrors,
  validate,
};

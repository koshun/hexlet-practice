import password from './generator.js';

export default (parameter, checkboxes) => {
  const params = parameter;
  checkboxes.forEach((node) => {
    const classes = node.classList;
    if (classes.contains('checkbox-group__include-numbers-input')) {
      params.useDigits = node.checked;
    }
    if (classes.contains('checkbox-group__include-symbols-input')) {
      params.useSymbols = node.checked;
    }
    if (classes.contains('checkbox-group__include-chars-input-upper')) {
      params.useUpperCase = node.checked;
    }
    if (classes.contains('checkbox-group__include-chars-input-lower')) {
      params.useLowerCase = node.checked;
    }
  });
  const pwd = password(params);
  return pwd.password;
};

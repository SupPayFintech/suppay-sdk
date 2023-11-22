export interface BackendError {
  [key: string]: string[];
}

export interface FormikError {
  [key: string]: string | FormikError | FormikError[];
}

const setNestedObjectValue = (obj: any, path: string, value: any) => {
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = isNaN(+keys[i + 1]) ? {} : [];
    }
    current = current[key];
  }
  current[keys[keys.length - 1]] = value;
};

export const transformErrors = (errors: BackendError): FormikError => {
  const transformedErrors: FormikError = {};

  Object.entries(errors).forEach(([path, messages]) => {
    const message =
      Array.isArray(messages) && messages.length > 0 ? messages[0] : '';
    setNestedObjectValue(transformedErrors, path, message);
  });

  return transformedErrors;
};

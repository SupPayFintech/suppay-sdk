import { BackendError, FormikError, transformErrors } from './error';

interface AxiosError {
  response?: {
    data: {
      message: string;
      errors?: BackendError;
      [key: string]: any;
    };
    [key: string]: any;
  };
  [key: string]: any;
}

export const handleAxiosError = (axiosError: AxiosError): FormikError => {
  let formikError: FormikError = {};

  if (axiosError.response && axiosError.response.data) {
    const responseData = axiosError.response.data;

    if (responseData.errors && typeof responseData.errors === 'object') {
      formikError = transformErrors(responseData.errors);
    } else if (responseData.message) {
      formikError.general = responseData.message;
    }
  }

  if (Object.keys(formikError).length === 0) {
    formikError.general = 'Ocorreu um erro. Por favor, tente novamente.';
  }

  return formikError;
};

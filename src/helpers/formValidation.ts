import { PASSWORD_PATTERN } from "../constants/formValidation";

export const checkPasswordValidity = (password: string, setError: any) => {
  setError(!password.match(PASSWORD_PATTERN));
};
export const setFormValidity = (event: any, setError: any) => {
  const form = event?.currentTarget?.form;
  console.log(!form?.checkValidity());
  setError(!form?.checkValidity());
};

const formValidationUtils = {
  checkPasswordValidity,
  setFormValidity,
};
export default formValidationUtils;

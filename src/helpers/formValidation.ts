import { PASSWORD_PATTERN } from "../constants/formValidation";

export const checkPasswordValidity = (password: string, setError: any) => {
  setError(!password.match(PASSWORD_PATTERN));
};
export const setFormValidity = (event: any, setError: any) => {
  const form = event?.currentTarget?.form;
  setError(!form?.checkValidity());
};
export default {
  checkPasswordValidity,
  setFormValidity,
};

import { EMAIL_PATTERN, PASSWORD_PATTERN } from "../constants/formValidation";

export const checkPasswordValidity = (password: String, setError: any) => {
  setError(!password.match(PASSWORD_PATTERN));
};
export const checkEmailValidity = (email: String, setError: any) => {
  setError(!email.match(EMAIL_PATTERN));
};

const formValidationUtils = {
  checkPasswordValidity,
  checkEmailValidity,
};
export default formValidationUtils;

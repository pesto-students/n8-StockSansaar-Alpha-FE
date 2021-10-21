export const PASSWORD_PATTERN =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/g;
export const PASSWORD_PATTERN_NOT_MATCH_TEXT = `Password must contain at least one upper case English letter, one lower case, 
one digit, one special character, eight characters.`;
export const PASSWORDS_DONT_MATCH = `Password and Confirm Password Does not match`;

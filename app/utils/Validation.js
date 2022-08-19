//email verification
import strings from './Localization';

export function emailVerification(email) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const isValid = email.trim().toLowerCase().match(emailRegex);
  if (email == '' || isValid == null) return strings.emailAddrErr;
  return '';
}
//password verification
export function passwordVerification(password, confirmPassword = '') {
  const arrayError = [];
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  console.log(password);
  console.log(password.toLowerCase().match(passwordRegex));
  password.trim() == '' || password.match(passwordRegex) == null
    ? arrayError.push(strings.passwordErr)
    : arrayError.push('');

  confirmPassword.trim() == ''
    ? arrayError.push(strings.confirmPassErr)
    : arrayError.push('');

  password.trim() != confirmPassword.trim()
    ? arrayError.push(strings.equalPassErr)
    : arrayError.push('');
  console.log(arrayError + ' isFieldValidEror');

  return arrayError;
}
//userName validation
export function isFeildValid(
  firstName,
  lastName = '',
  companyName = '',
  companyPhone = '',
) {
  const arrayError = [];
  const numberRegex = /^[0-9]{10}$/g;
  firstName.trim() == ''
    ? arrayError.push(`${strings.emptyFldErr}${strings.Fullname}`)
    : arrayError.push('');
  lastName.trim() == ''
    ? arrayError.push('Please fill the lastname')
    : arrayError.push('');
  companyName.trim() == ''
    ? arrayError.push("Company name can't be empty")
    : arrayError.push('');
  companyPhone.trim() == '' ||
  companyPhone.trim().length < 10 ||
  companyPhone.match(numberRegex) == null
    ? arrayError.push('Invalid phone number')
    : arrayError.push('');
  console.log(arrayError + ' isFieldValidEror');
  return arrayError;
}

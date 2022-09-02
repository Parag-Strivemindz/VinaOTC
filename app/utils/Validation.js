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
  console.log(password.length >= 8);
  password.trim() == '' || password.length < 8
    ? arrayError.push(strings.passwordErr)
    : arrayError.push('');

  confirmPassword.trim() == ''
    ? arrayError.push(strings.confirmPassErr)
    : arrayError.push('');

  password.trim() != confirmPassword.trim()
    ? arrayError.push(strings.equalPassErr)
    : arrayError.push('');
  console.log(arrayError + ' isFieldValidEror');

  /*****************
   * need modification find just 8 charactor long regex
   * ***************************/
  // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  // console.log(password);
  // console.log(password.toLowerCase().match(passwordRegex));
  // password.trim() == '' || password.match(passwordRegex) == null
  //   ? arrayError.push(strings.passwordErr)
  //   : arrayError.push('');

  // confirmPassword.trim() == ''
  //   ? arrayError.push(strings.confirmPassErr)
  //   : arrayError.push('');

  // password.trim() != confirmPassword.trim()
  //   ? arrayError.push(strings.equalPassErr)
  //   : arrayError.push('');
  // console.log(arrayError + ' isFieldValidEror');

  return arrayError;
}

export const NumberVerification = (
  accountNumber = '',
  branchCode = '',
  IFSCcode = '',
) => {
  const arrayError = [];
  const numberRegex_ACnumber = /^[0-15]{10}$/g;
  const numberRegex = /^[0-4]{10}$/g;

  accountNumber.trim() == ''
    ? arrayError.push('Invalid Account Number')
    : arrayError.push('');

  branchCode.trim() == ''
    ? arrayError.push('Invalid Branch Code')
    : arrayError.push('');

  IFSCcode.trim() == ''
    ? arrayError.push(`${strings.emptyFldErr} IFSC code`)
    : arrayError.push('');

  return arrayError;
};

//userName validation
export function isFeildValid(value_1 = '', value_2 = '', value_3 = '') {
  const arrayError = [];
  value_1.trim() == ''
    ? arrayError.push(`${strings.emptyFldErr} Field`)
    : arrayError.push('');
  value_2.trim() == ''
    ? arrayError.push(`${strings.emptyFldErr} Field`)
    : arrayError.push('');
  value_3.trim() == ''
    ? arrayError.push(`${strings.emptyFldErr} Field`)
    : arrayError.push('');
  console.log(arrayError + ' isFieldValidEror');
  return arrayError;
}

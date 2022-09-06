//email verification
import {i18n} from '../i18n/lang';
export function emailVerification(email, language) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const isValid = email.trim().toLowerCase().match(emailRegex);
  if (email == '' || isValid == null) return i18n[language.code].emailAddrErr;
  return '';
}
//password verification
export function passwordVerification(password, confirmPassword = '', language) {
  const arrayError = [];
  console.log(password.length >= 8);
  password.trim() == '' || password.length < 8
    ? arrayError.push(i18n[language.code].passwordErr)
    : arrayError.push('');

  confirmPassword.trim() == ''
    ? arrayError.push(i18n[language.code].confirmPassErr)
    : arrayError.push('');

  password.trim() != confirmPassword.trim()
    ? arrayError.push(i18n[language.code].equalPassErr)
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
  language,
) => {
  const arrayError = [];
  const numberRegex_ACnumber = /^[0-15]{10}$/g;
  const numberRegex = /^[0-4]{10}$/g;

  accountNumber.trim() == ''
    ? arrayError.push(
        `${i18n[language.code].invalid} ${i18n[language.code].accounNumber}`,
      )
    : arrayError.push('');

  branchCode.trim() == ''
    ? arrayError.push(
        `${i18n[language.code].invalid} ${i18n[language.code].branchCode}`,
      )
    : arrayError.push('');

  IFSCcode.trim() == ''
    ? arrayError.push(
        `${i18n[language.code].invalid} ${i18n[language.code].ifsccode}`,
      )
    : arrayError.push('');

  return arrayError;
};

//userName validation
export function isFeildValid(
  value_1 = '',
  value_2 = '',
  value_3 = '',
  language,
) {
  const arrayError = [];
  value_1.trim() == ''
    ? arrayError.push(
        `${i18n[language.code].emptyFldErr} ${i18n[language.code].field}`,
      )
    : arrayError.push('');
  value_2.trim() == ''
    ? arrayError.push(
        `${i18n[language.code].emptyFldErr}  ${i18n[language.code].field}`,
      )
    : arrayError.push('');
  value_3.trim() == ''
    ? arrayError.push(
        `${i18n[language.code].emptyFldErr}  ${i18n[language.code].field}`,
      )
    : arrayError.push('');
  console.log(arrayError + ' isFieldValidEror');
  return arrayError;
}

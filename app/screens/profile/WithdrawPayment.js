import {View, Text, LayoutAnimation} from 'react-native';
import React, {useCallback, useState} from 'react';

import {isFeildValid, NumberVerification} from '../../utils/Validation';
import Container from '../../component/Container';
import CardViewDivider from '../../component/CardViewDivider';
import styles from './styles';
import FieldInput from '../auth/common/FieldInput';
import ActionButton from '../../component/ActionButton';
import CommonHeader from '../../component/CommonHeader';

import {
  GREEN_LIGHT,
  MONTSERRAT_REGULAR,
  ROBOTO_REGULAR,
  WHITE,
  WHITE_50,
} from '../../styles/Fonts&Colors';
import GlobalStyles, {
  PADDING_HORIZONTAL,
  PADDING_VERTICAL,
} from '../../styles/GlobalStyles';
import {HP, WP} from '../../styles/Dimesions';

const WithdrawPayment = () => {
  const [getter, setter] = useState({
    ammount: '',
    accountNumber: '',
    ifscCode: '',
    accountHolder: '',
    bankName: '',
    branchCode: '',
    branchAddress: '',
  });

  const [error, setError] = useState({
    ammounError: '',
    accountNumberError: '',
    ifscCodeError: '',
    accountHolderError: '',
    bankNameError: '',
    branchCodeError: '',
    branchAddressError: '',
  });

  const onChangeText = useCallback(
    (text, key) => {
      setter(prev => ({
        ...prev,
        [key]: text,
      }));
    },
    [getter, setter],
  );

  const onWithdrawHandler = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const [acHolder, bankname, branchaddress] = isFeildValid(
      getter.accountHolder,
      getter.bankName,
      getter.branchAddress,
    );

    const [acnumber, ifsccode, branchcode] = NumberVerification(
      getter.accountNumber,
      getter.ifscCode,
      getter.branchCode,
    );

    if (
      acHolder == '' &&
      bankname == '' &&
      branchaddress == '' &&
      acnumber == '' &&
      ifsccode == '' &&
      branchcode == ''
    ) {
      //make api call here
      setError(prev => ({
        ...prev,
        accountNumberError: '',
        ifscCodeError: '',
        accountHolderError: '',
        bankNameError: '',
        branchCodeError: '',
        branchAddressError: '',
      }));
    } else {
      setError(prev => ({
        ...prev,
        accountNumberError: acnumber,
        ifscCodeError: ifsccode,
        accountHolderError: acHolder,
        bankNameError: bankname,
        branchCodeError: branchcode,
        branchAddressError: branchaddress,
      }));
    }
    //check if any field is empty or invalid
  }, [getter, setter, Error, setError]);

  return (
    <View style={{flex: 1}}>
      <CommonHeader title={'Withdraw Form'} />
      <Container>
        <View
          style={{
            ...GlobalStyles.containerStyle,
            paddingHorizontal: PADDING_HORIZONTAL,
            paddingVertical: PADDING_VERTICAL,
            backgroundColor: GREEN_LIGHT,
          }}>
          <Text
            style={{
              fontFamily: ROBOTO_REGULAR,
              color: WHITE,
              fontSize: WP(13),
            }}>
            Please Enter ammout that you wants to Deposit
          </Text>
          <FieldInput
            containerStyle={{
              marginTop: HP(10),
            }}
            errorMessage={error.ammounError}
            value={getter.ammount}
            onChangeText={text => {
              setter(prev => ({
                ...prev,
                ammount: text,
              }));
            }}
            placeholder={'500'}
            style={{
              color: WHITE,
              fontFamily: MONTSERRAT_REGULAR,
            }}
          />
        </View>
        <CardViewDivider
          style={{alignSelf: 'center', width: WP(75), marginVertical: HP(30)}}
        />
        <View
          style={{
            paddingHorizontal: PADDING_HORIZONTAL,
          }}>
          <View
            style={{
              marginBottom: HP(20),
            }}>
            <Text style={styles.fieldPlaceholder}>Account Number</Text>
            <FieldInput
              containerStyle={{marginTop: HP(10)}}
              placeholder={'1254 2145 2548 2578'}
              errorMessage={error.accountNumberError}
              placeholdercolor={WHITE_50}
              style={styles.filedInputTxt}
              value={getter.accountNumber}
              onChangeText={text => onChangeText(text, 'accountNumber')}
            />
          </View>
          <View
            style={{
              marginBottom: HP(20),
            }}>
            <Text style={styles.fieldPlaceholder}>IFSC code</Text>
            <FieldInput
              containerStyle={{marginTop: HP(10)}}
              placeholder={'hdfc15426'}
              errorMessage={error.ifscCodeError}
              placeholdercolor={WHITE_50}
              style={styles.filedInputTxt}
              value={getter.ifscCode}
              onChangeText={text => onChangeText(text, 'ifscCode')}
            />
          </View>
          <View
            style={{
              marginBottom: HP(20),
            }}>
            <Text style={styles.fieldPlaceholder}>Name of account Holder</Text>
            <FieldInput
              containerStyle={{marginTop: HP(10)}}
              placeholder={'lisa harper'}
              errorMessage={error.accountHolderError}
              placeholdercolor={WHITE_50}
              style={styles.filedInputTxt}
              value={getter.accountHolder}
              onChangeText={text => onChangeText(text, 'accountHolder')}
            />
          </View>
          <View
            style={{
              marginBottom: HP(20),
            }}>
            <Text style={styles.fieldPlaceholder}>Bank Name</Text>
            <FieldInput
              containerStyle={{marginTop: HP(10)}}
              placeholder={'HDFC Bank PVT LTD'}
              errorMessage={error.bankNameError}
              placeholdercolor={WHITE_50}
              style={styles.filedInputTxt}
              value={getter.bankName}
              onChangeText={text => onChangeText(text, 'bankName')}
            />
          </View>
          <View
            style={{
              marginBottom: HP(20),
            }}>
            <Text style={styles.fieldPlaceholder}>Branch Code</Text>
            <FieldInput
              containerStyle={{marginTop: HP(10)}}
              placeholder={'1254'}
              errorMessage={error.accountNumberError}
              placeholdercolor={WHITE_50}
              style={styles.filedInputTxt}
              value={getter.branchCode}
              onChangeText={text => onChangeText(text, 'branchCode')}
            />
          </View>
          <View
            style={{
              marginBottom: HP(20),
            }}>
            <Text style={styles.fieldPlaceholder}>Branch Address</Text>
            <FieldInput
              containerStyle={{marginTop: HP(10)}}
              placeholder={'7845'}
              errorMessage={error.accountNumberError}
              placeholdercolor={WHITE_50}
              style={styles.filedInputTxt}
              value={getter.branchAddress}
              onChangeText={text => onChangeText(text, 'branchAddress')}
            />
          </View>
        </View>
        <ActionButton
          callBack={() => onWithdrawHandler()}
          style={{
            width: WP(155),
            marginTop: HP(20),
          }}>
          <Text
            style={{
              fontFamily: ROBOTO_REGULAR,
              color: WHITE,
            }}>
            Withdraw Funds
          </Text>
        </ActionButton>
      </Container>
    </View>
  );
};

export default WithdrawPayment;

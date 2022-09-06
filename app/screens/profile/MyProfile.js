import React, {useCallback, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {useSelector} from 'react-redux';

import {Selector as userSelector} from '../../store/redux/user/index';
import {Selector as walletSelector} from '../../store/redux/dashboard/index';
import {Selector as languageSelector} from '../../store/redux/localization/index';

import Container from '../../component/Container';
import CommonHeader from '../../component/CommonHeader';
import RowContainer from '../../component/RowContainer';
import ActionButton from '../../component/ActionButton';
import CardViewDivider from '../../component/CardViewDivider';
import HifenDivider from '../../component/HifenDivider';
import ProfilePaymentHistory from './PaymentHistory';

import styles from './styles';
import GlobalStyles, {
  CONTAINER_PADDINGTOP,
  PADDING_HORIZONTAL,
} from '../../styles/GlobalStyles';
import {HP, WP} from '../../styles/Dimesions';
import {
  MONTSERRAT_REGULAR,
  ROBOTO_MEDIUM,
  WHITE,
} from '../../styles/Fonts&Colors';
import CountFilter from '../../component/CountFilter';
import {i18n} from '../../i18n/lang';
import {USER_ICON} from '../../constants/IconConstant';
import {CURRENCY} from '../../constants/AppConstant';

const MyProfile = ({navigation}) => {
  const walletDetails = useSelector(walletSelector.WALLET_DETAILS);
  const myProfileDetails = useSelector(userSelector.User_Info);
  const myPaymentHistory = useSelector(userSelector.My_Payment_History);
  const language = useSelector(languageSelector.Localization);

  const [getter, setter] = useState({
    pageNumber: 0,
    numberOfItemOnPage: 10,
  });

  const navigateTo = useCallback(screenName => {
    return (params = {}) => {
      navigation.navigate(screenName, {
        ...params,
      });
    };
  }, []);

  console.log(myProfileDetails.data.data.ProfileImage);

  return (
    <View style={{flex: 1}}>
      <CommonHeader title={i18n[language.code].myProfile} />
      <Container scrollViewContainerStyle={{paddingTop: CONTAINER_PADDINGTOP}}>
        <RowContainer
          style={{
            paddingHorizontal: PADDING_HORIZONTAL,
          }}>
          <RowContainer
            style={{
              alignItems: 'center',
            }}>
            <Image
              source={
                myProfileDetails.data.data.ProfileImage
                  ? {uri: myProfileDetails.data.data.ProfileImage}
                  : USER_ICON
              }
              style={styles.profileImg}
              resizeMode="cover"
            />
            <View>
              <Text style={styles.name}>
                {myProfileDetails.data.data.Firstname}{' '}
                {myProfileDetails.data.data.Lastname}
              </Text>
              <Text style={styles.email}>
                {myProfileDetails.data.data.email}
              </Text>
              <ActionButton
                style={styles.editBtn}
                callBack={() =>
                  navigateTo('EditProfile')({
                    profileImg: myProfileDetails.data.data.ProfileImage,
                    userName: myProfileDetails.data.data.Firstname,
                    email: myProfileDetails.data.data.email,
                  })
                }>
                <Text style={GlobalStyles.actionBtnTxt}>
                  {i18n[language.code].editProfile}
                </Text>
              </ActionButton>
            </View>
          </RowContainer>
        </RowContainer>
        <CardViewDivider
          style={{
            marginVertical: HP(30),
          }}
        />
        {/*
         * my wallet
         */}
        <RowContainer
          style={{alignItems: 'center', paddingHorizontal: PADDING_HORIZONTAL}}>
          <RowContainer>
            <Text
              style={[styles.blockHeaderTxt, {textTransform: 'capitalize'}]}>
              {i18n[language.code].my} {i18n[language.code].wallet}
            </Text>
            <HifenDivider style={styles.hiffenDividerRow} />
          </RowContainer>
        </RowContainer>
        <RowContainer
          style={{
            marginTop: HP(20),
            paddingHorizontal: PADDING_HORIZONTAL,
          }}>
          <RowContainer
            style={{
              alignItems: 'center',
            }}>
            <View style={styles.balanceContainer}>
              <Text style={{color: WHITE, fontFamily: MONTSERRAT_REGULAR}}>
                {i18n[language.code].totalBalance}
              </Text>
              <Text
                style={{
                  color: WHITE,
                  fontFamily: ROBOTO_MEDIUM,
                  fontSize: WP(25),
                  marginTop: HP(8),
                }}>
                {walletDetails.data.data || 0}
                {CURRENCY}
              </Text>
            </View>
            <View>
              <ActionButton
                style={styles.depositeBtn}
                callBack={() =>
                  navigateTo('AddMoney')({
                    walletBalance: walletDetails.data.data,
                  })
                }>
                <Text style={styles.deposite}>
                  {i18n[language.code].deposite}
                </Text>
              </ActionButton>
              <ActionButton
                callBack={() => navigateTo('WithdrawPayment')()}
                style={{
                  ...styles.depositeBtn,
                  marginTop: HP(10),
                }}>
                <Text style={styles.deposite}>
                  {' '}
                  {i18n[language.code].withDraw}
                </Text>
              </ActionButton>
            </View>
          </RowContainer>
        </RowContainer>
        <CardViewDivider style={{marginVertical: HP(30)}} />
        <ProfilePaymentHistory
          numberOfItems={getter.numberOfItemOnPage}
          pageNumber={getter.pageNumber}
        />
      </Container>
      <CountFilter
        numberOfItems={getter.numberOfItemOnPage}
        paymentSetter={setter}
        disableLeftButton={getter.pageNumber == 1 ? true : false}
        disableRightButton={myPaymentHistory.noRecordFound}
      />
    </View>
  );
};

export default MyProfile;

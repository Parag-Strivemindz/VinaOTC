import React, {useCallback, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {useSelector} from 'react-redux';

import {Selector as userSelector} from '../../store/redux/user/index';
import {Selector as walletSelector} from '../../store/redux/dashboard/index';

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

const MyProfile = ({navigation}) => {
  const walletDetails = useSelector(walletSelector.WALLET_DETAILS);
  const myProfileDetails = useSelector(userSelector.User_Info);
  const myPaymentHistory = useSelector(userSelector.My_Payment_History);

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

  return (
    <View style={{flex: 1}}>
      <CommonHeader title={'My Profile'} />
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
              source={{
                uri: myProfileDetails.data.data.ProfileImage,
              }}
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
                <Text style={GlobalStyles.actionBtnTxt}>Edit Profile</Text>
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
            <Text style={[styles.blockHeaderTxt]}>MY WALLET</Text>
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
                Total Balance
              </Text>
              <Text
                style={{
                  color: WHITE,
                  fontFamily: ROBOTO_MEDIUM,
                  fontSize: WP(25),
                }}>
                ${walletDetails.data.data || 0}
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
                <Text style={styles.deposite}>Deposite</Text>
              </ActionButton>
              <ActionButton
                callBack={() => navigateTo('WithdrawPayment')()}
                style={{
                  ...styles.depositeBtn,
                  marginTop: HP(10),
                }}>
                <Text style={styles.deposite}>WithDraw</Text>
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

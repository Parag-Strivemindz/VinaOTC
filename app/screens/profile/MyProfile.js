import React, {useCallback} from 'react';
import {View, Text, Image} from 'react-native';
import Container from '../../component/Container';
import GlobalStyles, {
  CONTAINER_PADDINGTOP,
  PADDING_HORIZONTAL,
} from '../../styles/GlobalStyles';
import CommonHeader from '../../component/CommonHeader';
import RowContainer from '../../component/RowContainer';
import {GIRL_PROFILE} from '../../constants/ImageConstant';
import ActionButton from '../../component/ActionButton';
import {HP, WP} from '../../styles/Dimesions';
import CardViewDivider from '../../component/CardViewDivider';
import {
  MONTSERRAT_MEDIUM,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  WHITE,
} from '../../styles/Fonts&Colors';
import HifenDivider from '../../component/HifenDivider';
import styles from './styles';
import PaymentHistory from '../history';

const MyProfile = ({navigation}) => {
  const navigateTo = useCallback(screenName => {
    navigation.navigate(screenName);
  }, []);

  return (
    <View style={{flex: 1}}>
      <CommonHeader title={'My Profile'} />
      <Container containerStyles={{paddingTop: CONTAINER_PADDINGTOP}}>
        <RowContainer
          style={{
            paddingHorizontal: PADDING_HORIZONTAL,
          }}>
          <RowContainer>
            <Image
              source={{
                uri: 'https://s3-alpha-sig.figma.com/img/4b12/a862/ef41b0b2bc030ef065bcdd82615c7cc3?Expires=1661731200&Signature=DLOJ8lW15t6ydzfjRj82ihg8mPVtW14h7auXwRTcxuFdQ9tWvfU485jb-LP2lMzuJmmVvWmPcX7GXy-RYJVOGiSuB5AGkFcOoredj79j9IQ331CHAmyA4tGzUIQgts~ua3GfKoWh~7ZkegX0qBfdcL1Cfg~GPQSEGlMlP9K64gxbZ3VLXDtZNQoW9qdu3iu8E49MTRyRZD9ohAUcUsItNCLUEvCd6BxUB38Mwi3gJr-5LREhUh2AawzxfzgcEVvQOCruqdOE9PIcY9GHBYKCxFkj4kfwNApm~zeImSLWzKn9LBoKweszvQJKAux9jFB4tFNU~MEA4XEdTHQlppCfTA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
              }}
              defaultSource={GIRL_PROFILE}
              style={{
                width: WP(100),
                height: HP(100),
                borderRadius: 10,
                marginRight: 20,
              }}
              resizeMode="cover"
            />
            <View>
              <Text
                style={{
                  color: WHITE,
                  fontFamily: POPPINS_MEDIUM,
                  fontSize: WP(15),
                }}>
                Lisa Harper
              </Text>
              <Text
                style={{
                  color: 'rgba(255,255,255,1)',
                  fontFamily: POPPINS_REGULAR,
                  fontSize: WP(13),
                  marginVertical: HP(3),
                }}>
                lisa@gmail.com
              </Text>
              <ActionButton
                style={{
                  width: WP(125),
                  height: HP(32),
                  borderRadius: 3,
                }}>
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
        <RowContainer
          style={{alignItems: 'center', paddingHorizontal: PADDING_HORIZONTAL}}>
          <RowContainer>
            <Text style={[styles.blockHeaderTxt]}>MY WALLET</Text>
            <HifenDivider style={styles.hiffenDividerRow} />
          </RowContainer>
          <Text style={styles.seeAllTxt}>See All</Text>
        </RowContainer>
        <RowContainer
          style={{marginTop: HP(20), paddingHorizontal: PADDING_HORIZONTAL}}>
          <RowContainer>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: WP(147),
                height: HP(93),
                borderRadius: 8,
                backgroundColor: 'rgba(1, 196, 0, 0.12)',
                marginRight: 10,
              }}>
              <Text style={{color: WHITE}}>Total Balance</Text>
              <Text style={{color: WHITE}}>32,445$</Text>
            </View>
            <View>
              <ActionButton
                style={{
                  width: WP(85),
                  height: HP(32),
                  borderRadius: 3,
                }}>
                <Text
                  style={{
                    fontFamily: MONTSERRAT_MEDIUM,
                    color: WHITE,
                  }}>
                  Deposite
                </Text>
              </ActionButton>
              <ActionButton
                style={{
                  width: WP(85),
                  height: HP(32),
                  borderRadius: 3,
                  marginTop: HP(10),
                }}>
                <Text
                  style={{
                    fontFamily: MONTSERRAT_MEDIUM,
                    color: WHITE,
                  }}>
                  WithDraw
                </Text>
              </ActionButton>
            </View>
          </RowContainer>
        </RowContainer>
        {/* <PaymentHistory /> */}
      </Container>
    </View>
  );
};

export default MyProfile;

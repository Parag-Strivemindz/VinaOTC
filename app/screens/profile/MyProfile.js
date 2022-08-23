import React, {useCallback, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {SvgXml} from 'react-native-svg';

import Container from '../../component/Container';
import CommonHeader from '../../component/CommonHeader';
import RowContainer from '../../component/RowContainer';
import ActionButton from '../../component/ActionButton';
import CardViewDivider from '../../component/CardViewDivider';
import HifenDivider from '../../component/HifenDivider';
import ProfilePaymentHistory from './PaymentHistory';
import CommonFilterModal from '../../component/CommonFilterModal';

import styles from './styles';
import GlobalStyles, {
  CONTAINER_PADDINGTOP,
  PADDING_HORIZONTAL,
  PADDING_VERTICAL,
} from '../../styles/GlobalStyles';
import {GIRL_PROFILE} from '../../constants/ImageConstant';
import {HP, WP} from '../../styles/Dimesions';
import {
  BLACK_70,
  GREEN_LIGHT,
  MONTSERRAT_REGULAR,
  ROBOTO_MEDIUM,
  WHITE,
} from '../../styles/Fonts&Colors';
import {CIRCLE, ERROR} from '../../constants/IconConstant';

const filerItems = [
  {
    id: '1',
    name: 'All',
  },
  {
    id: '2',
    name: 'Deposit',
  },
  {
    id: '3',
    name: 'Withdraw',
  },
];

const data = [
  {
    id: '1',
    payment_type: 'Deposite',
    value: '-11,300',
    time: 'march 12, 6:30 pm',
  },
  {
    id: '2',
    payment_type: 'Withdrawal',
    value: '+8,000',
    time: 'march 12, 6:30 pm',
  },
  {
    id: '3',
    payment_type: 'Deposite',
    value: '-11,300',
    time: 'march 12, 6:30 pm',
  },
  {
    id: '4',
    payment_type: 'Withdrawal',
    value: '+8,000,',
    time: 'march 12, 6:30 pm',
  },
];
const MyProfile = ({navigation}) => {
  const [getter, setter] = useState({
    isVisible: false,
    filterItem: '',
  });

  const navigateTo = useCallback(screenName => {
    navigation.navigate(screenName);
  }, []);

  const onFilterSelect = value => {
    setter(prev => ({
      ...prev,
      isVisible: !prev.isVisible,
      filterItem: value,
    }));
  };

  const close = useCallback(() => {
    setter(prev => ({
      ...prev,
      isVisible: !prev.isVisible,
    }));
  }, [setter, getter]);

  const PaymentFilter = ({selectedItem, close, callback}) => {
    return (
      <View style={[GlobalStyles.modalContainer]}>
        <RowContainer
          style={{
            paddingHorizontal: PADDING_HORIZONTAL,
            // paddingVertical: HP(15),
          }}>
          <Text
            style={{
              color: BLACK_70,
              fontFamily: ROBOTO_MEDIUM,
            }}>
            Filter by
          </Text>
          <SvgXml
            xml={ERROR}
            onPress={() => close()}
            hitSlop={{
              left: 10,
              right: 10,
              top: 10,
              bottom: 10,
            }}
          />
        </RowContainer>
        {filerItems.map((item, index) => (
          <RowContainer
            callback={() => callback(item.name)}
            key={index.toString()}
            style={{
              ...styles.rowFilteItemContainer,
              backgroundColor: selectedItem === item.name ? GREEN_LIGHT : WHITE,
              // marginTop: HP(15),
            }}>
            <RowContainer style={{alignItems: 'center'}}>
              {selectedItem === item.name ? (
                <SvgXml xml={CIRCLE} />
              ) : (
                <SvgXml xml={CIRCLE} />
              )}
              <Text
                style={{
                  marginLeft: WP(15),
                  color: BLACK_70,
                  fontFamily: ROBOTO_MEDIUM,
                }}>
                {item.name}
              </Text>
            </RowContainer>
          </RowContainer>
        ))}
      </View>
    );
  };

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
                uri: 'https://s3-alpha-sig.figma.com/img/4b12/a862/ef41b0b2bc030ef065bcdd82615c7cc3?Expires=1661731200&Signature=DLOJ8lW15t6ydzfjRj82ihg8mPVtW14h7auXwRTcxuFdQ9tWvfU485jb-LP2lMzuJmmVvWmPcX7GXy-RYJVOGiSuB5AGkFcOoredj79j9IQ331CHAmyA4tGzUIQgts~ua3GfKoWh~7ZkegX0qBfdcL1Cfg~GPQSEGlMlP9K64gxbZ3VLXDtZNQoW9qdu3iu8E49MTRyRZD9ohAUcUsItNCLUEvCd6BxUB38Mwi3gJr-5LREhUh2AawzxfzgcEVvQOCruqdOE9PIcY9GHBYKCxFkj4kfwNApm~zeImSLWzKn9LBoKweszvQJKAux9jFB4tFNU~MEA4XEdTHQlppCfTA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
              }}
              defaultSource={GIRL_PROFILE}
              style={styles.profileImg}
              resizeMode="cover"
            />
            <View>
              <Text style={styles.name}>Lisa Harper</Text>
              <Text style={styles.email}>lisa@gmail.com</Text>
              <ActionButton
                style={styles.editBtn}
                callBack={() => navigateTo('EditProfile')}>
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
                32,445$
              </Text>
            </View>
            <View>
              <ActionButton
                style={styles.depositeBtn}
                callBack={() => navigateTo('AddFund')}>
                <Text style={styles.deposite}>Deposite</Text>
              </ActionButton>
              <ActionButton
                callBack={() => navigateTo('WithdrawPayment')}
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
        <ProfilePaymentHistory callback={close} data={data} />
        <CommonFilterModal getter={getter} close={close}>
          <PaymentFilter
            close={close}
            selectedItem={getter.filterItem}
            callback={onFilterSelect}
          />
        </CommonFilterModal>
      </Container>
    </View>
  );
};

export default MyProfile;

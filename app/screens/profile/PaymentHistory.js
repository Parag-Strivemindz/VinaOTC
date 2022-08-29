import React, {useCallback, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {SvgXml} from 'react-native-svg';

import getMyPaymentHistory from '../../services/user/MyPaymentHistory';
import {Selector} from '../../store/redux/user';
import {useDispatch, useSelector} from 'react-redux';

import CommonFilterModal from '../../component/CommonFilterModal';
import RowContainer from '../../component/RowContainer';
import ActionButton from '../../component/ActionButton';
import CardViewDivider from '../../component/CardViewDivider';
import Loader from '../../component/Loader';

import styles from './styles';
import {FILLTER_EQUALIZER, WALLET} from '../../constants/IconConstant';
import {PADDING_HORIZONTAL} from '../../styles/GlobalStyles';
import {MONTSERRAT_MEDIUM, SECONDARY_COLOR} from '../../styles/Fonts&Colors';
import {HP} from '../../styles/Dimesions';

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

const ProfilePaymentHistory = () => {
  const myPaymentHistory = useSelector(Selector.My_Payment_History);
  const [getter, setter] = useState({
    isVisible: false,
    filterItem: '',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyPaymentHistory());
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

  return (
    <View style={{paddingHorizontal: PADDING_HORIZONTAL}}>
      <RowContainer style={{marginBottom: HP(30)}}>
        <Text style={styles.paymentHistory}>PAYMENT HISTORY</Text>
        <SvgXml
          xml={FILLTER_EQUALIZER}
          width={15}
          height={15}
          onPress={() => {
            callback();
          }}
        />
      </RowContainer>
      {myPaymentHistory.data ? (
        myPaymentHistory.data.data.map(item => {
          return (
            <React.Fragment key={item.wallet_id}>
              <RowContainer>
                <RowContainer>
                  <ActionButton
                    style={{
                      ...styles.walletContainer,
                      backgroundColor:
                        item.type == 'credit' ? '#E94E1B' : SECONDARY_COLOR,
                    }}>
                    <SvgXml xml={WALLET} />
                  </ActionButton>
                  <View
                    style={{
                      justifyContent: 'center',
                    }}>
                    <Text style={styles.payment_type}>Payment {item.type}</Text>
                    <Text style={styles.payment_time}>{item.created_at}</Text>
                  </View>
                </RowContainer>
                <Text
                  style={{
                    // alignSelf: 'flex-start',
                    color:
                      item.type == 'credit'
                        ? 'rgba(233, 78, 27, 1)'
                        : SECONDARY_COLOR,
                  }}>
                  {item.type == 'credit'
                    ? `-${item.amount}`
                    : `+${item.amount}`}
                </Text>
              </RowContainer>
              <CardViewDivider style={{marginVertical: HP(20)}} />
            </React.Fragment>
          );
        })
      ) : myPaymentHistory.isLoading ? (
        <Loader size={'large'} color={SECONDARY_COLOR} />
      ) : (
        <Text
          style={{
            color: 'white',
            fontFamily: MONTSERRAT_MEDIUM,
            fontSize: 12,
          }}>
          Payment is not Available
        </Text>
      )}
      <CommonFilterModal close={close} isVisible={getter.isVisible}>
        <PaymentFilter
          close={close}
          selectedItem={getter.filterItem}
          callback={onFilterSelect}
        />
      </CommonFilterModal>
    </View>
  );
};

export default ProfilePaymentHistory;

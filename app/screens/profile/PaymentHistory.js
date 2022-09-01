import React, {useCallback, useEffect, useState} from 'react';
import {Text, View, InteractionManager, Pressable, Image} from 'react-native';
import {SvgXml} from 'react-native-svg';
import PropTypes from 'prop-types';
import Animated, {SlideInLeft, Layout} from 'react-native-reanimated';

import getMyPaymentHistory from '../../services/user/MyPaymentHistory';
import {Selector} from '../../store/redux/user';
import {useDispatch, useSelector} from 'react-redux';

import CommonFilterModal from '../../component/CommonFilterModal';
import RowContainer from '../../component/RowContainer';
import ActionButton from '../../component/ActionButton';
import CardViewDivider from '../../component/CardViewDivider';
import Loader from '../../component/Loader';

import GlobalStyles from '../../styles/GlobalStyles';
import styles from './styles';
import {
  BUTTON_SELECTED,
  CIRCLE,
  ERROR,
  FILLTER_EQUALIZER,
  WALLET,
} from '../../constants/IconConstant';
import {PADDING_HORIZONTAL} from '../../styles/GlobalStyles';
import {
  BLACK_70,
  GREEN_LIGHT,
  MONTSERRAT_MEDIUM,
  ROBOTO_MEDIUM,
  SECONDARY_COLOR,
  WHITE,
} from '../../styles/Fonts&Colors';
import {HP, WP} from '../../styles/Dimesions';

const filerItems = [
  {
    id: '1',
    name: 'All',
    value: undefined,
  },
  {
    id: '2',
    name: 'Credit',
    value: 'Credit',
  },
  {
    id: '3',
    name: 'Debit',
    value: 'Debit',
  },
];
const selectedItemCircle = () => (
  <Image
    source={BUTTON_SELECTED}
    style={{width: 20, height: 20, tintColor: SECONDARY_COLOR}}
    resizeMode="center"
  />
);

const PaymentFilter = ({selectedItem = 'All', close, callback}) => {
  return (
    <View style={[GlobalStyles.modalContainer]}>
      <RowContainer
        style={{
          paddingHorizontal: PADDING_HORIZONTAL,
        }}>
        <Text
          style={{
            color: BLACK_70,
            fontFamily: ROBOTO_MEDIUM,
            fontSize: WP(18),
            marginBottom: 10,
          }}>
          Filter By
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
          callback={() => callback(item.value)}
          key={index.toString()}
          style={{
            ...styles.rowFilteItemContainer,
            backgroundColor: selectedItem === item.name ? GREEN_LIGHT : WHITE,
            // marginTop: HP(15),
          }}>
          <RowContainer
            style={{alignItems: 'center'}}
            callback={() => callback(item.value)}>
            {selectedItem === item.name ? (
              selectedItemCircle()
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

const ProfilePaymentHistory = ({numberOfItems, pageNumber}) => {
  const myPaymentHistory = useSelector(Selector.My_Payment_History);
  const [getter, setter] = useState({
    isVisible: false,
    filterItem: undefined,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyPaymentHistory(pageNumber, numberOfItems, getter.filterItem));
  }, [numberOfItems, pageNumber, getter.filterItem]);

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
        <Pressable
          onPress={close}
          android_ripple={{
            borderless: true,
            radius: 20,
          }}>
          <SvgXml
            hitSlop={{
              left: 10,
              right: 10,
              top: 10,
              bottom: 10,
            }}
            xml={FILLTER_EQUALIZER}
            width={20}
            height={20}
          />
        </Pressable>
      </RowContainer>
      {myPaymentHistory.data ? (
        myPaymentHistory.data.data.map((item, index) => {
          return (
            <React.Fragment key={item.wallet_id.toString()}>
              <Animated.View
                key={item.wallet_id.toString()}
                entering={SlideInLeft.delay(100)}
                // exiting={SlideOutRight}
                layout={Layout.mass(10).delay(index * 10)}>
                <RowContainer>
                  <RowContainer>
                    <ActionButton
                      style={{
                        ...styles.walletContainer,
                        backgroundColor:
                          item.type == 'credit' ? SECONDARY_COLOR : '#E94E1B',
                      }}>
                      <SvgXml xml={WALLET} />
                    </ActionButton>
                    <View
                      style={{
                        justifyContent: 'center',
                      }}>
                      <Text style={styles.payment_type}>
                        Payment {item.type}
                      </Text>
                      <Text style={styles.payment_time}>
                        {item.created_at.slice(0, item.created_at.indexOf('T'))}
                      </Text>
                    </View>
                  </RowContainer>
                  <Text
                    style={{
                      color:
                        item.type == 'credit'
                          ? SECONDARY_COLOR
                          : 'rgba(233, 78, 27, 1)',
                    }}>
                    {item.type == 'credit'
                      ? `-${item.amount}`
                      : `+${item.amount}`}
                  </Text>
                </RowContainer>
                <CardViewDivider style={{marginVertical: HP(20)}} />
              </Animated.View>
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
          PaymentHistory is not Available
        </Text>
      )}
      {myPaymentHistory.isLoading && (
        <Text
          style={{
            alignSelf: 'center',
            color: 'white',
            fontFamily: MONTSERRAT_MEDIUM,
            fontSize: WP(15),
          }}>
          Loading....
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

ProfilePaymentHistory.propTypes = {
  numberOfItems: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
};

ProfilePaymentHistory.defaultProps = {
  numberOfItems: 10,
  pageNumber: 0,
};

export default ProfilePaymentHistory;

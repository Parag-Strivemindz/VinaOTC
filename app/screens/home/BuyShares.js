import {View, Text, Image} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useSelector} from 'react-redux';

import {useDispatch} from 'react-redux';
import {Selector} from '../../store/redux/dashboard';

import CommonHeader from '../../component/CommonHeader';
import Container from '../../component/Container';
import ActionButton from '../../component/ActionButton';
import CardViewDivider from '../../component/CardViewDivider';
import RowContainer from '../../component/RowContainer';
import FieldInput from '../auth/common/FieldInput';

import {WP, HP} from '../../styles/Dimesions';
import styles from './styles';
import GlobalStyles, {
  CONTAINER_PADDINGTOP,
  PADDING_HORIZONTAL,
} from '../../styles/GlobalStyles';
import {
  GREEN_LIGHT,
  ROBOTO_REGULAR,
  WHITE,
  SECONDARY_COLOR,
  ROBOTO_MEDIUM,
  MONTSERRAT_MEDIUM,
} from '../../styles/Fonts&Colors';
import {ARROWSHARES_SVG, CLOCK} from '../../constants/IconConstant';
import buyStocks from '../../services/stock/BuyStocks';
import {isFeildValid} from '../../utils/Validation';
import Loader from '../../component/Loader';

const data = [
  {
    id: '1',
    name: 'Number of Shares',
    value: '5',
  },
  {
    id: '2',
    name: 'Price per share',
    value: '$500',
  },
  {
    id: '1',
    name: 'Total Price',
    value: '$2500',
  },
];

function NumberShares({title, data}) {
  return (
    <RowContainer
      style={{
        alingItems: 'center',
        paddingVertical: HP(8),
      }}>
      <Text
        numberOfLines={1}
        style={{
          width: '50%',
          fontFamily: ROBOTO_REGULAR,
          color: WHITE,
          alignSelf: 'flex-start',
        }}>
        {title}
      </Text>
      <Text
        style={{
          width: '50%',
          fontFamily: ROBOTO_REGULAR,
          color: SECONDARY_COLOR,
        }}>
        {data}
      </Text>
    </RowContainer>
  );
}

const BuyShares = ({navigation, route}) => {
  const walletDetails = useSelector(Selector.WALLET_DETAILS);
  const stockView = useSelector(Selector.STOCK_VIEW);

  const {title, created_at, CodeID, stockAmout, stock_id} = route.params;

  const [getter, setter] = useState({
    ammount: '',
    isLoading: false,
  });

  const [error, setError] = useState({
    ammounError: '',
  });

  const navigateTo = useCallback(screenName => {
    navigation.navigate(screenName);
  }, []);

  const dispatch = useDispatch();

  const onChangeText = useCallback(
    (text, key) => {
      setter(prev => ({
        ...prev,
        [key]: text,
      }));
    },
    [getter, setter],
  );

  const onStockBuy = () => {
    const [ammount] = isFeildValid(getter.ammount);
    if (ammount == '') {
      dispatch(buyStocks(getter.ammount, stock_id, setter, navigation));
      setError(prev => ({
        ...prev,
        ammounError: '',
      }));
    } else {
      setError(prev => ({
        ...prev,
        ammounError: ammount,
      }));
    }
  };

  console.log(stockView);

  return (
    <View style={{flex: 1}}>
      <CommonHeader title="Buy Shares" />
      <Container
        scrollViewContainerStyle={{
          paddingTop: CONTAINER_PADDINGTOP,
        }}>
        <View
          style={[
            styles.itemContainer,
            {
              backgroundColor: '#01C4000F',
            },
          ]}>
          <View>
            <Text style={styles.itemContainerLeftTitTxt}>{title}</Text>
            <RowContainer
              style={{
                marginTop: HP(10),
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <Image
                resizeMode="center"
                source={CLOCK}
                style={{
                  width: 14,
                  height: 14,
                  tintColor: WHITE,
                  marginRight: HP(5),
                }}
              />
              <Text style={styles.itemContainerLeftSubTitTxt}>
                {created_at.slice(-9)} |<Text> {CodeID}</Text>
              </Text>
            </RowContainer>
          </View>
          <Text
            style={[
              styles.itemContainerLeftTitTxt,
              {fontSize: WP(14), alignSelf: 'flex-start'},
            ]}>
            {stockAmout}$
          </Text>
          {/* <Text
              style={{
                marginTop: HP(10),
                color: SECONDARY_COLOR,
                fontFamily: ROBOTO_MEDIUM,
                fontSize: WP(12),
              }}>
              {item.statistics}
            </Text> */}
        </View>
        <CardViewDivider style={{maringVertical: HP(10)}} />
        <FieldInput
          editable={getter.isLoading ? false : true}
          keyboardType={'number-pad'}
          iconLeft={ARROWSHARES_SVG}
          containerStyle={{
            marginTop: HP(20),
            marginHorizontal: PADDING_HORIZONTAL,
          }}
          placeholder={'Enter Quantity of Shapes'}
          errorMessage={error.ammounError}
          placeholdercolor={WHITE}
          style={styles.filedInputTxt}
          value={getter.ammount}
          onChangeText={text => onChangeText(text, 'ammount')}
        />
        <CardViewDivider
          style={{
            marginVertical: HP(30),
          }}
        />
        {stockView.data.totalshare > 0 && (
          <View style={{paddingHorizontal: PADDING_HORIZONTAL}}>
            <View
              style={[
                GlobalStyles.dropShadow,
                {
                  borderWidth: 0,
                  paddingHorizontal: PADDING_HORIZONTAL,
                  paddingVertical: HP(12),
                },
              ]}>
              <NumberShares
                title={'Number of Shares'}
                data={stockView.data.totalShares}></NumberShares>
              <NumberShares
                title={'Price per share'}
                data={stockView.data.pricepershare}></NumberShares>
              <NumberShares
                title={'Total Price'}
                data={stockView.data.totalprice}></NumberShares>
            </View>
          </View>
        )}
        <CardViewDivider
          style={{
            marginVertical: HP(30),
          }}
        />
        <RowContainer
          style={{
            paddingHorizontal: PADDING_HORIZONTAL,
            height: HP(93),
          }}>
          <View
            style={{
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
              flex: 1,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 165, 0, 0.1)',
            }}>
            <Text
              style={{
                fontFamily: MONTSERRAT_MEDIUM,
                color: WHITE,
                fontSize: WP(14),
              }}>
              Total Balance
            </Text>
            <Text
              style={{
                marginTop: HP(10),
                fontFamily: ROBOTO_MEDIUM,
                color: WHITE,
                fontSize: WP(25),
              }}>
              ${walletDetails.data.data}
            </Text>
          </View>
          <View
            style={{
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
              flex: 1,
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: GREEN_LIGHT,
            }}>
            <ActionButton
              callBack={() => navigateTo('AddMoney')}
              style={{
                width: WP(134),
                height: HP(35),
                borderRadius: 4,
              }}>
              <Text style={styles.addFundsTxt}>Add Funds in wallet</Text>
            </ActionButton>
          </View>
        </RowContainer>
        <CardViewDivider
          style={{
            marginVertical: HP(30),
          }}
        />
        <ActionButton
          disabled={getter.isLoading ? true : false}
          callBack={() => onStockBuy()}
          style={{
            height: HP(44),
            width: WP(232),
          }}>
          {getter.isLoading ? (
            <Loader />
          ) : (
            <Text style={styles.bigActionBtnTxt}>
              Proceed With Wallet Funds
            </Text>
          )}
        </ActionButton>
      </Container>
    </View>
  );
};

export default BuyShares;

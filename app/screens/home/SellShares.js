import {View, Text, Image} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';

import CommonHeader from '../../component/CommonHeader';
import Container from '../../component/Container';
import styles from './styles';
import CardViewDivider from '../../component/CardViewDivider';
import RowContainer from '../../component/RowContainer';
import FieldInput from '../auth/common/FieldInput';
import ActionButton from '../../component/ActionButton';
import WarningBanner from '../../component/WarningBanner';

import {WP, HP} from '../../styles/Dimesions';
import GlobalStyles, {
  CONTAINER_PADDINGTOP,
  PADDING_HORIZONTAL,
  PADDING_VERTICAL,
} from '../../styles/GlobalStyles';
import {
  POPPINS_REGULAR,
  ROBOTO_MEDIUM,
  ROBOTO_REGULAR,
  SECONDARY_COLOR,
  WHITE,
} from '../../styles/Fonts&Colors';
import {ARROWSHARES_SVG, CLOCK} from '../../constants/IconConstant';
import {isFeildValid} from '../../utils/Validation';
import sellStock from '../../services/stock/SellStocks';
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

function ShareShowCard(props) {
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
        {props.title}
      </Text>
      <Text
        style={{
          textAlign: 'center',
          width: '50%',
          fontFamily: ROBOTO_REGULAR,
          color: SECONDARY_COLOR,
        }}>
        {props.item}
      </Text>
    </RowContainer>
  );
}

const SellShares = ({route, navigation}) => {
  const {title, created_at, CodeId, stockAmout, stock_id, totalShare, isSell} =
    route.params;

  const [getter, setter] = useState({
    ammount: '',
    isLoading: false,
  });

  const [error, setError] = useState({
    ammounError: '',
  });

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

  const onSellShare = () => {
    const [ammount] = isFeildValid(getter.ammount);
    if (ammount == '') {
      dispatch(sellStock(getter.ammount, CodeId, setter, navigation));
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

  return (
    <View style={{flex: 1}}>
      <CommonHeader title="Sell Shares" />
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
            <RowContainer style={{marginTop: HP(10), alignItems: 'center'}}>
              <Image
                source={CLOCK}
                style={{
                  width: 14,
                  height: 14,
                  tintColor: WHITE,
                  resizeMode: 'center',
                }}
              />
              <Text style={styles.itemContainerLeftSubTitTxt}>
                {created_at}
              </Text>
            </RowContainer>
          </View>
          <View>
            <Text
              style={[
                styles.itemContainerLeftTitTxt,
                {alignSelf: 'flex-end', fontSize: WP(14)},
              ]}>
              {stockAmout}
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
        </View>
        <CardViewDivider
          style={{
            marginVertical: HP(15),
          }}
        />
        <RowContainer
          style={{
            paddingHorizontal: PADDING_HORIZONTAL,
          }}>
          <View>
            <Text
              style={{
                fontFamily: ROBOTO_MEDIUM,
                color: '#FA963A',
                fontSize: WP(30),
              }}>
              {totalShare || 0}
            </Text>
            <Text
              style={{
                marginTop: HP(5),
                fontFamily: ROBOTO_REGULAR,
                color: WHITE,
                fontSize: WP(15),
              }}>
              Total Shares Available
            </Text>
          </View>
          <View>
            {/**
             * current price per Share
             */}

            {/* <Text
              style={{
                alignSelf: 'flex-end',
                fontFamily: ROBOTO_MEDIUM,
                color: SECONDARY_COLOR,
                fontSize: WP(30),
              }}>
              $200
            </Text>
            <Text
              style={{
                textAlign: 'right',
                alignSelf: 'flex-end',
                marginTop: HP(5),
                fontFamily: ROBOTO_REGULAR,
                color: WHITE,
                fontSize: WP(15),
              }}>
              {`Current Price\nper share`}
            </Text> */}
          </View>
        </RowContainer>
        <CardViewDivider
          style={{
            marginTop: PADDING_VERTICAL,
            marginBottom: HP(30),
          }}
        />
        <FieldInput
          keyboardType={'number-pad'}
          editable={getter.isLoading ? false : true}
          errorMessage={error.ammounError}
          placeholder={'20'}
          containerStyle={{marginHorizontal: PADDING_HORIZONTAL}}
          style={{
            fontFamily: POPPINS_REGULAR,
            color: WHITE,
            fontSize: WP(13),
          }}
          value={getter.ammount}
          onChangeText={text => onChangeText(text, 'ammount')}
          iconLeft={ARROWSHARES_SVG}
        />
        <WarningBanner
          style={{marginTop: HP(15), height: HP(42), borderRadius: 5}}
          icon={false}
          titleStyle={{
            fontSize: WP(12),
          }}
          title={'Enter Quantity Of Shares which you want’s to sell'}
        />
        <CardViewDivider
          style={{
            marginVertical: HP(30),
          }}
        />
        <View style={{paddingHorizontal: PADDING_HORIZONTAL}}>
          {totalShare > 0 && (
            <View
              style={[
                GlobalStyles.dropShadow,
                {
                  borderWidth: 0,
                  paddingHorizontal: PADDING_HORIZONTAL,
                  paddingVertical: HP(12),
                },
              ]}>
              <ShareShowCard
                title={'Number of Shares'}
                item={totalShared}></ShareShowCard>
              <ShareShowCard
                title={'Price per share'}
                item={'Price_Per_Share'}></ShareShowCard>
              <ShareShowCard
                item={'Total Price'}
                title={'Total Price'}></ShareShowCard>
              ;
            </View>
          )}
        </View>
        <CardViewDivider
          style={{
            marginVertical: HP(30),
          }}
        />
        <ActionButton
          callBack={() => onSellShare()}
          disabled={getter.isLoading ? true : false}
          style={{
            width: WP(127),
          }}>
          {getter.isLoading ? (
            <Loader />
          ) : (
            <Text style={styles.bigActionBtnTxt}>Sell Now</Text>
          )}
        </ActionButton>
      </Container>
    </View>
  );
};

export default SellShares;

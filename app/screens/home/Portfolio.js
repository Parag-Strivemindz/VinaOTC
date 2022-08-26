import {Image, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import getStockView from '../../services/dashboard/GetStockView';

import Container from '../../component/Container';
import CommonHeader from '../../component/CommonHeader';
import StockWebView from '../../component/StockWebView';
import Loader from '../../component/Loader';
import RowContainer from '../../component/RowContainer';
import ActionButton from '../../component/ActionButton';

import {Selector} from '../../store/redux/dashboard';

import {HP, WINDOW_HEIGHT, WP} from '../../styles/Dimesions';
import {
  CONTAINER_PADDINGTOP,
  PADDING_HORIZONTAL,
} from '../../styles/GlobalStyles';
import {
  BLACK_01,
  LIGHT_ORANGE,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_REGULAR,
  ROBOTO_BOLD,
  SECONDARY_COLOR,
  WHITE,
} from '../../styles/Fonts&Colors';
import {CLOCK, RIGHT_ARROW_PNG} from '../../constants/IconConstant';
import UseNavigation from '../../component/UseNavigation';

function Shares({title, color, screenName = '', data = {}}) {
  const navigate = UseNavigation(screenName);

  return (
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        paddingHorizontal: PADDING_HORIZONTAL,
        height: HP(45),
      }}>
      <ActionButton
        callBack={() =>
          navigate({
            ...data,
          })
        }
        style={{
          paddingHorizontal: PADDING_HORIZONTAL,
          width: '100%',
          height: '100%',
          backgroundColor: color,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: 20,
            height: 15,
            tintColor: WHITE,
          }}
          resizeMode="contain"
          source={RIGHT_ARROW_PNG}
          rotation={title == 'Sell' ? -90 : 90}
        />
        <Text style={{color: WHITE, fontFamily: ROBOTO_BOLD}}>
          {title} Shares
        </Text>
      </ActionButton>
    </View>
  );
}

const Portfolio = ({route}) => {
  const {CodeId, stockAmout, title, created_at} = route.params;

  const stockView = useSelector(Selector.STOCK_VIEW);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStockView(CodeId));
  }, [CodeId]);

  // console.log(stockView);

  return (
    <View style={{flex: 1}}>
      <CommonHeader title={''} />
      {stockView.data ? (
        <Container
          scrollViewContainerStyle={{
            paddingTop: CONTAINER_PADDINGTOP,
          }}>
          <View
            style={{
              paddingHorizontal: PADDING_HORIZONTAL,
              marginBottom: HP(10),
            }}>
            <Text
              style={{
                fontFamily: MONTSERRAT_REGULAR,
                color: WHITE,
                fontSize: WP(32),
              }}>
              {stockAmout}
            </Text>
            <Text
              style={{
                color: LIGHT_ORANGE,
                fontFamily: MONTSERRAT_REGULAR,
                marginVertical: HP(10),
              }}>
              {title}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={CLOCK}
                style={{
                  width: 15,
                  height: 15,
                  tintColor: WHITE,
                  marginRight: 5,
                }}
                resizeMode="center"
              />
              <Text
                style={{
                  color: WHITE,
                  fontFamily: MONTSERRAT_REGULAR,
                  fontSize: WP(12),
                }}>
                {created_at.slice(-9)} | <Text>{CodeId}</Text> |
                <Text> Real Time Currency in</Text>
              </Text>
            </View>
          </View>
          <View style={{height: WINDOW_HEIGHT * 0.5, justifyContent: 'center'}}>
            <StockWebView
              html={stockView.data.data.widget_area_en}
              containerStyle={{
                height: WINDOW_HEIGHT * 0.5,
              }}
            />
          </View>
          <RowContainer
            style={{
              marginTop: HP(15),
            }}>
            <Shares
              screenName={'SellShares'}
              color={BLACK_01}
              title={'Sell'}></Shares>
            <Shares
              screenName={'BuyShares'}
              color={'#0096FF'}
              title={'Buy'}
              data={{
                title,
                created_at,
                CodeId,
                stockAmout,
              }}></Shares>
          </RowContainer>
        </Container>
      ) : stockView.isLoading ? (
        <Loader
          size={'large'}
          color={SECONDARY_COLOR}
          style={{
            marginTop: WINDOW_HEIGHT / 2,
          }}
        />
      ) : (
        <Text
          style={{
            color: WHITE,
            fontFamily: MONTSERRAT_MEDIUM,
            alignSelf: 'center',
            marginTop: WINDOW_HEIGHT / 2,
            fontSize: WP(12),
          }}>
          This Stock is not Avilable Please Select Another Stock
        </Text>
      )}
    </View>
  ); /*  */
};

export default Portfolio;

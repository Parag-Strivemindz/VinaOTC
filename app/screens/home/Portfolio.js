import {Image, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import getStockView from '../../services/dashboard/GetStockView';

import useNavigation from '../../component/UseNavigation';
import Container from '../../component/Container';
import CommonHeader from '../../component/CommonHeader';
import StockWebView from '../../component/StockWebView';
import Loader from '../../component/Loader';
import RowContainer from '../../component/RowContainer';
import ActionButton from '../../component/ActionButton';

import {Selector as dashBoardSelector} from '../../store/redux/dashboard';

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

function Shares({title, color, screenName = '', data = {}, navigation}) {
  const navigate = useNavigation(screenName, navigation);

  console.log(navigate + ' navigate');
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

const Portfolio = ({route, navigation}) => {
  const {CodeID} = route.params;
  const stockView = useSelector(dashBoardSelector.STOCK_VIEW);
  console.log(CodeID + ' CodeID');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStockView(CodeID));
  }, [CodeID]);

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
              {stockView.data.data.amount}
            </Text>
            <Text
              style={{
                color: LIGHT_ORANGE,
                fontFamily: MONTSERRAT_REGULAR,
                marginVertical: HP(10),
              }}>
              {stockView.data.data.name}
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
                {stockView.data.data.created_at.slice(-9)} |{' '}
                <Text>{CodeID}</Text> |<Text> Real Time Currency in</Text>
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
              navigation={navigation}
              screenName={'SellShares'}
              color={BLACK_01}
              title={'Sell'}
              data={{
                title: stockView.data.data.name,
                created_at: stockView.data.data.created_at,
                CodeID,
                stockAmout: stockView.data.data.amount,
                stock_id: stockView.data.data.stock_id,
                totalShare: stockView.totalshare,
                isSell: stockView.is_sell,
              }}></Shares>
            <Shares
              navigation={navigation}
              screenName={'BuyShares'}
              color={'#0096FF'}
              title={'Buy'}
              data={{
                title: stockView.data.data.name,
                created_at: stockView.data.data.created_at,
                CodeID,
                stockAmout: stockView.data.data.amount,
                stock_id: stockView.data.data.stock_id,
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

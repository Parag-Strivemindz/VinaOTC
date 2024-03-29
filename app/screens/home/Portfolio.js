import {Image, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Selector as dashBoardSelector} from '../../store/redux/dashboard';
import {Selector as languageSelector} from '../../store/redux/localization';

import getStockView from '../../services/dashboard/GetStockView';

import useNavigation from '../../component/UseNavigation';
import Container from '../../component/Container';
import CommonHeader from '../../component/CommonHeader';
import StockWebView from '../../component/StockWebView';
import Loader from '../../component/Loader';
import RowContainer from '../../component/RowContainer';
import ActionButton from '../../component/ActionButton';

import {HP, WINDOW_HEIGHT, WP} from '../../styles/Dimesions';
import {
  CONTAINER_PADDINGTOP,
  PADDING_HORIZONTAL,
} from '../../styles/GlobalStyles';
import {
  BACKGROUND_COLOR,
  LIGHT_ORANGE,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_REGULAR,
  ROBOTO_BOLD,
  SECONDARY_COLOR,
  WHITE,
} from '../../styles/Fonts&Colors';
import {CLOCK, RIGHT_ARROW_PNG} from '../../constants/IconConstant';
import {i18n} from '../../i18n/lang';
import {CURRENCY} from '../../constants/AppConstant';

function Shares({title, color, screenName = '', data = {}, navigation}) {
  const navigate = useNavigation(screenName, navigation);

  // console.log(navigate + ' navigate');
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
          rotation={screenName == 'SellShares' ? -90 : 90}
        />
        <Text style={{color: WHITE, fontFamily: ROBOTO_BOLD}}>{title}</Text>
      </ActionButton>
    </View>
  );
}

const Portfolio = ({route, navigation}) => {
  const {CodeID} = route.params;
  const stockView = useSelector(dashBoardSelector.STOCK_VIEW);
  const language = useSelector(languageSelector.Localization);

  console.log(CodeID + ' from Portfolio');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStockView(CodeID));
  }, [CodeID]);

  return (
    <View style={{flex: 1, backgroundColor: BACKGROUND_COLOR}}>
      <CommonHeader title={''} navigateBack={'home'} />
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
              {CURRENCY}
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
                {stockView.data.data.created_at.slice(
                  0,
                  stockView.data.data.created_at.indexOf('T'),
                )}{' '}
                | <Text>{CodeID}</Text> |
                <Text> Real Time Currency in {CURRENCY}</Text>
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
              color={'black'}
              title={i18n[language.code].sellShares}
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
              title={i18n[language.code].buyShares}
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
          {i18n[language.code].stockNotAvailable}
        </Text>
      )}
    </View>
  ); /*  */
};

export default Portfolio;

import {Image, Text, View} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {SvgXml} from 'react-native-svg';

import {Selector as dashboardSelector} from '../../store/redux/dashboard/index';
import {Selector as userSelector} from '../../store/redux/user/index';
import getMySellStock from '../../services/user/MySellStock';

import Container from '../../component/Container';
import RowContainer from '../../component/RowContainer';
import CardViewDivider from '../../component/CardViewDivider';
import CardView from '../../component/CardView';
import HifenDivider from '../../component/HifenDivider';
import Header from '../../component/Header';

import styles from './styles';
import GlobalStyles, {
  CONTAINER_PADDINGTOP,
  PADDING_HORIZONTAL,
} from '../../styles/GlobalStyles';
import {ARROW_DOWN, NOTIFICATION_SVG} from '../../constants/IconConstant';
import {HP, WP} from '../../styles/Dimesions';
import {GIRL_PROFILE} from '../../constants/ImageConstant';
import {
  MONTSERRAT_MEDIUM,
  WHITE,
  SECONDARY_COLOR,
} from '../../styles/Fonts&Colors';
import Loader from '../../component/Loader';

const Profile = ({navigation}) => {
  const myPortfolio = useSelector(dashboardSelector.My_Stock_Portfolio);
  const walletDetails = useSelector(dashboardSelector.WALLET_DETAILS);
  const mySellStock = useSelector(userSelector.My_Sell_Stocks);

  const navigateTo = useCallback(screenName => {
    return (params = {}) => {
      navigation.navigate(screenName, {
        ...params,
      });
    };
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMySellStock());
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header
        icon={NOTIFICATION_SVG}
        callback={() => navigateTo('Notification')()}
      />
      <Container scrollViewContainerStyle={{paddingTop: CONTAINER_PADDINGTOP}}>
        <RowContainer
          callback={() => navigateTo('MyProfile')()}
          style={{
            ...GlobalStyles.dropShadow,
            alignItems: 'center',
            marginHorizontal: PADDING_HORIZONTAL,
            paddingHorizontal: 15,
            height: HP(63),
          }}>
          <RowContainer style={{alignItems: 'center'}}>
            <Image
              source={GIRL_PROFILE}
              style={{width: 30, height: 30, marginRight: 15}}
              resizeMode="center"
            />
            <Text
              style={{
                fontFamily: MONTSERRAT_MEDIUM,
                fontSize: WP(16),
                color: WHITE,
              }}>
              Wallet & My Profile
            </Text>
          </RowContainer>
          <SvgXml xml={ARROW_DOWN} rotation={-90} />
        </RowContainer>
        <CardViewDivider />
        {/*
         * All Common Prortfolio
         */}
        <RowContainer
          style={{alignItems: 'center', paddingHorizontal: PADDING_HORIZONTAL}}>
          <RowContainer>
            <Text style={[styles.blockHeaderTxt]}>PORTFOLIO OVERVIEW</Text>
            <HifenDivider style={styles.hiffenDividerRow} />
          </RowContainer>
          <Text
            style={styles.seeAllTxt}
            onPress={() =>
              navigation.navigate('AllPortfolio', {
                walletDetails: walletDetails.data,
                allPortfolio: myPortfolio.data,
                navigateTo,
              })
            }>
            See All
          </Text>
        </RowContainer>
        <View
          style={{marginTop: HP(22), paddingHorizontal: PADDING_HORIZONTAL}}>
          {/**
           * List of  Portfolio
           */}
          <View style={{marginTop: 10}}>
            {myPortfolio.isLoading ? (
              <Loader color={SECONDARY_COLOR} size="large" />
            ) : (
              myPortfolio.data &&
              myPortfolio.data.data.map((item, index) => {
                return (
                  <CardView
                    key={index.toString()}
                    data={item}
                    callback={() => navigateTo('Portfolio')()}
                  />
                );
              })
            )}
          </View>
        </View>
        <CardViewDivider />
        {/*
         * history Prortfolio
         */}
        <RowContainer
          style={{alignItems: 'center', paddingHorizontal: PADDING_HORIZONTAL}}>
          <RowContainer>
            <Text style={[styles.blockHeaderTxt]}>HISTORY</Text>
            <HifenDivider style={styles.hiffenDividerRow} />
          </RowContainer>
          <Text style={styles.seeAllTxt}>See All</Text>
        </RowContainer>
        <View
          style={{marginTop: HP(22), paddingHorizontal: PADDING_HORIZONTAL}}>
          {/**
           * List of  Portfolio
           */}
          <View style={{marginTop: 10}}>
            {mySellStock.isLoading ? (
              <Loader color={SECONDARY_COLOR} size="large" />
            ) : (
              mySellStock.data &&
              mySellStock.data.data.map((item, index) => {
                return <CardView key={index.toString()} data={item} />;
              })
            )}
          </View>
        </View>
      </Container>
    </View>
  );
};

export default Profile;

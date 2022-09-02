import {BackHandler, Image, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

import GetMyStockPortfolio from '../../services/dashboard/GetMyStockPortfolio';
import getStockList from '../../services/dashboard/GetStockList';
import GetWalletDetails from '../../services/dashboard/GetWalletDetails';
import {Selector} from '../../store/redux/dashboard/index';

import Loader from '../../component/Loader';
import Container from '../../component/Container';
import Header from '../../component/Header';
import HifenDivider from '../../component/HifenDivider';
import RowContainer from '../../component/RowContainer';
import CardView from '../../component/CardView';
import StockWebView from '../../component/StockWebView';

import {SECONDARY_COLOR} from '../../styles/Fonts&Colors';
import styles from './styles';
import {HP} from '../../styles/Dimesions';
import WantToExit from '../../component/WantToExit';

const Home = ({navigation}) => {
  const myPortfolio = useSelector(Selector.My_Stock_Portfolio);
  const walletDetails = useSelector(Selector.WALLET_DETAILS);
  const stockList = useSelector(Selector.STOCK_LIST);

  const navigateTo = useCallback(screenName => {
    return (params = {}) => {
      navigation.navigate(screenName, {
        ...params,
      });
    };
  }, []);

  const [getter, setter] = useState({
    isVisible: false,
  });

  const onClose = useCallback(() => {
    setter(prev => ({...prev, isVisible: !prev.isVisible}));
  }, [getter, setter]);

  const onQuite = () => {
    onClose();
    BackHandler.exitApp();
  };

  useFocusEffect(
    useCallback(() => {
      console.log('called');
      const unsubscribe = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          onClose();
          return true;
        },
      );
      return () => unsubscribe.remove();
    }),
  );

  const dispatch = useDispatch();

  // console.log(myPortfolio.data);

  useEffect(() => {
    dispatch(GetMyStockPortfolio());
    dispatch(GetWalletDetails());
    dispatch(getStockList());
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <Container>
        {/**
         * Total InvesetMent
         */}
        <RowContainer style={styles.subHaeaderContainer}>
          <View>
            <Text numberOfLines={1} style={styles.titleTxt}>
              {walletDetails.data ? walletDetails.data.data : '0'}
            </Text>
            <Text style={[styles.subtitleTxt, {marginTop: HP(10)}]}>
              Total Portfolio
            </Text>
            <HifenDivider style={styles.hiffenDivider} />
            {/* <Text style={styles.subtitleTxt}>
              Total Investment{'  '}
              <Text style={{color: SECONDARY_COLOR}}>$7878.00</Text>
            </Text> */}
          </View>
          {/* <View>
            <Text style={styles.profit}>+15.06%</Text>
            <Text
              style={[
                styles.subtitleTxt,
                {
                  marginTop: HP(20),
                },
              ]}>
              Weekly Change
            </Text>
          </View> */}
          <View style={styles.dividerContainer}>
            <Image
              style={styles.divider}
              source={require('../../assets/icons/divider.png')}
            />
          </View>
        </RowContainer>
        {/**
         * Portfolio overview
         */}
        <View style={{marginTop: HP(22), paddingHorizontal: 20}}>
          <RowContainer style={{alignItems: 'center'}}>
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
                    callback={() =>
                      navigateTo('Portfolio')({
                        CodeID: item.code,
                      })
                    }
                  />
                );
              })
            )}
          </View>
        </View>
        {stockList.isLoading ? (
          <Loader color={SECONDARY_COLOR} size="large" />
        ) : (
          stockList.data && (
            <StockWebView html={stockList.data.data[0].sotck_listing_en} />
          )
        )}
        {/*
          <HomeTab />
          */}
      </Container>
      <WantToExit
        isVisible={getter.isVisible}
        onClose={onClose}
        onQuit={onQuite}
      />
    </View>
  );
};

export default Home;

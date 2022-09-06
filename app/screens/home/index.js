import {Image, LogBox, Text, View} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import GetMyStockPortfolio from '../../services/dashboard/GetMyStockPortfolio';
import GetWalletDetails from '../../services/dashboard/GetWalletDetails';
import {Selector} from '../../store/redux/dashboard/index';
import {Selector as languageSelector} from '../../store/redux/localization';

import HomeStockWebView from './HomeStockWebView';
import Loader from '../../component/Loader';
import Container from '../../component/Container';
import Header from '../../component/Header';
import HifenDivider from '../../component/HifenDivider';
import RowContainer from '../../component/RowContainer';
import CardView from '../../component/CardView';

import {SECONDARY_COLOR} from '../../styles/Fonts&Colors';
import styles from './styles';
import {HP} from '../../styles/Dimesions';
import WantToExit from '../../component/WantToExit';
import {i18n} from '../../i18n/lang';
import {CURRENCY} from '../../constants/AppConstant';

const Home = ({navigation}) => {
  const language = useSelector(languageSelector.Localization);
  const myPortfolio = useSelector(Selector.My_Stock_Portfolio);
  const walletDetails = useSelector(Selector.WALLET_DETAILS);

  console.log(language.code);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetMyStockPortfolio());
    dispatch(GetWalletDetails());
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
              { CURRENCY}
            </Text>
            <Text style={[styles.subtitleTxt, {marginTop: HP(10)}]}>
              {i18n[language.code].TotalPortfolio}
            </Text>
            <HifenDivider style={styles.hiffenDivider} />
          </View>

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
              <Text
                style={[styles.blockHeaderTxt, {textTransform: 'uppercase'}]}>
                PortFolio {i18n[language.code].PortfolioOverview}
              </Text>
              <HifenDivider style={styles.hiffenDividerRow} />
            </RowContainer>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={[styles.seeAllTxt, {alignItems: 'flex-end'}]}
              onPress={() =>
                navigation.navigate('AllPortfolio', {
                  walletDetails: walletDetails.data,
                  allPortfolio: myPortfolio.data,
                })
              }>
              {i18n[language.code].seeAll}
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
                return <CardView key={index} data={item} />;
              })
            )}
          </View>
        </View>
        <HomeStockWebView />
        {/*
          <HomeTab />
          */}
      </Container>
      {WantToExit()}
    </View>
  );
};

export default Home;

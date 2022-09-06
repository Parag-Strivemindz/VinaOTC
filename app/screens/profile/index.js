import {BackHandler, Image, Text, View, Alert} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {SvgXml} from 'react-native-svg';
import {useFocusEffect} from '@react-navigation/native';

import {Selector as dashboardSelector} from '../../store/redux/dashboard/index';
import {Selector as userSelector} from '../../store/redux/user/index';
import {Selector as languageSelector} from '../../store/redux/localization/index';

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
import {
  MONTSERRAT_MEDIUM,
  WHITE,
  SECONDARY_COLOR,
} from '../../styles/Fonts&Colors';
import Loader from '../../component/Loader';
import WantToExit from '../../component/WantToExit';
import {i18n} from '../../i18n/lang';

const Profile = ({navigation}) => {
  const myPortfolio = useSelector(dashboardSelector.My_Stock_Portfolio);
  const walletDetails = useSelector(dashboardSelector.WALLET_DETAILS);
  const mySellStock = useSelector(userSelector.My_Sell_Stocks);
  const myProfileDetails = useSelector(userSelector.User_Info);
  const language = useSelector(languageSelector.Localization);

  console.log(i18n[language.code].wallet);

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
          <RowContainer
            style={{alignItems: 'center'}}
            callback={() => navigateTo('MyProfile')()}>
            <Image
              source={{uri: myProfileDetails.data.data.ProfileImage}}
              style={{width: 40, height: 40, marginRight: 15, borderRadius: 20}}
            />
            <Text
              style={{
                fontFamily: MONTSERRAT_MEDIUM,
                fontSize: WP(16),
                color: WHITE,
              }}>
              {i18n[language.code].wallet} & {i18n[language.code].myProfile}
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
          <RowContainer style={{maxWidth: '75%'}}>
            <Text style={[styles.blockHeaderTxt]}>
              Portfolio {i18n[language.code].PortfolioOverview}
            </Text>
            <HifenDivider style={styles.hiffenDividerRow} />
          </RowContainer>
          <Text
            style={[styles.seeAllTxt, {width: '20%', textAlign: 'right'}]}
            onPress={() =>
              navigation.navigate('AllPortfolio', {
                walletDetails: walletDetails.data,
                allPortfolio: myPortfolio.data,
                navigateTo,
              })
            }>
            {i18n[language.code].seeAll}
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
        <CardViewDivider />
        {/*
         * history Prortfolio
         */}
        <RowContainer
          style={{alignItems: 'center', paddingHorizontal: PADDING_HORIZONTAL}}>
          <RowContainer>
            <Text style={[styles.blockHeaderTxt]}>
              {i18n[language.code].sellHistory}
            </Text>
            <HifenDivider style={styles.hiffenDividerRow} />
          </RowContainer>
          {/* <Text style={styles.seeAllTxt}>See All</Text> */}
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
      {WantToExit()}
    </View>
  );
};

export default Profile;

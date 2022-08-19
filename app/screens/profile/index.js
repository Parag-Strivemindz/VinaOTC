import {Image, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import Container from '../../component/Container';
import GlobalStyles, {
  CONTAINER_PADDINGTOP,
  PADDING_HORIZONTAL,
} from '../../styles/GlobalStyles';
import CardViewDivider from '../../component/CardViewDivider';
import RowContainer from '../../component/RowContainer';
import CardView from '../../component/CardView';
import {ARROW_DOWN, BANK_LOGO, BELL_ICON} from '../../constants/IconConstant';
import {HP, WP} from '../../styles/Dimesions';
import styles from './styles';
import HifenDivider from '../../component/HifenDivider';
import {GIRL_PROFILE} from '../../constants/ImageConstant';
import {MONTSERRAT_MEDIUM, WHITE} from '../../styles/Fonts&Colors';
import {SvgXml} from 'react-native-svg';
import Header from '../../component/Header';

const Profile = ({navigation}) => {
  const navigateTo = useCallback(screenName => {
    navigation.navigate(screenName);
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header icon={BELL_ICON} />
      <Container containerStyles={{paddingTop: CONTAINER_PADDINGTOP}}>
        <RowContainer
          callback={() => navigateTo('MyProfile')}
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
            onPress={() => navigateTo('AllPortfolio')}>
            See All
          </Text>
        </RowContainer>
        <View
          style={{marginTop: HP(22), paddingHorizontal: PADDING_HORIZONTAL}}>
          {/**
           * List of  Portfolio
           */}
          <View style={{marginTop: 10}}>
            <CardView
              callback={() => navigateTo('Portfolio')}
              url={BANK_LOGO}></CardView>
            <CardView url={BANK_LOGO}></CardView>
            <CardView url={BANK_LOGO}></CardView>
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
          <Text
            style={styles.seeAllTxt}
            onPress={() => navigateTo('AllPortfolio')}>
            See All
          </Text>
        </RowContainer>
        <View
          style={{marginTop: HP(22), paddingHorizontal: PADDING_HORIZONTAL}}>
          {/**
           * List of  Portfolio
           */}
          <View style={{marginTop: 10}}>
            <CardView
              callback={() => navigateTo('Portfolio')}
              url={BANK_LOGO}></CardView>
            <CardView url={BANK_LOGO}></CardView>
          </View>
        </View>
      </Container>
    </View>
  );
};

export default Profile;

import {Image, Text, View} from 'react-native';
import React, {useCallback} from 'react';

import styles from './styles';
import Container from '../../component/Container';
import Header from '../../component/Header';
import HifenDivider from '../../component/HifenDivider';
import {SECONDARY_COLOR} from '../../styles/Fonts&Colors';
import {HP} from '../../styles/Dimesions';
import RowContainer from '../../component/RowContainer';
import CardView from '../../component/CardView';

const Home = ({navigation}) => {
  const navigateTo = useCallback(screenName => {
    navigation.navigate(screenName);
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
              $78676.33
            </Text>
            <Text style={[styles.subtitleTxt, {marginTop: HP(10)}]}>
              Total Portfolio
            </Text>
            <HifenDivider style={styles.hiffenDivider} />
            <Text style={styles.subtitleTxt}>
              Total Investment{'  '}
              <Text style={{color: SECONDARY_COLOR}}>$7878.00</Text>
            </Text>
          </View>
          <View>
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
              <Text style={[styles.blockHeaderTxt]}>PORTFOLIO OVERVIEW</Text>
              <HifenDivider style={styles.hiffenDividerRow} />
            </RowContainer>
            <Text
              style={styles.seeAllTxt}
              onPress={() => navigateTo('AllPortfolio')}>
              See All
            </Text>
          </RowContainer>
          {/**
           * List of  Portfolio
           */}
          <View style={{marginTop: 10}}>
            <CardView callback={() => navigateTo('Portfolio')}></CardView>
            <CardView></CardView>
            <CardView></CardView>
          </View>
        </View>
        <View>
          {/*
          <HomeTab />
          */}
        </View>
      </Container>
    </View>
  );
};

export default Home;

import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import {SvgXml} from 'react-native-svg';

import RowContainer from '../../component/RowContainer';
import HifenDivider from '../../component/HifenDivider';
import Container from '../../component/Container';
import CommonHeader from '../../component/CommonHeader';
import CardView from '../../component/CardView';

import styles from './styles';
import {HP} from '../../styles/Dimesions';
import {ARROW_DIGONAL} from '../../constants/IconConstant';
import {PADDING_HORIZONTAL} from '../../styles/GlobalStyles';
import {useSelector} from 'react-redux';
import {Selector} from '../../store/redux/localization';
import {i18n} from '../../i18n/lang';

const AllPortfolio = ({navigation, route}) => {
  const language = useSelector(Selector.Localization);
  const {walletDetails, allPortfolio} = route.params;

  // console.log(JSON.stringify(allPortfolio.data[0].code) + ' fromAllPorfolio');

  // const rightItem = () => <SvgXml xml={ARROW_DIGONAL} onPress={() => {}} />;

  return (
    <View style={styles.container}>
      <CommonHeader title={i18n[language.code].my + ' Portfolio'} />
      <Container>
        {/**
         * Total InvesetMent
         */}
        <RowContainer style={styles.subHaeaderContainer}>
          <View>
            <Text numberOfLines={1} style={styles.titleTxt}>
              {walletDetails.data ? walletDetails.data : '0'}
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
        <View
          style={{marginTop: HP(22), paddingHorizontal: PADDING_HORIZONTAL}}>
          {/**
           * List of  Portfolio
           */}
          <View style={{marginTop: 10}}>
            {allPortfolio.data.map((item, index) => {
              return <CardView key={index.toString()} data={item} />;
            })}
          </View>
        </View>
      </Container>
    </View>
  );
};

export default AllPortfolio;

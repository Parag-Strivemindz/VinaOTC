import {View, Text, Image} from 'react-native';
import React, {useCallback} from 'react';
import {SvgXml} from 'react-native-svg';
import RowContainer from '../../component/RowContainer';
import styles from './styles';
import HifenDivider from '../../component/HifenDivider';
import {SECONDARY_COLOR} from '../../styles/Fonts&Colors';
import {HP} from '../../styles/Dimesions';
import Container from '../../component/Container';
import CardView from '../../component/CardView';
import CommonHeader from '../../component/CommonHeader';
import {ARROW_DIGONAL, BANK_LOGO} from '../../constants/IconConstant';
import {PADDING_HORIZONTAL} from '../../styles/GlobalStyles';

const AllPortfolio = ({navigation}) => {
  const navigateTo = useCallback(screenName => {
    navigation.navigate(screenName);
  }, []);

  const rightItem = () => <SvgXml xml={ARROW_DIGONAL} onPress={() => {}} />;

  return (
    <View style={styles.container}>
      <CommonHeader title={'My Portfolio'} rightItem={rightItem} />
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
      </Container>
    </View>
  );
};

export default AllPortfolio;

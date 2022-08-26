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

const AllPortfolio = ({navigation, route}) => {
  const {walletDetails, allPortfolio, navigateTo} = route.params.data;

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
              {walletDetails.data ? walletDetails.data : '0'}
            </Text>
            <Text style={[styles.subtitleTxt, {marginTop: HP(10)}]}>
              Total Portfolio
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
              return (
                <CardView
                  key={index.toString()}
                  data={item}
                  callback={() =>
                    navigateTo('Portfolio', {
                      stockId: allPortfolio.stock_id,
                    })
                  }
                />
              );
            })}
          </View>
        </View>
      </Container>
    </View>
  );
};

export default AllPortfolio;

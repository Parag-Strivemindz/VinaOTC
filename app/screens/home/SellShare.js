import {View, Text, Image} from 'react-native';
import React, {useCallback, useState} from 'react';

import CommonHeader from '../../component/CommonHeader';
import Container from '../../component/Container';
import styles from './styles';
import CardViewDivider from '../../component/CardViewDivider';
import RowContainer from '../../component/RowContainer';
import FieldInput from '../auth/common/FieldInput';
import ActionButton from '../../component/ActionButton';
import WarningBanner from '../../component/WarningBanner';
import TestData from './Testdata.json';

import {WP, HP} from '../../styles/Dimesions';
import GlobalStyles, {
  CONTAINER_PADDINGTOP,
  PADDING_HORIZONTAL,
  PADDING_VERTICAL,
} from '../../styles/GlobalStyles';
import {
  POPPINS_REGULAR,
  ROBOTO_MEDIUM,
  ROBOTO_REGULAR,
  SECONDARY_COLOR,
  WHITE,
} from '../../styles/Fonts&Colors';
import {ARROWSHARES_SVG, ARROW_DOWN, CLOCK} from '../../constants/IconConstant';

const data = [
  {
    id: '1',
    name: 'Number of Shares',
    value: '5',
  },
  {
    id: '2',
    name: 'Price per share',
    value: '$500',
  },
  {
    id: '1',
    name: 'Total Price',
    value: '$2500',
  },
];

const SellShare = () => {
  const [getter, setter] = useState({
    ammount: '',
  });

  const [error, setError] = useState({
    ammounError: '',
  });

  const onChangeText = useCallback(
    (text, key) => {
      setter(prev => ({
        ...prev,
        [key]: text,
      }));
    },
    [getter, setter],
  );

  return (
    <View style={{flex: 1}}>
      <CommonHeader title="Sell Shares" />
      <Container
        scrollViewContainerStyle={{
          paddingTop: CONTAINER_PADDINGTOP,
        }}>
        {TestData.map((item, index) => {
          return (
            <View
              key={item.id}
              style={[
                styles.itemContainer,
                {
                  backgroundColor: index % 2 === 0 ? '#01C4000F' : undefined,
                },
              ]}>
              <View>
                <Text style={styles.itemContainerLeftTitTxt}>{item.title}</Text>
                <RowContainer style={{marginTop: HP(10), alignItems: 'center'}}>
                  <Image
                    source={CLOCK}
                    style={{
                      width: 14,
                      height: 14,
                      tintColor: WHITE,
                      marginRight: 13,
                    }}
                  />
                  <Text style={styles.itemContainerLeftSubTitTxt}>
                    {item.time}
                  </Text>
                </RowContainer>
              </View>
              <View>
                <Text
                  style={[
                    styles.itemContainerLeftTitTxt,
                    {alignSelf: 'flex-end', fontSize: WP(14)},
                  ]}>
                  {item.value}
                </Text>
                <Text
                  style={{
                    marginTop: HP(10),
                    color: SECONDARY_COLOR,
                    fontFamily: ROBOTO_MEDIUM,
                    fontSize: WP(12),
                  }}>
                  {item.statistics}
                </Text>
              </View>
            </View>
          );
        })}
        <CardViewDivider
          style={{
            marginVertical: HP(15),
          }}
        />
        <RowContainer
          style={{
            paddingHorizontal: PADDING_HORIZONTAL,
          }}>
          <View>
            <Text
              style={{
                fontFamily: ROBOTO_MEDIUM,
                color: '#FA963A',
                fontSize: WP(30),
              }}>
              800
            </Text>
            <Text
              style={{
                marginTop: HP(5),
                fontFamily: ROBOTO_REGULAR,
                color: WHITE,
                fontSize: WP(15),
              }}>
              Total Shares Available
            </Text>
          </View>
          <View>
            <Text
              style={{
                alignSelf: 'flex-end',
                fontFamily: ROBOTO_MEDIUM,
                color: SECONDARY_COLOR,
                fontSize: WP(30),
              }}>
              $200
            </Text>
            <Text
              style={{
                textAlign: 'right',
                alignSelf: 'flex-end',
                marginTop: HP(5),
                fontFamily: ROBOTO_REGULAR,
                color: WHITE,
                fontSize: WP(15),
              }}>
              {`Current Price\nper share`}
            </Text>
          </View>
        </RowContainer>
        <CardViewDivider
          style={{
            marginTop: PADDING_VERTICAL,
            marginBottom: HP(30),
          }}
        />
        <FieldInput
          errorMessage={error.ammounError}
          placeholder={'20'}
          containerStyle={{marginHorizontal: PADDING_HORIZONTAL}}
          style={{
            fontFamily: POPPINS_REGULAR,
            color: WHITE,
            fontSize: WP(13),
          }}
          value={getter.ammount}
          onChangeText={text => onChangeText(text, 'ammount')}
          iconLeft={ARROWSHARES_SVG}
        />
        <WarningBanner
          style={{marginTop: HP(15), height: HP(42), borderRadius: 5}}
          icon={false}
          titleStyle={{
            fontSize: WP(12),
          }}
          title={'Enter Quantity Of Shares which you want’s to sell'}
        />

        <CardViewDivider
          style={{
            marginVertical: HP(30),
          }}
        />
        <View style={{paddingHorizontal: PADDING_HORIZONTAL}}>
          <View
            style={[
              GlobalStyles.dropShadow,
              {
                borderWidth: 0,
                paddingHorizontal: PADDING_HORIZONTAL,
                paddingVertical: HP(12),
              },
            ]}>
            {data.map(item => {
              return (
                <RowContainer
                  style={{alingItems: 'center', paddingVertical: HP(8)}}>
                  <Text
                    numberOfLines={1}
                    style={{
                      width: '50%',
                      fontFamily: ROBOTO_REGULAR,
                      color: WHITE,
                      alignSelf: 'flex-start',
                    }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      width: '50%',
                      fontFamily: ROBOTO_REGULAR,
                      color: SECONDARY_COLOR,
                    }}>
                    {item.value}
                  </Text>
                </RowContainer>
              );
            })}
          </View>
        </View>
        <CardViewDivider
          style={{
            marginVertical: HP(30),
          }}
        />
        <ActionButton
          style={{
            width: WP(127),
          }}>
          <Text style={styles.bigActionBtnTxt}>Sell Now</Text>
        </ActionButton>
      </Container>
    </View>
  );
};

export default SellShare;

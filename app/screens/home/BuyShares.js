import {View, Text, Image} from 'react-native';
import React, {useCallback, useState} from 'react';

import styles from './styles';
import CommonHeader from '../../component/CommonHeader';
import Container from '../../component/Container';
import TestData from './Testdata.json';
import ActionButton from '../../component/ActionButton';
import CardViewDivider from '../../component/CardViewDivider';
import RowContainer from '../../component/RowContainer';
import FieldInput from '../auth/common/FieldInput';

import {WP, HP} from '../../styles/Dimesions';
import GlobalStyles, {
  CONTAINER_PADDINGTOP,
  PADDING_HORIZONTAL,
} from '../../styles/GlobalStyles';
import {
  GREEN_LIGHT,
  ROBOTO_REGULAR,
  WHITE,
  SECONDARY_COLOR,
  ROBOTO_MEDIUM,
  WHITE_50,
  MONTSERRAT_REGULAR,
  MONTSERRAT_MEDIUM,
} from '../../styles/Fonts&Colors';
import {ARROW_DIGONAL, ARROW_DOWN, CLOCK} from '../../constants/IconConstant';

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

const BuyShares = ({navigation}) => {
  const [getter, setter] = useState({
    ammount: '',
  });

  const [error, setError] = useState({
    ammounError: '',
  });

  const navigateTo = useCallback(screenName => {
    navigation.navigate(screenName);
  }, []);

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
      <CommonHeader title="Buy Shares" />
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
        <CardViewDivider style={{maringVertical: HP(10)}} />
        <FieldInput
          iconLeft={ARROW_DIGONAL}
          containerStyle={{
            marginTop: HP(20),
            marginHorizontal: PADDING_HORIZONTAL,
          }}
          placeholder={'Enter Quantity of Shapes'}
          errorMessage={error.ammounError}
          placeholdercolor={WHITE}
          style={styles.filedInputTxt}
          value={getter.ammount}
          onChangeText={text => onChangeText(text, 'ammount')}
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
        <RowContainer
          style={{
            paddingHorizontal: PADDING_HORIZONTAL,
            height: HP(93),
          }}>
          <View
            style={{
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
              flex: 1,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 165, 0, 0.1)',
            }}>
            <Text
              style={{
                fontFamily: MONTSERRAT_MEDIUM,
                color: WHITE,
                fontSize: WP(14),
              }}>
              Total Balance
            </Text>
            <Text
              style={{
                marginTop: HP(10),
                fontFamily: ROBOTO_MEDIUM,
                color: WHITE,
                fontSize: WP(25),
              }}>
              $12,000
            </Text>
          </View>
          <View
            style={{
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
              flex: 1,
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: GREEN_LIGHT,
            }}>
            <ActionButton
              callBack={() => navigateTo('AddMoney')}
              style={{
                width: WP(134),
                height: HP(35),
                borderRadius: 4,
              }}>
              <Text style={styles.addFundsTxt}>Add Funds in wallet</Text>
            </ActionButton>
          </View>
        </RowContainer>
        <CardViewDivider
          style={{
            marginVertical: HP(30),
          }}
        />
        <ActionButton
          style={{
            height: HP(44),
            width: WP(232),
          }}>
          <Text style={styles.bigActionBtnTxt}>Proceed With Wallet Funds</Text>
        </ActionButton>
      </Container>
    </View>
  );
};

export default BuyShares;

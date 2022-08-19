import React from 'react';
import {View, StyleSheet, ScrollView, Text, Image} from 'react-native';
import {useSelector} from 'react-redux';

import {
  ROBOTO_BOLD,
  ROBOTO_MEDIUM,
  ROBOTO_REGULAR,
  SECONDARY_COLOR,
  WHITE,
  WHITE_30,
  WHITE_50,
} from '../../../styles/Fonts&Colors';
import {WP, HP} from '../../../styles/Dimesions';
import {Selector} from '../../../store/redux/dashboard/index';
import RowContainer from '../../../component/RowContainer';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {CLOCK} from '../../../constants/IconConstant';

const CardView = ({value}) => {
  const Stock = useSelector(Selector.Stock_Details);
  // console.log(JSON.stringify(Stock) + ' lengtth');

  return (
    <View style={styles.continer}>
      <ScrollView
        contentContainerStyle={{paddingTop: 20}}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {Stock.data.map((item, index) => {
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  continer: {
    flex: 1,
  },
  itemContainer: {
    // marginVertical: 10,
    paddingVertical: 13,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemContainerLeftTitTxt: {
    fontFamily: ROBOTO_MEDIUM,
    color: WHITE,
    fontSize: WP(15),
  },
  itemContainerLeftSubTitTxt: {
    fontFamily: ROBOTO_MEDIUM,
    fontSize: WP(14),
    color: WHITE_50,
  },
});

// CardView.propType = {
//   data: PropType.array.isRequired,
// };

export default CardView;

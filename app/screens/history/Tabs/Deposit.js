import {View, Text} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import styles from './styles';
import RowContainer from '../../../component/RowContainer';
import CardViewDivider from '../../../component/CardViewDivider';
import {SvgXml} from 'react-native-svg';
import {stocks} from '..';
import Container from '../../../component/Container';
import {
  PADDING_HORIZONTAL,
  PADDING_VERTICAL,
} from '../../../styles/GlobalStyles';
import {FILLTER_EQUALIZER} from '../../../constants/IconConstant';
import {HP} from '../../../styles/Dimesions';
import Filter from '../../../component';
import {BACKGROUND_COLOR, SECONDARY_COLOR} from '../../../styles/Fonts&Colors';
import FilterModal from './FilterModal';

const Deposit = () => {
  const [getter, setter] = useState({
    isVisible: false,
    from: {
      date: new Date(),
      name: 'from',
    },
    to: {
      date: new Date(),
      name: 'to',
    },
  });

  useEffect(() => {
    console.log(getter);
  }, [getter, setter]);

  const CloseModal = useCallback(() => {
    setter(prev => ({
      ...prev,
      isVisible: !prev.isVisible,
    }));
  }, []);

  const FilterItem = () => {
    return (
      <View>
        {stocks.map((item, index) => {
          return (
            <RowContainer
              key={item.id}
              style={{
                ...styles.itemContainer,
                backgroundColor: index % 2 === 0 ? '#01C4000F' : undefined,
              }}>
              <View>
                <Text style={styles.itemContainerLeftTitTxt}>{item.price}</Text>
                <Text style={styles.itemContainerLeftSubTitTxt}>
                  {item.time}
                </Text>
              </View>
              <Text
                style={{
                  ...styles.status,
                  color:
                    item.status == 'Approved'
                      ? SECONDARY_COLOR
                      : 'rgba(233,78,27,1)',
                }}>
                {item.status}
              </Text>
            </RowContainer>
          );
        })}
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: BACKGROUND_COLOR}}>
      <CardViewDivider style={{marginVertical: PADDING_VERTICAL}} />
      <RowContainer style={{paddingHorizontal: PADDING_HORIZONTAL}}>
        <Text style={styles.filter}>Filter</Text>
        <SvgXml xml={FILLTER_EQUALIZER} width={16} onPress={CloseModal} />
      </RowContainer>
      <Container containerStyles={{paddingTop: HP(15)}}>
        <FilterItem />
      </Container>
      <Filter style={{paddingBottom: 10}} />
      <FilterModal setter={setter} getter={getter} close={CloseModal} />
    </View>
  );
};

export default Deposit;

import {launchCamera} from '@yunfeic/react-native-imagepicker';
import React from 'react';
import {View, Text} from 'react-native';
import Animated, {SlideInLeft, Layout} from 'react-native-reanimated';

import RowContainer from '../../../component/RowContainer';
import {CURRENCY} from '../../../constants/AppConstant';
import {i18n} from '../../../i18n/lang';
import {SECONDARY_COLOR} from '../../../styles/Fonts&Colors';
import {DDMMYY} from '../../../utils/Date';
import styles from './styles';

const FilterItem = ({requestData, language}) => {
  // const language = useSelector(Selector.Localization);

  return (
    <>
      {requestData.map((item, index) => {
        return (
          <Animated.View
            key={item.orders_id}
            entering={SlideInLeft.delay(100)}
            // exiting={SlideOutRight}
            layout={Layout.mass(10).delay(index * 10)}>
            <RowContainer
              key={index.toString()}
              style={{
                ...styles.itemContainer,
                backgroundColor: index % 2 === 0 ? '#01C4000F' : undefined,
              }}>
              <View>
                <Text style={styles.itemContainerLeftTitTxt}>
                  {item.total_price}
                  {CURRENCY}
                </Text>
                <Text style={styles.itemContainerLeftSubTitTxt}>
                  {DDMMYY(item.created_at, '-', language)}
                </Text>
              </View>
              <Text
                style={{
                  ...styles.status,
                  color:
                    item.status == 'approve'
                      ? SECONDARY_COLOR
                      : 'rgba(233,78,27,1)',
                }}>
                {item.status == 'approve'
                  ? i18n[language.code].approved
                  : i18n[language.code].pending}
              </Text>
            </RowContainer>
          </Animated.View>
        );
      })}
    </>
  );
};

FilterItem.defaultProps = {
  language: {
    code: 'en',
  },
};

export default FilterItem;

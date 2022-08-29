import {StyleSheet, Text, View, Modal} from 'react-native';
import React, {useState} from 'react';
import {
  ROBOTO_MEDIUM,
  SECONDARY_COLOR,
  WHITE,
} from '../../../styles/Fonts&Colors';
import RowContainer from '../../../component/RowContainer';
import {SvgXml} from 'react-native-svg';
import {ERROR} from '../../../constants/IconConstant';
import {PADDING_HORIZONTAL} from '../../../styles/GlobalStyles';
import ActionButton from '../../../component/ActionButton';
import {HP, WINDOW_WIDTH, WP} from '../../../styles/Dimesions';
import Calander from '../../../component/Calander';

const FilterModal = ({setter, getter, close}) => {
  const [open, setOpen] = useState({
    open: false,
    from: '',
  });

  function dateFormat(date) {
    try {
      const dateInstance = new Date(date);
      const selecteddate = dateInstance.getDate();
      const month = dateInstance.getMonth() + 1;
      const year = dateInstance.getFullYear();
      return `${selecteddate}/${month}/${year}`;
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Modal
      transparent
      animationType="fade"
      visible={getter.isVisible}
      onRequestClose={close}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.2)',
        }}>
        <View
          style={{
            backgroundColor: WHITE,
            width: WINDOW_WIDTH * 0.8,
            borderRadius: 11,
          }}>
          <RowContainer
            style={{
              paddingHorizontal: PADDING_HORIZONTAL,
              marginVertical: HP(12),
            }}>
            <Text style={styles.titletxt}>Filter by Data</Text>
            <SvgXml
              xml={ERROR}
              onPress={close}
              hitSlop={{
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
              }}
            />
          </RowContainer>
          <View
            style={{
              backgroundColor: 'rgba(1, 196, 0, 0.1)',
              paddingHorizontal: PADDING_HORIZONTAL,
            }}>
            <RowContainer style={{marginVertical: HP(10)}}>
              <Text style={styles.titletxt}>From</Text>
              <ActionButton
                style={{
                  height: HP(25),
                  width: WP(112),
                  backgroundColor: 'transparent',
                  borderWidth: 0.5,
                  borderColor: 'rgba(1,196,0,0.3)',
                }}>
                <Text
                  style={styles.titletxt}
                  onPress={() => {
                    setOpen(prev => ({
                      ...prev,
                      from: 'from',
                      open: !prev.open,
                    }));
                  }}>
                  {dateFormat(getter.from.date)}
                </Text>
              </ActionButton>
            </RowContainer>
            <RowContainer style={{marginVertical: HP(10)}}>
              <Text style={styles.titletxt}>To</Text>
              <ActionButton
                style={{
                  height: HP(25),
                  width: WP(112),
                  backgroundColor: 'transparent',
                  borderWidth: 0.5,
                  borderColor: 'rgba(1,196,0,0.3)',
                }}>
                <Text
                  style={styles.titletxt}
                  onPress={() => {
                    setOpen(prev => ({
                      ...prev,
                      from: 'to',
                      open: !prev.open,
                    }));
                  }}>
                  {dateFormat(getter.to.date)}
                </Text>
              </ActionButton>
            </RowContainer>
          </View>
          <RowContainer
            style={{
              marginVertical: HP(20),
              paddingHorizontal: PADDING_HORIZONTAL,
            }}>
            <ActionButton
              style={{
                ...styles.resetBtn,
                borderWidth: 0.5,
                borderColor: 'rgba(1,196,0,0.3)',
                backgroundColor: WHITE,
              }}>
              <Text style={[styles.titletxt]}>Reset</Text>
            </ActionButton>
            <ActionButton
              style={{
                ...styles.resetBtn,
                backgroundColor: SECONDARY_COLOR,
              }}>
              <Text style={[styles.titletxt, {color: WHITE}]}>Search</Text>
            </ActionButton>
          </RowContainer>
        </View>
        <Calander
          setDate={setter}
          setOpen={setOpen}
          date={getter.from.date}
          open={open}
        />
      </View>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  resetBtn: {
    height: HP(35),
    width: WP(88),
  },
  titletxt: {
    color: 'rgba(0,0,0,0.7)',
    fontFamily: ROBOTO_MEDIUM,
    fontSize: WP(15),
  },
});

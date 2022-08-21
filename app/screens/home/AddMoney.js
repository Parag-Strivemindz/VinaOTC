import {LayoutAnimation, StyleSheet, Text, View, Image} from 'react-native';
import React, {useCallback, useState} from 'react';

import styles from './styles';
import CommonHeader from '../../component/CommonHeader';
import Container from '../../component/Container';
import FieldInput from '../auth/common/FieldInput';
import WarningBanner from '../../component/WarningBanner';
import CardViewDivider from '../../component/CardViewDivider';
import {SvgXml} from 'react-native-svg';
import CommonFilterModal from '../../component/CommonFilterModal';
import RowContainer from '../../component/RowContainer';
import ActionButton from '../../component/ActionButton';

import GlobalStyles, {
  PADDING_HORIZONTAL,
  PADDING_VERTICAL,
} from '../../styles/GlobalStyles';
import {
  BLACK_70,
  GREEN_LIGHT,
  MONTSERRAT_REGULAR,
  ROBOTO_MEDIUM,
  ROBOTO_REGULAR,
  SECONDARY_COLOR,
  WHITE,
} from '../../styles/Fonts&Colors';
import {HP, WP} from '../../styles/Dimesions';
import {
  CIRCLE,
  CLOSE_SVG,
  ERROR,
  RADIO,
  ATTACH_SVG,
} from '../../constants/IconConstant';

const filerItems = [
  {
    id: '1',
    name: 'File',
  },
  {
    id: '2',
    name: 'Camera',
  },
];
const data = [
  {
    id: '1',
    name: 'Accont Name',
    value: '2545 2358 2358 1258',
  },
  {
    id: '2',
    name: 'ifsc code',
    value: 'hdfc00124',
  },
  {
    id: '3',
    name: 'Name of A/C holder',
    value: 'lesa harper',
  },
  {
    id: '4',
    name: 'Bank name',
    value: 'Hdfc Bank LTD',
  },
  {
    id: '5',
    name: 'Branch Code',
    value: '125456',
  },
  {
    id: '6',
    name: 'Branch Address',
    value: `Mountain View, California`,
  },
];

const attachment = [
  {
    id: '1',
    value: 'logo.png',
  },
  {
    id: '2',
    value: 'logo.png',
  },
];

function AddMoney({navigation}) {
  const [getter, setter] = useState({
    ammount: '',
    attachment: [...attachment],
    isVisible: false,
    filterItem: '',
  });

  const [error, setError] = useState({
    ammountError: '',
  });

  const onFilterSelect = value => {
    setter(prev => ({
      ...prev,
      isVisible: !prev.isVisible,
      filterItem: value,
    }));
  };

  const close = useCallback(() => {
    setter(prev => ({
      ...prev,
      isVisible: !prev.isVisible,
    }));
  }, [setter, getter]);

  /*
   *  this function suppose to handle attachment selcted by user
   */
  const onHandleAttachMent = () => {};

  const onCallHandler = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const [ammount] = isFeildValid(getter.ammount);

    if (ammount == '') {
      //make your api call here
      setError(prev => ({
        ...prev,
        ammountError: '',
      }));
    } else {
      setError(prev => ({
        ...prev,
        ammountError: ammount,
      }));
    }
    //check if any field is empty or invalid
  }, [getter, setter, Error, setError]);

  const FindAttachment = ({selectedItem, close, callback}) => {
    return (
      <View style={[GlobalStyles.modalContainer]}>
        <RowContainer
          style={{
            alingItems: 'center',
            paddingHorizontal: PADDING_HORIZONTAL,
            // paddingVertical: HP(15),
          }}>
          <Text
            style={{
              color: BLACK_70,
              fontFamily: ROBOTO_MEDIUM,
            }}>
            Choose Photo From
          </Text>
          <SvgXml
            xml={ERROR}
            onPress={() => close()}
            hitSlop={{
              left: 10,
              right: 10,
              top: 10,
              bottom: 10,
            }}
          />
        </RowContainer>
        {filerItems.map((item, index) => (
          <RowContainer
            callback={() => callback(item.name)}
            key={index.toString()}
            style={{
              ...styles.rowFilteItemContainer,
              backgroundColor: selectedItem === item.name ? GREEN_LIGHT : WHITE,
              // marginTop: HP(15),
            }}>
            <RowContainer style={{alignItems: 'center'}}>
              {selectedItem === item.name ? (
                <SvgXml xml={CIRCLE} />
              ) : (
                <SvgXml xml={CIRCLE} />
              )}
              <Text
                style={{
                  marginLeft: WP(15),
                  color: BLACK_70,
                  fontFamily: ROBOTO_MEDIUM,
                }}>
                {item.name}
              </Text>
            </RowContainer>
          </RowContainer>
        ))}
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <CommonHeader title={'Add Money'} />
      <Container>
        <View
          style={{
            ...GlobalStyles.containerStyle,
            paddingHorizontal: PADDING_HORIZONTAL,
            paddingVertical: PADDING_VERTICAL,
            backgroundColor: GREEN_LIGHT,
          }}>
          <Text
            style={{
              fontFamily: ROBOTO_REGULAR,
              color: WHITE,
              fontSize: WP(13),
            }}>
            Please Enter ammout that you wants to Deposit
          </Text>
          <FieldInput
            containerStyle={{
              marginTop: HP(10),
            }}
            errorMessage={error.ammountError}
            value={getter.ammount}
            onChangeText={text => {
              setter(prev => ({
                ...prev,
                ammount: text,
              }));
            }}
            placeholder={'500'}
            style={{
              color: WHITE,
              fontFamily: MONTSERRAT_REGULAR,
            }}
          />
        </View>
        <WarningBanner
          style={{
            marginTop: HP(30),
          }}
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
            marginVertical: HP(25),
          }}
        />
        {attachment.map(item => {
          return (
            <RowContainer
              key={item.id}
              style={{
                alignItems: 'center',
                paddingVertical: HP(6),
                paddingHorizontal: PADDING_HORIZONTAL,
              }}>
              <RowContainer
                style={{
                  alignItems: 'center',
                }}>
                <SvgXml xml={RADIO} style={{marginRight: WP(10)}} />
                <Text
                  style={{
                    fontFamily: MONTSERRAT_REGULAR,
                    color: WHITE,
                  }}>
                  {item.value}
                </Text>
              </RowContainer>
              <SvgXml
                xml={CLOSE_SVG}
                onPress={() => onHandleAttachMent(item.id)}
              />
            </RowContainer>
          );
        })}
        <CardViewDivider
          style={{
            marginVertical: HP(25),
          }}
        />
        <RowContainer
          callback={() => close()}
          style={{
            alignItems: 'center',
            marginHorizontal: PADDING_HORIZONTAL,
            borderRadius: 10,
            height: HP(50),
            backgroundColor: WHITE,
          }}>
          <RowContainer
            style={{
              paddingHorizontal: PADDING_HORIZONTAL,
            }}>
            <SvgXml xml={ATTACH_SVG} style={{marginRight: WP(20)}} />
            <Text
              style={{
                fontFamily: MONTSERRAT_REGULAR,
                color: 'rgba(34,34,34,0.7)',
              }}>
              Please Attach file
            </Text>
          </RowContainer>
        </RowContainer>
        <ActionButton
          callBack={() => navigation.navigate('SellShare')}
          style={{
            marginTop: HP(30),
            width: WP(244),
          }}>
          <Text
            style={{
              fontFamily: ROBOTO_REGULAR,
              color: WHITE,
              fontSize: WP(16),
            }}>
            Deposite Funds
          </Text>
        </ActionButton>
        <CommonFilterModal close={close} getter={getter}>
          <FindAttachment
            selectedItem={getter.filterItem}
            close={close}
            callback={onFilterSelect}
          />
        </CommonFilterModal>
      </Container>
    </View>
  );
}

export default AddMoney;

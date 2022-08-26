import {LayoutAnimation, StyleSheet, Text, View, Image} from 'react-native';
import React, {useCallback, useState} from 'react';
import {SvgXml} from 'react-native-svg';
import {
  launchCamera,
  launchImageLibrary,
} from '@yunfeic/react-native-imagepicker';

import {isFeildValid} from '../../utils/Validation';
import styles from './styles';
import CommonHeader from '../../component/CommonHeader';
import Container from '../../component/Container';
import FieldInput from '../auth/common/FieldInput';
import WarningBanner from '../../component/WarningBanner';
import CardViewDivider from '../../component/CardViewDivider';
import CommonFilterModal from '../../component/CommonFilterModal';
import RowContainer from '../../component/RowContainer';
import ActionButton from '../../component/ActionButton';

import GlobalStyles, {
  PADDING_HORIZONTAL,
  PADDING_VERTICAL,
} from '../../styles/GlobalStyles';
import {
  BACKGROUND_COLOR,
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
    name: 'file',
  },
  {
    id: '2',
    name: 'camera',
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

function BankDetails(props) {
  return (
    <RowContainer
      style={{
        alingItems: 'center',
        paddingVertical: HP(8),
      }}>
      <Text
        numberOfLines={1}
        style={{
          width: '50%',
          fontFamily: ROBOTO_REGULAR,
          color: WHITE,
          alignSelf: 'flex-start',
        }}>
        {props.item.name}
      </Text>
      <Text
        style={{
          width: '50%',
          fontFamily: ROBOTO_REGULAR,
          color: SECONDARY_COLOR,
        }}>
        {props.item.value}
      </Text>
    </RowContainer>
  );
}

function OnAttachFile(props) {
  return (
    <RowContainer
      callback={() => props.close()}
      style={{
        alignItems: 'center',
        marginHorizontal: PADDING_HORIZONTAL,
        borderRadius: 10,
        height: HP(50),
        backgroundColor: WHITE,
      }}>
      <RowContainer
        callback={() => props.close()}
        style={{
          paddingHorizontal: PADDING_HORIZONTAL,
        }}>
        <SvgXml
          xml={ATTACH_SVG}
          style={{
            marginRight: WP(20),
          }}
        />
        <Text
          style={{
            fontFamily: MONTSERRAT_REGULAR,
            color: 'rgba(34,34,34,0.7)',
          }}>
          Please Attach file
        </Text>
      </RowContainer>
    </RowContainer>
  );
}

const FindAttachment = ({close, callback}) => {
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
            backgroundColor: WHITE,
            // marginTop: HP(15),
          }}>
          <RowContainer style={{alignItems: 'center'}}>
            <SvgXml xml={CIRCLE} />
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

function AddMoney({navigation}) {
  const [getter, setter] = useState({
    ammount: '',
    attachment: {},
    isVisible: false,
    showImage: false,
  });

  const [error, setError] = useState({
    ammountError: '',
  });

  const onFilterSelect = useCallback(value => {
    const options = {
      mediaType: 'photo',
      selectionLimit: 1,
    };
    if (value == 'file') {
      launchImageLibrary(options, res => {
        if (res.assets) {
          const {fileName, type, uri, width} = res.assets[0];
          setter(prev => ({
            ...prev,
            attachment: {
              fileName,
              type,
              uri,
              width,
            },
          }));
          console.log(uri, type, fileName, width);
        }
      });
    }
    if (value == 'camera') {
      launchCamera(options, res => {
        if (res.assets) {
          const {fileName, type, uri, width} = res.assets[0];
          setter(prev => ({
            ...prev,
            attachment: {
              fileName,
              type,
              uri,
              width,
            },
          }));
          console.log(uri, type, fileName, width);
        }
      });
    }
    close();
  }, []);

  const close = useCallback(() => {
    setter(prev => ({
      ...prev,
      isVisible: !prev.isVisible,
    }));
  }, [setter]);

  /*
   *  this function suppose to handle attachment selcted by user
   */
  const onRemoveAttachment = () => {
    setter(prev => ({
      ...prev,
      attachment: {},
    }));
  };

  const onFundDeposite = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const [ammount] = isFeildValid(getter.ammount);

    if (ammount == '' && Object.keys(getter.attachment).length > 0) {
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
              return <BankDetails key={item.id} item={item}></BankDetails>;
            })}
          </View>
        </View>
        <CardViewDivider
          style={{
            marginVertical: HP(25),
          }}
        />
        {Object.keys(getter.attachment).length > 0 && (
          <RowContainer
            callback={() =>
              setter(prev => ({
                ...prev,
                showImage: !prev.showImage,
              }))
            }
            style={{
              zindex: 1,
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
                image.{getter.attachment.type.replace('image/', '')}
              </Text>
            </RowContainer>
            <SvgXml xml={CLOSE_SVG} onPress={() => onRemoveAttachment()} />
          </RowContainer>
        )}

        <CardViewDivider
          style={{
            marginVertical: HP(25),
          }}
        />

        <OnAttachFile close={close}></OnAttachFile>

        <ActionButton
          callBack={onFundDeposite}
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
        <CommonFilterModal close={close} isVisible={getter.isVisible}>
          <FindAttachment close={close} callback={onFilterSelect} />
        </CommonFilterModal>
        <CommonFilterModal
          containerStyle={{
            backgroundColor: BACKGROUND_COLOR,
          }}
          style={{
            transparent: true,
          }}
          isVisible={getter.showImage}
          close={() =>
            setter(prev => ({
              ...prev,
              showImage: !prev.showImage,
            }))
          }>
          <Image
            resizeMode="center"
            source={{uri: getter.attachment.uri}}
            style={{
              width: getter.attachment.width,
              aspectRatio: 1 / 0.2,
            }}
          />
        </CommonFilterModal>
      </Container>
    </View>
  );
}

export default AddMoney;

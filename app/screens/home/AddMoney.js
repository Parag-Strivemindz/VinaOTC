import {
  LayoutAnimation,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ToastAndroid,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SvgXml} from 'react-native-svg';
import {
  launchCamera,
  launchImageLibrary,
} from '@yunfeic/react-native-imagepicker';
import {useDispatch, useSelector} from 'react-redux';

import getBankInfoList from '../../services/bank/BankInfoList';
import {Selector} from '../../store/redux/bank/index';

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
import Loader from '../../component/Loader';
import DepositeFunds from '../../services/bank/DepositeFunds';
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

function BankDetails({title, value}) {
  return (
    <>
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
          {title}
        </Text>
        <Text
          style={{
            width: '50%',
            fontFamily: ROBOTO_REGULAR,
            color: SECONDARY_COLOR,
          }}>
          {value || 'No Available'}
        </Text>
      </RowContainer>
    </>
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

function AddMoney({navigation, route}) {
  const bankInfo = useSelector(Selector.BankInfoList);
  const [getter, setter] = useState({
    ammount: '',
    attachment: {
      fileName: '',
      type: '',
      uri: '',
      width: undefined,
    },
    isVisible: false,
    showImage: false,
    isLoading: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBankInfoList());
  }, []);

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
      attachment: {
        fileName: '',
        type: '',
        uri: '',
        width: '',
      },
    }));
  };

  const onFundDeposite = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const [ammount] = isFeildValid(getter.ammount);
    // getter.attachment.uri != '' add this later
    if (ammount == '') {
      //make your api call here
      dispatch(
        DepositeFunds(
          navigation,
          getter.ammount,
          {
            uri: getter.attachment.uri,
            name: getter.attachment.fileName,
            type: getter.attachment.type,
          },
          setter,
        ),
      );
      setError(prev => ({
        ...prev,
        ammountError: '',
      }));
    } else {
      setError(prev => ({
        ...prev,
        ammountError: ammount,
      }));
      if (getter.attachment.uri == '')
        ToastAndroid.show('Please Select File', ToastAndroid.LONG);
    }
    //check if any field is empty or invalid
  }, [getter, setter, Error, setError]);

  const WalletBalance = ({params}) => {
    return (
      <Text
        style={{color: 'white', fontFamily: ROBOTO_MEDIUM, fontSize: WP(21)}}>
        {params}
      </Text>
    );
  };

  return (
    <View style={{flex: 1}}>
      <CommonHeader
        title={'Add Money'}
        rightItem={
          route.params &&
          (() => <WalletBalance params={route.params.walletBalance} />)
        }
      />
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
            keyboardType={'number-pad'}
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

        {/*
         * Bank Details
         */}
        <View style={{paddingHorizontal: PADDING_HORIZONTAL}}>
          {bankInfo.data ? (
            bankInfo.data.data &&
            bankInfo.data.data.map((item, index) => {
              return (
                <View
                  key={index.toString()}
                  style={[
                    GlobalStyles.dropShadow,
                    {
                      marginBottom: HP(20),
                      borderWidth: 0,
                      paddingHorizontal: PADDING_HORIZONTAL,
                      paddingVertical: HP(12),
                    },
                  ]}>
                  <BankDetails
                    title={'Accont Number'}
                    value={item.bank_account_no}
                  />
                  <BankDetails title={'ifsc Code'} value={item.ifsc_code} />
                  <BankDetails
                    title={'Name of A/c holder'}
                    value={item.account_holder_name}
                  />
                  <BankDetails title={'Bank Name'} value={item.bank_name} />
                  <BankDetails title={'Branch Code'} value={item.branch_code} />
                  <BankDetails
                    title={'Branch Address'}
                    value={item.bank_address}
                  />
                </View>
              );
            })
          ) : bankInfo.isLoading ? (
            <Loader size={'large'} color={SECONDARY_COLOR} />
          ) : null}
        </View>

        <CardViewDivider
          style={{
            marginBottom: HP(25),
          }}
        />
        {getter.attachment.uri != '' && (
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
          {getter.isLoading ? (
            <Loader size={'small'} color={'white'} />
          ) : (
            <Text
              style={{
                fontFamily: ROBOTO_REGULAR,
                color: WHITE,
                fontSize: WP(16),
              }}>
              Deposite Funds
            </Text>
          )}
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

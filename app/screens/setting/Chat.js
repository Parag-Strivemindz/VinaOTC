import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  GiftedChat,
  InputToolbar,
  Send,
  SystemMessage,
  Bubble,
} from 'react-native-gifted-chat';
import {useCallback} from 'react';
import CommonHeader from '../../component/CommonHeader';
import {
  BACKGROUND_COLOR,
  POPPINS_MEDIUM,
  SECONDARY_COLOR,
  WHITE,
} from '../../styles/Fonts&Colors';
import {HP, WP} from '../../styles/Dimesions';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const userId = 'ebe55bad-b8b1-4671-8414-1100d787707a';

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Did you send mony in my accout Number',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  console.log(messages);

  const customtInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        primaryStyle={{
          backgroundColor: BACKGROUND_COLOR,
          borderRadius: 5,
          height: 40,
          alignItems: 'center',
        }}
        containerStyle={{
          elevation: 5,
          borderTopWidth: 0,
          height: 60,
          backgroundColor: 'black',
          padding: 10,
          alignItems: 'center',
          paddingBottom: 10,
        }}>
        <Text>hello</Text>
      </InputToolbar>
    );
  };

  const customeOnSend = ({text, onSend, containerStyle}) => {
    return (
      <Send
        text={text}
        alwaysShowSend
        onSend={onSend}
        containerStyle={{
          backgroundColor: 'black',
          width: WP(100),
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <View
          style={{
            height: HP(40),
            width: WP(75),
            borderRadius: 5,
            backgroundColor: SECONDARY_COLOR,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: WHITE,
              fontFamily: POPPINS_MEDIUM,
            }}>
            Send
          </Text>
        </View>
      </Send>
    );
  };

  function renderBubble(props) {
    const {currentMessage, wrapperStyle, user} = props;
    console.log(user);
    return (
      // Step 3: return the component
      // <View
      //   style={{
      //     borderRadius: 7,
      //     backgroundColor:
      //       user._id === userId
      //         ? 'rgba(1, 196, 0, 0.1)'
      //         : 'rgba(255, 255, 255, 0.1)',
      //   }}>
      //   <Text>{text}</Text>
      //   {/* <Text>{createdAt}</Text> */}
      //   <View
      //     style={{
      //       width: 0,
      //       height: 0,
      //       borderLeftWidth: 10,
      //       borderRightWidth: 10,
      //       borderBottomWidth: 20,
      //       borderStyle: 'solid',
      //       backgroundColor: 'transparent',
      //       borderLeftColor: 'transparent',
      //       borderRightColor: 'transparent',
      //       borderBottomColor: '#00BCD4',
      //     }}></View>
      // </View>

      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            // ...styles.borderSolid,
            borderRadius: 3,
            borderBottomColor: 'rgba(255,255,255,0.1)',
            // borderLeftWidth: 10,
            backgroundColor: 'rgba(255,255,255,0.1)',
          },
          left: {
            // ...styles.borderSolid,
            borderRadius: 3,
            // borderRightWidth: 20,
            backgroundColor: 'rgba(1, 196, 0, 0.1)',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
          left: {
            color: '#fff',
          },
        }}
      />
    );
  }

  function RenderCustomeBubble(props) {
    console.log(props);
    return (
      <View>
        <Text>Hjzd</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: BACKGROUND_COLOR}}>
      <CommonHeader title="Chat" />
      <GiftedChat
        showAvatarForEveryMessage
        wrapInSafeArea
        messagesContainerStyle={{
          backgroundColor: BACKGROUND_COLOR,
          paddingBottom: 20,
        }}
        keyboardShouldPersistTaps={'handled'}
        renderInputToolbar={customtInputToolbar}
        renderSend={customeOnSend}
        messages={messages}
        onSend={messages => onSend(messages)}
        renderBubble={renderBubble}
        showUserAvatar
        user={{
          _id: 3,
          name: 'Parag Sharma',
          avatar: 'https://placeimg.com/140/140/any',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  borderSolid: {
    borderBottomWidth: 30,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});

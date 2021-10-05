import React, {useEffect, useState} from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import CloseIcon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {URLSearchParams} from 'react-native-url-polyfill';
import {UserCredType} from '../Auth/Auth';

type WebModalType = {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  setUserCred: (value: UserCredType) => void;
};
const WebModal = ({isVisible, setIsVisible, setUserCred}: WebModalType) => {
  const {top, bottom} = useSafeAreaInsets();
  const [uri, setUri] = useState('');

  useEffect(() => {
    const get = async () => {
      const res = await fetch(
        'https://api.worldoftanks.ru/wot/auth/login/?application_id=c2d5d057bbbacc437c69f3a3db670360&nofollow=1&expires_at=300',
        {method: 'get'},
      );
      const data = await res.json();
      setUri(data.data.location);
    };
    get();
  }, []);

  const close = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Modal isVisible={isVisible}>
      <View style={[styles.main, {marginTop: top, marginBottom: bottom}]}>
        <View style={styles.btnWrap}>
          <Pressable style={styles.btn} onPress={close}>
            <CloseIcon name={'close'} size={20} />
          </Pressable>
        </View>
        {uri !== '' && (
          <WebView
            source={{
              uri,
            }}
            onNavigationStateChange={e => {
              if (e.url) {
                const searchParams = new URLSearchParams(e.url);
                const status = searchParams.has('status');
                if (status) {
                  const userInfo = {} as UserCredType;
                  for (const [name, value] of searchParams.entries()) {
                    if (name === 'message' && value === 'AUTH_CANCEL') {
                      setIsVisible(false);
                      break;
                    }
                    if (name === 'nickname') {
                      userInfo.nickName = value;
                    }
                    if (name === 'access_token') {
                      userInfo.accessToken = value;
                    }
                    if (name === 'account_id') {
                      userInfo.accountId = value;
                    }
                  }
                  setUserCred(userInfo);
                  setIsVisible(false);
                }
              }
            }}
            style={styles.web}
          />
        )}
      </View>
    </Modal>
  );
};

export default WebModal;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
  },
  web: {
    flex: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  btnWrap: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 40,
  },
  btn: {marginRight: 10},
});

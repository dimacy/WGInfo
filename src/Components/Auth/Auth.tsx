import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import WebModal from '../WebModal';

type AuthType = {
  setUserInfo: (value: any) => void;
};

export type UserCredType = {
  nickName: string;
  accountId: string;
  accessToken: string;
};

const Auth = ({setUserInfo}: AuthType) => {
  const [isVisible, setIsVisible] = useState(false);
  const [userCred, setUserCred] = useState<UserCredType>({} as UserCredType);

  const onPress = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const getUser = async () => {
      if (userCred.accountId) {
        const url =
          'https://api.worldoftanks.ru/wot/account/info/?application_id=c2d5d057bbbacc437c69f3a3db670360';
        const response = await fetch(
          `${url}&account_id=${userCred.accountId}&access_token=${userCred.accessToken}`,
          {
            method: 'GET',
          },
        );
        const snap = await response.json();
        setUserInfo(snap.data[userCred.accountId]);
      }
    };
    getUser();
  }, [setUserInfo, userCred]);

  console.log({userCred});

  return (
    <View style={styles.main}>
      <Image
        style={styles.img}
        source={require('../../Assets/Img/account_backGround.jpeg')}
      />
      <LinearGradient colors={['#fe9100', '#da4800']} style={styles.gradient}>
        <Pressable onPress={onPress} style={styles.gradient}>
          <Text style={styles.btnText}>{'Войти'}</Text>
        </Pressable>
      </LinearGradient>
      <WebModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        setUserCred={setUserCred}
      />
    </View>
  );
};

export default Auth;

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
  },
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 50,
  },
  btnText: {color: '#fff', fontSize: 17, fontWeight: 'bold'},
});

import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {WebView} from 'react-native-webview';

const UserAccount = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [uri, setUri] = useState('');

  useEffect(() => {
    const get = async () => {
      const res = await fetch(
        'https://api.worldoftanks.ru/wot/auth/login/?application_id=c2d5d057bbbacc437c69f3a3db670360&nofollow=1&expires_at=300',
        {method: 'get'},
      );
      const data = await res.json();
      setUri(data.data.location);
      console.log(data.data.location);
    };
    get();
  }, []);

  const onPress = () => {
    setIsVisible(!isVisible);
  };

  // return (
  //   <WebView
  //     source={{
  //       uri,
  //     }}
  //     onNavigationStateChange={e => console.log({e})}
  //   />
  // );
  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
          justifyContent: 'center',
          position: 'absolute',
        }}
        source={require('../Assets/Img/account_backGround.jpeg')}
      />
      <LinearGradient
        colors={['#fe9100', '#da4800']}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: 150,
          height: 50,
        }}>
        <Pressable
          onPress={onPress}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 150,
            height: 50,
          }}>
          <Text style={{color: '#fff', fontSize: 17, fontWeight: 'bold'}}>
            {'Войти'}
          </Text>
        </Pressable>
      </LinearGradient>
    </View>
  );
};

export default UserAccount;

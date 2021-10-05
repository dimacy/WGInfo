import React, {useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Auth from '../Components/Auth/Auth';

const UserAccount = () => {
  const [userInfo, setUserInfo] = useState<any | null>(null);
  const {top, bottom} = useSafeAreaInsets();

  return (
    <View style={{flex: 1}}>
      {userInfo ? (
        <View style={{flex: 1, paddingTop: top, paddingBottom: bottom}}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#2b2d2f',
              //   position: 'absolute',
              zIndex: 100,
              ...StyleSheet.absoluteFillObject,
              opacity: 0.5,
            }}
          />
          <Image
            style={styles.img}
            source={require('../Assets/Img/profile_bg.png')}
            resizeMode={'cover'}
          />
          <View>
            <Text>{userInfo.nickname}</Text>
          </View>
        </View>
      ) : (
        <Auth setUserInfo={setUserInfo} />
      )}
    </View>
  );
};

export default UserAccount;

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
  },
});

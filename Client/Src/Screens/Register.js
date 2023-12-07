import { Image, ImageBackground, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
import CONSTANTS from '../Until/Config';

const Register = (props) => {
  const { navigation } = props;
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');
  const [role, setRole] = useState('');

  const onRegister = async () => {
    let data = { email, name, password: pass, role}
    // console.log(data);
    console.log(data);
    console.log(CONSTANTS.IP);
    const doFetch = async (data) => {
      let url = `${CONSTANTS.IP}/users/register`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }, body: JSON.stringify(data),
      });
      console.log(response);
      return response.json();
    }
    const res = await doFetch(data);
    console.log('>>>>>>>>>>>>>>32: ',res);

    if (res) {
      // await AsyncStorage.setItem("token", res);
      navigation.navigate('Login');
      ToastAndroid.show("Đăng ký thành công", ToastAndroid.SHORT);
    }
    else {
      ToastAndroid.show("Thông tin đăng nhập sai", ToastAndroid.SHORT);
    }
  }

  const login = () => {
    navigation.navigate('Login');
  }

  return (
    <ImageBackground source={require('../Images/bg.png')} style={styles.background} alt=''>
      <View style={styles.boxTextRegister}>
        <Text style={styles.textRegister} >Sign Up</Text>
      </View>
      <View style={styles.boxMain}>
        <View style={styles.boxInput}>
          <Image style={styles.imgInput} source={require('../Images/icon-User.png')} />
          <TextInput style={styles.textInput} placeholder='Full Name' onChangeText={(text) => { setname(text) }} />
        </View>
        <View style={styles.boxInput}>
          <Image style={styles.imgInput} source={require('../Images/icon-Email.png')} />
          <TextInput style={styles.textInput} placeholder='Email Address' onChangeText={(text) => { setemail(text) }} />
        </View>
        <View style={styles.boxInput}>
          <Image style={styles.imgInput} source={require('../Images/icon-Lock.png')} />
          <TextInput style={styles.textInput} placeholder='Password***' onChangeText={(text) => { setpass(text) }} />
        </View>
        <View style={styles.boxInput}>
          <Image style={styles.imgInput} source={require('../Images/icon_role.png')} />
          <TextInput style={styles.textInput} placeholder='Role' onChangeText={(text) => { setRole(text) }} />
        </View>
      </View>
      <View style={styles.boxBtnRegister}>
        <TouchableOpacity style={styles.btnRegister} onPress={onRegister}>
          <Text style={styles.textBtnRegister}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.boxHaveAccount}>
        <Text style={styles.textHaveAccount}>Have an Account ?</Text>
      </View>
      <View style={styles.boxLogin}>
        <TouchableOpacity style={styles.btnLogin} onPress={login}>
          <Text style={styles.textLogin}>Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

export default Register

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  boxTextRegister: {
    alignItems: 'center',
    padding: '10%'
  },
  textRegister: {
    fontSize: 40,
    fontWeight: '700',
    color: 'black',
  },
  boxMain: {
    alignItems: 'center',
  },
  boxInput: {
    width: '85%',
    flexDirection: 'row',
    borderRadius: 50,
    borderWidth: 1,
    marginVertical: '0.5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgInput: {
    width: "8%",
    resizeMode: 'contain',
  },
  textInput: {
    width: "85%",
    fontSize: 18,
  },
  boxBtnRegister: {
    alignItems: 'center',
    margin: '3%',
  },
  btnRegister: {
    width: '30%',
    borderWidth: 0.5,
    alignItems: 'center',
    borderRadius: 50,
  },
  textBtnRegister: {
    fontSize: 20,
    fontWeight: '700',
    padding: "8%",
    color: 'red',
  },
  boxHaveAccount: {
    paddingTop: '4%',
    paddingBottom: '1%',
    width: "50%",
  },
  textHaveAccount: {
    fontSize: 22,
  },
  boxLogin: {
  },
  btnLogin: {
    width: '25%',
    borderWidth: 1,
    borderTopEndRadius: 50,
    borderBottomEndRadius: 50,
    alignItems: 'center',
  },
  textLogin: {
    fontSize: 22,
    fontWeight: '600',
    color: 'red',
    padding: '3%',
  },
})
import { ImageBackground, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../Until/Context/AppContext';
import CONSTANTS from '../Until/Config';


const Login = (props) => {
  const { navigation } = props;
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');

  const { setisLogin } = useContext(AppContext);
  const { setinforUser } = useContext(AppContext)

  const onLogin = async () => {
    let data = { email, password: pass }
    console.log(data);
    console.log(CONSTANTS.IP);
    const doFetch = async (data) => {
      let url = `${CONSTANTS.IP}/users/login`;
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
    // console.log('>>>>>>>>>>>>>>32: ',res);

    if (res) {
      await AsyncStorage.setItem("token", res.token);
      setisLogin(true);
      setinforUser(res);
      ToastAndroid.show("Đăng nhập thành công", ToastAndroid.SHORT);
    }
    else {
      ToastAndroid.show("Thông tin đăng nhập sai", ToastAndroid.SHORT);
    }
  }

  const register = () => {
    navigation.navigate('Register');
  }


  return (
    <ImageBackground source={require('../Images/bg.png')} style={styles.background}>
      <View style={styles.boxTextLogin}>
        <Text style={styles.textLogin}>Login</Text>
      </View>
      <View style={styles.boxMain}>
        <View style={styles.boxInputLogin}>
          <View style={styles.boxInput}>
            <Image style={styles.imgInput} source={require('../Images/icon-User.png')} />
            <TextInput placeholder='Username' style={styles.textInput} onChangeText={(text) => { setemail(text) }} />
          </View>
          <View style={styles.br} />
          <View style={styles.boxInput}>
            <Image style={styles.imgInput} source={require('../Images/icon-Private_Lock.png')} />
            <TextInput placeholder='********' style={styles.textInput} secureTextEntry={true} onChangeText={(text) => { setpass(text) }} />
          </View>
        </View>
        <TouchableOpacity style={styles.btn_Login} onPress={onLogin}>
          <Image source={require('../Images/img-btn_Login.png')} style={styles.imgBtnLogin} />
        </TouchableOpacity>
      </View>
      <View style={styles.boxForgot}>
        <TouchableOpacity>
          <Text style={styles.textForgot}>Forgot ?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.boxRegister} >
        <TouchableOpacity style={styles.btnRegister} onPress={register}>
          <View style={styles.boxRegister_1}>
            <Text style={styles.textRegister}>Register</Text>
          </View>
          <Image style={styles.imgBtnRegister} source={require('../Images/img-btn_Login.png')} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

export default Login

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  boxTextLogin: {
    alignItems: 'center',
    padding: '15%'
  },
  textLogin: {
    fontSize: 40,
    fontWeight: '700',
    color: 'black',
  },
  boxMain: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxInputLogin: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'black',
    borderTopEndRadius: 50,
    borderBottomEndRadius: 50,
    justifyContent: 'center',
  },
  br: {
    borderWidth: 0.4,
    width: '80%',
    borderColor: 'gray',
  },
  boxInput: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  imgInput: {
    width: "15%",
    resizeMode: 'contain',
  },
  textInput: {
    width: '70%',
    fontSize: 20,
    height: 50,
    marginStart: 10,
  },
  btn_Login: {
    width: "20%",
    marginStart: '-10%',
  },
  imgBtnLogin: {
    width: '100%',
    resizeMode: 'contain',
  },
  boxForgot: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textForgot: {
    fontSize: 24,
    marginVertical: '20%',
  },
  btnRegister: {
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxRegister_1: {
    width: '85%',
    borderWidth: 1,
    padding: 10,
    borderTopEndRadius: 50,
    borderBottomEndRadius: 50,
  },
  textRegister: {
    fontSize: 24,
    fontWeight: '600',
    color: 'red',
  },
  imgBtnRegister: {
    width: '15%',
    resizeMode: 'contain',
    marginStart: '-7%'
  },
})
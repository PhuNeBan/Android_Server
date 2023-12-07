import { Image, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { AppContext } from '../Until/Context/AppContext';
import CONSTANTS from '../Until/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const EditProfile = (props) => {
    const navigation = useNavigation();
    const { inforUser, setinforUser } = useContext(AppContext);
    const [name, setname] = useState(inforUser.name);
    const [email, setemail] = useState(inforUser.email);

    const editProfile = async () => {
        let data = { id: inforUser._id, name, email };
        const token = await AsyncStorage.getItem('token');
        const doFetch = async (data) => {
            let url = `${CONSTANTS.IP}/api/user/edit`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                }, body: JSON.stringify(data),
            });
            return response.json();
        }
        const res = await doFetch(data);
        if (res.result) {
            ToastAndroid.show("Thay đổi thành công", ToastAndroid.SHORT);
            setinforUser(res.user);
            navigation.goBack();
        }
        else {
            ToastAndroid.show("Thay đổi thất bại", ToastAndroid.SHORT);
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.boxImg}>
                <Image source={require('../Images/icon-User.png')} style={styles.img} />
            </View>
            <View style={styles.boxContent}>
                <View style={styles.box_1}>
                    <TextInput placeholder='Name' style={styles.edt} value={name} onChangeText={(text) => setname(text)} />
                </View>
                <View style={styles.box_1}>
                    <TextInput placeholder='Email' style={styles.edt} value={email} onChangeText={(text) => setemail(text)} />
                </View>
            </View>
            <View style={styles.boxAccept}>
                <TouchableOpacity style={styles.btnAccept} onPress={editProfile}>
                    <Text style={styles.txtSave}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '2%',
    },
    boxImg: {
        height: '30%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        height: '80%',
        resizeMode: 'contain',
        borderWidth: 1
    },
    boxContent: {
        height: '30%',
    },
    box_1: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 90,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'orange',
        padding: '1%',
        margin: '3%'
    },
    edt: {
        width: '80%',
        color: 'black',
        fontSize: 18,
    },
    boxAccept: {
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnAccept: {
        borderRadius: 90,
        backgroundColor: 'orange',
        width: '50%',
        padding: '3%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtSave: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
})
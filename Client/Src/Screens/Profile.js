import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { AppContext } from '../Until/Context/AppContext'

const Profile = (props) => {

    const {inforUser} = useContext(AppContext);
    const {navigation} = props;

    const editProfile = () => {
        navigation.navigate('EditProfile');
    };

    return (
        <View style={styles.container}>
            <View style={styles.boxProfile}>
                <View style={styles.boxImg}>
                    <Image source={require('../Images/icon-User.png')} style={styles.imgUser} />
                </View>
                <View style={styles.boxText}>
                    <Text style={styles.txtName}>{inforUser.name}</Text>
                    <Text style={styles.txtEmail}>{inforUser.email}</Text>
                </View>
                <TouchableOpacity style={styles.btnEdit} onPress={editProfile}>
                    <Image source={require('../Images/icon-Edit.png')} style={styles.imgEdit} />
                </TouchableOpacity>
            </View>
            <View style={styles.boxContent}>
                <TouchableOpacity style={styles.box_1}>
                    <Text style={styles.txtAction}>Oder</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.box_1}>
                    <Text style={styles.txtAction}>Notification</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.box_1}>
                    <Text style={styles.txtAction}>Suport</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.box_1}>
                    <Text style={styles.txtAction}>Payment</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '2%',
        backgroundColor: 'white'
    },
    boxProfile: {
        height: '10%',
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 10,
        backgroundColor: 'white',
        borderTopEndRadius: 50,
        borderBottomEndRadius: 50
    },
    boxImg: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgUser: {
        height: '100%',
        resizeMode: 'contain'
    },
    boxText: {
        width: '60%',
        flexDirection: 'column',
    },
    txtName: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
    },
    btnEdit: {
        width: '20%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderStartWidth: 1,
        padding: '3%',
    },
    imgEdit: {
        width: 30,
        resizeMode: 'contain'
    },
    boxContent: {
        height: '90%',
        marginTop: '10%',
        alignItems : 'center',
    },
    box_1: {
        width: '45%',
        backgroundColor: 'orange',
        borderRadius: 90,
        height: '10%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '2%',
        marginTop: '5%',
        elevation: 10,
        justifyContent: 'center',
    },
    txtAction: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
})
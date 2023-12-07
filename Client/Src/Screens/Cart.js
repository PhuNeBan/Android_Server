import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import ItemCart from './ItemCart'
import { AppContext } from '../Until/Context/AppContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CONSTANTS from '../Until/Config'


const Cart = (props) => {
    const {inforUser} = useContext(AppContext);
    const [data, setdata] = useState([]);
    const [total, settotal] = useState(0);
    useEffect(() => {
        const getAllCart = async () => {
            const token = await AsyncStorage.getItem('token');
            const doFetch = async () => {
              let url = `${CONSTANTS.IP}/products${inforUser._id}`;
              const response = await fetch(url, {
                method: "GET",
                headers: {
                  "Authorization": `Bearer ${token}`,
                  "Content-Type": "application/json",
                }, 
              });
              return response.json();
            }
            const res = await doFetch();
            console.log(res);
            if (res) {
              setdata(res.carts);
              for (let i = 0; i < res.carts.length; i++) {
                settotal(total + (res.carts[i].product.price * res.carts[i].quantity));
              }
            }
          }
        getAllCart();
      return () => {}
    }, []);
    

  return (
    <View style = {styles.container}>
      <View style = {styles.boxCart}>
        <FlatList 
            data={data}
            keyExtractor={(item) => item._id}
            renderItem={({item}) => <ItemCart data = {item} />}
        />
      </View>
      <View style = {styles.boxTotal}>
        <View style = {styles.boxPrice}>
            <Text style = {styles.price}>
                Total Price
            </Text>
            <Text style = {styles.txtPrice}>
                ${total}
            </Text>
        </View>
        <View style = {styles.boxCheckout}>
            <TouchableOpacity style = {styles.btnCheckout}>
                <Text style = {styles.txtBtn}>CHECKOUT</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '2%',
    },
    boxCart: {
        height: '80%',
    },
    boxTotal: {
        height: '20%',
        borderTopWidth: 0.5
    },
    boxPrice: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
    },
    txtPrice: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
    },
    boxCheckout: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%',
    },
    btnCheckout: {
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 90,
        padding: "2%",
        backgroundColor: 'orange',
    },
    txtBtn: {
        fontSize: 25,
        color: 'black',
        fontWeight: 'bold',
    },
})

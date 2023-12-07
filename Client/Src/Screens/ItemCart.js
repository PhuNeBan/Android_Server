import { Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONSTANTS from '../Until/Config';

const ItemCart = (props) => {
  // const [cart, setcart] = useState([]);
  const { data } = props;
  const [quantity, setquantity] = useState(data.quantity);
  // console.log(data._id);

  const changeQuantity = async (tt) => {
    if (tt) {
      setTimeout(() => {
        setquantity(quantity + 1);
      }, 1000);

    } else {
      if (quantity > 1) {
        setTimeout(() => {
          setquantity(quantity - 1);
        }, 1000);
      }
    }
    updateCart();
    console.log(quantity);
  };

  const updateCart = async () => {
    const doFetch = async () => {
      const token = await AsyncStorage.getItem('token');
      const data_1 = {
        id: data._id,
        quantity: quantity
      };
      let url = `${CONSTANTS.IP}/api/cart/update`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        }, body: JSON.stringify(data_1),
      });
      return response.json();
    }
    const res = await doFetch();
    if (res.result) {
      ToastAndroid.show("Thành công", ToastAndroid.SHORT);
    }
    // console.log(quantity);
  }

  return (
    <View style={styles.container}>
      <View style={styles.boxCart}>
        <View style={styles.boxImage}>
          <Image style={styles.imgProduct} source={{ uri: data.product.image }} />
        </View>
        <View style={styles.boxContent}>
          <Text style={styles.txtName}>{data.product.name}</Text>
          <Text ></Text>
          <Text style={styles.txtPrice}>${data.product.price}</Text>
        </View>
        <View style={styles.boxChange}>
          <Text style={styles.txtQuantity}>{quantity}</Text>
          <View style={styles.boxBtnChange}>
            <TouchableOpacity style={styles.btnChange} onPress={() => changeQuantity(false)}>
              <Text style={styles.txtChange}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnChange} onPress={() => changeQuantity(true)}>
              <Text style={styles.txtChange}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default ItemCart

const styles = StyleSheet.create({
  container: {
    padding: '1.5%',
  },
  boxCart: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: '1.5%',
    elevation: 10,
    borderRadius: 10,
  },
  boxImage: {
    width: '25%',
  },
  imgProduct: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  boxContent: {
    width: '50%',
    justifyContent: 'center',
    padding: '2%',
  },
  txtName: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
  },
  txtPrice: {
    fontSize: 20,
    color: 'gray',
    fontWeight: 'bold',
  },
  boxChange: {
    width: '25%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  txtQuantity: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
  },
  boxBtnChange: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 90,
    backgroundColor: 'orange',
  },
  btnChange: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtChange: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
})
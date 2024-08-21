import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONSTANTS from '../Until/Config';
import { AppContext } from '../Until/Context/AppContext';

const DetailProduct = (props) => {
  const { route, navigation } = props;
  const { params } = route;
  const { inforUser } = useContext(AppContext);

  const [product, setProduct] = useState({
    _id: '',
    name: '',
    image: [],
    price: 0,
    description: '',
  });
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const url = `${CONSTANTS.IP}/products/${params.id}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const res = await response.json();

        if (res) {
          setProduct(res);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
        // Handle error appropriately, e.g., show an error message to the user
      }
    };

    getProduct();

    return () => { };
  }, [params.id]);

  const changeQuantity = (isIncrement) => {
    if (isIncrement) {
      setQuantity(quantity + 1);
    } else {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxImage}>
        {product.image && product.image.length > 0 ? (
          <Image source={{ uri: product.image[0] }} style={styles.imgProduct} />
        ) : (
          <Text>No Image Available</Text>
        )}
      </View>
      <View style={styles.boxContent}>
        <View style={styles.boxHead}>
          <View>
            <Text style={styles.txtName}>{product.name}</Text>
            <Text style={styles.txtPrice}>${product.price}</Text>
          </View>
        </View>
        <View style={styles.boxDescription}>
          <Text style={styles.txtDescription}>{product.description}</Text>
        </View>
        <View style={styles.boxAdd}>
          <View style={styles.boxQuantity}>
            <TouchableOpacity style={styles.btnChange} onPress={() => changeQuantity(false)}>
              <Text style={styles.txtChange}>-</Text>
            </TouchableOpacity>
            <Text style={styles.txtQuantity}>{quantity}</Text>
            <TouchableOpacity style={styles.btnChange} onPress={() => changeQuantity(true)}>
              <Text style={styles.txtChange}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.btnAdd}>
            <Text style={styles.txtAdd}>ADD TO CART</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DetailProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '2%',
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '100%',
  },
  boxImage: {
    height: '50%',
    justifyContent: 'center',
  },
  imgProduct: {
    width: 450,
    height: 300,
    resizeMode: 'contain',
  },
  boxContent: {
    height: '50%',
    borderTopStartRadius: 90,
    borderTopEndRadius: 90,
    backgroundColor: 'orange',
  },
  boxHead: {
    height: '30%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '10%',
    marginTop: 10, // Thêm dòng này để thay đổi margin top
  },
  txtName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  txtPrice: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  boxDescription: {
    height: '45%',
    fontStyle: 'italic',
    paddingHorizontal: '10%',
  },
  txtDescription: {
    fontSize: 15,
    fontWeight: '200',
    color: 'white',
  },
  boxAdd: {
    height: '25%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
  },
  boxQuantity: {
    width: '30%',
    height: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnChange: {
    width: '25%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 80,
  },
  txtChange: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  txtQuantity: {
    width: '50%',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  btnAdd: {
    width: '60%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 90,
  },
  txtAdd: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'orange',
  },
});

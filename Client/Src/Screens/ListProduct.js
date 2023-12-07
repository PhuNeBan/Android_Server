import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONSTANTS from '../Until/Config';
import { AppContext } from '../Until/Context/AppContext';
import ItemProduct from './ItemProduct';

const ListProduct = (props) => {
  const { navigation } = props;
  const [dataNe, setdataNe] = useState([]);
  const [categories, setcategories] = useState([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const { inforUser } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async (url, stateSetter) => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const res = await response.json();
        if (res) {
          stateSetter(res);
        }
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
      }
    };

    fetchData(`${CONSTANTS.IP}/products`, setdataNe);
    fetchData(`${CONSTANTS.IP}/categories`, setcategories);
  }, []);

  const changeCart = () => {
    navigation.navigate('Cart');
  };

  const ListCategories = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setSelectedCategoryIndex(index)}>
            <View
              style={{
                ...styles.btnCategory,
                backgroundColor:
                  selectedCategoryIndex === index ? 'orange' : '#ffdab9',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  color:
                    selectedCategoryIndex === index ? 'white' : 'orange',
                }}>
                {category.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.boxTextHello}>
          <Text style={styles.txtHello_2}>What do you want today ?</Text>
        </View>
        <TouchableOpacity style={styles.btnCart} onPress={changeCart}>
          <View></View>
          <Image source={require('../Images/icon-Cart.png')} style={styles.imgCart} />
        </TouchableOpacity>
      </View>
      <View style={styles.boxSearch}>
        <View style={styles.boxSearch_1}>
          <Image source={require('../Images/icon-Search.png')} style={styles.imgSearch} />
          <TextInput placeholder='Search product' style={styles.edtSearch} />
        </View>
        <TouchableOpacity style={styles.btnFilter}>
          <Image source={require('../Images/icon-Search.png')} />
        </TouchableOpacity>
      </View>
      <View>
        <ListCategories />
      </View>
      <View>
        <FlatList
          data={dataNe}
          style={styles.flatList}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) =>
            <ItemProduct
              dulieu={item}
              navigation={navigation} />}
          numColumns={2}
        />
      </View>
    </View>
  );
};

export default ListProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '2%',
    paddingTop: 24,
    backgroundColor: 'white',
  },
  header: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boxTextHello: {
    width: '80%',
  },
  txtHello_1: {
    fontSize: 30,
    color: 'black',
    fontWeight: '700',
  },
  txtHello_2: {
    fontSize: 20,
    color: '#a9a9a9',
    fontWeight: '700',
  },
  btnCart: {
    width: '20%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imgCart: {
    width: 40,
    height: 30,
    resizeMode: 'contain',
    borderRadius: 90,
  },
  boxSearch: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '10%',
  },
  boxSearch_1: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
  },
  btnFilter: {
    width: '18%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'orange',
  },
  imgSearch: {
    resizeMode: 'contain',
    height: 50,
  },
  edtSearch: {
    width: '80%',
    fontSize: 20,
  },
  categoriesList: {
    marginVertical: '5%',
  },
  btnCategory: {
    height: 45,
    width: 120,
    marginEnd: 10,
    borderRadius: 20,
  },
  flatList: {
    height: 500,
  },
});

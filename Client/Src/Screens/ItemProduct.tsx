import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ItemProduct = (props) => {
    const { navigation, dulieu } = props;
    if(!dulieu.image[0])
    {
        console.log('===============>>>>88888',dulieu);
    }

    // console.log('===============>>>>',dulieu);
    // console.log('===============',dulieu.image[0]);
    
    const chooseProduct = () => {
        navigation.navigate('DetailProduct', {id: dulieu._id});
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style = {styles.boxItem} onPress={chooseProduct}>
                <Image source={{uri:dulieu.image[0]}} style = {styles.imgProduct}/>
                <View style = {styles.boxContent}>
                    <Text style = {styles.txtCategory}>{dulieu.category_id.name}</Text>
                    <View style = {styles.boxAdd}> 
                        <Text style = {styles.txtPrice}>${dulieu.price}</Text>
                        <TouchableOpacity style = {styles.btnAdd}>
                            <Text style = {styles.txtAdd}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ItemProduct

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 10,
        flex:1,
        justifyContent: 'center',
    },
    boxItem: {
        width: 200,
        height: 280,
        borderRadius: 20,
        backgroundColor: 'white',
        elevation: 15,
        marginBottom :'10%',
    },
    imgProduct: {
        width: '100%',
        height: '50%',
        resizeMode: 'contain',
    },
    boxContent: {
        padding: '10%',
        justifyContent: 'space-between',
    },
    txtName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    txtCategory: {
        fontSize: 14,
    },
    boxAdd: {
        marginTop: '8%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    txtPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    btnAdd: {
        width: 40,
        height: 40,
        borderRadius: 90,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange',
    },
    txtAdd: {
        fontSize: 20,
        color: 'black',
    },
})
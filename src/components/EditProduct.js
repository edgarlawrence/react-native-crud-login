import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Platform, Button } from 'react-native'
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';

export default function  EditProduct ({ navigation, route })  {
    const [namaProduk, setNamaProduk] = useState(route.params.name.nama_produk)
    const [kodeProduk, setKodeProduk] = useState(route.params.name.kode_produk)
    const [stok, setStok] = useState(route.params.name.stok_produk);
    const [image, setImage] = useState(null);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'Apple', value: 'apple'},
      {label: 'Banana', value: 'banana'}
    ]);

const editForm  = () => {
    const getData = route.params.name.id
    const data = {
        nama_produk: namaProduk,
        kode_produk: kodeProduk,
        foto_produk: image
    }

    axios.put(`https://4b8e-180-252-160-60.ngrok.io/api/posted/${getData}`, data , {
        "Content-Type": "application/x-www-form-urlencoded", 
        "Accept": "application/json",
        'Access-Control-Allow-Origin': '*'
    })
    .then(res => {
        console.log('res', res.data)
        return res.data
        setNamaProduk('')
        setKodeProduk('')
        setStok('')
        setImage(null)
    })
    .catch(error => console.log(error));
    console.log(data) 
    ///navigation.popToTop()
    navigation.push('Login')
}


useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };


    return (
        <View style={styles.logins}>
            <View>
                <Text style={styles.labels}>Nama Produk</Text>
                <TextInput
                    value={namaProduk}
                    onChangeText={(value) => setNamaProduk(value)}
                    style={styles.inputs}
                />
            </View>
    
            <View>
                <Text style={styles.labels}>Kode Produk</Text>
                <TextInput
                    value={kodeProduk}
                    onChangeText={(value) => setKodeProduk(value)}
                    style={styles.inputs}
                />
            </View>
    
            <View>
                <Text style={styles.labels}>Stok Produk</Text>
                <TextInput
                    value={stok}
                    onChangeText={(value) => setStok(value)}
                    style={styles.inputs}
                />
            </View>

            <View>
                <TouchableOpacity 
                    onPress={pickImage}
                    style={styles.imgs}
                >
                    <Text  style={styles.uploadImg}> Upload Image </Text>
                </TouchableOpacity>
            </View>
    
            <View>
                <TouchableOpacity style={styles.adds} onPress={editForm}>
                <Text style={styles.uploadImg}> Add </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
logins: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 3,
    paddingTop: 50
},
labels: {
    fontSize: 25
},
inputs: {
    borderColor: 'black',
    borderWidth: 1,
    width: 350,
    marginBottom: 15
},
categories: {
    width: 350,
    marginBottom: 20,
    zIndex: 10
},
imgs: {
    width: 200,
    height: 50,
    backgroundColor: '#7A7265',
    borderRadius:10,
    marginBottom: 50
},
uploadImg: {
    color: 'white',
    textAlign: 'center',
    paddingTop: 13,
},
adds: {
    backgroundColor: '#06AED5',
    width: 200,
    height: 50,
}
})

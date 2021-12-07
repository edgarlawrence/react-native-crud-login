import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Platform, FlatList } from 'react-native'
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';

function AddProduct ({navigation}) {
    const [namaProduk, setNamaProduk] = useState('')
    const [kodeProduk, setKodeProduk] = useState('')
    const [stok, setStok] = useState('');
    const [idKategori, setIdKategori] = useState(null)
    const [image, setImage] = useState(null);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'makanan', value: 1},
      {label: 'minuman', value: 2}
    ]);

const addForm  = () => {
    const data = {
        nama_produk: namaProduk,
        kode_produk: kodeProduk,
        foto_produk: image,
        id_kategori: idKategori
    }

    const headers = { 
        'Accept': 'Application/json',
        
    };

    axios.post('https://7672-180-252-174-234.ngrok.io/api/posted', data , {
        "Content-Type": "application/x-www-form-urlencoded", 
        "Accept": "application/json",
        'Access-Control-Allow-Origin': '*',
        "Authorization": "Bearer " + `53|14dgjNTwdBaVSO2XAXJW3DGKhDEUPZOfq5Mm9O3F`
    })
    .then(res => {
        console.log('res', res.data)
        return res.data
        setNamaProduk('')
        setKodeProduk('')
        setImage(null)
        setIdKategori(null)
    })
    .catch(error => console.error(error.response.data));
    console.log(data) 
    navigation.push('HomeProduct')
}


const addFormStok  = () => {
    const data = {
        jumlah_barang: stok
    }

    const headers = { 
        'Accept': 'Application/json'
    };

    axios.post('https://32ef-180-252-168-122.ngrok.io/api/stock', data , {
        "Content-Type": "application/x-www-form-urlencoded", 
        "Accept": "application/json",
        'Access-Control-Allow-Origin': '*'
    })
    .then(res => {
        console.log('res', res.data)
        return res.data
        setStok('')
    })
    .catch(error => console.error(error.response.data));
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

            <View style={styles.categories}>
                <Text style={styles.labels}>Kategori Produk</Text>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    
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
                <TouchableOpacity 
                    style={styles.adds} 
                    onPress={addForm}
                    onPressIn={addFormStok}
                >
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

export default AddProduct;

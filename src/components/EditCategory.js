import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Platform, Button } from 'react-native'
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';


export default function EditCategory ({ navigation, route }) {
    const [kategori, setKategori] = useState(route.params.name.nama_kategori);
    const editForm  = () => {
        const getData = route.params.name.id
        const data = {
            nama_kategori: kategori
        }
    
        axios.put(`https://1644-180-252-160-60.ngrok.io/api/category/${getData}`, data , {
            "Content-Type": "application/x-www-form-urlencoded", 
            "Accept": "application/json",
            'Access-Control-Allow-Origin': '*'
        })
        .then(res => {
            console.log('res', res.data)
            return res.data
            setKategori('')
        })
        .catch(error => console.log(error));
        console.log(data) 
        ///navigation.popToTop()
        navigation.push('Login')
    }


    return (
        <View style={styles.logins}>
            <Text style={styles.labels}>Nama Kategori</Text>
            <TextInput
                 value={kategori} 
                 onChangeText={(value) => setKategori(value)}
                 style={styles.inputs} />

            <View>
                <TouchableOpacity 
                    onPress={editForm}
                    style={styles.adds}
                >
                    <Text style={styles.uploadImg}> Save </Text>
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
        fontSize: 25,
        marginBottom: 10
    },
    inputs: {
        borderColor: 'black',
        borderWidth: 1,
        width: 350,
        marginBottom: 15
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
        borderRadius:10,
    }
})

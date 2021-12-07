import React, {useState} from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import axios from 'axios';

export default function AddCategory ({ navigation }) {
    const [kategori, setKategori] = useState('')

    const addForm  = () => {
        const data = {
            nama_kategori: kategori,
        }
    
        axios.post('https://0af6-180-252-160-60.ngrok.io/api/category', data , {
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
        navigation.popToTop()
        // navigation.push('HomeCategory')
    }
    return (
        <View style={styles.logins}>
            <Text style={styles.labels}>Nama Kategori</Text>
            <TextInput value={kategori} onChangeText={(value) => setKategori(value)} style={styles.inputs} />

            <View>
                <TouchableOpacity onPress={addForm} style={styles.imgs}>
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

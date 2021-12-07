import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, localStorage } from 'react-native'
import axios from 'axios'
import AsyncStorageLib from '@react-native-async-storage/async-storage';

function Login({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const logins = async() => {
        const data = {
            email: username,
            password: password,
            password_confirmation: passwordConfirm
        }

        await axios.post('https://7672-180-252-174-234.ngrok.io/api/login', data, {
            "Accept": "application/json"
        })
        .then(res => {
            console.log(res.data)
            if(res.data.status == "success") {
                navigation.navigate("Home")
                AsyncStorageLib.setItem('token', res.data.token)
            }
        })
        .catch(err => {console.log(err)})

        // try {
        //     await AsyncStorageLib.setItem('Token', setTokens(res.data.token))
        // } catch (err) {
        //     console.log(err)
        // }
    }


        return (
            <View style={styles.Logins}>
                <Text> Welcome, Please Login </Text>
                <View>
                    <Text style={styles.loginLabel}> Username </Text>
                    <TextInput value={username} style={styles.inputs} onChangeText={(value) => setUsername(value)} />
                </View>
                <View>
                    <Text style={styles.loginLabel}> Password </Text>
                    <TextInput secureTextEntry={true} value={password} style={styles.inputs} onChangeText={(value) => setPassword(value)} />
                </View>

                <View>
                    <Text style={styles.loginLabel}> Confirm Password </Text>
                    <TextInput secureTextEntry={true} value={passwordConfirm} style={styles.inputs} onChangeText={(value) => setPasswordConfirm(value)} />
                </View>

                <View>
                    <TouchableOpacity 
                        onPress={logins}
                        style={styles.btns1}>
                       <Text style={styles.loginText}>  Log In </Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Register')}
                        style={styles.btns2}>
                       <Text style={styles.loginText}>  Register </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
}

const styles = StyleSheet.create({
    Logins: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 3,
        paddingTop: 150
    },
    inputs: {
        borderBottomColor: 'black',
        borderWidth: 1,
        marginBottom: 20,
        width: 350
    },
    btns1: {
        backgroundColor: '#06AED5',
        padding: 10,
        width: 200,
        height: 50,
        marginBottom: 20
    },
    btns2: {
        backgroundColor: '#F49F0A',
        padding: 10,
        width: 200,
        height: 50,
        marginBottom: 20
    },
    loginText: {
        textAlign: 'center',
        paddingTop: 5,
        color: 'white'
    },
    loginLabel: {
        marginBottom: 10
    }
})

export default Login
import React, {useState} from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import axios from 'axios'

function Register({navigation}) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [tokens, setTokens] = useState(null);

    const regist = () => {
        const data = {
            name: name,
            email: username,
            password: password,
            password_confirmation: passwordConfirm
        }

        axios.post('https://c1f9-180-252-168-122.ngrok.io/api/register', data, {
            'Content-Type': 'application/x-www-form-urlencoded',
            "Accept": "application/json"
        })
        .then(res => {
            // console.log(res.data.token)
            // console.log(res.data)
            // tokens(res.data.token)
            // console.log(tokens)
            // setTokens(tokens)
            if(res.data.status==="success"){
                console.log(data)
                navigation.navigate('Home')
              } else {
                console.log("error")
              }
        })
        .catch(err => {console.log(err)})
    }

    return (
        <View style={styles.Logins}>
            <Text> Please Regist Your Account </Text>

            <View>
                <Text style={styles.loginLabel}> Name </Text>
                <TextInput 
                    value={name}
                    onChangeText={(value) => setName(value)}
                    style={styles.inputs} />
            </View>

            <View>
                <Text style={styles.loginLabel}> Email </Text>
                <TextInput 
                    value={username}
                    onChangeText={(value) => setUsername(value)}
                    style={styles.inputs} />
            </View>

            <View>
                <Text style={styles.loginLabel}> Password </Text>
                <TextInput 
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                    style={styles.inputs} />
            </View>

            <View>
                <Text style={styles.loginLabel}> Password </Text>
                <TextInput 
                    value={passwordConfirm}
                    onChangeText={(value) => setPasswordConfirm(value)}
                    style={styles.inputs} />
            </View>

            <View>
                    <TouchableOpacity 
                        onPress={regist}
                        style={styles.btns2}>
                       <Text style={styles.loginText}>  Sign Up </Text>
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

export default Register

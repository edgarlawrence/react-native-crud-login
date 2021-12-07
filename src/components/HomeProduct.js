import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import deleteLogo from '../img/delete.png'
import editLogo from '../img/edit.png'
import axios from 'axios'
import AsyncStorageLib from '@react-native-async-storage/async-storage'

const HomeProduct = ({ navigation }) => {
    const [product, setProduct] = useState([])
    const [filterData, setFilterData] = useState([])
    const [search, setSearch] = useState('')

    const url = 'https://7672-180-252-174-234.ngrok.io/api/posted';

    const searchFilter = (e) => {
        if(e) {
            const newData = product.filter((notes) => {
                const notesData = notes.nama_produk ? notes.nama_produk.toUpperCase() : ''.toUpperCase()
                const eData = e.toUpperCase()
                return notesData.indexOf(eData) > -1
            })
            setFilterData(newData)
            setSearch(e)
            console.log(newData)
        } else {
            setFilterData(product)
            setSearch(e)
        }
    }

    const fetchData = async() => {
        const user = await axios.get(url, {
            "Accept": "application/json",
            "Authorization": "Bearer "+ AsyncStorageLib.getItem('token')
        })
        .then(res => {
            setProduct(res.data)
            setFilterData(res.data)
        })
        console.log(user)
    } 

    useEffect(() => {
        fetchData()
    }, [])

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteData = (id) => {
        axios.delete(`${url}/${id}`)
        .then(res => {
            const del = product.filter(productsss => id !== productsss.id)
            setProduct(del)
            setFilterData(del)
        }) 
        .catch(err => err)
    }

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...product];
        const prevIndex = product.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 0);
        setProduct(newData);
    };

    return (
        <View style={styles.logins}>
            <Text style={styles.titleText}> Home Product </Text>
            
            <View>
                <TextInput style={styles.inputs} 
                    value={search}
                    onChangeText={(e) => searchFilter(e)}
                    placeholder="search product here"
                    textAlign={'center'} 
                />
            </View>

            <View>
                <TouchableOpacity style={styles.addbtns}  onPress={() => navigation.navigate('AddProduct')} >
                    <Text style={styles.btnsText}> Add Product </Text>
                </TouchableOpacity>
            </View>

            <View>
            <SwipeListView
                         useFlatList={true}
                         keyExtractor={(key) => key.id.toString()}
                         data={filterData}
                         renderItem={(rowData, rowMap, item) => (
                             <View>
                             <TouchableOpacity>
                                 <Text style={styles.flatStyle}> {rowData.item.nama_produk} </Text>
                             </TouchableOpacity>
                             </View>
                         )}
                         renderHiddenItem={ ( rowData, rowMap, item ) => (
                            <View style={styles.rowBack}>
                            <TouchableOpacity
                            onPress={() => navigation.navigate('EditProduct', {name: rowData.item})}
                            >
                                <Image source={editLogo} 
                                style={styles.editBox}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity 
                            style={[styles.backRightBtn, styles.backRightBtnRight]}
                            onPress={() => deleteRow(rowData.item.id)}
                            onPressIn={() => deleteData(rowData.item.id)}
                            >
                                <Text style={styles.backTextWhite}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                         )}
                         leftOpenValue={75}
                         rightOpenValue={-150}
                         onRowOpen={(rowKey, rowMap) => {
                             setTimeout(() => {
                                 rowMap[rowKey] && rowMap[rowKey].closeRow()
                             }, 2000)
                         }}
                     />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    logins: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 3,
        paddingTop: 25
    },
    inputs: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: 350,
        marginBottom: 15
    },
    titleText: {
        marginBottom: 10
    },
    editBox: {
        height: 35,
        width: 35
    },
    rowBack: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,

    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 150,
        height: 50,
        backgroundColor: 'red',
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0
    },
    backTextWhite: {
        color: '#FFF',
    },
    flatStyle: {
        backgroundColor: '#fffaed',
        height: 50,
        width: 420,
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 10,
        fontSize: 25,
        paddingTop: 5,
        color: 'black',
        paddingLeft: 10
    },
    addbtns: {
        width: 350,
        height: 50,
        backgroundColor: '#00A6A6',
        borderRadius: 10,
        marginBottom: 10
    },
    btnsText: {
        textAlign: 'center',
        fontSize: 20,
        paddingTop: 10
    }
})

export default HomeProduct

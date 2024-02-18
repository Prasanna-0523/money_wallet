import React, { useRef, useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Modal, Pressable } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo'
import moment from 'moment';
import DatePicker from 'react-native-date-picker'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'


export default function Contribution({ navigation, route }) {
    const data = route.params.item;
    const [date, setDate] = useState(new Date())
    const { getItem, setItem } = useAsyncStorage('goals')
    const [open, setOpen] = useState(false)
    const [updateAmount, setUpdateAmount] = useState(0)
    const [modalVisible, setModalVisible] = useState(false);
    const [newDate, setNewDate] = useState(false)
    const refAcc = useRef()

    const [textErr, setTextErr] = useState("")
    const totalData = route.params.newData
    console.log(totalData, "---data");
    console.log(data, "objjjjjj");


    const handleSubmit = async () => {
        if (updateAmount === undefined) {
            setTextErr("enter the amount");
            setModalVisible(true)
        }
        else {

            console.log(typeof(updateAmount),"----------------")
            let amount = data?.updatedAmount ? (parseInt(data?.updatedAmount) + parseInt(updateAmount)) : parseInt(updateAmount)
            data['updatedAmount'] = amount
            data['date'] = newDate ? date : data.date
            const index = totalData.findIndex((item) => item.id === data.id)
            totalData[index] = data
            await setItem(JSON.stringify(totalData))

            console.log(totalData, "data--55555");
            console.log(data, "objjjjjdfsdfdsj");

        }
        navigation.navigate("Home")
    }

    return (
        <View>
            <View style={styles.box}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Entypo name='cross' size={20} color='#fff' />
                </TouchableOpacity>
                <Text style={styles.text}>Add Contribution</Text>
                <TouchableOpacity onPress={() => handleSubmit()} >
                    <AntDesign name='check' size={20} color='#fff' />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#BABABA', height: 40 }}>
                <Text style={{ paddingHorizontal: 8 }}>Amount*</Text>
                <TextInput
                    style={styles.input1}
                    // placeholder="Amount*"
                    onChangeText={(value) => setUpdateAmount(value)}
                    keyboardType="numeric"
                />
            </View>
            <Text style={{ paddingHorizontal: 8, marginTop: 10, marginBottom: 20 }}>*Negative decrease savings</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#BABABA', height: 40 }}>
                <Text style={{ paddingHorizontal: 8 }}>Target date</Text>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => setOpen(true)} >
                    <Text>{moment(data.date).format('DD/MM/YYYY')}</Text>
                    <AntDesign name='right' size={20} />
                </TouchableOpacity>
            </View>
            {open &&
                <DatePicker
                    modal
                    open={open}
                    date={date}
                    mode="date"
                    onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                        setNewDate(true)
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}
                />
            }
            {
                modalVisible &&
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            // Alert.alert('Modal has been closed.');
                            setModalVisible(!modalVisible);
                        }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>{textErr}</Text>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.textStyle}>ok</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                </View>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    box: {
        backgroundColor: 'black',
        width: 'auto',
        height: 50,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        letterSpacing: 3,
        paddingHorizontal: 20,
        marginBottom: 15
    },
    text: {
        textAlign: 'center',
        color: "#fff",
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    text1: {
        textAlign: 'center',
        fontSize: 14,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5
    },
    input: {
        height: 40,
        backgroundColor: '##BABABA',
        // margin: 12,
        borderColor: '#BABABA',
        borderWidth: 1,
        padding: 10,
    },
    input1: {
        height: 40,
        marginBottom: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
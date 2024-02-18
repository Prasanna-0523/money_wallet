import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, Pressable } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo'
// import DropDown from './DropDown';
import DatePicker from 'react-native-date-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { addGoals } from '../Redux/action';
import {useAsyncStorage} from '@react-native-async-storage/async-storage'
// import BottomSheet  from './BottomSheet';

export default function AddGoals({ navigation }) {
  const [date, setDate] = useState(new Date())
  const {getItem, setItem} = useAsyncStorage('goals')
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState()
  const [amount, setAmount] = useState()
  const [account, setAccount] = useState()
  const [modalVisible, setModalVisible] = useState(false);
  const [newData, setNewData] = useState([]);
  const [textErr, setTextErr] = useState("")
  // const [updatedData, setUpdatedData] = useState([])
  const dispatch = useDispatch()
  const refTitle = useRef()
  const refAmount = useRef()
  const refAcc = useRef()

  // const {goalData} = useSelector((state) =>  state.reducer)
  let id = newData?.length + 1
  let data
  const handleSubmit = async () => {
    if (title === undefined) {
      setTextErr("Please Enter the title")
      setModalVisible(true);
    }
    else if (amount === undefined) {
      setTextErr("Please Enter the amount");
      setModalVisible(true);
    }
    else {
      try {

        const obj = { id: id, title: title, amount: amount, account: account, date: date }

        data = [...newData, obj]
        // console.log(data, "--------");
        // setUpdatedData([...updatedData, obj])
        await setItem(JSON.stringify(data))
        // dispatch(addGoals([...goalData, obj]))
        refTitle.current.setNativeProps({ text: '' })
        refAmount.current.setNativeProps({ text: '' })
        refAcc.current.setNativeProps({ text: '' })
        setDate(new Date())
      } catch {
        setTextErr("not added!")
        setModalVisible(true)
      }
      navigation.navigate("Home")
    }
  }

  console.log(newData,"-----------------");

  const getData = async () => {
    try {
      const value = await getItem();
      let d= JSON.parse(value)
      console.log(d,"-dfdff");
      if(d !== null)
      setNewData(d)
    }
    catch {
      console.log("notadesds")
    }
  }
  
  useEffect(() => {
    getData();
  },[])

  return (
    <>
      <View>
        <View style={styles.box}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Entypo name='cross' size={20} color='#fff' />
          </TouchableOpacity>
          <Text style={styles.text}>Add Goal</Text>
          {/* <TouchableOpacity onPress={() => AsyncStorage.clear()}>
            <Entypo name='cross' size={20} color='#fff' />
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => handleSubmit()} >
            <AntDesign name='check' size={20} color='#fff' />
          </TouchableOpacity>
        </View>
        <View >
          <View style={styles.container}>
            <AntDesign name="camera" size={70} />
            <Text style={styles.text1}>Add icon or photo</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ marginLeft: 12 }} >TITLE OF GOAL</Text>
            <TextInput
              ref={refTitle}
              style={styles.input}
              placeholder="Enter title of goal"
              onChangeText={(value) => setTitle(value)}
            // value={number}
            />
            <Text style={{ marginLeft: 12, marginTop: 15 }} >GOAL INFO</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#BABABA', height: 40 }}>
              <Text style={{ paddingHorizontal: 8 }}>Goal amount</Text>
              <TextInput
                ref={refAmount}
                style={styles.input1}
                placeholder="Enter amount"
                onChangeText={(value) => setAmount(value)}
                keyboardType="numeric"
              />
            </View>
            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#BABABA', height: 40 }}>
            <Text style={{ paddingHorizontal: 8 }}>Goal Currency</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Dropdown")} >
              <AntDesign name='right' size={20} />
            </TouchableOpacity>
          </View> */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#BABABA', height: 40 }}>
              <Text style={{ paddingHorizontal: 8 }}>Target date</Text>
              <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => setOpen(true)} >
                <Text>{date.toDateString()}</Text>
                <AntDesign name='right' size={20} />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#BABABA', height: 40 }}>
              <Text style={{ paddingHorizontal: 8 }}>Saving account</Text>
              <TextInput
                ref={refAcc}
                style={styles.input1}
                placeholder="Enter account"
                onChangeText={(value) => setAccount(value)}
              />
            </View>
            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#BABABA', height: 40 }}>
              <Text style={{ paddingHorizontal: 8 }}>Saving frequency</Text>
              <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => setFrequency(true)} >
                {/* <Text>{date.toDateString()}</Text> */}
            {/* <AntDesign name='right' size={20} />
              </TouchableOpacity>
            </View>  */}
          </View>
        </View>
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
      {/* {frequency &&
        <BottomSheet />
      } */}
    </>
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
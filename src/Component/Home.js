import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native'
import ShowList from './ShowList'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import CreateButton from './Button/CreateButton'
import AddButton from './Button/AddButton'
import { useIsFocused } from '@react-navigation/native'

export default function Home({ navigation }) {
    const { getItem } = useAsyncStorage('goals')
    const [newData, setNewData] = useState([])
    const isFocused = useIsFocused()
    const handlenavigate = () => {
        navigation.navigate("Addgoals")
    }
    
    const onNavigate = () => {
        navigation.navigate("Contribution")
    }
    const getData = async () => {
        try {
            const value = await getItem();
            let d = JSON.parse(value)
            // console.log(d, "-dfdff");
            if (d !== null)
                setNewData(d)
        }
        catch {
            console.log("notadesds")
        }
    }

    useEffect(() => {
        getData();
    }, [isFocused])

    console.log(newData,"newdafatat");

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.box}>
                <Text style={styles.text}>Goals</Text>
                <TouchableOpacity onPress={handlenavigate} >
                    <Text style={styles.text1}>+</Text>
                </TouchableOpacity>
            </View>
            {newData?.length > 0 ?
                <View style={styles.list}>
                    <ShowList  newData={newData} navigation={navigation} />
                    <CreateButton handlenavigate={handlenavigate} />
                </View>
                :
                <AddButton handlenavigate={handlenavigate} />
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
    },
    text: {
        color: "#fff",
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    text1: {
        color: "#fff",
        fontSize: 30,
    },
    container: {
        marginTop: 120,
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 5,
    },
    list: {
        // justifyContent:'center',
        // alignItems:'center',
        // flexDirection:'column',
        flex: 1,
        marginLeft: 0
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    btn: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
    }

});

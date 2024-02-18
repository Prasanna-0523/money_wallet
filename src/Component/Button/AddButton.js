import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
export default function AddButton({ handlenavigate }) {
    // const navigate = () => {
    //     navigation.navigate("Addgoals")
    // }
    return (
        <View style={styles.container}>
            <Image source={require('../../images/arch.png')} style={{ width: 120, height: 120, marginBottom: 10, opacity: 0.5 }} />
            <Text style={{ marginBottom: 5 }}>You do not have active goals</Text>
            <Text style={{ marginBottom: 5 }}>Press "Add Goals" to start.</Text>
            <TouchableOpacity onPress={handlenavigate} style={styles.appButtonContainer}
            >
                <Text style={styles.btn}>Add Goal</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
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
    },
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
});

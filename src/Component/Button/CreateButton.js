import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/Ionicons';

export default function CreateButton({handlenavigate }) {
    return (
        <TouchableOpacity onPress={handlenavigate} style={styles.appButtonContainer}
        >
            <AntDesign name='add' size={30} style={styles.icon} />
            <Text style={styles.btn}>Create Goal</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    appButtonContainer: {
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderStyle:'dashed',
        borderColor:'#b0afac',
        borderWidth:2
    },
    btn: {
        fontSize: 18,
        color: "#b0afac",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "capitalize",
    },
    icon: {
        alignSelf: 'center'
    }
});

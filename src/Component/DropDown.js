import React, { useState } from 'react'
import { StyleSheet } from 'react-native';
// import { Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';

export default function DropDown() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'AED', value: 'aed' },
        { label: 'AFN', value: 'afn' },
        { label: 'ALL', value: 'all' },
    ]);
    return (
        <DropDownPicker style={styles.input}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
        />
    )
}
const styles = StyleSheet.create({

    input: {
        color: '##BABABA',
        // margin: 12,
        borderWidth: 0,
        padding: 10,
    },
});


import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import ProgressBar from 'react-native-progress/Bar';
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'


const ShowList = ({ navigation, newData }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [updateAmount, setUpdateAmount] = useState(0)
  const [progress, setProgress] = useState(0.01)
  // let amount
  // newData.forEach(element => {
  //   amount = ((updateAmount * 100)/element?.amount)/100
  //   // setProgress()
  // });

  //  console.log(navigation,"----")

  const handlenavigate = (id, data) => {
    setSelectedId(id)
    navigation.navigate('contribution', { item: data, newData: newData })
  }


  const Item = ({ item, onPress, backgroundColor, textColor, amount }) => (
    // console.log(item,"--------------------------");
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      {console.log(item.date)}
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <AntDesign name='camera' size={40} style={{ marginRight: 10 }} />
        <Text style={[styles.title, textColor]}>{item.title}</Text>
      </View>
      <Text style={[styles.title1, textColor]}>by {moment(item.date).format('DD/MM/YYYY')}</Text>
      <ProgressBar progress={amount} width={300} height={20} />
      <Text>{item?.updatedAmount} ({amount}%) of {item.amount}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    // console.log(item,"item-----------");
    const backgroundColor = '#fff'
    const color = 'black';
    let amount = ((item?.updatedAmount ? parseInt(item?.updatedAmount) : updateAmount * 100) / parseInt(item?.amount))
    let am = amount
    return (
      <Item
        item={item}
        amount={am}
        onPress={() => handlenavigate(item.id, item)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={newData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    // flexDirection: 'row',
    // flex: 1
  },
  title: {
    fontSize: 20,
  },
  title1: {
    fontSize: 12,
    marginLeft: 50,
    marginBottom: 5
  },
});

export default ShowList;
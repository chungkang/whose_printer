import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";

// 리스트에 쓰이는 커스텀 태그 컴포넌트
const Item = ({ name, age }) => (
  <View style={styles.item}>
    <Text key={name} style={styles.textStyle}>
      {name} - Age {age}
    </Text>
  </View>
);

const PrinterScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <Item name={item.name} age={item.age} />
  );

  let baseList = [
    { name: "Friend #1", age: 20 },
    { name: "Friend #2", age: 21 },
  ];

  const [list, setList] = useState(baseList);

  // 파일 업로드 기능
  _pickDocument = async () => {

    let result = await DocumentPicker.getDocumentAsync({});

    //    alert(result.uri);

    // Object {
    //   "name": "CJZ2021710205844.pdf",
    //   "size": 555892,
    //   "type": "success",
    //   "uri": "file:///var/mobile/Containers/Data/Application/2B67E86E-6FDA-40FB-9BFF-6D2851940317/Library/Caches/ExponentExperienceData/%2540anonymous%252Frn-starter-1-2da7c852-f8af-4e82-9252-d5ef33b91e31/DocumentPicker/EF4E5F54-8015-4053-AFA2-17EAAE51E971.pdf",
    // }
    baseList.push({ name: result.name, age: 0 });
    //    console.log(list);
    setList(baseList);

  };


  // 화면이 처음 마운트 될 때마 실행
  useEffect(() => {
    console.log("List 화면이 마운트 될 때 실행");
  }, []);

  // 렌더링 될 때 마다 실행
  useEffect(() => {
    console.log("렌더링 될 때 마다 실행");
  });

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          height: 100,
          padding: 20,
        }}
      >
        <View style={{ flex: 0.5 }}>
          <Text>{navigation.getParam('center')}</Text>
          <TouchableOpacity 
            onPress={() => Linking.openURL('tel:' + navigation.getParam('tel'))}
          >
            <Text style={styles.telNo}>
              {navigation.getParam('tel')}
            </Text>
          </TouchableOpacity>
          
        </View>
        <View style={{ flex: 0.5 }}>
          <Button title="출력요청" color="#841584" />
        </View>
      </View>

      <View>
        <Button title="파일 업로드" onPress={_pickDocument} />
      </View>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={item => item.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    marginVertical: 50,
  },
  telNo: {
    color: '#0000FF'
  },
});

export default PrinterScreen;

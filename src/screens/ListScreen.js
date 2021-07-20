import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  ScrollView,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";

// 파일 업로드 기능
_pickDocument = async () => {
  let result = await DocumentPicker.getDocumentAsync({});

  alert(result.uri);

  console.log(result);
};

const ListScreen = ({ marker }) => {
  const friends = [
    { name: "Friend #1", age: 20 },
    { name: "Friend #2", age: 21 },
    { name: "Friend #3", age: 22 },
    { name: "Friend #4", age: 23 },
    { name: "Friend #5", age: 24 },
    { name: "Friend #6", age: 25 },
    { name: "Friend #7", age: 26 },
    { name: "Friend #8", age: 27 },
    { name: "Friend #9", age: 28 },
  ];

  // 화면이 처음 마운트 될 때마 실행
  useEffect(() => {
    console.log("List 화면이 마운트 될 때 실행");
    console.log(marker);
  }, []);

  return (
    <View>
      {/* 
      <FlatList
        keyExtractor={friend => friend.name}
        data={friends}
        renderItem={({ item }) => {
          return (
            <Text style={styles.textStyle}>
              {item.name} - Age {item.age}
            </Text>
          );
        }}
      /> */}

      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            height: 100,
            padding: 20,
          }}
        >
          <View style={{ flex: 0.5 }}>
            <Text>프린터 명</Text>
            <Text>상세정보</Text>
          </View>
          <View style={{ flex: 0.5 }}>
            <Button title="출력요청" color="#841584" />
          </View>
        </View>

        <View>
          <Button title="파일 업로드" onPress={_pickDocument} />
        </View>

        {friends.map((item, name) => (
          <Text key={name} style={styles.textStyle}>
            {name} - Age {item.age}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    marginVertical: 50,
  },
});

export default ListScreen;

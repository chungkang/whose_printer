import React, { useState, useEffect } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
  Modal,
  Pressable,
  Button,
} from "react-native";
import * as Location from "expo-location";
import centersMarkers from '../../assets/centers.json';
import * as SplashScreen from 'expo-splash-screen';
import { Badge } from 'react-native-elements'
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE = 37.58542;
const LONGITUDE = 127.00085;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

// 주민센터 위치 좌표
const markers = Object.values(centersMarkers);

function sleep(ms) {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}

async function delay_splash() {
  await SplashScreen.preventAutoHideAsync();
  await sleep(3000);
  await SplashScreen.hideAsync();
};

// 마커 임시로 사용
// const markers = [
//   {
//     id: 0,
//     amount: 99,
//     coordinate: {
//       latitude: LATITUDE,
//       longitude: LONGITUDE,
//     },
//     title: "김씨네",
//     description: "아파트",
//   },
// ];




const MapScreen = ({ navigation }) => {
  let state = {
    search: '',
  }

  delay_splash();

  // 현위치 좌표
  const [currentLatitude, setCurrentLatitude] = useState(LATITUDE);
  const [currentLongitude, setCurrentLongtude] = useState(LONGITUDE);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [center, setCenter] = useState('');
  const [tel, setTel] = useState('');

  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const clickMarker = (marker) => {
    setModalVisible(true);
    setCenter(marker.center);
    setTel(marker.tel);
  }

  // 화면이 처음 마운트 될 때마 실행
  useEffect(() => {
    console.log("화면이 마운트 될 때 실행");
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }


      // 데이터 조회 후 marker에 추가

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      let text = "Waiting..";
      if (errorMsg) {
        text = errorMsg;
      } else if (location) {
        text = JSON.stringify(location);
        console.log(location);

        setLocation(location);
        setCurrentLatitude(location["coords"].latitude);
        setCurrentLongtude(location["coords"].longitude);
      }
    })();
  }, []);

  // 렌더링 될 때 마다 실행
  useEffect(() => {
    console.log("렌더링 될 때 마다 실행");
  });

  // 특정 props, state가 바뀔 때 마다 샐행
  // useEffect(()=>{
  //   console.log('특정 값이 바뀔 때 실행');
  //   if(mounted.current){
  //     mounted.current = true;
  //   } else {
  //     // ajax
  //   }
  // },[바뀌는 값]);

  return (
    <View style={styles.container}>
      <View style={{ position: 'absolute', top: 10, width: '100%' }}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchbar}
        />
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentLatitude,
          longitude: currentLongitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        showsUserLocation
        showsMyLocationButton
        minZoomLevel={13}
      >
        {markers.map((marker, center_id) => (
          <Marker
            key={center_id}
            coordinate={marker.coordinate}
            onPress={() => clickMarker(marker)}
          />
        ))}
      </MapView>

      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>

              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.modalText}>{center}</Text>
                {/* <Button
                  onPress={() => setModalVisible(!modalVisible)}
                  title="X"
                /> */}
              </View>

              <View style={{ flex: 1, flexDirection: 'row', margin: 10 }}>
                <Badge style={styles.badgeStyle} value="관공서" status="success" />
                <Badge style={styles.badgeStyle} value="신규" status="primary" />
                <Badge style={styles.badgeStyle} value="핫" status="error" />
              </View>
              <View style={{ margin: 20, flexDirection: 'row', alignItems: 'flex-end'}}>
                <Button
                    title='대화'
                    onPress={() => alert('대화창')}
                  />
                <Button
                  title='출력'
                  onPress={() => navigation.navigate("Printer", { center: center, tel: tel })}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  searchbar: {
    borderRadius: 10,
    margin: 10,
    color: '#000',
    borderColor: '#666',
    backgroundColor: '#FFF',
    borderWidth: 1,
    height: 45,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    //    width: 300,
    //    height: 500

  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  badgeStyle: {
    padding:10
  },
});

export default MapScreen;

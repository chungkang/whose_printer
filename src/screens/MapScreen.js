import React, { useState, useEffect } from "react";
import MapView, { Marker, Callout, Modal } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Button,
} from "react-native";
import * as Location from "expo-location";
import centersMarkers from '../../assets/centers.json';
import * as SplashScreen from 'expo-splash-screen';

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE = 37.58542;
const LONGITUDE = 127.00085;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

// 주민센터 위치 좌표
const markers = Object.values(centersMarkers);

function sleep (ms) {
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
//   {
//     id: 1,
//     amount: 199,
//     coordinate: {
//       latitude: LATITUDE + 0.004,
//       longitude: LONGITUDE - 0.004,
//     },
//     title: "이씨네",
//     description: "사무실",
//   },
//   {
//     id: 2,
//     amount: 285,
//     coordinate: {
//       latitude: LATITUDE - 0.004,
//       longitude: LONGITUDE - 0.004,
//     },
//     title: "박씨네",
//     description: "관공서",
//   },
//   {
//     id: 3,
//     amount: 28,
//     coordinate: {
//       latitude: LATITUDE - 0.0,
//       longitude: LONGITUDE - 0.004,
//     },
//     title: "공씨네",
//     description: "주민센터",
//   },
// ];

const MapScreen = ({ navigation }) => {
  state={
    printerId:null
  }

  delay_splash();

  // 현위치 좌표
  const [currentLatitude, setCurrentLatitude] = useState(LATITUDE);
  const [currentLongitude, setCurrentLongtude] = useState(LONGITUDE);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

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

  // 특정 prps, state가 바뀔 때 마다 샐행
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
        minZoomLevel = {13}
      >
        {markers.map((marker, center_id) => (
          <Marker
            key={center_id}
            coordinate={marker.coordinate}
            //  title={marker.title}
            //  description={marker.description}
          >
            <Callout
              style={styles.plainView}
              onPress={() => navigation.navigate("Printer", {center: marker.center, tel: marker.tel})}
            >
              <View>
                <Text>{marker.center}</Text>
                <Text>{marker.tel}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  bubble: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10,
  },
});

export default MapScreen;

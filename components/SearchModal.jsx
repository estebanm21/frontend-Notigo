import {Screen} from "../components/Secreen"
import BootomSheet, {BottomSheetView} from "@gorhom/bottom-sheet"
import { useCallback, useRef, useState, useEffect } from "react"

import {
  View,
  Text,
  StyleSheet,
  Alert,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  TextInput,
  FlatList,
  Keyboard
} from "react-native";


import MapView, { Marker, PROVIDER_GOOGLE, Circle } from "react-native-maps";
import * as Location from "expo-location";
import { PermissionsAndroid, Platform } from "react-native";
import { useSelector } from "react-redux";
import axios from "axios";
import { customStyle } from "../src/styles/maps.styles";
import Entypo from '@expo/vector-icons/Entypo';

const logoNotigo = require("../assets/NotiGoLogo.png");
export default function SearchStore() {
  
  const sheetRef = useRef(null)
  const [isOpen, setIsOpen] = useState(true);
  const snapPoints = ["60%"];

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationUpdated, setLocationUpdated] = useState(false);
  const [locationRadius, setLocationRadius] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const storeInfo = useSelector((state) => state.userInfo.store);
  const userToken = useSelector((state) => state.userInfo.token);

  
  useEffect(() => {
    const getLocationPermission = async () => {
      if (Platform.OS === "android") {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (permission === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          setErrorMsg("Permission denied");
        }
      } else {
        getCurrentLocation();
      }
    };

    

    const getCurrentLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);

      if (storeInfo?.id && !locationUpdated) {
        updateStoreLocation(storeInfo.id, currentLocation.coords);
        setLocationUpdated(true);
      }
    };

    if (storeInfo?.id && !locationUpdated) {
      getLocationPermission();
    }
  }, [storeInfo, locationUpdated]);

  const updateStoreLocation = async (storeId, coords) => {
    if (!userToken) {
      Alert.alert("Error", "No estás logueado. Inicia sesión para actualizar la ubicación.");
      return;
    }
    try {
      const response = await axios.patch(
        `http://192.168.1.40:3000/api/v1/store/${storeId}`,
        {
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log("Ubicación actualizada en la base de datos", response.data);
    } catch (error) {

    }
  };

  const updateStoreLocationRadius = async (storeId, radius) => {
    if (!userToken) {
      Alert.alert("Error", "No estás logueado. Inicia sesión para actualizar el radio.");
      return;
    }
    try {
      const response = await axios.patch(
        `http://192.168.1.40:3000/api/v1/store/${storeId}`,
        {
          locationRadius: radius,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log("Radio de ubicación actualizado en la base de datos", response.data);
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al actualizar el radio de ubicación.");
    }
  };

  useEffect(() => {

    setLocationRadius(storeInfo?.locationRadius)
   
  }, [])
  
  


  const handleRadiusChange = (radius) => {
    setLocationRadius(radius);
    if (storeInfo?.id) {
      updateStoreLocationRadius(storeInfo.id, radius);
    }
  };


  
  const handleSearch = async (text) => {
    setSearchText(text);
    if (text.length > 2 && location) {  
      try {
        
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
          {
            params: {
              input: text,
              key: "AIzaSyBaG8VtrirI1oqAc_IBR3aVJnTMGE4I0t0", 
              language: "es",
              location: `${location.latitude},${location.longitude}`,  // Coordenadas del usuario
              radius: 5000,  // Limita la búsqueda a 5 km (ajustable dependiendo de la ciudad)
            },
          }
        );
      
        
        setSearchResults(response.data.predictions);
      } catch (error) {
        console.error("Error buscando lugares:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  
  const handleSelectPlace = async (placeId) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json`,
        {
          params: {
            place_id: placeId,
            key: "AIzaSyBaG8VtrirI1oqAc_IBR3aVJnTMGE4I0t0",
          },
        }
        
      );
   
      const { lat, lng } = response.data.result.geometry.location;
      const updatedCoords = { latitude: lat, longitude: lng };
      setLocation(updatedCoords);
      if (storeInfo?.id) {
        updateStoreLocation(storeInfo.id, updatedCoords);
      }


       
   
    } catch (error) {
      console.error("Error obteniendo detalles del lugar:", error);
    }
  };

  const toggleSearch = () => {
    Animated.timing(animation, {
      toValue: isSearchOpen ? 0 : -200,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsSearchOpen(!isSearchOpen);
  };

  if (errorMsg) {
    Alert.alert("Error", errorMsg);
    return null;
  }

  const renderItem = ({ item }) => {
    // Dividimos el texto en dos partes: antes de la coma y después de la coma
    const [placeName, restOfAddress] = item.description.split(",", 2);
  
    return (
      <TouchableOpacity
        style={styles.resultItem}
        onPress={() => handleSelectPlace(item.place_id)}
      >
        <Entypo name="location-pin" size={24} color="#b0b0b0" style={styles.icon} /> 
        <View style={styles.resultTextContainer}>
          <Text style={styles.resultTitle}>{placeName}</Text>
          <Text style={styles.resultDescription}>{restOfAddress}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  
  if (!location) {
    return (
      <Screen>
        <Text style={styles.loadingText}>Cargando ubicación...</Text>
      </Screen>
    );
  }


  return(
 <Screen>


<MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
        customMapStyle={customStyle}
      >
        {storeInfo?.profileImgUrl && (
          <Marker coordinate={location}>
            <Image
              source={{ uri: storeInfo.profileImgUrl }}
              style={styles.customMarker}
            />
          </Marker>
        )}
        <Circle
          center={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          radius={locationRadius}
          strokeWidth={2}
          strokeColor="#BB4343"
          fillColor="rgba(187, 67, 67, 0.2)"
          
        />
      </MapView>

      <View style={styles.logoContainer}>
        <Image source={logoNotigo} style={styles.logo} />
        <Text style={styles.textLogo}>Notigo</Text>
      </View>

      <View style={styles.buttonContainer}>
  {[5, 10, 30].map((radius) => (
    <TouchableOpacity
      key={radius}
      style={[
        styles.button,
        radius === 5 ? styles.button5mt : radius === 10 ? styles.button10mt : styles.button30mt,
      ]}
      onPress={() => handleRadiusChange(radius)}
    >
      <Text style={styles.buttonText}>{radius}m</Text>
    </TouchableOpacity>
  ))}
</View>

<Text style={styles.text}>Hello word</Text>
<BootomSheet ref={sheetRef} snapPoints={snapPoints}>
  <BottomSheetView>
<Text>Hola</Text>

  </BottomSheetView>
</BootomSheet>
</Screen>
  )
  
}
const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  customMarker: {
    width: 35,
    height: 35,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#fff",
    resizeMode: "cover",
  },
  loadingText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    marginTop: 50,
  },
  searchContainer: {
    position: "absolute",
    top: 100,
    width: "90%",
    alignSelf: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 150,
    right: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  button5mt: {
    backgroundColor: "#FF6347", // Rojo
    padding: 15,
    margin: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  button10mt: {
    backgroundColor: "#BB4343", // Rojo oscuro
    padding: 15,
    margin: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  button30mt: {
    backgroundColor: "#8E313C", // Color más oscuro
    padding: 15,
    margin: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoContainer: {
    position: "absolute",
    top: 30,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
    display: "flex",
    gap: 8,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 20,
  },
  textLogo: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    textShadowColor: "#000",
    textShadowOffset: { width: 3, height: 1 },
    textShadowRadius: 10,
    width: 100,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  searchButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 50,
    elevation: 5,
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  searchContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%", // Limita la altura máxima para los resultados
  },
  searchInput: {
    backgroundColor: "#dee2e6",
    padding: 15,
    borderRadius: 20,
    fontSize: 20,
    marginBottom: 10,
    height: 60,
   color: "#22223b"
    
  },
  resultList: {
    maxHeight: 200,
  },

  resultText: {
    fontSize: 16,
    color: "#333",
  },

  resultItem: {
    flexDirection: 'row',  // Para alinear ícono y texto horizontalmente
    padding: 10,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,  // Espacio entre el ícono y el texto
    alignSelf: 'center',  // Centrar el ícono verticalmente
  },
  resultTextContainer: {
    flexDirection: 'column', // Asegura que el texto esté en columna debajo del ícono
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#333", // Color oscuro para el nombre del lugar
  },
  resultDescription: {
    fontSize: 14,
    color: "#aaa", // Gris claro para el resto de la dirección
    marginTop: 5, // Añadido para separar el texto del título
  },
})


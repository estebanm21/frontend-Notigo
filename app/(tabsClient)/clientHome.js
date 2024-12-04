import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Dimensions,
  BackHandler,
} from 'react-native';
import { Screen } from '../../components/Secreen'; // Asegúrate de tener este componente
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location'; // Para obtener la ubicación
import { PermissionsAndroid, Platform } from 'react-native';
import { customStyle } from '../../src/styles/maps.styles';

export default function ClientHome() {
  const [location, setLocation] = useState(null); // Estado para almacenar la ubicación
  const [errorMsg, setErrorMsg] = useState(null);
  const [watching, setWatching] = useState(false); // Estado para saber si estamos "observando" la ubicación

  useEffect(() => {
    const backAction = () => {
      // Prevenir que la acción de volver ocurra
      return true; // Retornar 'true' previene la acción predeterminada
    };

    // Agregar el listener para el botón de retroceso
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    // Limpiar el listener cuando el componente se desmonte
    return () => backHandler.remove();
  }, []);

  // Obtener permisos y ubicación
  useEffect(() => {
    const getLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (permission === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          setErrorMsg('Permission denied');
        }
      } else {
        getCurrentLocation();
      }
    };

    const getCurrentLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      // Obtén la primera posición
      let currentLocation = await Location.getLastKnownPositionAsync({});
      setLocation(currentLocation.coords); // Actualiza el estado con la ubicación
    };

    getLocationPermission();
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  // Iniciar seguimiento en tiempo real
  useEffect(() => {
    if (location) {
      const startWatching = async () => {
        const subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 1000, // Actualiza cada 1 segundo
            distanceInterval: 1, // Actualiza cada 1 metro
          },
          (newLocation) => {
            setLocation(newLocation.coords); // Actualiza el estado con la nueva ubicación
          }
        );
        setWatching(true);
      };

      if (!watching) {
        startWatching();
      }
    }
  }, [location, watching]); // Ejecutar cuando la ubicación cambie

  // Manejo de error en caso de que no se pueda obtener la ubicación
  if (errorMsg) {
    Alert.alert('Error', errorMsg);
    return null;
  }

  // Si la ubicación aún no se ha cargado, mostramos un mensaje de "Cargando..."
  if (!location) {
    return (
      <Screen>
        <Text style={styles.loadingText}>Cargando ubicación...</Text>
      </Screen>
    );
  }

  // Rango de radio de la tienda (ejemplo)
  const storeLocation = {
    latitude: 19.432608, // Coordenadas de la tienda
    longitude: -99.133209, // Coordenadas de la tienda
  };
  const storeRadius = 500; // Radio de 500 metros

  // Calcular si el usuario está dentro del radio de la tienda (simplificado)
  const calculateDistance = (userLocation, storeLocation) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radio de la Tierra en km

    const dLat = toRad(storeLocation.latitude - userLocation.latitude);
    const dLon = toRad(storeLocation.longitude - userLocation.longitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(userLocation.latitude)) *
        Math.cos(toRad(storeLocation.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c * 1000; // Convertimos la distancia a metros

    return distance;
  };

  // Verificar si el usuario está dentro del rango de la tienda
  const distanceToStore = calculateDistance(location, storeLocation);
  const isWithinRange = distanceToStore <= storeRadius;

  return (
    <Screen>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005, // Ajusta el nivel de zoom inicial más cercano
          longitudeDelta: 0.005, // Ajusta el nivel de zoom inicial más cercano
        }}
        customMapStyle={customStyle}
        showsUserLocation={true} // Esto asegura que el mapa muestre tu ubicación en tiempo real
        followsUserLocation={true} // Esto mueve el mapa automáticamente cuando el usuario se mueve
        // Establecer el nivel de zoom máximo
      >
        {/* Mostrar la ubicación actual */}
        <Marker coordinate={location} title="Tu ubicación" pinColor="#BB4343" />

        {/* Mostrar la ubicación de la tienda */}
        <Marker coordinate={storeLocation} title="Tienda" pinColor="blue" />
      </MapView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  loadingText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50,
  },
});
import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  FlatList,
  View,
  ActivityIndicator,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import axios from 'axios';
import { Screen } from '../../components/Secreen';
import { Ellipsis } from '../../components/Icons';
import * as Location from 'expo-location'; // Para obtener la ubicación en tiempo real

import { Ionicons } from '@expo/vector-icons'; //
import i18n from '../../config/i18nConfig';
import CardStore from '../../components/CardStore';

const logoNotiGo = require('../../assets/NotiGoLogo.png');

export default function Stores() {
  const [stores, setStores] = useState([]); // Para almacenar las tiendas
  const [loading, setLoading] = useState(true); // Para mostrar un indicador de carga
  const [location, setLocation] = useState(null); // Para almacenar la ubicación del usuario
  const [errorMsg, setErrorMsg] = useState(null);

  const [category, setCategory] = useState('1'); // Guarda la categoría seleccionada, por defecto "Todas"
  const [searchText, setSearchText] = useState(''); // Estado para el texto de búsqueda

  const searchInputRef = useRef(null); // Referencia al input

  const categorias = [
    { id: '1', nombre: i18n.t('All') },
    { id: '2', nombre: i18n.t('categoryOcio') },
    { id: '3', nombre: i18n.t('categoryRestauracion') },
    { id: '4', nombre: i18n.t('categoryTiendas') },
    { id: '5', nombre: i18n.t('categoryBelleza') },
  ];

  const CategoriaItem = ({ nombre, id }) => (
    <TouchableOpacity
      style={[
        styles.categoriaContainer,
        category === id && styles.selectedCategory,
      ]}
      onPress={() => setCategory(id)} // Al seleccionar una categoría, se actualiza el estado
    >
      <Text
        style={[
          styles.categoriaText,
          category === id && styles.selectedCategoryText,
        ]}
      >
        {nombre}
      </Text>
    </TouchableOpacity>
  );

  // Obtener permisos y la ubicación del usuario
  useEffect(() => {
    const getLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      // Obtén la ubicación del usuario
      let currentLocation = await Location.getLastKnownPositionAsync({});
      setLocation(currentLocation.coords); // Actualiza el estado con la ubicación
    };

    getLocationPermission(); // Solicitar permisos y obtener la ubicación
  }, []);

  useEffect(() => {
    // Función para obtener los datos de la API
    const fetchStores = async () => {
      try {
        const response = await axios.get(
          'http://192.168.1.39:3000/api/v1/store/'
        );
        setStores(response.data.setores); // Almacenar las tiendas en el estado
      } catch (error) {
        console.error('Error al obtener las tiendas', error);
      } finally {
        setLoading(false); // Detener el indicador de carga
      }
    };

    fetchStores(); // Llamar la función al montar el componente
  }, []); // El arreglo vacío asegura que solo se ejecute una vez al montar el componente

  // Calcular distancia entre el usuario y la tienda
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
    const distanceInMeters = R * c * 1000; // Convertimos la distancia a metros

    return distanceInMeters;
  };

  // Formatear la distancia en km o m
  const formatDistance = (distance) => {
    if (distance >= 1000) {
      // Si la distancia es mayor o igual a 1 km, mostramos en kilómetros
      return (distance / 1000).toFixed(1) + ' km'; // 1 decimal
    } else {
      // Si la distancia es menor de 1 km, mostramos en metros
      return Math.round(distance) + ' m'; // Redondeamos a metros
    }
  };

  // Filtrar las tiendas por nombre (búsqueda) y categoría seleccionada
  const filteredStores = stores.filter((store) => {
    const matchesCategory =
      category === '1' ||
      store.categorie === categorias.find((cat) => cat.id === category)?.nombre;
    const matchesSearchText = store.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return matchesCategory && matchesSearchText;
  });

  // Si está cargando, mostrar el indicador de carga
  if (loading) {
    return (
      <Screen>
        <ActivityIndicator size="large" color="#d94d4d" />
      </Screen>
    );
  }

  // Si no se tiene ubicación, mostramos un mensaje
  if (!location) {
    return (
      <Screen>
        <Text>Obteniendo ubicación...</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={styles.header}>
        <View style={styles.containerNotigoLogo}>
          <Image style={styles.logoNotigo} source={logoNotiGo} />
          <Text style={styles.textLogo}>NotiGo</Text>
        </View>
        <Ellipsis color="#370617" size={24} />
      </View>

      <FlatList
        ListHeaderComponent={
          <View>
            <View style={styles.searchBox}>
              <Ionicons
                name="search"
                size={20}
                color="#aaa"
                style={styles.icon}
              />
              <TextInput
                placeholder={i18n.t('searchStore')}
                placeholderTextColor="#aaa"
                style={styles.input}
                value={searchText}
                onChangeText={setSearchText} // Actualiza el estado al escribir
              />
              {searchText.length > 0 && (
                <TouchableOpacity
                  onPressIn={() => setSearchText('')}
                  k
                  style={styles.clearButton}
                >
                  <Ionicons name="close-circle" size={20} color="#aaa" />
                </TouchableOpacity>
              )}
            </View>
            <FlatList
              data={categorias}
              renderItem={({ item }) => (
                <CategoriaItem nombre={item.nombre} id={item.id} />
              )}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.flatListContainer}
            />
          </View>
        }
        data={filteredStores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <CardStore
            item={item}
            index={index}
            calculateDistance={calculateDistance}
            formatDistance={formatDistance}
            filteredStores={filteredStores}
            location={location}
          />
        )}
        style={styles.container_cards}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 140,
    marginBottom: 0,
  },

  suscriptionButton: {
    width: 120,
    zIndex: 3,
    paddingVertical: 5,
    marginTop: 5,
    borderRadius: 10,
    paddingHorizontal: 5,
  },

  clearButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },

  buttonSus: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
  },

  suscriptionButtonText: {
    color: '#fff',

    fontWeight: '400',
  },

  shadow: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    position: 'absolute',
  },

  shadow_2: {
    width: 500,
    height: 145,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    position: 'absolute',
    zIndex: 1,
  },

  image_info: {
    width: 375,
    height: 165,
    marginBottom: 0,
    position: 'absolute',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },

  header: {
    padding: 20,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },

  textLogo: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },

  containerNotigoLogo: {
    display: 'flex',
    flexDirection: 'row',
    height: 'auto',
    alignItems: 'center',
    gap: 5,
  },

  logoNotigo: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },

  lastCard: {
    marginBottom: 30,
  },
  name_store: {
    fontSize: 19,
    marginLeft: 3,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: '#fff',
    zIndex: 3,
  },
  container_cards: {
    paddingTop: 10,
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
  },
  card_store: {
    display: 'flex',
    flexDirection: 'column',
    width: 'auto',
    height: 'auto',
    borderRadius: 20,
    overflow: 'hidden',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    marginBottom: 12,
  },
  container_info: {
    backgroundColor: '#434442',

    width: '100%',
    height: 'auto',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  container_adress: {
    display: 'flex',
    flexDirection: 'row',
    zIndex: 3,
  },
  text_categorie: {
    marginLeft: 6,
    color: '#fff',
    // fontWeight: "500"
  },
  container_categorie: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 3,
  },
  dot: {
    fontSize: 16,
    marginHorizontal: 3,
    color: '#fff',
    fontWeight: '500',
  },
  distance: {
    color: '#fff',
    // fontWeight: "500",
    zIndex: 3,
  },
  logoContainer: {
    position: 'absolute',
    top: 180,
    right: 20,
    zIndex: 20,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#370617',
    borderRadius: 8,
    height: 40,
    width: '90%',
    paddingHorizontal: 10,
    elevation: 5, // Sombra,
    width: '100%',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#FFF',
    backgroundColor: '#370617',
  },

  flatListContainer: {
    paddingHorizontal: 5,
    marginBottom: 20,
  },
  categoriaContainer: {
    backgroundColor: '#370617',
    marginRight: 4,
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  categoriaText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },

  selectedCategory: {
    backgroundColor: '#fff',
  },

  selectedCategoryText: {
    color: '#370617', // Color para el texto cuando la categoría esté seleccionada
  },
});

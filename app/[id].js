import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import { BackIcon, PinIcon, BellIcon } from '../components/Icons';
import i18n from '../config/i18nConfig';

import { LinearGradient } from 'expo-linear-gradient';

export default function Detail() {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useLocalSearchParams();
  const handledBack = () => {
    router.back();
  };

  // Función para obtener los datos de la API
  const fetchStore = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.39:3000/api/v1/store/${id}`
      );
      setStore(response.data.store);
    } catch (error) {
      console.error('Error al obtener la tienda', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStore();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#d94d4d" />
      </View>
    );
  }

  return (
    <View style={styles.container_principal}>
      <ImageBackground
        source={{ uri: store.businessImgUrl }}
        style={styles.container_business_img}
      >
        <TouchableOpacity style={styles.back_icon} onPress={handledBack}>
          <View style={styles.background_button_back}></View>
          <BackIcon size={40} color="#BB4343" />
        </TouchableOpacity>
      </ImageBackground>

      <Text style={styles.name_store}>{store.name}</Text>

      <View style={styles.container_adress}>
        <PinIcon size={18} color="#937199" />
        <Text style={{ color: '#AAAABC' }}>{store.address}</Text>
      </View>

      <View style={styles.container_categorie}>
        <Text style={{ color: '#E8EAE8' }}>{i18n.t('category')}</Text>
        <Text style={{ color: '#AAAABC' }}>{store.categorie}</Text>
      </View>

      <View style={styles.logoContainer}>
        <Image source={{ uri: store.profileImgUrl }} style={styles.logo} />
      </View>

      <View style={styles.container_description}>
        <Text style={{ color: '#FFFFFF', fontSize: 12 }}>
          {i18n.t('description')}
        </Text>
        <Text style={{ color: '#AAAABC' }}>{store.description}</Text>
        <LinearGradient
          colors={['#933535', '#BB4343', '#F95959']}
          start={[0, 0]}
          end={[1, 0]}
          style={styles.suscriptionButton}
        >
          <TouchableOpacity style={styles.buttonSus}>
            <BellIcon size={20} color="#ccc" />
            <Text style={styles.suscriptionButtonText}>
              {i18n.t('subscribe')}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container_principal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#20242D',
  },

  suscriptionButton: {
    width: 120,

    paddingVertical: 5,
    marginTop: 5,
    borderRadius: 10,
    paddingHorizontal: 5,
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

  container_adress: {
    display: 'flex',
    flexDirection: 'row',

    position: 'absolute',
    top: 265,
    left: 10,
  },

  logoContainer: {
    position: 'absolute',
    top: 280,
    right: 40,
    zIndex: 20,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 12,
  },

  container_categorie: {
    position: 'absolute',
    top: 300,
    left: 15,
  },

  container_description: {
    position: 'absolute',
    top: 350,

    padding: 12,
    flexShrink: 1,
  },

  name_store: {
    fontSize: 25,
    marginLeft: 3,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: '#fff',
    position: 'absolute',
    top: 230,
    left: 10,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#20242D',
    flexDirection: 'column',
  },

  container_business_img: {
    width: '100%',
    height: 220,
    position: 'absolute',
    top: 0,
    zIndex: 0,
  },
  back_icon: {
    position: 'absolute',
    top: 12,
    left: 20,
    zIndex: 2,
  },

  background_button_back: {
    width: 37,
    height: 37,
    position: 'absolute',
    top: 2,
    left: 2,
    borderRadius: '100%',
    backgroundColor: '#fff',
  },
});

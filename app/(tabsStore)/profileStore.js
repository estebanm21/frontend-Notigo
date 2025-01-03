import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserInfo } from '../../src/store/slices/userInfo.slices'; // Acción para limpiar el estado de usuario
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native'; // Importar el hook de navegación
import { Ionicons } from '@expo/vector-icons'; // Iconos de Ionicons
import i18n from '../../config/i18nConfig'; // Configuración de internacionalización

export default function ProfileStore() {
  const dispatch = useDispatch();
  const router = useRouter();
  const navigation = useNavigation();

  // Obtener la información de la tienda desde Redux
  const storeInfo = useSelector((state) => state.userInfo.store);
  const userToken = useSelector((state) => state.userInfo.token);
  // Función para manejar el cierre de sesión
  const handleLogout = async () => {
    Alert.alert(
      i18n.t('signOut'),
      i18n.t('areYouSureSignOut'),
      [
        {
          text: i18n.t('cancel'),
          style: 'cancel',
        },
        {
          text: i18n.t('accept'),
          onPress: async () => {
            try {
              // Limpiar el estado en Redux
              dispatch(clearUserInfo());

              // Eliminar el token y la información del usuario de AsyncStorage
              await AsyncStorage.removeItem('userToken');
              await AsyncStorage.removeItem('userInfo');

              // Redirigir al usuario a la pantalla de inicio de sesión
              router.replace('/login');
            } catch (error) {
              Alert.alert(i18n.t('error'), i18n.t('signOutError'));
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleNavigate = () => {
    router.push('/updateStore'); // Navegar si hay token
  };

  // Función para navegar a la pantalla de actualizar los datos de la tienda

  useEffect(() => {
    // Prevenir la acción de retroceder en Android y el gesto de deslizar en iOS
    if (Platform.OS === 'android') {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          return true; // `true` evita la acción predeterminada
        }
      );

      return () => backHandler.remove();
    } else {
      // En iOS, deshabilitar el gesto de "deslizar hacia atrás" si es necesario
      navigation.setOptions({
        gestureEnabled: false, // Desactivar el gesto de deslizamiento hacia atrás en iOS
      });
    }
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Parte superior con el ícono y nombre de la tienda */}
      <View style={styles.profileHeader}>
        <Ionicons name="storefront" size={50} color="#e26d5c" />
        <View style={styles.storeInfo}>
          <Text style={styles.storeName}>{storeInfo?.name?.toUpperCase()}</Text>
          <Text style={styles.storeGreeting}>{i18n.t('hello')}</Text>
        </View>
      </View>

      {/* Opciones del perfil de la tienda */}
      <View style={styles.optionBox}>
        <Text style={styles.optionTitle}>{i18n.t('legal')}</Text>
        <TouchableOpacity style={styles.optionItem}>
          <Text style={styles.optionText}>{i18n.t('termsAndConditions')}</Text>
          <Ionicons name="chevron-forward" size={20} color="#333" />
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.optionItem}>
          <Text style={styles.optionText}>{i18n.t('privacyPolicy')}</Text>
          <Ionicons name="chevron-forward" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.optionBox}>
        <Text style={styles.optionTitle}>{i18n.t('more')}</Text>
        <TouchableOpacity style={styles.optionItem}>
          <Text style={styles.optionText}>{i18n.t('aboutNotiGo')}</Text>
          <Ionicons name="chevron-forward" size={20} color="#333" />
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.optionItem} onPress={handleLogout}>
          <Text style={styles.optionText}>{i18n.t('signOut')}</Text>
          <Ionicons name="chevron-forward" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Nueva opción para actualizar los datos de la tienda */}
      <View style={styles.optionBox}>
        <Text style={styles.optionTitle}>{i18n.t('updateStore')}</Text>

        <TouchableOpacity onPress={handleNavigate} style={styles.optionItem}>
          <Text style={styles.optionText}>{i18n.t('updateStoreData')}</Text>
          <Ionicons name="chevron-forward" size={20} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Beige
    padding: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  storeInfo: {
    marginLeft: 20,
    flexShrink: 1,
  },
  storeName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
  storeGreeting: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  optionBox: {
    backgroundColor: '#fff', // Caja blanca
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3, // Sombra
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
});

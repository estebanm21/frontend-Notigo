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
import { clearUserInfo } from '../../src/store/slices/userInfo.slices';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Icono de usuario
import i18n from '../../config/i18nConfig';

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const navigation = useNavigation();

  // Obtener la información del cliente desde Redux
  const userInfo = useSelector((state) => state.userInfo.user);

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

  useEffect(() => {
    // Prevent the back action on Android and swipe gesture on iOS
    if (Platform.OS === 'android') {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          // Detener la acción de retroceder y evitar que vaya atrás
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

  const navigationToTermsAndConditions = () => {
    router.push('/termsAndConditions');
  };

  const navigationToAboutNotiGo = () => {
    router.push('/aboutNotiGo');
  };

  return (
    <View style={styles.container}>
      {/* Parte superior con el ícono y nombre del usuario */}
      <View style={styles.profileHeader}>
        <Ionicons name="person-circle-outline" size={60} color="#e26d5c" />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userInfo?.name?.toUpperCase()}</Text>
          <Text style={styles.userGreeting}>{i18n.t('hello')}</Text>
        </View>
      </View>

      {/* Opciones del perfil */}
      <View style={styles.optionBox}>
        <Text style={styles.optionTitle}>{i18n.t('legal')}</Text>
        <TouchableOpacity
          onPress={navigationToTermsAndConditions}
          style={styles.optionItem}
        >
          <Text style={styles.optionText}>{i18n.t('termsAndConditions')}</Text>
          <Ionicons name="chevron-forward" size={20} color="#333" />
        </TouchableOpacity>
        {/* <View style={styles.divider} /> */}
        {/* <TouchableOpacity style={styles.optionItem}>
          <Text style={styles.optionText}>{i18n.t('privacyPolicy')}</Text>
          <Ionicons name="chevron-forward" size={20} color="#333" />
        </TouchableOpacity> */}
      </View>

      <View style={styles.optionBox}>
        <Text style={styles.optionTitle}>{i18n.t('more')}</Text>
        <TouchableOpacity
          onPress={navigationToAboutNotiGo}
          style={styles.optionItem}
        >
          <Text style={styles.optionText}>{i18n.t('aboutNotiGo')}</Text>
          <Ionicons name="chevron-forward" size={20} color="#333" />
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.optionItem} onPress={handleLogout}>
          <Text style={styles.optionText}>{i18n.t('signOut')}</Text>
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
  userInfo: {
    marginLeft: 20,
  },
  userName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
  userGreeting: {
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

import { Link, useRouter } from 'expo-router';
import {
  Text,
  Pressable,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Screen } from '../components/Secreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import i18n from '../config/i18nConfig';
import { useLanguage } from '../components/LanguajeContext';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form'; // Importar react-hook-form
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
const logoNotiGo = require('../assets/NotiGoLogo.png');

export default function SignUpStore() {
  const { selectedLanguage } = useLanguage();
  const router = useRouter();

  const [category, setCategory] = useState(''); // Estado para la categoría seleccionada
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [image, setImage] = useState(null); // Estado para la imagen seleccionada
  const [isLoading, setIsLoading] = useState(false);

  // Estados para controlar la visibilidad de las contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Usando react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Función para manejar el envío del formulario
  const onSubmit = async (data) => {
    const url = 'http://192.168.1.40:3000/api/v1/auth/store/signup';

    setIsLoading(true);

    const formData = new FormData();
    formData.append('name', data.name.trim());
    formData.append('email', data.email.trim());
    formData.append('password', data.password.trim());
    formData.append('categorie', category);

    if (image) {
      const localUri = image;
      const filename = localUri.split('/').pop();
      const type = `image/${filename.split('.')[1]}`;
      const file = {
        uri: localUri,
        name: filename,
        type,
      };
      formData.append('profileImgUrl', file);
    }

    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      reset(); // Limpiar formulario
      setCategory('');
      setImage(null);
      setIsLoading(false);
      router.push('/login'); // Redirigir al login
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        const errorMessage = error.response.data.message;
        Alert.alert(i18n.t('authenticationError'), errorMessage, [
          { text: 'OK' },
        ]);
      } else if (error.request) {
        Alert.alert(
          i18n.t('connectionErrorTitle'),
          i18n.t('connectionErrorMessage'),
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert(
          i18n.t('unexpectedErrorTitle'),
          i18n.t('unexpectedErrorMessage'),
          [{ text: 'OK' }]
        );
      }
    }
  };

  // Solicitar permisos para acceder a la cámara y galería
  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status: cameraStatus } =
        await ImagePicker.requestCameraPermissionsAsync();
      const { status: mediaLibraryStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (cameraStatus !== 'granted' || mediaLibraryStatus !== 'granted') {
        alert('Se requieren permisos para acceder a la cámara y la galería.');
      }
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  // funcion para comprimir la imagen

  const compressImage = async (uri) => {
    try {
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 800 } }], // Reducir la imagen a un ancho de 800px
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG } // Comprimir la imagen al 70% de su calidad original
      );
      return manipulatedImage; // Retorna la imagen comprimida
    } catch (error) {
      console.error('Error al comprimir la imagen: ', error);
      return { uri }; // Si hay un error, devolver la imagen original
    }
  };

  // Función para seleccionar una imagen
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const compressedImage = await compressImage(uri); // Comprimir la imagen antes de mostrarla
      setImage(compressedImage.uri); // Usar la imagen comprimida
    }
  };

  // Función para tomar una foto
  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const compressedImage = await compressImage(uri); // Comprimir la imagen antes de mostrarla
      setImage(compressedImage.uri); // Usar la imagen comprimida
    }
  };

  const navigateToLogin = () => {
    router.push('/login');
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E53039" />
      </View>
    );
  }

  return (
    <Screen>
      {/* Sección de "Ya tienes cuenta?" y "Sign In" */}
      <View style={styles.signInSection}>
        <Text style={styles.signInText}>{i18n.t('signInText')}</Text>

        <TouchableOpacity onPress={navigateToLogin} style={styles.signInButton}>
          <Text style={styles.signInButtonText}>
            {i18n.t('signInButtonText')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Logo de la aplicación */}
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={logoNotiGo} />
        <Text style={styles.textLogo}>NotiGo</Text>
      </View>

      {/* Modal para el formulario */}
      <View style={styles.modalContainer}>
        {/* Selección de imagen de perfil */}
        <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: 80, height: 80, borderRadius: 40 }}
            />
          ) : (
            <MaterialCommunityIcons
              name="account-circle"
              size={50}
              color="#ccc"
            />
          )}
        </TouchableOpacity>

        <Text style={{ textAlign: 'center', marginBottom: 20, color: '#ccc' }}>
          {i18n.t('supportedFormats')}
        </Text>

        {/* Input de Email */}
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder={i18n.t('emailPlaceholder')}
                placeholderTextColor="#ccc"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
            rules={{
              required: i18n.t('emailRequired'),
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            }}
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}
        </View>

        {/* Input de Name */}
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder={i18n.t('namePlaceholder')}
                placeholderTextColor="#ccc"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="name"
            rules={{ required: i18n.t('nameRequired') }}
          />
          {errors.name && (
            <Text style={styles.errorText}>{errors.name.message}</Text>
          )}
        </View>

        {/* Input de Password */}
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={i18n.t('passwordPlaceholder')}
                  placeholderTextColor="#ccc"
                  secureTextEntry={!showPassword}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Icon
                    name={showPassword ? 'visibility-off' : 'visibility'}
                    size={24}
                    color="#ccc"
                  />
                </TouchableOpacity>
              </View>
            )}
            name="password"
            rules={{
              required: i18n.t('passwordRequired'),
              minLength: {
                value: 8,
                message: i18n.t('passwordTooShort'),
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
                message: i18n.t('passwordMustContainLettersAndNumbers'),
              },
            }}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}
        </View>

        {/* Input de Confirm Password */}
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={i18n.t('confirmPasswordPlaceholder')}
                  placeholderTextColor="#ccc"
                  secureTextEntry={!showConfirmPassword}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Icon
                    name={showConfirmPassword ? 'visibility-off' : 'visibility'}
                    size={24}
                    color="#ccc"
                  />
                </TouchableOpacity>
              </View>
            )}
            name="confirmPassword"
            rules={{
              required: i18n.t('confirmPasswordRequired'),
              validate: (value, context) => {
                if (value !== context.password) {
                  return i18n.t('passwordsDoNotMatch');
                }
                return true;
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
                message: i18n.t('passwordMustContainLettersAndNumbers'),
              },
            }}
          />
          {errors.confirmPassword && (
            <Text style={styles.errorText}>
              {errors.confirmPassword.message}
            </Text>
          )}
        </View>
        {/* Selector de Categoría */}
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.categoryInput}
            onPress={() => setShowCategoryPicker(!showCategoryPicker)}
          >
            <Text style={styles.categoryText}>
              {category || i18n.t('selectCategory')}
            </Text>
          </TouchableOpacity>

          {showCategoryPicker && (
            <View style={styles.categoryList}>
              <ScrollView style={styles.scrollView}>
                <TouchableOpacity
                  style={styles.categoryItem}
                  onPress={() => {
                    setCategory(i18n.t('categoryOcio'));
                    setShowCategoryPicker(false);
                  }}
                >
                  <Text style={styles.categoryText}>
                    {i18n.t('categoryOcio')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.categoryItem}
                  onPress={() => {
                    setCategory(i18n.t('categoryRestauracion'));
                    setShowCategoryPicker(false);
                  }}
                >
                  <Text style={styles.categoryText}>
                    {i18n.t('categoryRestauracion')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.categoryItem}
                  onPress={() => {
                    setCategory(i18n.t('categoryTiendas'));
                    setShowCategoryPicker(false);
                  }}
                >
                  <Text style={styles.categoryText}>
                    {i18n.t('categoryTiendas')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.categoryItem}
                  onPress={() => {
                    setCategory(i18n.t('categoryBelleza'));
                    setShowCategoryPicker(false);
                  }}
                >
                  <Text style={styles.categoryText}>
                    {i18n.t('categoryBelleza')}
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          )}
        </View>

        {/* Botón de Sign Up con Degradado */}
        <LinearGradient
          colors={['#6A101A', '#E53039']}
          start={[0, 0]}
          end={[1, 0]}
          style={styles.signUpButton}
        >
          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <Text style={styles.signUpButtonText}>
              {i18n.t('signUpButtonText')}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  logo: { width: 70, height: 70 },
  logoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 130,
  },
  textLogo: { marginLeft: 5, color: '#fff', fontSize: 35, fontWeight: 'bold' },
  backIconContainer: { position: 'absolute', top: 50, left: 20, zIndex: 100 },
  modalContainer: {
    backgroundColor: '#fff',
    marginTop: 230,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    flex: 1,
    width: '100%',
  },
  inputContainer: { marginBottom: 15, position: 'relative' },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 13,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: { position: 'absolute', right: 20, top: 18 },
  signUpButton: {
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 12,
    alignItems: 'center',
  },
  signUpButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  signInSection: {
    position: 'absolute',
    top: 50,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
  },
  signInText: { color: '#fff', fontSize: 16 },
  signInButton: {
    marginLeft: 5,
    backgroundColor: '#6E2C34',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
  signInButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  avatarContainer: {
    alignSelf: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  categoryInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 13,
  },
  categoryText: { fontSize: 16, color: '#333' },
  categoryList: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    maxHeight: 150,
    overflow: 'hidden',
  },
  scrollView: { maxHeight: 150 },
  categoryItem: { padding: 13, borderBottomWidth: 1, borderColor: '#eee' },
  errorText: { color: 'red', fontSize: 12, marginTop: 5 },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Fondo blanco mientras se carga
  },
});

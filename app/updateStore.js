import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { BackIcon } from '../components/Icons';
import i18n from '../config/i18nConfig';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateStoreInfo,
  setUserInfo,
  updateStoreImage,
} from '../src/store/slices/userInfo.slices';

export default function UpdateStore() {
  const router = useRouter();

  const [categorie, setCategorie] = useState('');
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const storeInfo = useSelector((state) => state.userInfo.store); // Información de la tienda
  const userToken = useSelector((state) => state.userInfo.token); // Token de usuario

  const dispatch = useDispatch();

  const categorias = [
    i18n.t('categoryOcio'),
    i18n.t('categoryRestauracion'),
    i18n.t('categoryTiendas'),
    i18n.t('categoryBelleza'),
  ];

  useEffect(() => {
    if (storeInfo) {
      setName(storeInfo.name || ''); // Si tiene nombre, lo asigna, sino lo deja vacío
      setAddress(storeInfo.address || ''); // Lo mismo para la dirección
      setCategorie(storeInfo.categorie || ''); // Si tiene categoría, la asigna
      setDescription(storeInfo.description || '');

      if (storeInfo.businessImgUrl) {
        setImage(storeInfo.businessImgUrl); // Asignamos la URL de la imagen
      }
    }
  }, [storeInfo]);

  const handleBack = () => {
    // Mostrar una alerta de confirmación cuando el usuario intente volver atrás
    Alert.alert(
      i18n.t('saveChanges'), // El título de la alerta (ej. "¿Estás seguro?")
      i18n.t('unsavedChanges'), // El mensaje de la alerta (ej. "Los cambios no guardados se perderán.")
      [
        {
          text: i18n.t('cancel'), // El botón de cancelar
          style: 'cancel',
        },
        {
          text: i18n.t('continue'), // El botón de continuar
          onPress: () => router.back(),
        },
      ]
    );
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategorie(selectedCategory);
  };

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!name || !address || !categorie || !description) {
      Alert.alert(i18n.t('error'), i18n.t('allFieldsRequired'));
      return;
    }

    setIsLoading(true);

    try {
      // 1. Primero, actualizamos los datos de la tienda (sin imagen)
      const storeData = { name, address, categorie, description };
      const response = await axios.patch(
        `http://192.168.1.40:3000/api/v1/store/${storeInfo.id}`,
        storeData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const { store } = response.data;

      // Despachamos los datos actualizados de la tienda
      dispatch(updateStoreInfo(store));

      // 2. Luego, si se ha seleccionado una imagen, la subimos
      if (image) {
        const formData = new FormData();
        const uriParts = image.split('.');
        const fileType = uriParts[uriParts.length - 1];
        formData.append('businessImgUrl', {
          uri: image,
          type: `image/${fileType}`,
          name: `businessImg.${fileType}`,
        });

        try {
          // Subimos la imagen
          const imgResponse = await axios.patch(
            `http://192.168.1.40:3000/api/v1/store/upload-business-img/${storeInfo.id}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
                'Content-Type': 'multipart/form-data',
              },
            }
          );

          // Si la imagen se sube con éxito, actualizamos el estado en Redux
          if (imgResponse.data.store.businessImgUrl) {
            dispatch(updateStoreImage(imgResponse.data.store.businessImgUrl));
          }
        } catch {}
      }

      Alert.alert(i18n.t('success'), i18n.t('storeUpdated'));
      router.back(); // Vuelve atrás después de guardar
    } catch (error) {
      console.error('Error al actualizar la tienda:', error);
      Alert.alert(i18n.t('error'), i18n.t('storeUpdateFailed'));
    } finally {
      setIsLoading(false); // Ocultar el loading al finalizar
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <BackIcon size={30} color="#E53039" />
      </TouchableOpacity>

      <Text style={styles.title}>{i18n.t('updateStore')}</Text>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#E53039" />
        </View>
      ) : (
        <ScrollView style={styles.formContainer}>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={handleImagePicker}
          >
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <MaterialCommunityIcons name="camera" size={50} color="#ccc" />
            )}
          </TouchableOpacity>
          <Text style={styles.imageText}>{i18n.t('selectImage')}</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{i18n.t('storeName')}</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Tienda de Ropa"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{i18n.t('address')}</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Calle 123, Ciudad"
              value={address}
              onChangeText={setAddress}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{i18n.t('description')}</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Escribe una breve descripción de tu tienda..."
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{i18n.t('category')}</Text>
            <View style={styles.categoryContainer}>
              {categorias.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.categoryButton,
                    categorie === item && styles.selectedCategory,
                  ]}
                  onPress={() => handleCategoryChange(item)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      categorie === item && styles.selectedCategoryText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>{i18n.t('saveChanges')}</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },

  backText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  formContainer: {
    flex: 1,
  },
  imageContainer: {
    alignSelf: 'center',
    width: 350,
    height: 130,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 350,
    height: 130,
    borderRadius: 10,
  },
  imageText: {
    textAlign: 'center',
    color: '#ccc',
    fontSize: 14,
    paddingBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  categoryButton: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
  },
  selectedCategory: {
    backgroundColor: '#E53039',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#E53039',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

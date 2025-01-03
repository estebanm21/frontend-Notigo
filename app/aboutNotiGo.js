import React, { useEffect } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import i18n from '../config/i18nConfig';
import { useNavigation } from 'expo-router';

const AboutNotiGo = () => {
  const navigation = useNavigation(); // Si usas React Navigation

  useEffect(() => {
    // Función para manejar el evento de retroceso del hardware
    const backAction = () => {
      // Vuelve a la pantalla anterior
      navigation.goBack(); // Usamos el método `goBack` para ir a la pantalla anterior
      return true; // Impide el comportamiento predeterminado (salir de la app)
    };

    // Agregar el listener para el botón de retroceso
    BackHandler.addEventListener('hardwareBackPress', backAction);

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{i18n.t('aboutNotiGo')}</Text>
        <Text style={styles.text}>
          {/* Descripción general de la app */}
          <Text style={{ color: '#000' }}></Text>
          {i18n.t('textAboutNotiGo')}
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});

export default AboutNotiGo;

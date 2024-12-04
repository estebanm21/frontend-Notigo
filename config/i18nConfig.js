import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import translations from "../translations/translations.json";

// Inicializamos i18n con las traducciones
const i18n = new I18n(translations);

// Habilitamos la opción de "fallback"
i18n.enableFallback = true;

// Asignamos el idioma local del dispositivo (solo si no hay preferencia guardada)
const setInitialLocale = async () => {
  let storedLanguage = await AsyncStorage.getItem("selectedLanguage");
  if (storedLanguage) {
    // Si ya hay un idioma guardado, usarlo
    i18n.locale = storedLanguage;
  } else {
    // Si no, usar el idioma local del dispositivo
    i18n.locale = Localization.locale.split("-")[0]; // Solo la primera parte del idioma (por ejemplo: 'es' de 'es-ES')
  }
};

// Inicialización del idioma
export const initializeLanguage = async () => {
  await setInitialLocale(); // Esto configura el idioma correctamente
};

// Función para cambiar el idioma dinámicamente y guardar la preferencia
export const changeLanguage = async (languageCode) => {
  i18n.locale = languageCode; // Cambiar idioma globalmente
  await AsyncStorage.setItem("selectedLanguage", languageCode); // Guardar el idioma seleccionado
};

export default i18n;

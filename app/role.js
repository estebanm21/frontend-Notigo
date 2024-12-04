import React, { useState, useEffect } from "react";
import { Screen } from "../components/Secreen";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal as RNModal,
  TouchableWithoutFeedback,
  Pressable,
  ActivityIndicator,
} from "react-native";

import { useRouter } from "expo-router"; // Para la redirección
import AsyncStorage from "@react-native-async-storage/async-storage";

import Client from "../components/LogoCliente";
import LogoStore from "../components/LogoStore";
import i18n from "../config/i18nConfig"; // Importa i18n
import { Link } from "expo-router";
import { useLanguage } from "../components/LanguajeContext";

import { useDispatch } from "react-redux";
import { setUserInfo } from "../src/store/slices/userInfo.slices";

// Importación de las banderas
const spain = require("../assets/espain.png");
const usa = require("../assets/usa.png");
const china = require("../assets/china.png");
const india = require("../assets/india.png");
const italy = require("../assets/italy.png");
const portugal = require("../assets/portugal.png");
const russian = require("../assets/russian.png");

export default function Role() {
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const [isLoading, setIsLoading] = useState(true);
  const { selectedLanguage, handleLanguageSelect } = useLanguage();

  const router = useRouter();
  const dispatch = useDispatch();

  // Mapa de idiomas y banderas
  const flags = {
    es: spain,
    en: usa,
    zh: china,
    hi: india,
    it: italy,
    pt: portugal,
    ru: russian,
  };

  // Función para abrir y cerrar el modal
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // useEffect para actualizar el idioma cuando cambia el idioma
  useEffect(() => {
    i18n.locale = selectedLanguage; // Cambiar idioma globalmente cuando se actualiza el contexto
  }, [selectedLanguage]);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Si no es la primera vez, proceder con la verificación del token y el usuario
        const token = await AsyncStorage.getItem("userToken");
        const user = JSON.parse(await AsyncStorage.getItem("userInfo"));

        if (token && user) {
          // Si existe el token, guardamos el usuario en Redux
          dispatch(setUserInfo({ user, token }));

          // Redirigir a la pantalla correspondiente según el tipo de usuario
          if (user.isStore) {
            router.push("/storeHome"); // Si es una tienda, ir a storeHome
          } else {
            router.push("/clientHome"); // Si es cliente, ir a clientHome
          }
        }
      } catch (error) {
        console.error("Error al verificar la sesión:", error);
      } finally {
        setIsLoading(false); // Una vez verificado, se termina el estado de carga
      }
    };

    checkAuthStatus(); // Ejecuta la verificación
  }, [dispatch, router]);

  // Mientras verificamos el estado de la sesión, mostramos una pantalla de carga
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E53039" />
      </View>
    );
  }

  const navigateToLogin = () => {
    router.push("/login");
  };

  return (
    <Screen style={styles.container}>
      {/* Selector de idioma */}
      <View style={styles.languageSelector}>
        <TouchableOpacity onPress={toggleModal} style={styles.languageButton}>
          <View style={styles.languageContainer}>
            <Image source={flags[selectedLanguage]} style={styles.flag} />
            <Text style={styles.languageText}>
              {i18n.t(`languageName.${selectedLanguage}`)}{" "}
              {/* Muestra el idioma actual */}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/NotiGoLogo.png")}
        />
        <Text style={styles.textLogo}>NotiGo</Text>
      </View>

      <View style={styles.container_roles}>
        <Link asChild href="/signUpClient">
          <Pressable style={styles.buttons_roles}>
            <Client />
            <View style={styles.container_info}>
              <Text style={styles.title}>{i18n.t("client")}</Text>
              <Text style={styles.description}>{i18n.t("description1")}</Text>
            </View>
          </Pressable>
        </Link>
        <Link asChild href="/signUpStore">
          <Pressable style={styles.buttons_roles}>
            <LogoStore />
            <View style={styles.container_info}>
              <Text style={styles.title}>{i18n.t("business")}</Text>
              <Text style={styles.description}>{i18n.t("descrition2")}</Text>
            </View>
          </Pressable>
        </Link>
      </View>

      {/* Botón "Ya tienes cuenta?" */}
      <View style={styles.loginLinkContainer}>
        <TouchableOpacity onPress={navigateToLogin} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>{i18n.t("haveAccount")}</Text>
        </TouchableOpacity>
      </View>

      {/* Modal con las opciones de idioma */}
      <RNModal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal} // Cerrar el modal al presionar el botón de retroceso en Android
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalContent}>
              {Object.keys(flags).map((lang) => (
                <TouchableOpacity
                  key={lang}
                  onPress={async () => {
                    await handleLanguageSelect(lang); // Cambia el idioma
                    toggleModal(); // Cierra el modal después
                  }}
                  style={styles.modalOption}
                >
                  <View style={styles.modalOptionContent}>
                    <Image source={flags[lang]} style={styles.flag} />
                    <Text style={styles.modalOptionText}>
                      {i18n.t(`languageName.${lang}`)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </RNModal>

      {/* Términos de uso y Política de privacidad */}
      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>{i18n.t("termsAndConditionsText")}</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  logo: {
    width: 70,
    height: 70,
  },
  logoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 200,
  },
  textLogo: {
    marginLeft: 5,
    color: "#fff",
    fontSize: 35,
    fontWeight: "bold",
  },
  languageSelector: {
    position: "absolute",
    top: 80,
    alignItems: "center",
    width: "100%",
  },
  languageButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  languageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  languageText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  flag: {
    width: 30,
    height: 20,
  },
  // Estilos para el Modal
  modalBackdrop: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    width: "100%",
    alignItems: "flex-start",
    maxHeight: "90%",
  },
  modalOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  modalOptionContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  modalOptionText: {
    color: "#000",
    fontSize: 16,
    marginLeft: 10,
    flexShrink: 1,
  },

  flag: {
    width: 30,
    height: 20,
  },

  container_roles: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 310,
  },
  buttons_roles: {
    height: "auto",
    width: 330,
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 15,
  },
  container_info: {
    display: "flex",
    flexShrink: 1,
    flexDirection: "column",
    alignSelf: "flex-start",
    gap: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  // Botón "Ya tienes cuenta"
  loginLinkContainer: {
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: "#780000",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 600,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  // Términos y condiciones
  termsContainer: {
    position: "absolute",
    bottom: 20,
    alignItems: "center",

    width: 300,
  },
  termsText: {
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Fondo blanco mientras se carga
  },
});

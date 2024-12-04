import { Link } from "expo-router";
import { useRouter } from "expo-router";
import {
  Text,
  Pressable,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Screen } from "../components/Secreen";
import { BackIcon } from "../components/Icons";
import { LinearGradient } from "expo-linear-gradient";
import Google from "../components/Google";
import Facebook from "../components/Facebook";
import i18n from "../config/i18nConfig";
import { useLanguage } from "../components/LanguajeContext";
import { useForm, Controller } from "react-hook-form";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useState, useEffect } from "react";
import axios from "react-native-axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../src/store/slices/userInfo.slices";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importa AsyncStorage

const logoNotiGo = require("../assets/NotiGoLogo.png");

export default function Login() {
  const dispatch = useDispatch();

  // const { token, user } = useSelector((store) => store.userInfo);
  const router = useRouter();
  const [isStore, setIsStore] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);

  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    const checkFirstTime = async () => {
      const isFirstTimeFlag = await AsyncStorage.getItem("isFirstTime");

      if (isFirstTimeFlag) {
        setIsFirstTime(false); // Si no es la primera vez, actualizamos el estado
      } else {
        // Si es la primera vez, guardamos en AsyncStorage
        await AsyncStorage.setItem("isFirstTime", "false");
      }
    };

    checkFirstTime();
  }, []);

  // Usamos useForm de react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const savedToken = await AsyncStorage.getItem("userToken");
        const savedUserOrStore = JSON.parse(
          await AsyncStorage.getItem("userInfo")
        );

        if (savedToken && savedUserOrStore) {
          const isStore = savedUserOrStore.isStore || false;

          dispatch(
            setUserInfo({
              token: savedToken,
              user: !isStore ? savedUserOrStore : null,
              store: isStore ? savedUserOrStore : null,
            })
          );

          // Redirigir según el tipo de usuario
          router.push(isStore ? "/storeHome" : "/clientHome");
        }
      } catch (error) {
        console.error("Error al recuperar el estado del usuario:", error);
      }
    };

    checkLoginStatus();
  }, [dispatch, router]);



  const onSubmit = async (data) => {
    const url = isStore
      ? "http://192.168.1.39:3000/api/v1/auth/store/signin"
      : "http://192.168.1.39:3000/api/v1/auth/user/signin";

    try {
      const response = await axios.post(url, {
        email: data.email.trim(),
        password: data.password.trim(),
      });

      reset();

      const { token, user, store } = response.data;

      // Guardar el token y la información en AsyncStorage
      await AsyncStorage.setItem("userToken", token);

      // Guardar la información del usuario/tienda en AsyncStorage
      await AsyncStorage.setItem(
        "userInfo",
        JSON.stringify({ ...(user || store), isStore: Boolean(store) })
      );

      // console.log("Guardado en AsyncStorage:", {
      //   ...(user || store),
      //   isStore: Boolean(store),
      // });

      // Guardar la información en Redux
      dispatch(setUserInfo({ token, user, store }));

      // Redirigir a la página correspondiente
      if (isStore) {
        router.push("/storeHome");
      } else {
        router.push("/clientHome");
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        Alert.alert(i18n.t("authenticationError"), errorMessage, [
          { text: "OK" },
        ]);
      } else if (error.request) {
        Alert.alert(
          i18n.t("connectionErrorTitle"),
          i18n.t("connectionErrorMessage"),
          [{ text: "OK" }]
        );
      } else {
        Alert.alert(
          i18n.t("unexpectedErrorTitle"),
          i18n.t("unexpectedErrorMessage"),
          [{ text: "OK" }]
        );
      }
    }
  };

  const navigateToRole = () => {
    router.push("/role");
  };

  return (
    <Screen>
      <View style={styles.signInSection}>
        <Text style={styles.signInText}>{i18n.t("noAccount")}</Text>

        <TouchableOpacity onPress={navigateToRole} style={styles.signInButton}>
          <Text style={styles.signInButtonText}>{i18n.t("createAccount")}</Text>
        </TouchableOpacity>
       
      </View>

      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={logoNotiGo} />
        <Text style={styles.textLogo}>NotiGo</Text>
      </View>

      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>
          {isFirstTime ? i18n.t("getStartedTitle") : i18n.t("welcomeBack")}{" "}
          {/* Cambiar el título */}
        </Text>

        <View style={styles.userTypeSelector}>
          <TouchableOpacity
            onPress={() => setIsStore(false)}
            style={[styles.userTypeButton, !isStore && styles.selectedButton]}
          >
            <Text
              style={[
                styles.userTypeButtonText,
                !isStore && styles.selectedText,
              ]}
            >
              {i18n.t("user")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsStore(true)}
            style={[styles.userTypeButton, isStore && styles.selectedButton]}
          >
            <Text
              style={[
                styles.userTypeButtonText,
                isStore && styles.selectedText,
              ]}
            >
              {i18n.t("store")}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder={i18n.t("emailPlaceholder")}
                placeholderTextColor="#ccc"
                value={value || ""}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
            name="email"
            rules={{
              required: i18n.t("emailRequired"),
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: i18n.t("emailInvalid"),
              },
            }}
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={i18n.t("passwordPlaceholder")}
                  placeholderTextColor="#ccc"
                  secureTextEntry={!showPassword}
                  value={value || ""}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Icon
                    name={showPassword ? "visibility-off" : "visibility"}
                    size={24}
                    color="#ccc"
                  />
                </TouchableOpacity>
              </View>
            )}
            name="password"
            rules={{
              required: i18n.t("passwordRequired"),
              minLength: {
                value: 6,
                message: i18n.t("passwordTooShort"),
              },
            }}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}
        </View>

        <LinearGradient
          colors={["#6A101A", "#E53039"]}
          start={[0, 0]}
          end={[1, 0]}
          style={styles.signUpButton}
        >
          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <Text style={styles.signUpButtonText}>{i18n.t("enter")}</Text>
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.separatorContainer}>
          <View style={styles.separator}></View>
          <Text style={styles.separatorText}>{i18n.t("signInWith")}</Text>
          <View style={styles.separator}></View>
        </View>

        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Google />
            <Text style={styles.socialButtonTextGoogle}>
              {i18n.t("google")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Facebook />
            <Text style={styles.socialButtonTextFacebook}>
              {i18n.t("facebook")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: 70,
    height: 70,
  },

  logoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 150,
  },

  textLogo: {
    marginLeft: 5,
    color: "#fff",
    fontSize: 35,
    fontWeight: "bold",
  },

  backIconContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 100,
  },

  modalContainer: {
    backgroundColor: "#fff",
    marginTop: 300,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    flex: 1,
    width: "100%",
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  inputContainer: {
    marginBottom: 15,
  },

  passwordInputContainer: {
    position: "relative",
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 13,
    fontSize: 16,
    color: "#333",
    paddingRight: 40,
  },

  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },

  authErrorText: {
    color: "red",
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
  },

  signUpButton: {
    paddingVertical: 20,
    borderRadius: 12,
    marginTop: 5,
    alignItems: "center",
  },

  signUpButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },

  separator: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },

  separatorText: {
    marginHorizontal: 10,
    color: "#888",
  },

  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  socialButton: {
    backgroundColor: "#fff",
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 2,
    borderColor: "#AAAABC",
    borderWidth: 1,
  },
  socialButtonTextGoogle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  socialButtonTextFacebook: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1976D2",
  },

  signInSection: {
    position: "absolute",
    top: 50,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 100,
  },

  signInText: {
    color: "#fff",
    fontSize: 16,
  },

  signInButton: {
    marginLeft: 5,
    backgroundColor: "#6E2C34",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },

  signInButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  eyeIcon: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
  },

  userTypeSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  userTypeButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    width: "48%",
    alignItems: "center",
  },
  userTypeButtonText: {
    fontSize: 16,
    color: "#f8f9fa",
    fontWeight: "bold",
  },

  selectedButton: {
    backgroundColor: "#e63946", // Fondo rojo cuando está seleccionado
  },
  selectedText: {
    color: "#fff", // Texto blanco cuando el botón está seleccionado
  },
  userTypeButtonText: {
    fontSize: 16,
    color: "#333", // Texto en gris por defecto
    fontWeight: "bold",
  },
});

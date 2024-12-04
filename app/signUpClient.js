import { Link } from "expo-router";
import {
  Text,
  Pressable,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Screen } from "../components/Secreen";
import { BackIcon } from "../components/Icons";
import { LinearGradient } from "expo-linear-gradient";
import Google from "../components/Google";
import Facebook from "../components/Facebook";
import i18n from "../config/i18nConfig"; // Importa i18n para las traducciones
import { useLanguage } from "../components/LanguajeContext"; // Importa el contexto para el idioma
import { useForm, Controller } from "react-hook-form"; // Importa react-hook-form
import Icon from "react-native-vector-icons/MaterialIcons"; // Icono de MaterialIcons para visibilidad de contraseñas
import { useState } from "react";
import axios from "react-native-axios";
import { useRouter } from "expo-router";

const logoNotiGo = require("../assets/NotiGoLogo.png");

export default function SignUpClient() {
  const { selectedLanguage } = useLanguage(); // Accede al idioma seleccionado desde el contexto
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false); // Estado para controlar la visibilidad de la contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para confirmar la visibilidad de la contraseña

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const router = useRouter();

  // Función para manejar el envío del formulario
  const onSubmit = async (data) => {
    const url = "http://192.168.1.39:3000/api/v1/auth/user/signup";
    setIsLoading(true);
    try {
      const response = await axios.post(url, {
        name: data.name.trim(),
        email: data.email.trim(),
        password: data.password.trim(),
      });

      reset();
      setIsLoading(false);
      router.push("/login"); //
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        const errorMessage = error.response.data.message;

        console.error("Error de autenticación: ", errorMessage);
        Alert.alert(i18n.t("authenticationError"), errorMessage, [
          { text: "OK" },
        ]);
      } else if (error.request) {
        // Si no se recibe respuesta del servidor
        Alert.alert(
          i18n.t("connectionErrorTitle"),
          i18n.t("connectionErrorMessage"),
          [{ text: "OK" }]
        );
      } else {
        // Otro tipo de error inesperado
        Alert.alert(
          i18n.t("unexpectedErrorTitle"),
          i18n.t("unexpectedErrorMessage"),
          [{ text: "OK" }]
        );
      }
    }
  };

  const navigateToLogin = () => {
    router.push("/login");
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
        <Text style={styles.signInText}>{i18n.t("signInText")}</Text>

        <TouchableOpacity onPress={navigateToLogin} style={styles.signInButton}>
          <Text style={styles.signInButtonText}>
            {i18n.t("signInButtonText")}
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
        <Text style={styles.modalTitle}>{i18n.t("getStartedTitle")}</Text>

        {/* Input de Email */}
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder={i18n.t("emailPlaceholder")}
                placeholderTextColor="#ccc"
                value={value}
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

        {/* Input de Name */}
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder={i18n.t("namePlaceholder")}
                placeholderTextColor="#ccc"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
            name="name"
            rules={{
              required: i18n.t("nameRequired"),
            }}
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
                  placeholder={i18n.t("passwordPlaceholder")}
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
                value: 8,
                message: i18n.t("passwordTooShort"),
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
                message: i18n.t("passwordMustContainLettersAndNumbers"),
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
                  placeholder={i18n.t("confirmPasswordPlaceholder")}
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
                    name={showConfirmPassword ? "visibility-off" : "visibility"}
                    size={24}
                    color="#ccc"
                  />
                </TouchableOpacity>
              </View>
            )}
            name="confirmPassword"
            rules={{
              required: i18n.t("confirmPasswordRequired"),
              validate: (value, context) => {
                if (value !== context.password) {
                  return i18n.t("passwordsDoNotMatch");
                }
                return true;
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
                message: i18n.t("passwordMustContainLettersAndNumbers"),
              },
            }}
          />
          {errors.confirmPassword && (
            <Text style={styles.errorText}>
              {errors.confirmPassword.message}
            </Text>
          )}
        </View>

        {/* Botón de Sign Up con Degradado */}
        <LinearGradient
          colors={["#6A101A", "#E53039"]}
          start={[0, 0]}
          end={[1, 0]}
          style={styles.signUpButton}
        >
          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <Text style={styles.signUpButtonText}>
              {i18n.t("signUpButtonText")}
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Separadores */}
        <View style={styles.separatorContainer}>
          <View style={styles.separator}></View>
          <Text style={styles.separatorText}>{i18n.t("orSignUpWith")}</Text>
          <View style={styles.separator}></View>
        </View>

        {/* Botones de Google y Facebook */}
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
    top: 130,
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
    marginTop: 230,
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
  signUpButton: {
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 20,
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
  passwordInputContainer: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Fondo blanco mientras se carga
  },
});

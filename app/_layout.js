import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import { LanguageProvider } from "../components/LanguajeContext";
import { Provider } from "react-redux";
import store from "../src/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Componente para el encabezado personalizado
const CustomHeader = () => (
  <LinearGradient
    colors={["#933535", "#BB4343", "#F95959"]} // Colores del degradado
    start={{ x: 0, y: 0 }} // Inicio del degradado (izquierda)
    end={{ x: 1, y: 0 }} // Fin del degradado (derecha)
    style={styles.header}
  ></LinearGradient>
);

export default function Layout() {
  return (
    <GestureHandlerRootView>
    <Provider store={store}>
      <LanguageProvider>
        <View style={styles.container}>
          <Stack
            screenOptions={{
              header: () => <CustomHeader />,
              headerTintColor: "#fff",
              headerTitle: "",
            }}
          />
        </View>
      </LanguageProvider>
    </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

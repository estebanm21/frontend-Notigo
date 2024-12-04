import React, { useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await AsyncStorage.getItem("userToken");
      const userInfo = await AsyncStorage.getItem("userInfo");

      // Si no hay token o información de usuario, redirige al login
      if (!token || !userInfo) {
        router.push("/login");
      } else {
        setIsAuthenticated(true); // Usuario autenticado
      }
    };

    checkAuthentication();
  }, [router]);

  // Mientras verificamos la autenticación, muestra un "Loading..."
  if (!isAuthenticated) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E53039" />
      </View>
    );
  }

  return children; // Si está autenticado, renderiza el contenido
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default ProtectedRoute;

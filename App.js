import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Main } from "./components/Main";
import { LanguageProvider } from "./components/LanguajeContext";
import { initializeLanguage } from "./config/i18nConfig";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    initializeLanguage();
  }, []);
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <View>
          <Main />
          <StatusBar style="auto" />
        </View>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}

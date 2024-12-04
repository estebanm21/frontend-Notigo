import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { changeLanguage } from "../config/i18nConfig"; // Asegúrate de importar la función para cambiar el idioma globalmente

// Crear el contexto
const LanguageContext = createContext();

// Proveedor del contexto
export const LanguageProvider = ({ children }) => {
    const [selectedLanguage, setSelectedLanguage] = useState(null); // Inicializamos como null para esperar el idioma

    // Cargar el idioma desde AsyncStorage cuando la aplicación se inicie
    useEffect(() => {
        const loadLanguage = async () => {
            const storedLanguage = await AsyncStorage.getItem("selectedLanguage");
            if (storedLanguage) {
                setSelectedLanguage(storedLanguage);
                await changeLanguage(storedLanguage); // Cambiar idioma globalmente
            } else {
                // Si no hay idioma guardado, usamos español por defecto
                setSelectedLanguage("es");
                await changeLanguage("es");
            }
        };
        loadLanguage();
    }, []); // Solo se ejecuta una vez cuando el componente se monta

    // Si el idioma aún no está cargado, no renderizamos nada (evitar que se muestre contenido con el idioma por defecto antes de que se cargue)
    if (selectedLanguage === null) {
        return null; // O podrías mostrar un "loading" o "splash screen" mientras se carga el idioma
    }

    // Función para cambiar el idioma
    const handleLanguageSelect = async (language) => {
        setSelectedLanguage(language);
        // Guardar el idioma seleccionado en AsyncStorage
        await AsyncStorage.setItem("selectedLanguage", language);
        // Cambiar el idioma globalmente
        await changeLanguage(language);
    };

    return (
        <LanguageContext.Provider value={{ selectedLanguage, handleLanguageSelect }}>
            {children}
        </LanguageContext.Provider>
    );
};

// Hook para usar el contexto
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};

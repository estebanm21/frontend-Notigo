import { LinearGradient } from 'expo-linear-gradient';
import { View, StyleSheet } from "react-native";

export function Screen({ children }) {
    return (
        <LinearGradient
            colors={['#933535', '#BB4343', '#F95959']} // Colores del degradado
            start={{ x: 0, y: 0 }} // Inicio del degradado (izquierda)
            end={{ x: 1, y: 0 }} // Fin del degradado (derecha)
            style={styles.container}
        >
            {children}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

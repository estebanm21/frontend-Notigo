import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Screen } from "../components/Secreen"
import * as Location from 'expo-location';
import { Link } from "expo-router"
import { LinearGradient } from 'expo-linear-gradient';


import LocationPermissionDialog from "../components/LocationPermissionDialog";


const logoNotigo = require("../assets/NotiGoLogo.png")

export default function Location() {
    const [isDialogVisible, setDialogVisible] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);

    const handleAccept = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            setDialogVisible(false);
            return;
        }

        setDialogVisible(false);
        // Obtener la ubicación actual
        try {
            let location = await Location.getCurrentPositionAsync({});
            console.log(location);
        } catch (error) {
            setErrorMsg('Unable to retrieve location');
        }
    };

    const handleDecline = () => {
        setDialogVisible(false);
    };

    return (
        <Screen>
            <Image style={styles.logo} source={logoNotigo} />

            <LocationPermissionDialog
                visible={isDialogVisible}
                onAccept={handleAccept}
                onDecline={handleDecline}
            />
            {!isDialogVisible && ( // Mostrar botón solo si el diálogo no está visible
                <Link asChild href="/role">
                    <Pressable style={styles.btnNext}>
                        {({ pressed }) => (
                            <LinearGradient
                                colors={["#551E1E", "#BB4343"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.gradient}
                            >
                                <Text style={styles.buttonText}>Continuar</Text>
                            </LinearGradient>
                        )}
                    </Pressable>
                </Link>
            )}
        </Screen>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 150,
        height: 150,
        top: 300,
        position: "absolute",
    },
    errorText: {
        color: 'red',
        marginTop: 20,
        textAlign: 'center',
    },
    btnNext: {
        width: "90%",
        position: "absolute",
        bottom: 50,
        left: "5%", // Centrar horizontalmente
        height: 60,
    },
    gradient: {
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
});
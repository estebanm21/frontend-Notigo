import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const LocationPermissionDialog = ({ visible, onAccept, onDecline }) => {
    if (!visible) return null; // No renderizar si no está visible

    return (
        <View style={styles.overlay}>
            <View style={styles.dialog}>
                <Text style={styles.title}>Permiso de privacidad</Text>
                <Text style={styles.text}>
                    Para mejorar tu experiencia, NotiGo requiere acceso a tu ubicación. Este permiso nos permitirá
                    facilitar el registro de personas y negocios de acuerdo a su ubicación y enviar notificaciones cuando te encuentres dentro del rango de radio establecido por los negocios cercanos.
                </Text>
                <TouchableOpacity style={styles.buttonAccept} onPress={onAccept}>
                    <Text style={styles.buttonTextAccept}>Aceptar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonDecline} onPress={onDecline}>
                    <Text style={styles.buttonTextDecline}>Ahora no</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end', // Para que el diálogo aparezca desde abajo
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
    },
    dialog: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: 393,
        padding: 20,
        // marginHorizontal: 10,
        alignItems: 'center',
        // elevation: 5, // Sombra para Android
    },
    text: {
        marginBottom: 20, // Espacio entre el texto y los botones
        textAlign: 'left',
        color: "#9494A0",




    },
    buttonAccept: {
        backgroundColor: '#E8303A', // Color de fondo de los botones
        width: '100%', // Ancho completo
        padding: 15,
        borderRadius: 50,
        alignItems: 'center',
        marginVertical: 5, // Espacio entre los botones
    },

    buttonDecline: {
        backgroundColor: '#ccc', // Color de fondo de los botones
        width: '100%', // Ancho completo
        padding: 15,
        borderRadius: 50,
        alignItems: 'center',
        marginVertical: 5,

    },



    buttonTextAccept: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18
    },

    buttonTextDecline: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 18
    },

    title: {
        color: "#000",
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 10,
        alignSelf: "flex-start"

    }
});

export default LocationPermissionDialog;

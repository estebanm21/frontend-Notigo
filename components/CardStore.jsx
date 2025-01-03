
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from "react-native"
import i18n from "../config/i18nConfig";
const imgDefault = require('../assets/no_image.png');
import { LinearGradient } from 'expo-linear-gradient';
import { BellIcon, PinIcon } from "./Icons";
import { Link } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { Entypo } from '@expo/vector-icons'; // Para usar la flecha hacia abajo
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setIsSubscribedState } from "../src/store/slices/stores.slices";


export default function CardStore({ item: store, index, calculateDistance, formatDistance, filteredStores, location, unsubscribeFromStore, subscribeToStore }) {

    const [suscription, setSuscription] = useState();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Para controlar la visibilidad del menú

    const dispatch = useDispatch()

    const isSubscribed = useSelector((state) => state.store.subscribedStores.includes(store.id));

    const userToken = useSelector((state) => state.userInfo.token);
    // Calcular la distancia de la tienda al usuario
    const distanceToStore = calculateDistance(location, {
        latitude: store.latitude, // Suponiendo que cada tienda tiene 'latitude' y 'longitude'
        longitude: store.longitude,
    });
    const isLastItem = index === filteredStores.length - 1;




    useEffect(() => {
        const checkSubscription = async () => {
            try {
                const subscriptions = await AsyncStorage.getItem('subscriptions'); // Obtener las suscripciones guardadas
                const parsedSubscriptions = subscriptions ? JSON.parse(subscriptions) : [];

                dispatch(setIsSubscribedState({
                    storeId: store.id,
                    isSubscribed: parsedSubscriptions.includes(store.id), // Compara si la tienda está suscrita
                }));
            } catch (error) {
                console.log('Error al cargar las suscripciones', error);
            }
        };

        checkSubscription(); // Comprobar la suscripción al montar el componente
    }, [store.id, dispatch]);





    const handleSubscriptionChange = async () => {
        try {
            const subscriptions = await AsyncStorage.getItem('subscriptions'); // Obtener las suscripciones guardadas
            const parsedSubscriptions = subscriptions ? JSON.parse(subscriptions) : [];

            if (isSubscribed) {
                // Desuscribirse
                const updatedSubscriptions = parsedSubscriptions.filter(id => id !== store.id);
                await AsyncStorage.setItem('subscriptions', JSON.stringify(updatedSubscriptions)); // 

            } else {
                // Suscribirse
                const updatedSubscriptions = [...parsedSubscriptions, store.id];
                await AsyncStorage.setItem('subscriptions', JSON.stringify(updatedSubscriptions)); // Guardar el nuevo estado
            }

            if (isSubscribed) {
                // Eliminar suscripción
                await unsubscribeFromStore(store.id);
            } else {
                // Suscribirse
                await subscribeToStore(store.id);
            }
            dispatch(setIsSubscribedState({
                storeId: store.id,
                isSubscribed: !isSubscribed,
            }));


            setIsMenuOpen(false); // Cerrar el menú después de cambiar la suscripción
        } catch (error) {
            console.log('Error al actualizar la suscripción', error);
        }
    };

    return (
        <Link asChild href={`/${store.id}`}>
            <Pressable>
                <View style={[styles.card_store, isLastItem && styles.lastCard]}>
                    <View>
                        <Image
                            resizeMode="cover"
                            style={styles.image}
                            source={store.businessImgUrl ? { uri: store.businessImgUrl } : imgDefault}
                        />

                        <View style={styles.logoContainer}>
                            <Image source={{ uri: store.profileImgUrl }} style={styles.logo} />
                        </View>

                        {/* container info */}
                        <View style={styles.container_info}>
                            <View style={styles.shadow_2}></View>
                            <Image
                                blurRadius={98}
                                resizeMode="cover"
                                style={styles.image_info}
                                source={store.businessImgUrl ? { uri: store.businessImgUrl } : imgDefault}
                            />

                            <Text style={styles.name_store}>{store.name}</Text>
                            <View style={styles.container_adress}>
                                <PinIcon size={18} color="#937199" />
                                <Text style={{ color: '#fff' }}>{store.address}</Text>
                            </View>
                            <View style={styles.container_categorie}>
                                <Text style={styles.text_categorie}>{store.categorie}</Text>
                                <Text style={styles.dot}>.</Text>
                                <Text style={styles.distance}>
                                    {store.longitude === null || store.latitude === null ? "Distancia desconocida" : formatDistance(distanceToStore)}
                                </Text>
                            </View>


                            {/* Botón de suscripción con menú desplegable */}
                            <TouchableOpacity
                                style={[styles.suscriptionButton, isSubscribed ? styles.suscribed : styles.notSuscribed]}
                                onPress={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <BellIcon size={20} color={isSubscribed ? "#FFD700" : "#ccc"} />
                                <Text style={styles.suscriptionButtonText}>
                                    {isSubscribed ? i18n.t('subscribed') : i18n.t('subscribe')}
                                </Text>
                                <Entypo name={isMenuOpen ? 'chevron-up' : 'chevron-down'} size={20} color="#fff" />
                            </TouchableOpacity>

                            {/* Opciones de menú de suscripción */}
                            {isMenuOpen && (
                                <View style={styles.menuOptions}>
                                    <TouchableOpacity
                                        style={styles.menuOption}
                                        onPress={handleSubscriptionChange}
                                    >
                                        <Text style={styles.menuOptionText}>
                                            {isSubscribed ? i18n.t('unsubscribe') : i18n.t('subscribe')}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}

                        </View>
                    </View>
                </View>
            </Pressable>
        </Link>
    );
}


const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 140,
        marginBottom: 0,
    },

    suscriptionButton: {
        zIndex: 3,
        width: 140,
        paddingVertical: 5,
        marginTop: 5,
        borderRadius: 10,
        paddingHorizontal: 10,
        display: "flex",
        flexDirection: "row",
        gap: 5,
        backgroundColor: "#BB4343",
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    suscribed: {
        backgroundColor: "#000",
    },

    notSuscribed: {
        backgroundColor: "#BB4343",
    },

    menuOptions: {
        backgroundColor: "#434442",
        position: 'absolute',
        top: 40,
        width: 200,
        borderRadius: 10,
        zIndex: 5,
    },

    menuOption: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },

    menuOptionText: {
        color: '#fff',
        fontSize: 16,

    },

    clearButton: {
        position: 'absolute',
        right: 10,
        top: 10,
    },

    buttonSus: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
    },

    suscriptionButtonText: {
        color: '#fff',
        fontWeight: '400',
    },

    shadow: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        position: 'absolute',
    },

    shadow_2: {
        width: 500,
        height: 145,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        position: 'absolute',
        zIndex: 1,
    },

    image_info: {
        width: 375,
        height: 165,
        marginBottom: 0,
        position: 'absolute',
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },

    textLogo: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
    },

    containerNotigoLogo: {
        display: 'flex',
        flexDirection: 'row',
        height: 'auto',
        alignItems: 'center',
        gap: 5,
    },

    logoNotigo: {
        width: 50,
        height: 50,
        borderRadius: 10,
    },

    lastCard: {
        marginBottom: 30,
    },

    name_store: {
        fontSize: 19,
        marginLeft: 3,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: '#fff',
        zIndex: 3,
    },

    container_cards: {
        paddingTop: 10,
        width: '100%',
        height: '100%',
        paddingHorizontal: 10,
    },

    card_store: {
        display: 'flex',
        flexDirection: 'column',
        width: 'auto',
        height: 'auto',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        marginBottom: 12,
    },

    container_info: {
        backgroundColor: '#434442',
        width: '100%',
        height: 'auto',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },

    container_adress: {
        display: 'flex',
        flexDirection: 'row',
        zIndex: 3,
    },

    text_categorie: {
        marginLeft: 6,
        color: '#fff',
    },
    container_categorie: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 3,
    },

    dot: {
        fontSize: 16,
        marginHorizontal: 3,
        color: '#fff',
        fontWeight: '500',
    },

    distance: {
        color: '#fff',
        zIndex: 3,
    },

    logoContainer: {
        position: 'absolute',
        top: 180,
        right: 20,
        zIndex: 20,
    },

    logo: {
        width: 60,
        height: 60,
        borderRadius: 12,
    },

    icon: {
        marginRight: 10,
    },

    input: {
        flex: 1,
        fontSize: 16,
        color: '#FFF',
        backgroundColor: '#370617',
    },

    flatListContainer: {
        paddingHorizontal: 5,
        marginBottom: 20,
    },

    categoriaContainer: {
        backgroundColor: '#370617',
        marginRight: 4,
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 5,
    },

    categoriaText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: 'bold',
    },
});

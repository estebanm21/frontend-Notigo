
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from "react-native"
import i18n from "../config/i18nConfig";
const imgDefault = require('../assets/no_image.png');
import { LinearGradient } from 'expo-linear-gradient';
import { BellIcon, PinIcon } from "./Icons";
import { Link } from "expo-router";


export default function CardStore({ item: store, index, calculateDistance, formatDistance, filteredStores, location }) {


    // Calcular la distancia de la tienda al usuario
    const distanceToStore = calculateDistance(location, {
        latitude: store.latitude, // Suponiendo que cada tienda tiene 'latitude' y 'longitude'
        longitude: store.longitude,
    });
    const isLastItem = index === filteredStores.length - 1;

    return (
        <Link asChild href={`/${store.id}`}>
            <Pressable

            >
                <View style={[styles.card_store, isLastItem && styles.lastCard]}>
                    <View>
                        <Image
                            resizeMode="cover"
                            style={styles.image}
                            source={
                                store.businessImgUrl ? { uri: store.businessImgUrl } : imgDefault
                            }
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
                                source={
                                    store.businessImgUrl ? { uri: store.businessImgUrl } : imgDefault
                                }
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
                                    {isNaN(distanceToStore) ? "Distancia desconocida" : formatDistance(distanceToStore)}
                                </Text>
                            </View>

                            <LinearGradient
                                colors={['#933535', '#BB4343', '#F95959']}
                                start={[0, 0]}
                                end={[1, 0]}
                                style={styles.suscriptionButton}
                            >
                                <TouchableOpacity style={styles.buttonSus}>
                                    <BellIcon size={20} color="#ccc" />
                                    <Text style={styles.suscriptionButtonText}>
                                        {i18n.t('subscribe')}
                                    </Text>
                                </TouchableOpacity>
                            </LinearGradient>
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
        width: 120,
        zIndex: 3,
        paddingVertical: 5,
        marginTop: 5,
        borderRadius: 10,
        paddingHorizontal: 5,
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
        // fontWeight: "500"
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
        // fontWeight: "500",
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

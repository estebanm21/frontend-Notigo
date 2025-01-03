import React, { useEffect } from 'react';
import { ScrollView, Text, StyleSheet, View, BackHandler } from 'react-native';
import i18n from '../config/i18nConfig';
import { useNavigation } from 'expo-router';

const TermsAndConditions = () => {
  const navigation = useNavigation(); // Si usas React Navigation

  useEffect(() => {
    // Función para manejar el evento de retroceso del hardware
    const backAction = () => {
      // Vuelve a la pantalla anterior
      navigation.goBack(); // Usamos el método `goBack` para ir a la pantalla anterior
      return true; // Impide el comportamiento predeterminado (salir de la app)
    };

    // Agregar el listener para el botón de retroceso
    BackHandler.addEventListener('hardwareBackPress', backAction);

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{i18n.t('usageTerms')}</Text>

        <Text style={styles.text}>{i18n.t('welcomeText')}</Text>

        <Text style={styles.subtitle}>{i18n.t('serviceDescription')}</Text>
        <Text style={styles.text}>{i18n.t('serviceDescriptionDetail')}</Text>

        <Text style={styles.subtitle}>{i18n.t('requirementsForUse')}</Text>
        <Text style={styles.subtitle}>{i18n.t('requirementsForStores')}</Text>
        <Text style={styles.text}>{i18n.t('requirement1')}</Text>
        <Text style={styles.text}>{i18n.t('requirement2')}</Text>
        <Text style={styles.text}>{i18n.t('requirement3')}</Text>
        <Text style={styles.text}>{i18n.t('requirement4')}</Text>
        <Text style={styles.text}>{i18n.t('requirement5')}</Text>

        <Text style={styles.subtitle}>{i18n.t('requirementsForUsers')}</Text>
        <Text style={styles.text}>{i18n.t('userRequirement1')}</Text>
        <Text style={styles.text}>{i18n.t('userRequirement2')}</Text>
        <Text style={styles.text}>{i18n.t('userRequirement3')}</Text>
        <Text style={styles.text}>{i18n.t('userRequirement4')}</Text>
        <Text style={styles.text}>{i18n.t('note')}</Text>

        <Text style={styles.subtitle}>{i18n.t('usoPermitido')}</Text>
        <Text style={styles.subtitle}>{i18n.t('usoParaComercios')}</Text>
        <Text style={styles.text}>{i18n.t('commerceRequirement1')}</Text>
        <Text style={styles.text}>{i18n.t('commerceRequirement2')}</Text>
        <Text style={styles.text}>{i18n.t('commerceRequirement3')}</Text>
        <Text style={styles.text}>{i18n.t('commerceRequirement4')}</Text>
        <Text style={styles.text}>{i18n.t('commerceRequirement5')}</Text>
        <Text style={styles.text}>{i18n.t('commerceRequirement6')}</Text>
        <Text style={styles.text}>{i18n.t('commerceRequirement7')}</Text>
        <Text style={styles.text}>{i18n.t('commerceRequirement8')}</Text>
        <Text style={styles.text}>{i18n.t('commerceRequirement9')}</Text>

        <Text style={styles.subtitle}>{i18n.t('sectionTitle')}</Text>
        <Text style={styles.text}>{i18n.t('point1')}</Text>
        <Text style={styles.text}>{i18n.t('point2')}</Text>
        <Text style={styles.text}>{i18n.t('point3')}</Text>
        <Text style={styles.text}>{i18n.t('point4')}</Text>
        <Text style={styles.text}>{i18n.t('point5')}</Text>
        <Text style={styles.text}>{i18n.t('point6')}</Text>

        <Text style={styles.subtitle}>{i18n.t('locationPrivacyTitle')}</Text>
        <Text style={styles.text}>{i18n.t('dataCollection')}</Text>
        <Text style={styles.text}>{i18n.t('dataProtection')}</Text>
        <Text style={styles.text}>{i18n.t('minorConsent')}</Text>

        <Text style={styles.subtitle}>{i18n.t('liabilityTitle')}</Text>
        <Text style={styles.text}>{i18n.t('notificationLimitation')}</Text>
        <Text style={styles.text}>{i18n.t('contentResponsibility')}</Text>
        <Text style={styles.text}>{i18n.t('directDamages')}</Text>
        <Text style={styles.text}>{i18n.t('misuseResponsibility')}</Text>
        <Text style={styles.text}>{i18n.t('serviceAvailability')}</Text>
        <Text style={styles.text}>{i18n.t('merchantNotifications')}</Text>
        <Text style={styles.text}>{i18n.t('deviceRequirements')}</Text>

        <Text style={styles.subtitle}>{i18n.t('serviceSuspensionTitle')}</Text>
        <Text style={styles.text}>{i18n.t('violationSuspension')}</Text>
        <Text style={styles.text}>{i18n.t('pendingPaymentsRestriction')}</Text>
        <Text style={styles.text}>{i18n.t('inactiveAccounts')}</Text>
        <Text style={styles.text}>{i18n.t('maintenanceSuspension')}</Text>
        <Text style={styles.text}>{i18n.t('appealProcess')}</Text>

        <Text style={styles.subtitle}>{i18n.t('modificationsTitle')}</Text>
        <Text style={styles.text}>{i18n.t('modificationsContent')}</Text>
        <Text style={styles.text}>{i18n.t('modificationsRecommendation')}</Text>

        <Text style={styles.subtitle}>{i18n.t('serviceUpdatesTitle')}</Text>
        <Text style={styles.text}>{i18n.t('serviceUpdatesContent')}</Text>

        <Text style={styles.subtitle}>{i18n.t('additionalRightsTitle')}</Text>
        <Text style={styles.text}>{i18n.t('modifyService')}</Text>
        <Text style={styles.text}>{i18n.t('changeFees')}</Text>
        <Text style={styles.text}>{i18n.t('denyAccess')}</Text>
        <Text style={styles.text}>{i18n.t('monitorUsage')}</Text>
        <Text style={styles.text}>{i18n.t('updateFeatures')}</Text>
        <Text style={styles.text}>{i18n.t('withholdPayments')}</Text>

        <Text style={styles.subtitle}>{i18n.t('governingLawTitle')}</Text>
        <Text style={styles.text}>{i18n.t('governingLawText')}</Text>

        <Text style={styles.subtitle}>{i18n.t('contactTitle')}</Text>
        <Text style={styles.text}>{i18n.t('contactText1')}</Text>

        <Text style={styles.text}>{i18n.t('contactText2')}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 8,
  },
});

export default TermsAndConditions;

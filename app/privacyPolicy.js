import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import i18n from '../config/i18nConfig';

const PrivacyPolicy = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{i18n.t('privacyPolicy')}</Text>
        <Text style={styles.text}>
          {/* Aquí va el contenido completo de la Política de Privacidad */}
          <Text style={{ color: '#000' }}>
            hello desde las politicas de privacidad
          </Text>
          {i18n.t('privacyPolicyText')}
        </Text>
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
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});

export default PrivacyPolicy;

import { Tabs } from 'expo-router';
import {
  HomeIcon,
  NotificationIcon,
  StoreIcon,
  UserIcon,
  NotificationBellIcon,
} from '../../components/Icons';
import i18n from '../../config/i18nConfig';

import { BlurView } from 'expo-blur';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#e26d5c',
        tabBarInactiveTintColor: '#343a40',

        tabBarStyle: {
          height: 55,

          borderTopWidth: 0, // Eliminar
        },
        tabBarItemStyle: {
          justifyContent: 'center', // Centra verticalmente los iconos
          alignItems: 'center', // Centra horizontalmente los iconos
        },
      }}
    >
      <Tabs.Screen
        name="clientHome"
        options={{
          title: i18n.t('home'),
          tabBarIcon: ({ color }) => <HomeIcon color={color} size={27} />,
        }}
      />

      <Tabs.Screen
        name="stores"
        options={{
          title: i18n.t('stores'),
          tabBarIcon: ({ color }) => <StoreIcon color={color} size={27} />,
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          title: i18n.t('notifications'),
          tabBarIcon: ({ color }) => (
            <NotificationIcon color={color} size={27} />
          ),
        }}
      />

      <Tabs.Screen
        name="suscriptions"
        options={{
          title: 'suscriptions',
          tabBarIcon: ({ color }) => (
            <NotificationBellIcon color={color} size={27} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: i18n.t('profile'),
          tabBarIcon: ({ color }) => <UserIcon color={color} size={27} />,
        }}
      />
    </Tabs>
  );
}

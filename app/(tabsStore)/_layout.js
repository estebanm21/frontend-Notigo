import { Tabs } from "expo-router";
import { HomeIcon, PlusIcon, UserIcon } from "../../components/Icons";
import i18n from "../../config/i18nConfig";
import "react-native-get-random-values"

export default function TabsLayoutStore() {


  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#dc2f02",
        
        
      }}
      
      
    >
      <Tabs.Screen
        name="storeHome"
        options={{
          title: i18n.t("home"),


          tabBarIcon: ({ color }) => <HomeIcon color={color} size={25} />,
        }}


      />

      <Tabs.Screen
        name="createNotification"
        options={{
          title: i18n.t("notifications"),
          tabBarIcon: ({ color }) => <PlusIcon color={color} size={25} />,
        }}
      />

 <Tabs.Screen
        name="profileStore"
        options={{
          title: i18n.t("profile"),
          tabBarIcon: ({ color }) => <UserIcon color={color} size={25} />,
        }}
      />
    </Tabs>
  );
}

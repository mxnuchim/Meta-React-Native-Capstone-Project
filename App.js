import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useMemo, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Onboarding from "./screens/Onboarding";
import { AuthContext } from "./store/AuthContext";
import Loading from "./screens/Loading";
import Profile from "./screens/Profile";
import Home from "./screens/Home";

const Stack = createNativeStackNavigator();

export default function App() {
  const [status, setStatus] = useState({
    isLoading: true,
    isOnboardingCompleted: false,
  });

  useEffect(() => {
    (async () => {
      let profileData = [];
      try {
        const getProfile = await AsyncStorage.getItem("profile");
        if (getProfile !== null) {
          profileData = getProfile;
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (Object.keys(profileData).length != 0) {
          setStatus({
            ...status,
            isLoading: false,
            isOnboardingCompleted: true,
          });
        } else {
          setStatus({
            ...status,
            isLoading: false,
            isOnboardingCompleted: false,
          });
        }
      }
    })();
  }, []);

  const authContext = useMemo(
    () => ({
      onboard: async (data) => {
        try {
          const jsonValue = JSON.stringify(data);
          await AsyncStorage.setItem("profile", jsonValue);
        } catch (e) {
          console.error("error", e);
        }

        setStatus({
          ...status,
          isLoading: false,
          isOnboardingCompleted: true,
        });
      },

      logout: async () => {
        try {
          await AsyncStorage.clear();
        } catch (e) {
          console.error("error", e);
        }

        setStatus({
          ...status,
          isLoading: false,
          isOnboardingCompleted: false,
        });
      },
      update: async (data) => {
        try {
          const jsonValue = JSON.stringify(data);
          await AsyncStorage.setItem("profile", jsonValue);
        } catch (e) {
          console.error("error", e);
        }

        Alert.alert("Success", "Changes has been successfully saved!");
      },
    }),
    []
  );

  if (status.isLoading) {
    return <Loading />;
  }
  return (
    <AuthContext.Provider value={authContext}>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator>
          {status.isOnboardingCompleted ? (
            <>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Profile" component={Profile} />
            </>
          ) : (
            <Stack.Screen
              name="Onboarding"
              component={Onboarding}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

import React from "react";
import { Button } from "react-native";
import useCachedResources from "../hooks/useCachedResources";
import useColorScheme from "../hooks/useColorScheme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "../navigation";
import { StatusBar } from "expo-status-bar";
import Expo from "expo";
import { registerRootComponent } from "expo";

import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";
import { Amplify } from "aws-amplify";

import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button title="Sign Out" onPress={signOut} />;
}

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Authenticator.Provider>
          <Authenticator>
            <SafeAreaProvider>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </SafeAreaProvider>
          </Authenticator>
        </Authenticator.Provider>
      </SafeAreaProvider>
    );
  }
}

export default registerRootComponent(App);

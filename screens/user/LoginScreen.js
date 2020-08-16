import React, { useState } from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import SimpleInput from "../../components/UI/SimpleInput";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";

const LoginScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <SimpleInput
              id="username"
              label="Username"
              keyboardType="default"
              secureTextEntry={false}
              onInputChange={(text) => {
                setUsername(text);
              }}
            />
            <SimpleInput
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry={true}
              onInputChange={(text) => {
                setPassword(text);
              }}
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Button
                  title="Login"
                  color={Colors.primary}
                  onPress={() => {
                    setIsLoading(true);
                    console.log(username, password);
                    if (username === "Abc" && password === "123") {
                      setIsLoading(false);
                      props.navigation.navigate("UserProducts");
                    }
                    setIsLoading(false);
                  }}
                />
              )}
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default LoginScreen;

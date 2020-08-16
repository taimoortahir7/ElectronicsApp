import React, { useState } from "react";
import {
  ScrollView,
  View,
  TextInput,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

// import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import * as orderActions from "../../store/actions/orders";

const ConfirmOrder = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [zipcode, setzipcode] = useState('');
  const cartItems = props.navigation.getParam("cartItems");
  const cartTotalAmount = props.navigation.getParam("cartTotalAmount");
  console.log("Items: ", cartItems);
  const dispatch = useDispatch();

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
          <View style={styles.formControl}>
              <Text style={styles.label}>Country</Text>
              <TextInput
                style={styles.input}
                value={country}
                onChangeText={(text) => setCountry(text)}
                textContentType="countryName"
              />
            </View>
            <View style={styles.formControl}>
              <Text style={styles.label}>Region / City</Text>
              <TextInput
                style={styles.input}
                value={city}
                onChangeText={(text) => setCity(text)}
                textContentType="addressCityAndState"
              />
            </View>
            <View style={styles.formControl}>
              <Text style={styles.label}>Address</Text>
              <TextInput
                style={styles.input}
                value={address}
                onChangeText={(text) => setAddress(text)}
                autoCompleteType="street-address"
                textContentType="fullStreetAddress"
              />
            </View>
            <View style={styles.formControl}>
              <Text style={styles.label}>Zip Code</Text>
              <TextInput
                style={styles.input}
                value={zipcode}
                onChangeText={(text) => setzipcode(text)}
                autoCompleteType="postal-code"
                textContentType="postalCode"
              />
            </View>

            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Button
                  title="Place Order"
                  color={Colors.primary}
                  onPress={() => {
                    let locationAddress = {
                      country: country,
                      city: city,
                      address: address,
                      zipcode: zipcode
                    };
                    setIsLoading(true);
                    dispatch(orderActions.addOrder(cartItems, cartTotalAmount, locationAddress));
                    setIsLoading(false);
                    props.navigation.navigate("ProductsOverview");
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

ConfirmOrder.navigationOptions = {
  headerTitle: "Place Your Order",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
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

export default ConfirmOrder;

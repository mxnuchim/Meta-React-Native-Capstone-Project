import React, { useState, useContext } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";

import Constants from "expo-constants";
import { AuthContext } from "../store/AuthContext";
import Wrapper from "../components/Wrapper";
import { validateName, validateEmail } from "../utilities";

export default function Onboarding(props) {
  const [firstName, onChangeFirstName] = useState("");
  const [lastName, onChangeLastName] = useState("");
  const [email, onChangeEmail] = useState("");

  const isEmailValid = validateEmail(email);
  const isFirstNameValid = validateName(firstName);
  const isLastNameValid = validateName(lastName);

  const { onboard } = useContext(AuthContext);

  return (
    <Wrapper>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require("../assets/images/little-lemon-logo.png")}
            accessible={true}
            accessibilityLabel={"Little Lemon"}
          />
        </View>
        <Text style={styles.welcomeText}>Let us get to know you</Text>

        <ScrollView style={styles.tab} keyboardDismissMode="on-drag">
          <View style={styles.inputSection}>
            <View style={styles.tabContainer}>
              <Text style={styles.text}>First Name</Text>
              <TextInput
                style={styles.inputBox}
                value={firstName}
                onChangeText={onChangeFirstName}
                placeholder={"First Name"}
              />
            </View>
            <View style={styles.tabContainer}>
              <Text style={styles.text}>Last Name</Text>
              <TextInput
                style={styles.inputBox}
                value={lastName}
                onChangeText={onChangeLastName}
                placeholder={"Last Name"}
              />
            </View>
            <View style={styles.tabContainer}>
              <Text style={styles.text}>Email</Text>
              <TextInput
                style={styles.inputBox}
                value={email}
                onChangeText={onChangeEmail}
                placeholder={"Email"}
                keyboardType="email-address"
              />
            </View>
          </View>
          <Pressable
            style={[
              styles.btn,
              isFirstNameValid && isLastNameValid && isEmailValid
                ? ""
                : styles.btnDisabled,
            ]}
            onPress={() => onboard({ firstName, lastName, email })}
            disabled={!isEmailValid}
          >
            <Text style={styles.btntext}>Submit</Text>
          </Pressable>
        </ScrollView>
        <View>
          <Text></Text>
        </View>
      </KeyboardAvoidingView>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 0,
    padding: 0,
    paddingTop: Constants.statusBarHeight,
  },
  logo: {
    height: 50,
    width: 150,
    resizeMode: "contain",
  },
  tab: {
    flex: 1,
  },
  inputSection: {
    backgroundColor: "#dddddd",
    padding: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
  },
  tabContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 40,
    paddingVertical: 60,
    fontFamily: "MarkaziText-Medium",
    color: "#495E57",
    textAlign: "center",
  },
  text: {
    fontSize: 24,
    fontFamily: "Karla-ExtraBold",
    color: "#495E57",
  },
  inputBox: {
    borderColor: "#EDEFEE",
    backgroundColor: "#EDEFEE",
    alignSelf: "stretch",
    height: 50,
    margin: 18,
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
    borderRadius: 9,
    fontFamily: "Karla-Medium",
  },
  btntext: {
    fontSize: 22,
    color: "#333",
    fontFamily: "Karla-Bold",
    alignSelf: "center",
  },
  btn: {
    flex: 1,
    maxHeight: 75,
    borderColor: "#f4ce14",
    backgroundColor: "#f4ce14",
    borderRadius: 9,
    alignSelf: "stretch",
    marginRight: 18,
    marginLeft: 18,
    marginTop: 75,
    padding: 10,
    borderWidth: 1,
  },
  btnDisabled: {
    backgroundColor: "#f1f4f7",
  },
  header: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#dee3e9",
  },
});

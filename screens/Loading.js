import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Wrapper from "../components/Wrapper";

export default function Loading(props) {
  return (
    <Wrapper>
      <View style={styles.conatiner}>
        <Text>Loading...</Text>
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});

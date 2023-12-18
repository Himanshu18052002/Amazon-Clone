import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();

  // send a POST  request to the backend API to register the user
  const handleRegister = async () => {
    const user = { name, email, password };
    // console.log(user);
    try {
      const response = await axios.post(
        "http://192.168.1.126:8000/register",
        user
      );
      console.log(response);
      Alert.alert(
        "Registration Successful",
        "You have registered successfully"
      );
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Registration error", error);
      Alert.alert("Registration Failed", "User is not registered");
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", backgroundColor: "white" }}
    >
      <View>
        <Image
          style={{ width: 150, height: 100 }}
          source={{
            uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
          }}
        />
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              color: "#041E42",
              marginTop: 20,
            }}
          >
            Register your account
          </Text>
        </View>
        <View style={{ marginTop: 70 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 15,
              paddingVertical: 5,
              marginTop: 10,
              backgroundColor: "#D0D0D0",
              borderRadius: 5,
            }}
          >
            <AntDesign
              name="user"
              size={24}
              style={{ marginLeft: 10 }}
              color="grey"
            />
            <TextInput
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: email ? 16 : 16,
              }}
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder="Enter you name..."
            />
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 15,
              paddingVertical: 5,
              marginTop: 30,
              backgroundColor: "#D0D0D0",
              borderRadius: 5,
            }}
          >
            <MaterialIcons
              name="email"
              size={24}
              color="grey"
              style={{ marginLeft: 10 }}
            />
            <TextInput
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: email ? 16 : 16,
              }}
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Enter you email..."
            />
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 15,
              paddingVertical: 5,
              marginTop: 25,
              backgroundColor: "#D0D0D0",
              borderRadius: 5,
            }}
          >
            <AntDesign
              name="lock"
              size={24}
              color="grey"
              style={{ marginLeft: 10 }}
            />
            <TextInput
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: password ? 16 : 16,
              }}
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder="Enter you password..."
              secureTextEntry={true}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>Keep me logged in</Text>
          <Text style={{ color: "#007fff", fontWeight: 600 }}>
            forgot password
          </Text>
        </View>
        <Pressable
          onPress={handleRegister}
          style={{
            backgroundColor: "#FEBE10",
            width: 200,
            borderRadius: 5,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 15,
            marginTop: 80,
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Register
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
      <Pressable
        onPress={() => navigation.navigate("Login")}
        style={{ marginTop: 15 }}
      >
        <Text style={{ color: "gray", fontSize: 16 }}>
          Already have an account? Login
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};
export default RegisterScreen;

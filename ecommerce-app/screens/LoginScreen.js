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
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          navigation.replace("Main");
        }
      } catch (err) {
        console.log("Login Failed" + err);
      }
    };
    checkLoginStatus();
  }, []);

  // const handleLogin = async () => {  Another way to post the api
  //   try {
  //     const user = { email, password };
  //     const response = await axios.post(
  //       "http://192.168.1.126:8000/login",
  //       user
  //     );
  //     console.log(response);
  //     const token = response.data.token;
  //     AsyncStorage.setItem("authToken", token);
  //     Alert.alert("Login Succesfull", "User Logged in");
  //     setEmail("");
  //     setPassword("");
  //     navigation.replace("Home");
  //   } catch (err) {}
  // };
  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post("http://192.168.1.126:8000/login", user)
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);
        navigation.replace("Main");
      })
      .catch((error) => {
        Alert.alert("Login Error", "Invalid Email");
        console.log(error);
      });
  };
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", backgroundColor: "white" }}
    >
      <View>
        <Image
          style={{ width: 150, height: 100, marginTop: 20 }}
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
            Login to your account
          </Text>
        </View>
        <View style={{ marginTop: 70 }}>
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
          onPress={handleLogin}
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
            Login
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
      <Pressable
        onPress={() => navigation.navigate("Register")}
        style={{ marginTop: 15 }}
      >
        <Text style={{ color: "gray", fontSize: 16 }}>
          Don't have an account? Sign up
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default LoginScreen;

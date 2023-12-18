import {
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  Pressable,
  TextInput,
  Text,
  ImageBackground,
} from "react-native";
import React from "react";
import {
  Feather,
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addToCart } from "../Redux/CartReducer";

const ProductInfoScreen = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    dispatch(addToCart(item));
  };
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);
  return (
    <ScrollView style={{ marginTop: 20 }} showsVerticalScrollIndicator={false}>
      <View
        style={{
          backgroundColor: "#00CED1",
          padding: 10,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Pressable
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginHorizontal: 7,
            height: 38,
            borderRadius: 3,
            backgroundColor: "white",
          }}
        >
          <AntDesign
            style={{ paddingLeft: 10 }}
            name="search1"
            size={22}
            color="black"
          />
          <TextInput placeholder="Search Amazon.in" />
        </Pressable>
        <Feather name="mic" size={24} color="black" />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {route.params.carouselImages.map((item, index) => (
          <ImageBackground
            style={{
              marginTop: 15,
              width: 400,
              height: 400,
              resizeMode: "contain",
            }}
            source={{ uri: item }}
            key={index}
          >
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                padding: 20,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#C60C30",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "white",
                    alignItems: "center",
                    alignItems: "center",
                  }}
                >
                  20% off
                </Text>
              </View>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#E0E0E0",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <MaterialCommunityIcons
                  name="share-variant"
                  size={24}
                  color="black"
                />
              </View>
            </View>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                marginTop: "auto",
                marginLeft: 10,
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <AntDesign name="hearto" size={24} color="black" />
            </View>
          </ImageBackground>
        ))}
      </ScrollView>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: 500 }}>
          {route.params.title}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: 600, marginTop: 8 }}>
          ₹{route.params.price}
        </Text>
      </View>
      <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />
      <View style={{ flexDirection: "row", padding: 10 }}>
        <Text>Color: </Text>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {route.params.color}
        </Text>
      </View>
      <View style={{ flexDirection: "row", padding: 10 }}>
        <Text>Size: </Text>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {route.params.size}
        </Text>
      </View>
      <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "bold", marginVertical: 5 }}>
          Total: {route.params.price}
        </Text>
        <Text style={{ color: "#00CED1" }}>
          Free Delivery tomorrow by 3 PM Order within 10 hrs 30 mins
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 8,
            gap: 5,
          }}
        >
          <Ionicons name="location-outline" size={24} color="black" />

          <Text style={{ fontSize: 14, fontWeight: 500 }}>
            Deliver to: Himanshu Dawande - Bangalore 562001
          </Text>
        </View>
      </View>
      <Text style={{ color: "green", fontWeight: 500, marginHorizontal: 10 }}>
        In Stock
      </Text>
      <Pressable
        onPress={() => addItemToCart(route.params.item)}
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 30,
          marginVertical: 10,
        }}
      >
        <Text>Add to Cart</Text>
      </Pressable>
      <Pressable
        style={{
          backgroundColor: "#FFAC1C",
          padding: 10,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 30,
          marginVertical: 10,
        }}
      >
        <Text>Buy Now</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProductInfoScreen;

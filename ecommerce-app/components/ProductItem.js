import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/CartReducer";

const ProductItem = ({ item }) => {
  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    dispatch(addToCart(item));
  };
  return (
    <Pressable style={{ marginHorizontal: 20, marginVertical: 25 }}>
      <Image style={{ width: 150, height: 150 }} source={{ uri: item.image }} />
      <Text numberOfLines={1} style={{ width: 150, marginTop: 10 }}>
        {item.title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          marginTop: 5,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}> ₹{item.price}</Text>
        <Text style={{ color: "#FFC72C", fontWeight: 500 }}>
          {item.rating.rate} ratings
        </Text>
      </View>
      <Pressable
        onPress={() => addItemToCart(item)}
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        <Text>Add to cart</Text>
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;

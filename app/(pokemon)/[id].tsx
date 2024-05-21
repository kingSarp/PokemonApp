import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Pokemon, getPokemonDetail } from "@/api/pokeapi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [details, setDetails] = useState<Pokemon | null>(null);
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);

  // useEffect(() => {
  //   const load = async () => {
  //     const details = await getPokemonDetail(id!);
  //     setDetails(details);
  //     navigation.setOptions({ title: details.name });
  //   };

  //   load();
  // }, [id]);
  useEffect(() => {
    const load = async () => {
      if (id) {
        try {
          const details = await getPokemonDetail(id);
          setDetails(details);
          navigation.setOptions({ title: details.name });
        } catch (error) {
          console.error("Error fetching Pokemon details:", error);
        }
      }

      const isFavorite = await AsyncStorage.getItem(`favorite-${id}`);
      setIsFavorite(isFavorite === "true");
    };

    load();
  }, [id, navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name={isFavorite ? "star" : "star-outline"}
          size={24}
          color="white"
          onPress={toggleFavorite}
        />
      ),
    });
  }, [isFavorite, navigation]);

  const toggleFavorite = async () => {
    await AsyncStorage.setItem(
      `favorite-${id}`,
      !isFavorite ? "true" : "false"
    );
    setIsFavorite(!isFavorite);
  };
  return (
    <View style={{ padding: 10 }}>
      {details && (
        <>
          <View style={[styles.card, { alignItems: "center" }]}>
            <Image
              source={{ uri: details.sprites.front_default }}
              style={{ width: 200, height: 200 }}
            />
            <Text style={styles.name}>
              #{details.id} {details.name}
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={{ fontSize: 18, fontFamily: "bold" }}>stats</Text>
            {details.stats.map((item: any) => (
              <Text key={item.stat.name}>
                {item.stat.name}:{item.base_stat}
              </Text>
            ))}
          </View>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    gap: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
    shadowOffset: { width: 0, height: 2 },
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});

export default Page;

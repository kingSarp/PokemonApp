import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { Pokemon, getPokemon } from "@/api/pokeapi";
import { Ionicons } from "@expo/vector-icons";

const Page = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    const load = async () => {
      const result = await getPokemon();
      setPokemon(result);
    };

    load();
  }, []);

  return (
    <ScrollView>
      {pokemon.map((p) => (
        <Link href={`/(pokemon)/${p.id}`} key={p.id} asChild>
          {/* <Text>Details</Text> */}
          <TouchableOpacity>
            <View style={styles.item}>
              <Image source={{ uri: p.image }} style={styles.preview} />
              <Text style={styles.text}>{p.name}</Text>
              <Ionicons name="chevron-forward" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  preview: {
    width: 100,
    height: 100,
  },
  text: {
    fontSize: 18,
    textTransform: "capitalize",
    flex: 1,
  },
});
export default Page;

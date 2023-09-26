import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  FlatList,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons";
import AwesomeAlert from "react-native-awesome-alerts";
import DropDownPicker from "react-native-dropdown-picker";

//This is your homepage that is used for navigating between pages
function Homepage({ navigation }) {
  //idsplaying healthy images at the footer
  const tips = [
    { tip: "Here are 10 nutritional tips ==>", key: "1", num: "" },
    { tip: "Lose extra pounds & watch your waistline", key: "2", num: "1" },
    { tip: "Exercise regularly", key: "3", num: "2" },
    { tip: "Eat a healthy diet", key: "4", num: "3" },
    { tip: "Reduce salt (sodium) in your diet", key: "5", num: "4" },
    { tip: "Limit alcohol", key: "6", num: "5" },
    { tip: "Quit smoking", key: "7", num: "6" },
    { tip: "Get a good night's sleep", key: "8", num: "7" },
    { tip: "Reduce stress", key: "9", num: "8" },
    {
      tip: "Monitor your blood pressure at home and get regular checkups",
      key: "10",
      num: "9",
    },
    { tip: "Get support from family and friends", key: "11", num: "10" },
  ];
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("BP")}
      >
        <Text style={styles.text}>MY BLOOD PRESSURE</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Medicine")}
      >
        <Text style={styles.text}>MEDICINE</Text>
      </TouchableOpacity>
      <FlatList
        data={tips}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              width: 270,
              height: 200,
              backgroundColor: "white",
              margin: 20,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
            }}
          >
            <Ionicons name="heart-circle" size={50} color="red" />
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.num}</Text>
            <Text style={{ fontSize: 20 }}>{item.tip}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.key}
        horizontal
      />
    </View>
  );
}

//accessing the navigation package
const Stack = createNativeStackNavigator();

//This is the blood pressure tracking page where you store records of your blood pressure
function BP() {
  const [sys, setSys] = useState(); //systolic
  const [dia, setDia] = useState(); //diastolic

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text style={styles.title}>Enter blood pressure</Text>
        {/*<Ionicons name="heartbeat" size={32} color="red" />*/}
        <Text
          style={{
            padding: 10,
            fontSize: 16,
            fontWeight: "500",
            marginTop: 15,
          }}
        >
          The normal Blood Pressure 90/60mmHg and 120/80mmHg{}
        </Text>
        {/*horizontal view for textInput */}
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <TextInput
            placeholder="Top(Systolic)"
            keyboardType="number-pad"
            style={{
              backgroundColor: "rgb(220,220,220)",
              width: "40%",
              height: 40,
              borderRadius: 7,
              padding: 10,
            }}
            onChangeText={(val) => setSys(val)}
          />
          <Text style={{ fontSize: 27, fontWeight: "bold", margin: 5 }}>/</Text>
          <TextInput
            placeholder="Bottom(Diastolic)"
            keyboardType="number-pad"
            style={{
              backgroundColor: "rgb(220,220,220)",
              padding: 5,
              width: "40%",
              height: 40,
              borderRadius: 7,
              padding: 10,
            }}
            onChangeText={(val) => setDia(val)}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#880808",
            width: "50%",
            height: "20%",
            justifyContent: "center",
            borderRadius: 10,
            padding: 10,
            marginTop: 20,
          }}
          onPress={() => alert("Thank you for entering your blood pressure")}
        >
          <Text
            style={{ color: "white", fontWeight: "bold", alignItems: "center" }}
          >
            Analyze
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#880808",
            width: 100,
            height: 50,
            justifyContent: "center",
            borderRadius: 10,
            padding: 10,
            marginBottom: 10,
          }}
          onPress={() => alert("This button deletes all record stored")}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              alignItems: "center",
            }}
          >
            DELETE ALL
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

//This is the medication reminder page
function Med() {
  //create variable to store values
  const [medi, setMedi] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Morning, Afternoon, Night(8hrs Interval)", value: "1" },
    { label: "Morning, Night (12hrs Interval)", value: "2" },
    { label: "One per Day (24hrs Interval)", value: "3" },
  ]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text style={styles.title}>Enter Medicine Name</Text>
        {/*<Ionicons name="heartbeat" size={32} color="red" />*/}
        <View style={{ marginTop: 10 }}>
          <TextInput
            placeholder="Name of Medicine"
            onChangeText={(text) => setMedi(text)}
            style={{
              backgroundColor: "rgb(220,220,220)",
              width: 250,
              height: 40,
              borderRadius: 7,
              padding: 10,
              marginTop: 20,
              marginBottom: 20,
            }}
          />
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={{ width: 250 }}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#880808",
            width: "50%",
            height: "15%",
            justifyContent: "center",
            borderRadius: 10,
            padding: 10,
            marginTop: 120,
          }}
          onPress={() => alert("This button saves names of medication")}
        >
          <Text
            style={{ color: "white", fontWeight: "bold", alignItems: "center" }}
          >
            SAVE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#880808",
            width: 100,
            height: 50,
            justifyContent: "center",
            borderRadius: 10,
            padding: 10,
            marginBottom: 10,
          }}
          onPress={() => alert("This button deletes all records")}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              alignItems: "center",
            }}
          >
            DELETE ALL
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Main() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Homepage} />
        <Stack.Screen name="BP" component={BP} />
        <Stack.Screen name="Medicine" component={Med} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#880808",
  },
  card: {
    width: 270,
    height: 130,
    backgroundColor: "white",
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
  },
  h1: {},
  textInput: {
    backgroundColor: "rgb(220,220,220)",
    width: "80%",
    height: "15%",
    borderRadius: 100,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  button: {
    backgroundColor: "#880808",
    height: "10%",
    width: "30%",
    borderRadius: 10,
    justifyContent: "center",
    paddingLeft: 35,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
});

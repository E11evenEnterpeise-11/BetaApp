import React, { useEffect, useState, useRef } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import AwesomeAlert from "react-native-awesome-alerts";
import DropDownPicker from "react-native-dropdown-picker";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as Device from "expo-device";

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

const Stack = createNativeStackNavigator();

function BP() {
  const [sys, setSys] = useState(); //systolic
  const [dia, setDia] = useState(); //diastolic
  const [values, setValue] = useState([]);
  const [error, setError] = useState("");
  const [modelOpen, setModelOpen] = useState(false);
  const [modelOpen1, setModelOpen1] = useState(false);

  //function for saving the input data locally
  const saveBP = async () => {
    if (sys < 70 && dia < 40) {
      setError(
        "Systolic cannot be lower than 70 and Diastolic cannot be lower than 40"
      );
    } else {
      if (sys < 90 && dia <= 60) {
        try {
          const value = {
            id: Math.random().toString(),
            Sys: sys.toString(),
            Dia: dia.toString(),
          };
          const updated = [...values, value];
          setValue(updated);
          await AsyncStorage.setItem("BP", JSON.stringify(updated));
          setModelOpen(true);
          setSys("");
          setDia("");
        } catch (error) {
          console.log(error);
        }
      }
      if (sys >= 140 && dia >= 90) {
        try {
          const value = {
            id: Math.random().toString(),
            Sys: sys.toString(),
            Dia: dia.toString(),
          };
          const updated = [...values, value];
          setValue(updated);
          await AsyncStorage.setItem("BP", JSON.stringify(updated));
          setModelOpen1(true);
          setSys("");
          setDia("");
        } catch (error) {
          console.log(error);
        }
      }
      if (sys >= 90 && dia >= 60 && sys <= 130 && dia <= 80) {
        try {
          const value = {
            id: Math.random().toString(),
            Sys: sys.toString(),
            Dia: dia.toString(),
          };
          const updated = [...values, value];
          setValue(updated);
          await AsyncStorage.setItem("BP", JSON.stringify(updated));
          alert("Normal blood pressure");
          setSys("");
          setDia("");
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  //this function automatically load data into an array
  useEffect(() => {
    loadBP();
  }, []);

  //function for getting values from your the local storage
  const loadBP = async () => {
    try {
      const result = await AsyncStorage.getItem("BP");
      if (result !== null) {
        setValue(JSON.parse(result));
      }
    } catch (error) {
      alert(error);
    }
  };

  const removeBP = async () => {
    try {
      await AsyncStorage.clear();
      alert("All records are deleted, Go back to homepage to refresh");
    } catch (error) {
      alert(error);
    }
  };

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
        <AwesomeAlert
          show={modelOpen}
          cancelText="EXIT"
          confirmText="OKAY"
          title="You have low blood pressure"
          titleStyle={{ fontSize: 28, color: "red" }}
          message="here are some recommended drugs: angiatensin II, mephentermine, midodrine, Norepinephrine, And also we recommend you see a doctor"
          messageStyle={{ fontSize: 26, color: "black" }}
          showCancelButton={true}
          showConfirmButton={true}
          onCancelPressed={() => setModelOpen(false)}
          onConfirmPressed={() => setModelOpen(false)}
        />
        <AwesomeAlert
          show={modelOpen1}
          cancelText="EXIT"
          confirmText="OKAY"
          title="You have high blood pressure"
          titleStyle={{ fontSize: 28, color: "red" }}
          message="here are some recommended drugs: losartan, lisinopril, nifedipine, furosemide, And also we recommend you see a doctor"
          messageStyle={{ fontSize: 26, color: "black" }}
          showCancelButton={true}
          showConfirmButton={true}
          onCancelPressed={() => setModelOpen(false)}
          onConfirmPressed={() => setModelOpen(false)}
        />
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
          onPress={saveBP}
        >
          <Text
            style={{ color: "white", fontWeight: "bold", alignItems: "center" }}
          >
            Analyze
          </Text>
        </TouchableOpacity>
        <Text
          style={{ fontSize: 20, fontWeight: "bold", alignItems: "center" }}
        >
          {error}
        </Text>
        <FlatList
          data={values}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                width: 300,
                height: 100,
                borderRadius: 10,
                backgroundColor: "#880808",
                margin: 20,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
              onPress={() => {
                Alert.alert(
                  "Are you sure ?",
                  "This action will delete your record",
                  [
                    {
                      text: "Delete",
                      onPress: async () => {
                        try {
                          const trial = values.filter(function (e) {
                            return e.id !== item.id;
                          });
                          await AsyncStorage.setItem(
                            "BP",
                            JSON.stringify(trial)
                          );
                          setValue(trial);
                        } catch (error) {
                          console.log(error);
                        }
                      },
                    },
                    {
                      text: "No Thanks",
                      onPress: () => console.log("No thanks"),
                    },
                  ],
                  {
                    cancelable: true,
                  }
                );
              }}
            >
              <Ionicons name="heart-circle" size={50} color="white" />
              <Text
                style={{ fontSize: 24, fontWeight: "bold", color: "white" }}
              >
                {item.Sys}
                <Text style={{ fontSize: 30 }}>/</Text>
                {item.Dia}
              </Text>
            </TouchableOpacity>
          )}
        />
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
          onPress={removeBP}
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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

function Med() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  //create model for deleting drugs
  const [medi, setMedi] = useState("");
  const [store, setStore] = useState([]);
  const [rep, setRep] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Morning, Afternoon, Night(8hrs Interval)", value: "1" },
    { label: "Morning, Night (12hrs Interval)", value: "2" },
    { label: "One per Day (24hrs Interval)", value: "3" },
  ]);

  useEffect(() => {
    loadMed();

    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const onClick = async () => {
    if (value == "1") {
      try {
        const obj = {
          id: Math.random().toString(),
          med: medi.toString(),
          time: value.toString(),
        };
        const updated = [...store, obj];
        setStore(updated);
        setRep(true);
        setMedi("");
        await AsyncStorage.setItem("Med", JSON.stringify(updated));
        await Notifications.scheduleNotificationAsync({
          content: {
            title: medi,
            body: "Time to take your medication",
            data: { data: "data goes here" },
          },
          trigger: {
            hour: 8,
            repeats: rep,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
    if (value == "2") {
      try {
        const obj = {
          id: Math.random().toString(),
          med: medi.toString(),
          time: value.toString(),
        };
        const updated = [...store, obj];
        setStore(updated);
        setRep(true);
        setMedi("");
        await AsyncStorage.setItem("Med", JSON.stringify(updated));
        await Notifications.scheduleNotificationAsync({
          content: {
            title: medi,
            body: "Time to take your medication",
            data: { data: "data goes here" },
          },
          trigger: {
            hour: 12,
            repeats: rep,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
    if (value == "3") {
      try {
        const obj = {
          id: Math.random().toString(),
          med: medi.toString(),
          time: value.toString(),
        };
        const updated = [...store, obj];
        setStore(updated);
        setRep(true);
        setMedi("");
        await AsyncStorage.setItem("Med", JSON.stringify(updated));
        await Notifications.scheduleNotificationAsync({
          content: {
            title: medi,
            body: "Time to take your medication",
            data: { data: "data goes here" },
          },
          trigger: {
            day: 1,
            repeats: rep,
          },
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Error");
      setRep(false);
    }
  };

  const loadMed = async () => {
    try {
      const result = await AsyncStorage.getItem("Med");
      if (result !== null) {
        setStore(JSON.parse(result));
      }
    } catch (error) {
      alert(error);
    }
  };

  const removeMed = async () => {
    try {
      await AsyncStorage.clear();
      setRep(false);
    } catch (error) {
      alert(error);
    }
  };

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
          onPress={onClick}
        >
          <Text
            style={{ color: "white", fontWeight: "bold", alignItems: "center" }}
          >
            SAVE
          </Text>
        </TouchableOpacity>
        <FlatList
          data={store}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                width: 300,
                height: 100,
                borderRadius: 10,
                backgroundColor: "#880808",
                margin: 20,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
              //For deleting single records
              onPress={() => {
                Alert.alert(
                  "Are you sure ?",
                  "This action will delete your record",
                  [
                    {
                      text: "Delete",
                      onPress: async () => {
                        try {
                          const trial = store.filter(function (e) {
                            return e.id !== item.id;
                          });
                          await AsyncStorage.setItem(
                            "Med",
                            JSON.stringify(trial)
                          );
                          setStore(trial);
                        } catch (error) {
                          console.log(error);
                        }
                      },
                    },
                    {
                      text: "No Thanks",
                      onPress: () => console.log("No thanks"),
                    },
                  ],
                  {
                    cancelable: true,
                  }
                );
              }}
            >
              <Ionicons name="heart-circle" size={50} color="white" />
              <Text
                style={{ fontSize: 24, fontWeight: "bold", color: "white" }}
              >
                {item.med}
              </Text>
            </TouchableOpacity>
          )}
        />
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
          onPress={removeMed}
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

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      })
    ).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

function App() {
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

export default App;

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

/*
  <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={{ width: 270 }}
          />
*/

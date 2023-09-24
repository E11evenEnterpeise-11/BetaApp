import { useState, useEffect, createContext, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DataContext = createContext();

export default function DataProvider({ children }) {
  const [values, setValue] = useState([]);

  useEffect(() => {
    loadBP();
  }, []);

  //function for getting values from your the local storage
  const loadBP = async () => {
    try {
      const result = await AsyncStorage.getItem("VAL");
      if (result !== null) {
        setValue(JSON.parse(result));
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <DataContext.Provider value={{ values, setValue, loadBP }}>
      {children}
    </DataContext.Provider>
  );
}

export const useValues = () => useContext(DataContext);

import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

const useUserData = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      try {
        const name = await SecureStore.getItemAsync("name");
        const id = await SecureStore.getItemAsync("id");
        const token = await SecureStore.getItemAsync("token");
        setUserData({ name, id, token });
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, []);

  return userData;
};

export default useUserData;

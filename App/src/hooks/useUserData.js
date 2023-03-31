import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

const useUserData = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      try {
        const id = await SecureStore.getItemAsync("id");
        const token = await SecureStore.getItemAsync("token");
        setUserData({ id, token });
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, []);

  return userData;
};

export default useUserData;

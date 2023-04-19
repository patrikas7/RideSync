import { useEffect, useState } from "react";
import { fetchUnreadNotifications } from "../API/notificationApi";
import { UserTypes } from "../Constants/types";
import useUserData from "../hooks/useUserData";
import BasicUserTabs from "./BasicUserTabs";
import BusinessUserTabs from "./BusinessUserTabs";

const Tabs = ({ route, navigation }) => {
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const { id, token, userType } = useUserData();

  useEffect(() => {
    if (!token) return;

    const getUnreadNotificationsCount = async () => {
      const { unreadNotificationsCount, error } =
        await fetchUnreadNotifications(token);

      if (!error) setUnreadNotifications(unreadNotificationsCount);
    };

    getUnreadNotificationsCount();
  }, [token]);

  if (!userType) return null;

  return userType === UserTypes.BUSINESS_USER ? (
    <BusinessUserTabs token={token} />
  ) : (
    <BasicUserTabs
      route={route}
      navigation={navigation}
      unreadNotifications={unreadNotifications}
      token={token}
      id={id}
    />
  );
};

export default Tabs;

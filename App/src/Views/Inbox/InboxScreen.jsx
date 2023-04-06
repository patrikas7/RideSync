import { useState, useEffect } from "react";
import { View } from "react-native";
import { printError } from "../../Utils/utils";
import axios from "axios";
import Container from "../../Components/Container/Container";
import Spinner from "react-native-loading-spinner-overlay/lib";
import NoResults from "../../Components/NoResults/NoResults";

const InboxScreen = ({ token }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!token) return;
    const fetchNotifications = async () => {
      try {
        const { data } = await axios.get("/notifications/user", {
          headers: { Authorization: token },
        });

        setNotifications(data.notifications);
      } catch (error) {
        printError(error);
      }

      setIsLoading(false);
    };

    fetchNotifications();
  }, [token]);

  const renderContent = () =>
    !notifications.length ? (
      <NoResults
        primaryText="Jus pranešimų dėžutė yra tuščia!"
        secondaryText={"Jus neturite jokių gautu pranešimų"}
        buttonText={"Į kelionių paiešką"}
      />
    ) : (
      <View></View>
    );

  return (
    <Container>
      {isLoading ? <Spinner visible={isLoading} /> : renderContent()}
    </Container>
  );
};

export default InboxScreen;

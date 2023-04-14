import { useState, useEffect } from "react";
import { View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { printError } from "../../Utils/utils";
import axios from "axios";
import Container from "../../Components/Container/Container";
import Spinner from "react-native-loading-spinner-overlay/lib";
import NoResults from "../../Components/NoResults/NoResults";
import Header from "../../Components/Form/Header";
import Sizes from "../../Constants/sizes";
import NotificationsList from "../../Components/Notification/NotificationsList";

const InboxScreen = ({ token }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState({});
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!token || !isFocused) return;
    const fetchNotifications = async () => {
      setIsLoading(true);

      try {
        const { data } = await axios.get("/notifications/user", {
          headers: { Authorization: token },
        });

        setNotifications(data);
      } catch (error) {
        printError(error);
      }

      setIsLoading(false);
    };

    fetchNotifications();
  }, [token, isFocused]);

  const renderContent = () =>
    !notifications?.resultsCount ? (
      <NoResults
        primaryText="Jus pranešimų dėžutė yra tuščia!"
        secondaryText={"Jus neturite jokių gautu pranešimų"}
        buttonText={"Į kelionių paiešką"}
      />
    ) : (
      <View>
        <Header text={"Pranešimai"} size={Sizes.HEADER_MEDIUM} />
        <NotificationsList notifications={notifications} />
      </View>
    );

  return (
    <Container>
      {isLoading ? <Spinner visible={isLoading} /> : renderContent()}
    </Container>
  );
};

export default InboxScreen;

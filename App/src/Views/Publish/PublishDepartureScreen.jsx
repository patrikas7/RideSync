import ButtonsSwitch from "../../Components/ButtonsSwitch/ButtonsSwitch";
import PropTypes from "prop-types";
import Container from "../../Components/Container/Container";
import PageNames from "../../Constants/pageNames";
import MapLocationSearch from "../../Components/MapLocationSearch/MapLocationSearch";
import PublishStyles from "./PublishStyles";
import { useRoute } from "@react-navigation/native";
import useUserData from "../../hooks/useUserData";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import NoResults from "../../Components/NoResults/NoResults";

const PublishDepartureScreen = ({ navigation, route }) => {
  const currentRoute = useRoute();
  const { token, id } = useUserData();
  const [isUserEligebleToPost, setIsUserEligebleToPost] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token || !id) return;
    fetchUsersVehicle();
  }, [token, id]);

  const fetchUsersVehicle = async () => {
    try {
      const { data } = await axios.get("/user/car", {
        params: { id },
        headers: { Authorization: token },
      });

      setIsUserEligebleToPost(!!data.carsList.length);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  const renderContent = () => {
    if (isLoading) return <Spinner visible={isLoading} />;

    return isUserEligebleToPost ? (
      <MapLocationSearch
        headerText="Pasirinkite kelionės pradžios tašką 🏁"
        inputPlaceholder="Išvykimo vieta"
        mapHintText="Ar tai yra vieta iš kurios išvykstate?"
        navigation={navigation}
        currentScreen={currentRoute.name}
        nextScreen={PageNames.PUBLISH_DESTINATION_SEARCH}
        route={route}
        containerStyling={PublishStyles.formContainer}
      />
    ) : (
      <NoResults
        primaryText="Jus neturite jokių užregistruotų automobilių"
        secondaryText="Užregistruokite automobilį, kad galėtumėt skelbti kėlionę"
        buttonText="Automobilio registracija"
      />
    );
  };

  return (
    <Container>
      <Spinner visible={isLoading} />
      <ButtonsSwitch
        leftButtonText="Kelionės skelbimas"
        rightButtonText="Kelionės paieška"
      />
      {renderContent()}
    </Container>
  );
};

PublishDepartureScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default PublishDepartureScreen;

import { View } from "react-native";
import Container from "../../../Components/Container/Container";
import PageNames from "../../../Constants/pageNames";
import useScreenArrowBack from "../../../hooks/useScreenArrowBack";

const TripsHistoryScreen = ({ navigation }) => {
  useScreenArrowBack(navigation, PageNames.TRIP_SEARCH_RESULTS);

  return <Container></Container>;
};

export default TripsHistoryScreen;

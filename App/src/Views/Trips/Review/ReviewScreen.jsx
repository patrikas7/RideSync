import { View } from "react-native";
import Button from "../../../Components/Button/Button";
import Container from "../../../Components/Container/Container";
import Review from "../../../Components/Review/Review";
import PageNames from "../../../Constants/pageNames";
import useScreenArrowBack from "../../../hooks/useScreenArrowBack";

const ReviewScreen = ({ navigation, route }) => {
  const { token, tripId } = route.params;

  useScreenArrowBack(
    navigation,
    PageNames.TRIP_INFORMATION,
    {},
    "close-outline"
  );

  return (
    <Container>
      <View style={{ flex: 1 }}>
        <Review />
      </View>
      <Button text={"Įvertinti"} styling={{ marginBottom: 32 }} />
    </Container>
  );
};

export default ReviewScreen;

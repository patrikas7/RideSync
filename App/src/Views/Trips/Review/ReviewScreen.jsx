import { useState } from "react";
import { View } from "react-native";
import { postReview } from "../../../API/reviewApi";
import Spinner from "react-native-loading-spinner-overlay/lib";
import Button from "../../../Components/Button/Button";
import Container from "../../../Components/Container/Container";
import Review from "../../../Components/Review/Review";
import PageNames from "../../../Constants/pageNames";
import useScreenArrowBack from "../../../hooks/useScreenArrowBack";

const ReviewScreen = ({ navigation, route }) => {
  const [rating, setRating] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const { token, trip, recipient, name } = route.params;

  useScreenArrowBack(
    navigation,
    PageNames.TRIP_INFORMATION,
    {},
    "close-outline"
  );

  const handleOnReview = async () => {
    setIsLoading(true);
    const { error } = await postReview(token, { trip, recipient, rating });
    setIsLoading(false);

    if (!error) navigation.navigate(PageNames.REVIEW_SUCCESS, { token });
  };

  return (
    <Container>
      <Spinner visible={isLoading} />
      <View style={{ flex: 1 }}>
        <Review
          onChange={setRating}
          headline={`Kaip vertinate savo kelionę su ${name}?`}
        />
      </View>
      <Button
        text={"Įvertinti"}
        styling={{ marginBottom: 32 }}
        onClick={handleOnReview}
      />
    </Container>
  );
};

export default ReviewScreen;

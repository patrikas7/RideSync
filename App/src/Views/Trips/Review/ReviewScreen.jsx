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
  const [activeRecipient, setActiveRecipient] = useState(0);
  const { token, trip, recipients } = route.params;

  console.log(recipients);
  useScreenArrowBack(
    navigation,
    PageNames.TRIP_INFORMATION,
    {},
    "close-outline"
  );

  const handleOnReview = async () => {
    setIsLoading(true);
    const { error } = await postReview(token, {
      trip,
      recipient: recipients[activeRecipient]._id,
      rating,
    });
    setIsLoading(false);

    if (!error && activeRecipient + 1 >= recipients.length) {
      navigation.navigate(PageNames.REVIEW_SUCCESS, { token });
      return;
    }

    setActiveRecipient((prevState) => prevState + 1);
  };

  return (
    <Container>
      <Spinner visible={isLoading} />
      <View style={{ flex: 1 }}>
        <Review
          onChange={setRating}
          headline={`Kaip vertinate savo kelionę su ${
            recipients[activeRecipient].name ||
            recipients[activeRecipient].passenger.name
          }?`}
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

import Container from "../../../Components/Container/Container";
import Success from "../../../Components/Success/Success";
import PageNames from "../../../Constants/pageNames";

const ReviewSuccessScreen = ({ navigation, route }) => {
  const { token } = route.params;

  return (
    <Container>
      <Success
        primaryText={"Įvertinimas išsaugotas"}
        secondaryText={"Dėkojame už jusų įvertinimą!"}
        buttonText={"Atgal į kelionių istoriją"}
        onPress={() => navigation.navigate(PageNames.TRIPS_HISTORY, { token })}
      />
    </Container>
  );
};

export default ReviewSuccessScreen;

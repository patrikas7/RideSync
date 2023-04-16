import { Text, View } from "react-native";
import styles from "./ReviewStyles";
import { AirbnbRating } from "react-native-ratings";

const Review = ({ styling, onChange, headline }) => {
  return (
    <View style={[styles.container, styling]}>
      <Text style={styles.headline}>{headline}</Text>
      <View></View>
      <AirbnbRating
        count={5}
        reviews={[
          "Tragiškai",
          "Prastai",
          "Vidutiniškai",
          "Gerai",
          "Fantastiškai",
        ]}
        defaultRating={3}
        size={28}
        ratingContainerStyle={styles.rating}
        onFinishRating={onChange}
      />
    </View>
  );
};

export default Review;

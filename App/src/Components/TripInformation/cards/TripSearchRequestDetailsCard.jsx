import { View, Text } from "react-native";
import { generatePictureUri } from "../../../Utils/utils";
import TripPersonProfile from "../TripPersonProfile";
import TripInformationStyles from "../TripInformationStyle";
import TripPersonRating from "../TripPersonRating";
import TripDetail from "./TripDetail";
import PageNames from "../../../Constants/pageNames";

const TripSearchRequestDetailsCard = ({
  user,
  passengersCount,
  comments,
  isMyProfile,
  navigation,
}) => {
  const profilePictureUri = generatePictureUri(user?.profilePicture);

  const handleOnProfilePress = () => {
    navigation.navigate(PageNames.USER_INFORMATION, {
      user,
      profilePictureUri,
      isMyProfile,
      prevScreen: PageNames.TRIP_SEARCH_REQUEST_INFORMATION,
    });
  };

  return (
    <View
      style={[
        TripInformationStyles.infoCard,
        TripInformationStyles.notFirstChild,
        TripInformationStyles.detailsCard,
      ]}
    >
      <View style={TripInformationStyles.detailsWrapper}>
        <View>
          <TripPersonProfile
            onPress={handleOnProfilePress}
            profilePictureUri={profilePictureUri}
            user={user}
          />
          <TripPersonRating />
        </View>
        <TripDetail
          icon={"people"}
          primaryText={passengersCount}
          secondaryText={"Reikalingos vietos"}
          styling={TripInformationStyles.searchRequestDetails}
        />
      </View>
      {comments && (
        <View style={TripInformationStyles.commentsContainer}>
          <Text>
            <Text style={TripInformationStyles.bold}>Komentarai: </Text>
            <Text>{comments}</Text>
          </Text>
        </View>
      )}
    </View>
  );
};

export default TripSearchRequestDetailsCard;

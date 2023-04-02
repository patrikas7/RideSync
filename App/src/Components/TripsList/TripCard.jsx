import { Ionicons } from "@expo/vector-icons";
import { View, Text, Image, TouchableHighlight } from "react-native";
import { generatePictureUri } from "../../Utils/utils";
import TripsListStyle from "./TripsListStyle";
import Sizes from "../../Constants/sizes";
import Colors from "../../Constants/colors";

const TripCard = ({ trip, onPress, containerStyling }) => {
  const profilePictureUri = generatePictureUri(trip.driver?.profilePicture);

  return (
    <TouchableHighlight
      onPress={() => onPress(trip._id)}
      style={[TripsListStyle.touchableHighlight, containerStyling]}
      activeOpacity={0.9}
    >
      <View style={TripsListStyle.cardContainer}>
        <View style={TripsListStyle.wrapper}>
          <View style={TripsListStyle.cardInformationWrapper}>
            <View style={TripsListStyle.cardLeft}>
              <Text style={TripsListStyle.time}>{trip.time}</Text>
              <Text style={TripsListStyle.date}>{trip.date}</Text>
            </View>
            <View style={TripsListStyle.cardRight}>
              <View style={TripsListStyle.stops}>
                <Text style={TripsListStyle.stopText}>
                  {trip.departure.city}
                </Text>
                <Ionicons
                  name="arrow-forward-outline"
                  size={Sizes.ICON}
                  color={Colors.BLACK}
                  style={TripsListStyle.arrowIcon}
                />
                <Text style={TripsListStyle.stopText}>
                  {trip.destination.city}
                </Text>
              </View>

              <View style={TripsListStyle.detailsContainer}>
                <View>
                  <Text
                    style={TripsListStyle.infomrationPrimary}
                  >{`${trip.price}€`}</Text>
                  <Text style={TripsListStyle.price}>Keleiviui</Text>
                </View>
                <View>
                  <Text style={TripsListStyle.infomrationPrimary}>
                    {trip.personsCount}
                  </Text>
                  <Text style={TripsListStyle.infomrationSecondary}>
                    Vietos
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={[
              TripsListStyle.driverInformation,
              !trip.timeLeftUntilTrip && TripsListStyle.driverInformationNoTime,
            ]}
          >
            <Image
              source={
                profilePictureUri
                  ? { uri: profilePictureUri }
                  : require("../../../assets/pictures/avatar.png")
              }
              style={TripsListStyle.avatar}
            />
            <Text style={TripsListStyle.driverName}>
              {trip.isUserDriver ? "Aš" : trip.driver.name}
            </Text>
            {!trip.isUserDriver && (
              <View style={TripsListStyle.reviewContainer}>
                <Ionicons
                  name="star"
                  color={Colors.GOLD}
                  size={Sizes.ICON_SMALL}
                />
                <Text style={TripsListStyle.review}>0</Text>
                <Text style={TripsListStyle.reviewCount}>- 0 įvertinimų</Text>
              </View>
            )}
          </View>
        </View>
        {trip.timeLeftUntilTrip && (
          <View style={TripsListStyle.remainingTimeContainer}>
            <Text style={TripsListStyle.remainingTimeText}>
              {`Išvykstate už ${timeLeftUntilTrip.hours}:${timeLeftUntilTrip.minutes} Val.`}
            </Text>
          </View>
        )}
      </View>
    </TouchableHighlight>
  );
};

export default TripCard;

import { Ionicons } from "@expo/vector-icons";
import { View, Text, Image, TouchableHighlight } from "react-native";
import TripsListStyle from "./TripsListStyle";
import Sizes from "../../Constants/sizes";
import Colors from "../../Constants/colors";

const TripCard = ({ trip, onPress, containerStyling }) => {
  return (
    <TouchableHighlight
      onPress={() => onPress(trip._id)}
      style={[TripsListStyle.touchableHighlight, containerStyling]}
      activeOpacity={0.9}
    >
      <View style={TripsListStyle.cardContainer}>
        <View style={TripsListStyle.cardInformationWrapper}>
          <View style={TripsListStyle.cardLeft}>
            <Text style={TripsListStyle.time}>{trip.time}</Text>
            <Text style={TripsListStyle.date}>{trip.date}</Text>
          </View>
          <View style={TripsListStyle.cardRight}>
            <View style={TripsListStyle.stops}>
              <Text style={TripsListStyle.stopText}>{trip.departure.city}</Text>
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
                <Text style={TripsListStyle.infomrationSecondary}>Vietos</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={TripsListStyle.driverInformation}>
          <Image
            source={require("../../../assets/pictures/avatar.png")}
            style={TripsListStyle.avatar}
          />
          <Text style={TripsListStyle.driverName}>{trip.driver.name}</Text>
          <View style={TripsListStyle.reviewContainer}>
            <Ionicons name="star" color={Colors.GOLD} size={Sizes.ICON_SMALL} />
            <Text style={TripsListStyle.review}>0</Text>
            <Text style={TripsListStyle.reviewCount}>- 0 įvertinimų</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default TripCard;

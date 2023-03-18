import { Ionicons } from "@expo/vector-icons";
import { View, Text, Image, TouchableHighlight } from "react-native";
import TripsListStyle from "./TripsListStyle";
import Sizes from "../../Constants/sizes";
import Colors from "../../Constants/colors";

const TripCard = () => {
  return (
    <TouchableHighlight>
      <View style={TripsListStyle.cardContainer}>
        <View style={TripsListStyle.cardInformationWrapper}>
          <View style={TripsListStyle.cardLeft}>
            <Text style={TripsListStyle.time}>18:20</Text>
            <Text style={TripsListStyle.date}>2023-03-17</Text>
          </View>
          <View style={TripsListStyle.cardRight}>
            <View style={TripsListStyle.stops}>
              <Text style={TripsListStyle.stopText}>Vilnius</Text>
              <Ionicons
                name="arrow-forward-outline"
                size={Sizes.ICON}
                color={Colors.BLACK}
                style={TripsListStyle.arrowIcon}
              />
              <Text style={TripsListStyle.stopText}>Kaunas</Text>
            </View>

            <View style={TripsListStyle.detailsContainer}>
              <View>
                <Text style={TripsListStyle.infomrationPrimary}>5€</Text>
                <Text style={TripsListStyle.price}>Keleiviui</Text>
              </View>
              <View>
                <Text style={TripsListStyle.infomrationPrimary}>2</Text>
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
          <Text style={TripsListStyle.driverName}>Patrikas</Text>
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

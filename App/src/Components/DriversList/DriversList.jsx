import {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  FlatList,
} from "react-native";
import Container from "../Container/Container";
import Sizes from "../../Constants/sizes";
import StyleUtils from "../../Utils/styleUtils";
import TripPersonProfile from "../TripInformation/TripPersonProfile";
import { Ionicons } from "@expo/vector-icons";

const DriverCard = ({ driver }) => {
  console.log(driver);
  return (
    <TouchableHighlight style={[styles.touchableHighlight]} activeOpacity={0.9}>
      <View style={styles.cardContainer}>
        <Text style={styles.headline}>
          Vairuotojo skelbimas <Text style={styles.bold}>{driver.city}</Text>
        </Text>
        <View style={styles.informationContainer}>
          <TripPersonProfile user={{ name: "Patrikas", surname: "Voi" }} />
          <View style={styles.detailsContainer}>
            <View style={styles.detail}>
              <Ionicons name="cash-outline" size={Sizes.ICON} />
              <Text style={styles.detailText}>
                Kaina valandai: {driver.price}€
              </Text>
            </View>

            <View style={[styles.detail, styles.notFirst]}>
              <Ionicons name="car-outline" size={Sizes.ICON} />
              <Text style={styles.detailText}>
                Automobilis: {driver.car.manufacturer} {driver.car.model}{" "}
                {driver.car.manufactureYear}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const DriversList = ({ driversList }) => {
  return (
    <Container>
      <FlatList
        data={driversList}
        renderItem={({ item, index }) => <DriverCard driver={item} />}
        keyExtractor={(item) => item._id}
        style={styles.container}
      />
    </Container>
  );
};

export default DriversList;

const styles = StyleSheet.create({
  touchableHighlight: {
    borderRadius: Sizes.DEFAULT_BORDER_RADIUS,
    overflow: "hidden",
  },
  cardContainer: {
    ...StyleUtils.card,
  },
  headline: {
    marginTop: 8,
    textAlign: "center",
    fontSize: Sizes.DEFAULT_TEXT_SIZE,
  },
  bold: { fontWeight: "bold" },
  informationContainer: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    marginLeft: 8,
    fontSize: Sizes.DEFAULT_TEXT_SIZE,
    maxWidth: "70%",
    textAlign: "center",
  },
  detailsContainer: {
    marginLeft: 16,
  },
  notFirst: { marginTop: 8 },
  container: { marginTop: 16 },
});

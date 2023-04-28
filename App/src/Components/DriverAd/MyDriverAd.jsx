import { View } from "react-native";
import Header from "../Form/Header";
import styles from "./DriverAdStyles";
import Sizes from "../../Constants/sizes";
import ListItem from "../List/ListItem";
import Button from "../Button/Button";

const MyDriverAd = ({ driverAd, onPress, isMyAd }) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        {!isMyAd && (
          <Header text="Mano vairuotojo skelbimas" size={Sizes.HEADER_MEDIUM} />
        )}
        <View style={styles.driverAdContainer}>
          <ListItem
            icon={"home-outline"}
            text={"Miestas"}
            secondaryText={driverAd.city}
            itemStyling={styles.listItem}
          />

          <ListItem
            icon={"cash-outline"}
            text={"Valandinis tarifas"}
            secondaryText={driverAd.price}
            itemStyling={styles.listItem}
          />

          <ListItem
            icon={"people-outline"}
            text={"Keleivių skaičius"}
            secondaryText={driverAd.seats}
            itemStyling={styles.listItem}
          />

          <ListItem
            icon={"car-outline"}
            text={"Automobilis"}
            secondaryText={`${driverAd.car.manufacturer} ${driverAd.car.model} ${driverAd.car.manufactureYear}m.`}
            itemStyling={styles.listItem}
          />

          <ListItem
            icon={"chatbox-outline"}
            text={"Aprašymas"}
            secondaryText={driverAd.description}
            itemStyling={styles.listItem}
          />
        </View>
      </View>

      <Button
        text={isMyAd ? "Redaguoti" : "Rašyti pranešimą"}
        styling={styles.button}
        onClick={onPress}
      />
    </View>
  );
};

export default MyDriverAd;

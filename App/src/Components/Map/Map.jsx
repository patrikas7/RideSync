import { View, Text } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapStyles from "./MapStyles";

const LT_CENTER_COORDS = { latitude: 55.169438, longitude: 23.881275 };

const Map = ({ hintText, onDragEnd, error, pins }) => {
  const pillText = error || hintText;

  return (
    <View style={MapStyles.mapContainer}>
      <MapView
        style={MapStyles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude:
            pins.length > 1 ? LT_CENTER_COORDS.latitude : pins[0].latitude,
          longitude:
            pins.length > 1 ? LT_CENTER_COORDS.longitude : pins[0].longitude,
          latitudeDelta: pins.length > 1 ? 5 : 0.001,
          longitudeDelta: pins.length > 1 ? 2 : 0.01,
        }}
      >
        {pins.map((pin, index) => (
          <Marker
            key={index}
            draggable={pin.draggable}
            coordinate={{ latitude: pin.latitude, longitude: pin.longitude }}
            onDragEnd={(e) => onDragEnd(e.nativeEvent.coordinate, index)}
          />
        ))}
      </MapView>
      {pillText && (
        <View
          style={[
            MapStyles.mapHintContainer,
            error && MapStyles.mapHintContainerError,
          ]}
        >
          <Text style={MapStyles.mapHintText}>{pillText}</Text>
        </View>
      )}
    </View>
  );
};

export default Map;

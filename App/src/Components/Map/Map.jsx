import PropTypes from "prop-types";
import { View, Text } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapStyles from "./MapStyles";

const Map = ({ hintText, latitude, longitude, onDragEnd, error }) => {
  const pillText = error || hintText;

  return (
    <View style={MapStyles.mapContainer}>
      <MapView
        style={MapStyles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          draggable
          coordinate={{ latitude, longitude }}
          onDragEnd={(e) => onDragEnd(e.nativeEvent.coordinate)}
        />
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

Map.propTypes = {
  hintText: PropTypes.string,
};

export default Map;

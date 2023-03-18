import { StyleSheet } from "react-native";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";

const MapStyles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  mapHintContainer: {
    backgroundColor: Colors.BLUE_600_TRANSPARENT,
    borderRadius: Sizes.DEFAULT_BORDER_RADIUS,
    top: 16,
    zIndex: 1,
  },
  mapHintContainerError: {
    backgroundColor: Colors.RED_TRANSPARENT,
  },
  mapHintText: {
    color: Colors.WHITE,
    fontSize: Sizes.DEFAULT_TEXT_SIZE,
    padding: 8,
    textAlign: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: Sizes.DEFAULT_BORDER_RADIUS,
    height: "100%",
    width: "100%",
  },
});

export default MapStyles;

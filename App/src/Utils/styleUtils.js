import Colors from "../Constants/colors";
import Sizes from "../Constants/sizes";

const StyleUtils = {
  card: {
    backgroundColor: Colors.WHITE,
    borderRadius: Sizes.DEFAULT_BORDER_RADIUS,
    borderColor: Colors.GREY,
    borderWidth: 1,
    padding: 16,
    shadowColor: Colors.MIDNIGHT_BLACK,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  separator: {
    borderLeftColor: Colors.BLACK,
    borderLeftWidth: 2,
    height: 20,
    marginLeft: 10,
  },
};

export default StyleUtils;

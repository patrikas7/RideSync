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
  avatar: {
    width: 30,
    height: 30,
    borderColor: Colors.BLACK,
    borderWidth: 1,
    borderRadius: 50,
  },
  shadow: {
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
};

export default StyleUtils;

import { View } from "react-native";
import StopsListStyle from "./StopsListStyle";
import Stop from "./Stop";
import MainStop from "./MainStop";

const StopsList = ({ containerStyling, firstStop, lastStop, stops }) => {
  console.log(firstStop);
  return (
    <View style={[StopsListStyle.container, containerStyling]}>
      <MainStop stop={firstStop} />
      <View style={StopsListStyle.separator}></View>
      {stops.map((stop, index) => (
        <Stop key={index} stop={stop} />
      ))}
      <View style={StopsListStyle.separator}></View>
      <MainStop stop={lastStop} />
    </View>
  );
};

export default StopsList;

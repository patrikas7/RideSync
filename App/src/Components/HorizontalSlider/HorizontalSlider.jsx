import { FlatList, StyleSheet, View } from "react-native";

const HorizontalSlider = ({ data, renderItem }) => {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

export default HorizontalSlider;

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
});

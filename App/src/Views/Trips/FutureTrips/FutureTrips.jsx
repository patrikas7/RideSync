import { StyleSheet, View } from "react-native";
import Container from "../../../Components/Container/Container";
import NoResults from "../../../Components/NoResults/NoResults";

const FutureTrips = () => {
  return (
    <Container>
      <NoResults
        primaryText="Jūs neturite jokių suplanuotų kelionių"
        secondaryText="Sukurkite naują kelionę arba užsirezervuokite vietą per kelionių paiešką"
        buttonText="Mano kelionių istorija"
      />
    </Container>
  );
};

const styles = StyleSheet.create({});

export default FutureTrips;

import { Text, View } from "react-native";
import Container from "../../Components/Container/Container";
import { useNavigation } from "@react-navigation/native";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import PageNames from "../../Constants/pageNames";
import Header from "../../Components/Form/Header";
import Sizes from "../../Constants/sizes";
import PublishInformationForm from "../../Components/Publish/PublishInformationForm";

const PublishInformationScreen = () => {
  const navigation = useNavigation();
  useScreenArrowBack(navigation, PageNames.PUBLISH_DATE_AND_TIME);

  return (
    <Container>
      <Header text="Informacija apie kėlionę" size={Sizes.HEADER_MEDIUM} />
      <PublishInformationForm />
    </Container>
  );
};

export default PublishInformationScreen;

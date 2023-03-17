const ErrorMessages = {
  REQUIRED_FIELD: "Šis laukas yra privalomas",
  NOT_MATCHING_PASSWORDS: "Slaptažodžiai turi sutapti",
  UNEXPECTED_ERROR: "Įvyko netikėta klaida, bandykite vėliau",
  EXISTING_EMAIL: "Paskyra su tokiu el. paštu jau egzistuoja",
  PASSWORD_FORMAT: "Slaptažodis ilgis turbi būti tarp 8 ir 20 simbolių",
  NOT_ELIGABLE_AGE: "Turite būti bent 18 metų",
  SAME_CITIES: "Išvykimo ir atvykimo miestai turi skirtis",
  SAME_STOP_CITY:
    "Sustojimas negali vykti išvykimo, atvykimo ar kituose sustojimo miestuose",
  EXCEEDING_PEOPLE_COUNT: "Keleivių skaičius negali viršyti 4 žmonių limito",
  AT_LEAST_ONE_HOUR_FROM_NOW:
    "Kelionės pradžia negali prasidėti anksčiau nei už valandos nuo dabar",
  AT_LEAST_HALF_AN_HOUR_FROM_DEPARTURE:
    "Grįžimas negali būti mažiau nei 30 min. nuo kelionės pradžios",
};

export default ErrorMessages;

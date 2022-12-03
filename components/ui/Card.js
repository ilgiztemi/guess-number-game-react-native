import { View, StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/colors";

const Card = ( { children } ) => {
  return (
    <View style={ styles.inputContainer }>{ children }</View>
  );
};
const deviceWidth = Dimensions.get('window');
const styles = StyleSheet.create( {
  inputContainer: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: deviceWidth < 380 ? 18 : 36,
    marginHorizontal: 24,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    elevation: 4,
    shadowColor: 'black',
    textShadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
} );
export default Card;
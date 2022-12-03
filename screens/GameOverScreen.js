import { View, Image, StyleSheet, Text, useWindowDimensions, ScrollView } from 'react-native';
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";

const GameOverScreen = ( { roundsNumber, userNumber, onStartNewGame } ) => {
  const { width, height } = useWindowDimensions();
  let imageSize = 300;
  if ( width < 380 ) {
    imageSize = 200;
  }
  if ( width < 400 ) {
    imageSize = 100;
  }
  const imageStyle = {
    height: imageSize,
    width: imageSize,
    borderRadius: imageSize / 2,
  };
  return (
    <ScrollView style={styles.screen}>
      <View style={ styles.rootContainer }>
        <Title>Game is over!</Title>
        <View style={ [ styles.imageContainer, imageStyle ] }>
          <Image style={ styles.image } source={ require( '../assets/images/success.png' ) } />
        </View>
        <View>
          <Text style={ styles.summaryText }>Your phone needed <Text style={ styles.highlight }>{ roundsNumber }</Text> rounds to guess the number of <Text style={ styles.highlight }>{ userNumber }</Text>.</Text>
        </View>
        <PrimaryButton onPress={ onStartNewGame }>Start New Game</PrimaryButton>
      </View>
    </ScrollView>
  );
};
// const deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create( {
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    // width: deviceWidth < 380 ? 200 : 300,
    // height: deviceWidth < 380 ? 200 : 300,
    // borderRadius: deviceWidth < 380 ? 100 : 150,
    borderWidth: 3,
    color: Colors.primary800,
    overflow: 'hidden',
    margin: 36,
  },
  image: {
    width: '100%',
    height: '100%'
  },
  summaryText: {
    fontFamily: 'opens-sans',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary500,
  }
} );
export default GameOverScreen;
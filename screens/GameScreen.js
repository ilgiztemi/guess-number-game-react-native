import { useState, useEffect } from "react";
import { View, StyleSheet, Alert, Text, FlatList } from "react-native";
import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import { Ionicons } from '@expo/vector-icons';
import GuessLogItem from "../components/game/GuessLogItem";

const generateRandomNumber = ( min, max, exclude ) => {
  const randomNumber = Math.floor( Math.random() * ( max - min ) ) + min;
  if ( randomNumber === exclude ) {
    return generateRandomNumber( min, max, exclude );
  } else { return randomNumber; }
};
let minBoundary = 1;
let maxBoundary = 100;
const GameScreen = ( { userNumber, onGameOver } ) => {
  const initialGuess = generateRandomNumber( 1, 100, userNumber );
  const [ currentGuess, setCurrentGuess ] = useState( initialGuess );
  const [guessRounds, setGuessRounds] = useState([])
  const nextGuessHandler = ( direction ) => {
    if ( ( direction === 'lower' && currentGuess < userNumber ) || ( direction === 'greater' && currentGuess > userNumber ) ) {
      Alert.alert( "Don't lie!", "You know that this is wrong...",
        [ { text: 'Sorry', style: 'cancel' }, ] );
      return;
    }
    if ( direction === 'lower' ) {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newGuessNumber = generateRandomNumber( minBoundary, maxBoundary, currentGuess );
    setCurrentGuess( newGuessNumber );
    setGuessRounds(prev => [newGuessNumber, ...prev])
  };
  useEffect( () => {
    if ( currentGuess === userNumber ) {
      onGameOver(guessRounds.length);
    }
  }, [ currentGuess, userNumber, onGameOver ] );
  useEffect( () => {
    minBoundary = 1;
    maxBoundary = 100;
  }, [] );
  const guessRoundsListLength = guessRounds.length;
  return (
    <View style={ styles.screen }>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{ currentGuess }</NumberContainer>
      <Card>
        <InstructionText style={ styles.instructionText }>Higher or Lower?</InstructionText>
        <View style={ styles.buttonsContainer }>
          <View style={ styles.buttonContainer }>
            <PrimaryButton onPress={ nextGuessHandler.bind( this, 'lower' ) }>
              <Ionicons name="md-remove" size={ 24 } color='white' />
            </PrimaryButton>
          </View>
          <View style={ styles.buttonContainer }>
            <PrimaryButton onPress={ nextGuessHandler.bind( this, 'greater' ) }>
              <Ionicons name="md-add" size={ 24 } color='white' />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        <FlatList data={guessRounds} renderItem={itemData => <GuessLogItem roundNumber={guessRoundsListLength - itemData.index} guess={itemData.item} />} keyExtractor={item => item}  />
      </View>
    </View>
  );
};
const styles = StyleSheet.create( {
  screen: {
    flex: 1,
    padding: 24
  },
  instructionText: {
    marginBottom: 16,
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  buttonContainer: {
    flex: 1
  },
  listContainer: {
    flex: 1,
    padding: 16,
  }
} );
export default GameScreen;
import { useState } from "react";
import { TextInput, View, StyleSheet, Alert, Dimensions, useWindowDimensions, KeyboardAvoidingView, ScrollView } from "react-native";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";

const StartGameScreen = ( { onPickNumber } ) => {
  const [ enteredNumber, setEnteredNumber ] = useState( '' );
  const { height, width } = useWindowDimensions();
  const marginTopDistance = height < 380 ? 30 : 100;
  const numberInputHandler = ( enteredText ) => {
    setEnteredNumber( enteredText );
  };
  const resetInputHandler = () => {
    setEnteredNumber( '' );
  };
  const confirmInputHandler = () => {
    const chosenNumber = parseInt( enteredNumber );
    if ( isNaN( chosenNumber ) || chosenNumber <= 0 || chosenNumber > 99 ) {
      //show alert
      Alert.alert(
        'Invalid number!',
        'Number has to be a number',
        [ { text: 'Okay', style: 'destructive', onPress: resetInputHandler } ]
      );
      return;
    }
    onPickNumber( chosenNumber );
  };
  return (
    <ScrollView style={ styles.screen }>
      <KeyboardAvoidingView style={ styles.screen } behavior="position">
        <View style={ [ styles.rootContainer, { marginTop: marginTopDistance } ] }>
          <Title>Guess my number!</Title>
          <Card>
            <InstructionText>Enter a Number</InstructionText>
            <TextInput style={ styles.numberInput } maxLength={ 2 } keyboardType='number-pad' autoCapitalize="none" autoCorrect={ false } value={ enteredNumber } onChangeText={ numberInputHandler } />
            <View style={ styles.buttonsContainer }>
              <View style={ styles.buttonContainer }>
                <PrimaryButton onPress={ resetInputHandler }>Reset</PrimaryButton>
              </View>
              <View style={ styles.buttonContainer }>
                <PrimaryButton onPress={ confirmInputHandler }>Confirm</PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
// const deviceHeight = Dimensions.get( 'window' ).height;
const styles = StyleSheet.create( {
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    // marginTop: deviceHeight < 380 ? 30 : 100,
    alignItems: 'center'
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1
  }
} );
export default StartGameScreen;
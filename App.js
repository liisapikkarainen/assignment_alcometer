import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import NumericInput from 'react-native-numeric-input'
import { MaterialIcons } from '@expo/vector-icons';
import styles from './style/style';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

const App = () => {
    const [weight, setWeight] = useState('');
    const [beerBottles, setBeerBottles] = useState('');
    const [timeHours, setTimeHours] = useState('');
    const [gender, setGender] = useState('male');
    const [bac, setBac] = useState('');

    const calculateBAC = () => {
        if (!weight) {
            alert('Weight is not entered.');
            return;
        }
        if (!timeHours) {
            alert('Time in hours is not entered.');
            return;
        }
        
        const litres = beerBottles * 0.33;
        const grams = litres * 8 * 4.5;
        const burning = weight / 10;
        const gramsLeft = grams - burning * timeHours;

        let result;
        if (gramsLeft <= 0) {
            result = 0;
        } else if (gender === "male") {
            result = gramsLeft / (weight * 0.7);
        } else {
            result = gramsLeft / (weight * 0.6);
        }
        setBac(result.toFixed(2));
    };

    return (
        <DismissKeyboard>
        <ScrollView>
            <Text style={styles.bac}>Blood alcohol content calculator</Text>
            <Text keyboardType = 'numeric' style={styles.weight}>Weight (kg):</Text>
            <TextInput keyboardType='numeric' style={styles.values}
                value={weight}
                onChangeText={text => setWeight(text)}
            />
            <Text style={styles.titles}>Number of beer bottles (0,33l):</Text>
            <NumericInput 
                minValue={0} 
                onChange={value => setBeerBottles(value)}
                value={beerBottles === '' ? 0 : beerBottles}
                onChangeText={text => setBeerBottles(text)}
            />
            <Text style={styles.titles}>Time in hours:</Text>
            <NumericInput 
                minValue={0} 
                onChange={value => setTimeHours(value)}
                value={timeHours === '' ? 0 : timeHours}
                onChangeText={text => setTimeHours(text)}
            />
            <Text style={styles.gender}>Gender:</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => setGender('male')}>
                    <Text style={styles.genderButton}>Male</Text>
                    {gender === 'male' && <MaterialIcons name="check" size={30} color="#00aeffff" />}
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => setGender('female')}>
                    <Text style={styles.genderButton}>Female</Text>
                    {gender === 'female' && <MaterialIcons name="check" size={30} color="#00aeffff" />}
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={calculateBAC}>
                <Text style={styles.calculate}>Calculate</Text>
            </TouchableOpacity>
            <Text style={[styles.result, {color: bac < 0.08 ? 'green' : (bac < 0.2 ? 'yellow' : 'red')}]}>
                {bac}
            </Text>
        </ScrollView>
        </DismissKeyboard>
    );
};

export default App;
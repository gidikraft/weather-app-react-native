import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'

export default function UnitsPicker({ unitSystem, setunitSystem }) {
    return (
        <View style={styles.unitSystem} >
            <Picker selectedValue={unitSystem} onValueChange={(item) => setunitSystem(item)} mode='dropdown'>
                <Picker.Item label='°C' value='metric' />
                <Picker.Item label='°F' value='imperial' />
            </Picker>
        </View>
    )
}

const styles= StyleSheet.create({
    unitSystem: {
        position: 'absolute',
        top: 20,
        left: 20,
        height: 50,
        width: 100
    }
})

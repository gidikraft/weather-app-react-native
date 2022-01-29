import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import WeatherInfo from './components/WeatherInfo';
import UnitsPicker from './components/UnitsPicker';
import { colors } from './components/utils/index';
import ReloadIcon from './components/ReloadIcon';
import WeatherDetails from './components/WeatherDetails';
// import { WEATHER_API_KEY } from 'react-native-dotenv';

const WEATHER_API_KEY = '4e545336165a8ba4110420146ef7f98a'
const BASE_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?`

export default function App() {

  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unitsSystem, setUnitSystem] = useState('metric')
  useEffect(() => {
    load()
  }, [unitsSystem])
  async function load(){
    setCurrentWeather(null)
    try {
        let { status } = await Location.requestForegroundPermissionsAsync()

        if(status !== 'granted'){
          setErrorMessage('Access to location is needed to run app')
          return
        }
        const location = await Location.getCurrentPositionAsync()

        const {latitude, longitude} = location.coords

        const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`

        const response = await fetch(weatherUrl)

        const result = await response.json()

        if (response.ok){
          setCurrentWeather(result)
        } else {
          setErrorMessage(result.message)
        }

    } catch (error){
      setErrorMessage(error.message)
     }
  }
  if (currentWeather){ 
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <UnitsPicker unitSystem={unitsSystem} setunitSystem={setUnitSystem}/>
        <ReloadIcon load={load}/>
        <View style={styles.main}>
          <WeatherInfo currentWeather={currentWeather} />
        </View>
        <WeatherDetails currentWeather={currentWeather} unitSystem={unitsSystem}/>
      </View>
    );
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color={colors.PRIMARY_COLOR} />
        <StatusBar style="auto" />
      </View>
    );
  }
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

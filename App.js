import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import { useState } from 'react'
import * as Speech from 'expo-speech'
import styles from './styles'
import jokeAPI from './api/joke'
import {
  NativeBaseProvider,
  Select,
  CheckIcon,
  Heading,
  Button
} from 'native-base'

export default function App () {
  const [joke, setJoke] = useState(null)
  const [lang, setLang] = useState('en')

  const getJoke = () => {
    Speech.stop()
    jokeAPI(lang).then(msg => {
      setJoke(msg)
      Speech.speak(msg)
    })
  }

  return (
    <NativeBaseProvider style={styles.wrap}>
      <ImageBackground
        source={require('./assets/images/smile.jpg')}
        resizeMode='cover'
        style={styles.bg}
        opacity={0.4}
      >
        <View style={styles.container}>
          <Heading style={styles.head}>Joke Telling Robot</Heading>
          <Select
            onValueChange={itemValue => setLang(itemValue)}
            placeholder='Select language'
            selectedValue={lang}
            style={styles.lang}
            _selectedItem={{ endIcon: <CheckIcon size='5' /> }}
            mb={3}
            mt={1}
          >
            <Select.Item label='German' value='de' />
            <Select.Item label='English' value='en' />
            <Select.Item label='French' value='fr' />
          </Select>

          <Button size={'lg'} onPress={getJoke} style={styles.button}>
            Tell Me A Joke
          </Button>
          <Text style={styles.text}>{joke}</Text>
        </View>
      </ImageBackground>
    </NativeBaseProvider>
  )
}

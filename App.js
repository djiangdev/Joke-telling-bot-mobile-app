import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import { useState } from 'react'
import * as Speech from 'expo-speech'
import styles from './assets/css/styles'
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
  const heading = 'Joke Telling Robot'

  async function fetchPosts () {
    const response = await fetch(`https://v2.jokeapi.dev/joke/any?lang=${lang}`)
    const posts = await response.json()
    let msg = posts.joke || posts.setup
    setJoke(msg)
    Speech.speak(msg)
  }

  const getJoke = () => {
    Speech.stop()
    fetchPosts()
  }

  return (
    <NativeBaseProvider style={styles.wrap}>
      <ImageBackground
        source={require('./assets/smile.jpg')}
        resizeMode='cover'
        opacity={0.4}
        style={styles.bg}
      >
        <View style={styles.container}>
          <Heading style={styles.head}>{heading}</Heading>
          <Select
            selectedValue={lang}
            placeholder='Select language'
            onValueChange={itemValue => setLang(itemValue)}
            mb={3}
            mt={1}
            style={styles.lang}
            _selectedItem={{
              endIcon: <CheckIcon size='5' />
            }}
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

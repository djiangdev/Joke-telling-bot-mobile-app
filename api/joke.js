'use strict'

module.exports = async lang => {
  const response = await fetch(`https://v2.jokeapi.dev/joke/any?lang=${lang}`)
  const posts = await response.json()
  return posts.joke || posts.setup
}

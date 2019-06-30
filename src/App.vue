<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <v-app>
    <router-view/>
    </v-app>
  </div>
</template>


<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data () {
    return {
      //
    }
  }
}
</script>

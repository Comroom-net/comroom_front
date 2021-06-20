<template>
  <div id="app">
    <Navbar />
    <Header />
    <home />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import home from "./components/home.vue";
import Navbar from "./components/Navbar";

export default {
  name: "App",
  components: {
    Header,
    home,
    Navbar
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

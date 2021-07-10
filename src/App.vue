<template>
  <div id="app">
    <Header />
    <b-container>
      <router-view />
    </b-container>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer
  }
};
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Sunflower:300&display=swap);

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  box-sizing: content-box;
}
#footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2.5rem;
}

body {
  padding-top: 3rem;
}

.navbar-brand {
  font-family: "Sunflower", sans-serif;
}

.kakao-ads {
  max-width: 1140px;
}
</style>

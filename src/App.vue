<template>
  <div id="app">
    <v-app>
      <Header v-if="!isNamu" />
      <b-container>
        <router-view @headerChange="headerChange" />
        <Message></Message>
      </b-container>
      <!-- <Ssamko-btn></Ssamko-btn> -->
      <Footer />
    </v-app>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Message from "@/components/message";
import SsamkoBtn from "@/components/ssamko_btn";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    Message,
    SsamkoBtn
  },
  data() {
    return {
      isNamu: false,
      fab: false
    };
  },
  methods: {
    headerChange() {
      this.isNamu = !this.isNamu;
    }
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

.to-ssamko {
}
</style>

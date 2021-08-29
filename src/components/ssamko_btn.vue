<template>
  <div>
    <v-speed-dial
      v-model="fab"
      :top="top"
      :bottom="bottom"
      :right="right"
      :left="left"
      :open-on-hover="hover"
      direction="top"
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="blue darken-2" dark fab>
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="green">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn fab dark small color="indigo">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn fab dark small color="red">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>
    <v-snackbar v-model="snackbar" :timeout="2000">
      {{notiTxt}}
      <template v-slot:action="{ attrs }">
        <v-btn color="info" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import api from "@/api/functions/common";

export default {
  name: "SsamkoBtn",
  mounted() {},
  data() {
    return {
      top: false,
      bottom: true,
      left: true,
      right: false,
      hover: true,
      loading: false,
      msg: null,
      sender: null,
      contact: null,
      isOpen: false,
      snackbar: false,
      notiTxt: "메세지가 무사히 전송되었습니다 :)",
      fab: false
    };
  },
  methods: {
    cancel() {
      this.isOpen = false;
    },
    sendMsg() {
      api.sendMsg(this);
      this.isOpen = false;
      this.snackbar = true;
    }
  }
};
</script>

<style>
#create .v-btn--floating {
  position: relative;
}
</style>
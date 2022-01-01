<template>
  <div>
    <v-card>
      <v-toolbar-title>예약 취소</v-toolbar-title>
      <v-card-text>
        <v-text-field
          :value="password"
          label="확인번호"
          outlined
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn>예약취소</v-btn>
        <v-btn>닫기</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "deleteModal",
  data() {
    return {
      password: null,
    };
  },
  methods: {
    checkPassword() {
      if (this.password == this.selectedEvent.password) {
        this.deleteEvent();
      } else {
        this.$log.debug("password is not correct");
      }
    },
  },
};
</script>
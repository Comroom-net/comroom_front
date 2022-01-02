<template>
  <div>
    <v-card>
      <v-toolbar-title>예약 취소</v-toolbar-title>
      <v-card-text>
        <v-text-field
          v-model="password"
          label="확인번호"
          outlined
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="checkPassword">예약취소</v-btn>
        <v-btn @click="closeModal">닫기</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "deleteModal",
  props: {
    selectedEvent: Object,
  },
  data() {
    return {
      password: null,
    };
  },
  methods: {
    checkPassword() {
      if (this.password == this.selectedEvent.password) {
        this.$log.debug("password correct");
      } else {
        this.$log.debug(
          "password is not correct",
          this.password,
          this.selectedEvent.password
        );
      }
    },
    closeModal() {
      this.$store.commit("toggleDeleteModal");
    },
  },
};
</script>
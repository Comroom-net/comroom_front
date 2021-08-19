<template>
  <div>
    <v-menu :close-on-content-click="false" v-model="isOpen">
      <template v-slot:activator="{ on: menu, attrs }">
        <v-btn fab dark fixed bottom right color="blue darken-2" v-bind="attrs" v-on="{ ...menu }">
          <v-icon>mdi-message-text</v-icon>
        </v-btn>
      </template>
      <v-card min-width="200px" flat :loading="loading">
        <template slot="progress">
          <v-progress-linear color="teal lighten-3" height="10" indeterminate></v-progress-linear>
        </template>

        <v-toolbar color="blue dark-4 white--text">
          <v-spacer></v-spacer>
          <v-toolbar-title>개발 문의</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="cancel">
            <v-icon mid>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text>
          <p>
            개발해줬으면 하는 기능이 있거나,
            <br />고쳤으면 하는 부분이 있으면 자유롭게 남겨주세요 :)
            <br />답변이 필요한 경우에는
            <br />연락처를 함께 보내주시면 답변드리겠습니다 :)
          </p>
          <v-textarea outlined placeholder="개발해주세요! 고쳐주세요!" v-model="msg"></v-textarea>
          <v-text-field label="보내는 사람 (선택사항)" placeholder="이은섭" v-model="sender"></v-text-field>
          <v-text-field label="연락처 (선택사항)" placeholder="이메일/전화번호/카톡 등" v-model="contact"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="primary" :disabled="msg == null" @click="sendMsg">보내기</v-btn>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-btn text color="secondary" @click="cancel">취소</v-btn>
          </v-card-actions>
        </v-card-actions>
      </v-card>
    </v-menu>
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
  name: "Message",
  mounted() {},
  data() {
    return {
      loading: false,
      msg: null,
      sender: null,
      contact: null,
      isOpen: false,
      snackbar: false,
      notiTxt: "메세지가 무사히 전송되었습니다 :)"
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
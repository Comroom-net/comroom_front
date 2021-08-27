<template>
  <v-card>
    <v-card-title>비밀번호 분실</v-card-title>
    <v-card-subtitle>가입시 입력한 메일로 비밀번호 초기화 메일이 발송됩니다.</v-card-subtitle>
    <v-card-text>
      <v-form>
        <v-text-field v-model="email" label="이메일" type="email" placeholder="가입시 입력한 메일"></v-text-field>
        <v-text-field v-model="realname" label="선생님 성함"></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="find">찾기</v-btn>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="addNew">취소</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ForgotPassword",
  data() {
    return {
      email: null,
      realname: null
    };
  },
  methods: {
    find() {}
  }
};
</script>
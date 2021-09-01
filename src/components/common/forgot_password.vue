<template>
  <v-card>
    <v-card-title>비밀번호 분실</v-card-title>
    <v-card-subtitle>가입시 입력한 메일로 비밀번호 초기화 메일이 발송됩니다.</v-card-subtitle>
    <v-card-text>
      <v-form ref="form">
        <v-text-field
          v-model="email"
          label="이메일"
          type="email"
          placeholder="가입시 입력한 메일"
          :rules="getRules('email')"
        ></v-text-field>
        <v-text-field v-model="realname" label="선생님 성함" :rules="getRules('realname')"></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="find">찾기</v-btn>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="$emit('cancel')">취소</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import api from "Api/functions/school";

export default {
  name: "ForgotPassword",
  data() {
    return {
      email: null,
      realname: null,
      rules: {
        required: value => !!value || "필수입력란",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "올바른 email 주소를 입력하세요";
        }
      }
    };
  },
  methods: {
    find() {
      if (this.$refs.form.validate()) {
        api.forgotPassword(this);
      }
    },
    getRules(name) {
      const rules = {
        email: [this.rules.required, this.rules.email],
        realname: [this.rules.required]
      };
      return rules[name];
    }
  }
};
</script>
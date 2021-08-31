<template>
  <v-card width="500px" class="m-auto mt-10">
    <v-card-title>새 비밀번호 설정</v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-text-field
          v-model="newPassword"
          type="password"
          label="새 비밀번호"
          :error-messages="passwordError"
          :rules="getRules('password')"
        ></v-text-field>
        <v-text-field
          v-model="rePassword"
          type="password"
          label="비밀번호 확인"
          :error-messages="passwordError"
          :rules="getRules('re_password')"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn @click="resetPassword">변경</v-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script>
import api from "Api/functions/school";

export default {
  name: "ResetPassword",
  props: ["token"],
  data() {
    return {
      newPassword: null,
      rePassword: null,
      passwordError: null,
      rules: {
        required: value => !!value || "필수입력란"
      }
    };
  },
  methods: {
    resetPassword() {
      if (this.$refs.form.validate()) {
        api.resetPassword(this);
      }
    },
    getRules(name) {
      const rules = {
        password: [this.rules.required],
        re_password: [
          this.rules.required,
          this.newPassword === this.rePassword ||
            "비밀번호가 일치하지 않습니다."
        ]
      };
      return rules[name];
    }
  }
};
</script>
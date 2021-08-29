<template>
  <v-card>
    <v-card-title>새 비밀번호 설정</v-card-title>
    <v-card-text>
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
        :rules="getRules('re-password')"
      ></v-text-field>
    </v-card-text>
    <v-card-actions></v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ResetPassword",
  created() {
    this.$log.debug("reset token:");
  },
  props: ["token"],
  data() {
    return {
      newPassword: null,
      rePassword: null,
      rules: {
        required: value => !!value || "필수입력란"
      }
    };
  },
  methods: {
    getRules(name) {
      const rules = {
        password: [this.rules.required],
        re_password: [
          this.rules.required,
          this.reqData.password === this.reqData.re_password ||
            "비밀번호가 일치하지 않습니다."
        ]
      };
      return rules[name];
    }
  }
};
</script>
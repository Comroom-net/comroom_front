<template>
  <div>
    <div class="message">{{message}}</div>
    <div>{{ timer }}초 후 메인페이지로 이동합니다.</div>
  </div>
</template>

<script>
import api from "Api/functions/school";

export default {
  name: "UserActive",
  props: {
    token: String
  },
  data() {
    return {
      message: "",
      timer: 3
    };
  },
  mounted() {
    api.user_active(this.token, this);
  },
  methods: {
    afterResponse() {
      setInterval(() => this.timer--, 1000);
      setTimeout(() => this.$router.push("/"), 3000);
    },
    active_good(response) {
      this.$log.debug(response);
      this.message = "인증되었습니다. 불편한 사항은 언제든 말씀해주세요 ^^";
      this.afterResponse();
    },
    active_bad(err_code) {
      this.$log.debug(err_code);
      var ERROR_MESSAGES = {
        400: "잘못된 접근입니다.",
        501: "만료된 링크입니다. 다시 가입을 신청하세요"
      };
      this.message = ERROR_MESSAGES[err_code];
      this.afterResponse();
    }
  }
};
</script>
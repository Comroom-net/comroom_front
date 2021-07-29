<template>
  <div>{{message}}</div>
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
      message: ""
    };
  },
  mounted() {
    api.user_active(this.token, this);
  },
  methods: {
    active_good(response) {
      this.$log.debug(response);
      this.message = "인증되었습니다. 불편한 사항은 언제든 말씀해주세요 ^^";
    },
    active_bad(err_code) {
      this.$log.debug(err_code);
      var ERROR_MESSAGES = {
        400: "잘못된 접근입니다.",
        501: "만료된 링크입니다. 다시 가입을 신청하세요"
      };
      this.message = ERROR_MESSAGES[err_code];
    }
  }
};
</script>
<template>
  <div>
    <div class="row mt-5">
      <div class="col-12">
        <h2>Hello {{username ? username : "stranger"}}</h2>
        <div v-if="school" style="display: inline;">
          <p>{{api_host}}/timetable?school={{encodeURI(school)}}&s_code={{s_code}}</p>
          <input id="schoolUrl" type="hidden" />
          <v-btn :to="`timetable?school=${encodeURI(
        school
      )}&s_code=${s_code}`">시간표</v-btn>
          <v-btn @click="copyLink">링크 복사</v-btn>
        </div>
        <div v-if="username" style="display: inline;">
          <activeHome v-if="is_active" />
          <div v-else>
            <p>이메일 인증을 완료해주세요.</p>
          </div>
          <v-btn color="cyan" @click="logout">로그아웃</v-btn>
        </div>
        <div v-if="!username" style="display: inline;">
          <v-btn to="login">관리자 로그인</v-btn>
          <v-btn to="school/privacy-consent">관리자 등록</v-btn>
          <v-btn @click="ex_login">샘플계정 로그인</v-btn>
        </div>
      </div>
    </div>
    <Notice />
    <v-snackbar v-model="snackbar" :timeout="2000">
      {{notiTxt}}
      <template v-slot:action="{ attrs }">
        <v-btn color="info" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import Notice from "@/components/notice";
import activeHome from "@/components/home/active_home";
import school from "Api/functions/school";

export default {
  name: "Home",
  components: {
    Notice,
    activeHome
  },
  data() {
    return {
      username: null,
      is_active: false,
      logged_in: false,
      school: null,
      s_code: null,
      api_host: window.location.origin,
      notiTxt: null,
      snackbar: false
    };
  },
  methods: {
    ex_login() {
      school.ex_login(this);
    },
    onLoginSuccess(response) {
      this.$log.debug(response);
      this.getSessionInfo();
    },
    onLoginFalied(statusCode) {
      this.$log.debug(statusCode);
    },
    checkLogin() {
      if (this.$session.has("school")) {
        this.$log.debug("logged in");
        this.getSessionInfo();
      }
    },
    getSessionInfo() {
      this.is_active = this.$session.get("is_active");
      this.username = this.$session.get("username");
      this.s_code = this.$session.get("s_code");
      this.school = this.$session.get("school");
      this.logged_in = true;
    },
    copyLink() {
      let school_url = document.querySelector("#schoolUrl");
      school_url.value = `${this.api_host}/timetable?school=${encodeURI(
        this.school
      )}&s_code=${this.s_code}`;
      school_url.setAttribute("type", "text");
      school_url.select();

      var successful = document.execCommand("copy");
      this.notiTxt = "링크가 복사되었습니다 :)";
      this.snackbar = successful ? true : false;
      school_url.setAttribute("type", "hidden");
    },
    logout() {
      this.$session.remove("is_active");
      this.$session.remove("username");
      this.$session.remove("user_id");
      this.getSessionInfo();
    }
  },
  mounted() {
    this.checkLogin();
  },
  updated() {
    this.checkLogin();
  }
};
</script>
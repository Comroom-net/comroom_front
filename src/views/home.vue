<template>
  <div>
    <div class="row mt-5">
      <div class="col-12">
        <h2>Hello {{username ? username : "stranger"}}</h2>
        <div v-if="school">
        <p>{{api_host}}/timetable?school={{encodeURI(school)}}&s_code={{s_code}}</p>
        <input id="schoolUrl" type="hidden">
        <a
          :href="`${api_host}/timetable?school=${encodeURI(
        school
      )}&s_code=${s_code}`"
          class="btn btn-primary"
          role="button"
        >시간표</a>
        <button class="copy btn btn-primary" @click="copyLink">링크 복사</button>
        <p v-if="copied">복사완료</p>
        </div>
        <div v-if="username">
          <activeHome v-if="is_active" />
          <div v-else>
            <p>이메일 인증을 완료해주세요.</p>
          </div>
          <a href="school/logout/" class="btn btn-secondary" role="button">로그아웃</a>
        </div>
        <div v-if="!username">
        <a href="login/" class="btn btn-primary" role="button">관리자 로그인</a>
        <a href="school/privacy_consent/" class="btn btn-primary" role="button">관리자 등록</a>
        <a class="btn btn-info" @click="ex_login">샘플계정 로그인</a>
        </div>
      </div>
    </div>
    <Notice />
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
      copied: false,
    };
  },
  methods: {
    ex_login() {
      school.ex_login(this);
    },
    onLoginSuccess(response) {
      var resData = response["data"];
      this.$log.debug(resData);
      this.$session.set("username", resData["username"]);
      this.$session.set("user_id", resData["user_id"]);
      this.$session.set("school", resData["school"]);
      this.$session.set("s_code", resData["s_code"]);
      this.$session.set("is_active", resData["is_active"]);
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
      let school_url = document.querySelector('#schoolUrl')
      school_url.value = `${this.api_host}/timetable?school=${encodeURI(this.school)}&s_code=${this.s_code}`
      school_url.setAttribute('type', 'text')
      school_url.select()
      
      var successful = document.execCommand('copy');
      this.copied = successful ? true : false
      school_url.setAttribute('type', 'hidden')
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
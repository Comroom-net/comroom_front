<template>
  <div>
    <div class="row mt-5">
      <div class="col-12">
        <h2>Hello {{username ? username : "stranger"}}</h2>
        <p v-if="school">http://comroom.net/timetable?school={{encodeURI(school)}}&s_code={{s_code}}</p>
        <a :href="timetable_url" class="btn btn-primary" role="button">시간표</a>
        <button class="copy btn btn-primary">링크 복사</button>
        <div v-if="username">
          <activeHome v-if="is_active" />
          <div v-else>
            <p>이메일 인증을 완료해주세요.</p>
          </div>
        </div>
        <a href="login/" class="btn btn-primary" role="button">관리자 로그인</a>
        <a href="school/privacy_consent/" class="btn btn-primary" role="button">관리자 등록</a>
        <a class="btn btn-info" @click="ex_login">샘플계정 로그인</a>
        <!-- {% if username %}
    {% if is_active %}
    <p>
      {{request.build_absolute_uri}}timetable?school={{school|urlencode}}&s_code={{s_code}}
    </p>
    <a href="{{request.build_absolute_uri}}timetable?school={{school|urlencode}}&s_code={{s_code}}"
      class="btn btn-primary" role="button">시간표</a>
    <button class="copy btn btn-primary">링크 복사</button>
    <div class="dropdown" style="display:inline-block;">
      <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false">
        관리자 메뉴
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="comroom_admin/">컴퓨터실 정보 수정</a>
        <a class="dropdown-item" href="timetable/time_admin/">시간표 수정</a>
        <a class="dropdown-item" href="timetable/fix_time/">고정시간 등록</a>
      </div>
    </div>
    <a href="school/logout/" class="btn btn-secondary" role="button">로그아웃</a>
    {% else %}
    <p>이메일 인증을 완료해주세요.</p>
    <a href="school/login/" class="btn btn-primary" role="button">관리자 로그인</a>
    <a href="school/privacy_agreement/" class="btn btn-primary" role="button">관리자 등록</a>
    <a href="school/ex_login/" class="btn btn-info" role="button">샘플계정 로그인</a>
        {% endif %}-->

        <!-- {% else %} {% if s_code %}
    <a href="{{request.build_absolute_uri}}timetable?school={{school|urlencode}}&s_code={{s_code}}"
      class="btn btn-primary" role="button">시간표</a>
    {% endif %}
    <a href="school/login/" class="btn btn-primary" role="button">관리자 로그인</a>
    <a href="school/privacy_agreement/" class="btn btn-primary" role="button">관리자 등록</a>
    <a href="school/ex_login/" class="btn btn-info" role="button">샘플계정 로그인</a>

        {% endif %}-->
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
      s_code: null
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
        this.login();
      }
    },
    getSessionInfo() {
      this.is_active = this.$session.get("is_active");
      this.username = this.$session.get("username");
      this.s_code = this.$session.get("s_code");
      this.school = this.$session.get("school");
      this.logged_in = true;
    }
  },
  mounted() {
    this.getSessionInfo();
  }
};
</script>
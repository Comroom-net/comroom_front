<template>
  <div class="login">
    <div class="row mt-5">
      <div class="col-12 text-center">
        <h1>학교관리자 로그인</h1>
      </div>
    </div>
    <div class="row mt-5" v-if="error">
      <div class="col-12">{{ error }}</div>
    </div>
    <div class="row mt-5">
      <div class="col-12">
        <div class="form-group">
          <label for="id_user">아이디</label>
          <input
            type="text"
            class="form-control"
            id="id_user"
            placeholder="아이디"
            name="user"
            v-model="user"
          />
        </div>
        <div class="form-group">
          <label for="id_password">비밀번호</label>
          <input
            type="password"
            class="form-control"
            id="id_password"
            placeholder="비밀번호"
            name="password"
            v-model="password"
          />
        </div>
        <button class="btn btn-primary" @click="login()">로그인</button>
        <br />
        <v-menu
          v-model="forgotPopup"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-x
          disabled
        >
          <template v-slot:activator="{ on, attrs }">
            <small v-bind="attrs" v-on="on">
              <u>비밀번호가 기억나지 않아요</u>
            </small>
          </template>

          <forgotPassword />
        </v-menu>
      </div>
    </div>
  </div>
</template>

<script>
import api from "Api/functions/school";
import ForgotPassword from "@/components/common/forgot_password";

export default {
  name: "Login",
  components: {
    ForgotPassword: ForgotPassword
  },
  created() {
    window.onSignIn = this.onSignIn;
    window.signOut = this.signOut;
  },
  data() {
    return {
      user: null,
      password: null,
      error: null,
      forgotPopup: null
    };
  },
  methods: {
    login() {
      let login_info = {
        user: this.user,
        password: this.password
      };
      this.$log.debug(login_info);
      api.login(this, login_info);
    },
    signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {
        console.log("User signed out.");
      });
    },
    onSignIn(googleUser) {
      var profile = googleUser.getBasicProfile();
      console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log("Name: " + profile.getName());
      console.log("Image URL: " + profile.getImageUrl());
      console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
      var id_token = googleUser.getAuthResponse().id_token;
      //   console.log(id_token);
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:8000/tokensignin");
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onload = function() {
        console.log("Signed in as: " + xhr.responseText);
      };
      xhr.send("idtoken=" + id_token);
    }
  }
};
</script>
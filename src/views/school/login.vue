<template>
  <div class="login">
    <div class="row mt-5">
      <div class="col-12 text-center">
        <h1>학교관리자 로그인</h1>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-12">{{ error }}</div>
    </div>
    <div class="row mt-5">
      <div class="col-12">
        <form method="POST" action=".">
          <div class="form-group">
            <label for="id_user">아이디</label>
            <input type="text" class="form-control" id="id_user" placeholder="아이디" name="user" />
          </div>
          <div class="form-group">
            <label for="id_password">비밀번호</label>
            <input
              type="password"
              class="form-control"
              id="id_password"
              placeholder="비밀번호"
              name="password"
            />
          </div>
          <button class="btn btn-primary" @click="login()">로그인</button>
        </form>
        <!-- <a id="reset_btn" role="button" data-toggle="modal" data-target="#resetModal"> -->
        <a href="/forgot-password">
          <small>
            <u>비밀번호가 기억나지 않아요</u>
          </small>
        </a>
        <!-- <div class="g-signin2" data-onsuccess="onSignIn"></div> -->
        <!-- <button href="#" @click="signOut()">Sign out</button> -->
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  name: "Login",
  created() {
    console.log("created");
    window.onSignIn = this.onSignIn;
    window.signOut = this.signOut;
  },
  methods: {
    login() {
      axios
        .post("http://localhost:8000/school/api/login/", data)
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
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
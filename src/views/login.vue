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
        <form method="POST" action="http://localhost:8000/school/api/login/">
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
          <button type="submit" class="btn btn-primary">로그인</button>
        </form>
        <a id="reset_btn" role="button" data-toggle="modal" data-target="#resetModal">
          <small>
            <u>비밀번호가 기억나지 않아요</u>
          </small>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login"
};
</script>
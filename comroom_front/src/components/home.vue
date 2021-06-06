<template>
  <div class="home">
    <div class="col-12">
      <h2>Hello Stranger</h2>

      <p>school code</p>
      <a href="timetable?school=123&s_code=123" class="btn btn-primary" role="button">시간표</a>
      <button class="copy btn btn-primary">링크 복사</button>
      <div class="dropdown" style="display:inline-block;">
        <button
          class="btn btn-primary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >관리자 메뉴</button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="comroom_admin/">컴퓨터실 정보 수정</a>
          <a class="dropdown-item" href="timetable/time_admin/">시간표 수정</a>
          <a class="dropdown-item" href="timetable/fix_time/">고정시간 등록</a>
        </div>
      </div>
      <a href="school/logout/" class="btn btn-secondary" role="button">로그아웃</a>

      <a href="school/login/" class="btn btn-primary" role="button">관리자 로그인</a>
      <a href="school/privacy_agreement/" class="btn btn-primary" role="button">관리자 등록</a>
      <a href="school/ex_login/" class="btn btn-info" role="button">샘플계정 로그인</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>
<template>
  <div>
    <p>http://comroom.net/timetable?school={{school|urlencode}}&s_code={{s_code}}</p>
    <a
      href="#/timetable?school={{school|urlencode}}&s_code={{s_code}}"
      class="btn btn-primary"
      role="button"
    >시간표</a>
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
  </div>
</template>

<script>
export default {
  name: "activeHome",
  data() {
    return {
      school: "펜하",
      s_code: "1111"
    };
  }
};
</script>
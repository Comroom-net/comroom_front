<template>
  <div>
    <p>http://comroom.net/timetable?school={{encodeURI(school)}}&s_code={{s_code}}</p>
    <a :href="timetable_url" class="btn btn-primary" role="button">시간표</a>
    <button class="copy btn btn-primary">링크 복사</button>
    <div class="dropdown" style="display:inline-block;">
      <b-dropdown variant="primary" class="m-2" id="admin_menu" text="관리자메뉴">
        <b-dropdown-item class="dropdown-item" href="comroom_admin/">컴퓨터실 정보 수정</b-dropdown-item>
        <b-dropdown-item class="dropdown-item" href="timetable/time_admin/">시간표 수정</b-dropdown-item>
        <b-dropdown-item class="dropdown-item" href="timetable/fix_time/">고정시간 등록</b-dropdown-item>
      </b-dropdown>
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
      s_code: "1111",
      timetable_url:
        "#/timetable?school={{encodeURI(school)}}&s_code={{s_code}}"
    };
  }
};
</script>
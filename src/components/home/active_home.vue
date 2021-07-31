<template>
  <div>
    <div class="dropdown" style="display:inline-block;">
      <b-dropdown variant="primary" class="m-2" id="admin_menu" text="관리자메뉴">
        <b-dropdown-item class="dropdown-item" href="comroom_admin/">컴퓨터실 정보 수정</b-dropdown-item>
        <b-dropdown-item class="dropdown-item" href="timetable/time_admin/">시간표 수정</b-dropdown-item>
        <b-dropdown-item class="dropdown-item" href="timetable/fix_time/">고정시간 등록</b-dropdown-item>
      </b-dropdown>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "activeHome",
  data() {
    return {};
  }
};
</script>
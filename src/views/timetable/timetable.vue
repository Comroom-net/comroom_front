<template>
  <div data-app>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Timetable",
  props: {
    school: {
      type: String,
      default: "school"
    },
    s_code: {
      type: String,
      default: "1111"
    }
  },
  mounted() {
    this.$log.debug(this.school);
    this.$log.debug(this.s_code);
  }
};
</script>
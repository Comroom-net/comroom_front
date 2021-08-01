<template>
  <div data-app>
    <Calendar />
  </div>
</template>

<script>
import Calendar from "@/components/calendar";

export default {
  name: "Timetable",
  components: {
    Calendar
  },
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
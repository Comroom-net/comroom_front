<template>
  <div data-app>
    <Calendar v-if="valid_school" />
    <div v-if="!valid_school">
      {{error_msg}}
      {{school}}
    </div>
  </div>
</template>

<script>
import Calendar from "@/components/timetable/calendar";
import api from "Api/functions/timetable";

export default {
  name: "Timetable",
  components: {
    Calendar
  },
  props: {
    school: {
      type: String
    },
    s_code: {
      type: String
    }
  },
  data() {
    return {
      error_msg: "ok",
      valid_school: false
    };
  },
  mounted() {
    if (this.school && this.s_code) {
      this.$log.debug(this.school);
      this.$log.debug(this.s_code);
      api.check_school(this);
    } else {
      if (this.$session.get("school_id")) this.valid_school = true;
    }
  }
};
</script>
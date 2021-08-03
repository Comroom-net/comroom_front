<template>
  <div>
    {{msg}}
    {{school}}
  </div>
</template>

<script>
import api from "Api/functions/timetable";

export default {
  name: "validSchool",
  data() {
    return {
      msg: "ok"
    };
  },
  props: {
    school: String,
    s_code: String
  },
  methods: {
    valid_school() {
      api.check_school(this);
    }
  },
  mounted() {
    this.valid_school();
  }
};
</script>
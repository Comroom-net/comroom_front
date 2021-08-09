<template>
  <div>
    <v-data-table :headers="headers" :items="timetables" :items-per-page="10" class="elevation-1">
      <template v-slot:item.reg_date="{ item }">
        <span>{{ new Date(item.reg_date).toLocaleString() }}</span>
      </template>
      <template v-slot:item.delete="{ item }">
        <v-btn color="error" @click="deleteTime(item.id)">삭제</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import api from "Api/functions/timetable";

export default {
  name: "TimetableManager",
  data() {
    return {
      timetables: [],
      headers: [
        {
          text: "날짜",
          align: "start",
          sortable: true,
          value: "date"
        },
        { text: "교실", value: "room" },
        { text: "차시", value: "time", sortable: false },
        { text: "학년", value: "grade" },
        { text: "반", value: "classNo", sortable: false },
        { text: "선생님", value: "teacher" },
        { text: "등록일시", value: "reg_date" },
        { text: "삭제", value: "delete" }
      ]
    };
  },
  mounted() {
    api.get_all_timetable(this);
  },
  methods: {
    deleteTime(idx) {
      api.delete_time(this, idx);
    }
  }
};
</script>
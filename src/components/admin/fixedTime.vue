<template>
  <div>
    <h1>고정시간 관리</h1>
    <p>방과후(화요일 6교시)처럼 매주 고정된 시간을 등록합니다.</p>
    <v-data-table :headers="headers" :items="timetables" :items-per-page="5" class="elevation-1">
      <template v-slot:item.fixed_day="{ item }">{{dayOfWeek[item.fixed_day]}}</template>
      <template v-slot:item.delete="{ item }">
        <v-btn color="error">삭제</v-btn>
      </template>
    </v-data-table>
    <v-btn block color="primary">추가</v-btn>
    <div>
      <v-container>
        <v-row></v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import api from "Api/functions/timetable";

export default {
  name: "FixedTime",
  data() {
    return {
      year: new Date().getFullYear(),
      dayOfWeek: ["월", "화", "수", "목", "금", "토", "일"],
      timetables: [],
      headers: [
        {
          text: "교실",
          align: "start",
          sortable: true,
          value: "comroom"
        },
        { text: "요일", value: "fixed_day" },
        { text: "차시", value: "fixed_time", sortable: false },
        { text: "내용", value: "fixed_name" },
        { text: "시작일", value: "fixed_from" },
        { text: "종료일", value: "fixed_until" },
        { text: "삭제", value: "delete" }
      ]
    };
  },
  mounted() {
    api.get_all_fixed_times(this);
  }
};
</script>
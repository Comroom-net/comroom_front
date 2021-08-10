<template>
  <div>
    <h1>고정시간 관리</h1>
    <p>방과후(화요일 6교시)처럼 매주 고정된 시간을 등록합니다.</p>
    <v-data-table :headers="headers" :items="timetables" :items-per-page="5" class="elevation-1">
      <template v-slot:item.fixed_day="{ item }">{{dayOfWeek[item.fixed_day][0]}}</template>
      <template v-slot:item.delete="{ item }">
        <v-btn color="error" @click="deleteFix(item.id)">삭제</v-btn>
      </template>
    </v-data-table>
    <div>
      <v-container>
        <v-form ref="form">
          <v-row>
            <v-col>
              <v-select
                :items="rooms"
                label="교실"
                solo
                v-model="room"
                item-text="name"
                item-value="id"
                :rules="rules"
                required
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                :items="dayOfWeek"
                label="요일"
                solo
                v-model="day"
                item-text="[0]"
                :item-value="it => dayOfWeek.indexOf(it)"
                :rules="rules"
                required
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                :items="times"
                label="시간"
                solo
                v-model="time"
                :item-text="el => `${el[0]} - ${el[1]}`"
                :item-value="it => times.indexOf(it)"
                :rules="rules"
                required
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-text-field label="내용" placeholder="내용" :rules="rules" required v-model="title"></v-text-field>
          </v-row>
          <v-row>
            <v-col>
              <v-menu
                ref="start_menu"
                v-model="start_menu"
                :close-on-content-click="false"
                :return-value.sync="start_date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="start_date"
                    label="시작일"
                    readonly
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="start_date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="start_menu = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.start_menu.save(start_date)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col>
              <v-menu
                ref="end_menu"
                v-model="end_menu"
                :close-on-content-click="false"
                :return-value.sync="end_date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="end_date"
                    label="종료일"
                    readonly
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="end_date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="end_menu = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.end_menu.save(end_date)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </div>
    <v-btn block color="primary" @click="newFix">추가</v-btn>
  </div>
</template>

<script>
import api from "Api/functions/timetable";

export default {
  name: "FixedTime",
  data() {
    return {
      rules: [v => v != null || "required"],
      isFixedTime: true,
      year: new Date().getFullYear(),
      day: null,
      room: null,
      time: null,
      title: null,
      startTime: "09:10",
      times: [
        ["09:30", "09:40"],
        ["09:50", "10:30"],
        ["10:40", "11:20"],
        ["11:30", "12:10"],
        ["12:20", "13:00"],
        ["13:10", "13:50"],
        ["14:00", "14:40"]
      ],
      rooms: [],
      dayOfWeek: [["월"], ["화"], ["수"], ["목"], ["금"]],
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
      ],
      items: [1, 2, 3],
      start_date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      end_date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      start_menu: false,
      end_menu: false
    };
  },
  mounted() {
    api.get_all_fixed_times(this);
    api.get_comroom(this);
    api.get_start_time(this);
  },
  methods: {
    deleteFix(idx) {
      api.delete_fix(this, idx);
    },
    newFix() {
      if (this.$refs.form.validate()) api.add_new_fixed(this);
    },
    makeTimes() {
      var times = [];
      let [h, m] = this.startTime.split(":");
      let minute = 60000;
      let classMin = 40 * minute;
      let breakMin = 10 * minute;
      var start = new Date();
      start.setHours(+h);
      start.setMinutes(m);
      var end = new Date(start.getTime() + classMin);
      for (let i = 0; i < 7; i++) {
        times.push([this.convertTime(start), this.convertTime(end)]);
        start = new Date(end.getTime() + breakMin);
        end = new Date(start.getTime() + classMin);
      }
      this.times = times;
    },
    convertTime(t) {
      return t
        .toTimeString()
        .split(" ")[0]
        .slice(0, 5);
    }
  }
};
</script>
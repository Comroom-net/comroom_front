<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">Today</v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">{{ $refs.calendar.title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu :close-on-content-click="false">
            <template v-slot:activator="{ on: menu, attrs }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on: tooltip }">
                  <v-btn color="primary" outlined v-bind="attrs" v-on="{ ...tooltip, ...menu }">New</v-btn>
                </template>
                <span>시간표 등록</span>
              </v-tooltip>
            </template>
            <v-card min-width="200px" flat>
              <v-toolbar color="blue lighten-4">
                <v-spacer></v-spacer>
                <v-toolbar-title>시간표 등록</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-icon right>mdi-close</v-icon>
              </v-toolbar>
              <v-expand-transition>
                <div v-show="datePickerShow">
                  <v-row justify="center">
                    <v-date-picker
                      v-model="newDate"
                      :allowed-dates="allowedDates"
                      class="mt-2"
                      min="2021-06-15"
                      max="2022-03-20"
                    ></v-date-picker>
                  </v-row>
                </div>
              </v-expand-transition>

              <v-card-text>
                <span>시간</span>

                <span>학년</span>
                <v-chip-group
                  v-model="newGrade"
                  active-class="deep-purple accent-4 white--text"
                  column
                  mandatory
                >
                  <v-chip v-for="grade in grades" :key="grade" :value="grade">{{grade}}</v-chip>
                </v-chip-group>
                <v-text-field label="반" placeholder="1"></v-text-field>
                <v-text-field label="선생님 이름" placeholder="이은섭"></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="primary" @click="selectedOpen = false">등록</v-btn>
                <v-spacer></v-spacer>
                <v-btn text color="secondary" @click="selectedOpen = false">취소</v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          :weekdays="weekday"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        >
          <template v-slot:event="{event}">
            <div class="fill-height pl-2">{{event.schoolTime}}교시 {{event.name}}</div>
          </template>
        </v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-delete-outline</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>


<script>
import api from "Api/functions/timetable";

export default {
  name: "Calendar",
  props: {
    roomNo: String,
    date: String
  },
  data: () => ({
    newDate: "",
    newGrade: 1,
    newClass: null,
    newtime: null,
    datePickerShow: true,
    grades: [1, 2, 3, 4, 5, 6],
    times: [
      ["09:00:00", "09:40:00"],
      ["09:50:00", "10:30:00"],
      ["10:40:00", "11:20:00"],
      ["11:30:00", "12:10:00"],
      ["12:20:00", "13:00:00"],
      ["13:10:00", "13:50:00"],
      ["14:00:00", "14:40:00"]
    ],
    month: 5,
    year: 2020,
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day"
    },
    mode: "stack",
    weekday: [1, 2, 3, 4, 5],
    value: "",
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: []
  }),
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    getEventColor(event) {
      return event.color;
    },
    updateRange({ start, end }) {
      const events = [];
      this.month = start.month;
      this.year = start.year;

      api.get_monthly(this);
      this.events = events;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    addNew() {},
    allowedDates: val => parseInt(val.split("-")[2], 10) % 2 === 0
  }
};
</script>
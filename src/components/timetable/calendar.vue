<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday"
            >Today</v-btn
          >
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">{{
            $refs.calendar.title
          }}</v-toolbar-title>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ thisRoom.name }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list v-model="roomNo" mandatory>
              <v-list-item
                @click="changeRoom(index)"
                v-for="(room, index) in rooms"
                :key="index"
              >
                <v-tooltip right>
                  <template #activator="{ on, attrs }">
                    <v-list-item-title v-bind="attrs" v-on="on">{{
                      room.name
                    }}</v-list-item-title>
                  </template>
                  <span>{{ room.description }}</span>
                </v-tooltip>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-spacer></v-spacer>
          <span v-show="type != 'day'">사용할 날짜를 선택해주세요</span>
          <newTime
            v-if="type == 'day'"
            :date="focus"
            v-on:addNew="addNew"
            :roomNo="roomNo + 1"
            :startTime="startTime"
          />
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
          first-time="08:30"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @click:day-category="viewDay"
          @change="updateRange"
        >
          <template v-slot:event="{ event }">
            <div class="fill-height pl-2">
              {{ event.schoolTime }}교시 {{ event.name }}
            </div>
          </template>
          <template v-slot:day-label-header="{ day }">
            <!-- <v-btn color="primary" fab small dark>{{day}}</v-btn>
            <v-btn fab x-small color="cyan">
              <v-icon>mdi-plus</v-icon>
            </v-btn>-->
          </template>
          <template #day-header v-if="type == 'day'">
            <div class="pa-3">
              <h4>{{ rooms[roomNo].description }}</h4>
            </div>
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
              <v-btn icon v-show="false">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn
                icon
                @click="cancelTime(selectedEvent.id)"
                v-show="selectedEvent.id"
              >
                <v-icon>mdi-delete-outline</v-icon>
              </v-btn>
              <v-btn icon v-show="false">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"> </span>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false"
                >Cancel</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>


<script>
import api from "Api/functions/timetable";
import newTime from "@/components/timetable/newTime";

export default {
  name: "Calendar",
  components: {
    newTime,
  },
  props: {
    date: String,
  },
  computed: {
    comrooms() {
      return this.$store.state.comrooms;
    },
    thisRoom() {
      return this.rooms[this.roomNo];
    },
  },
  data: () => ({
    startTime: "09:10",
    roomNo: 0,
    rooms: [
      {
        id: 0,
        name: "컴룸",
      },
    ],
    month: 5,
    year: 2020,
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
    },
    mode: "stack",
    weekday: [1, 2, 3, 4, 5],
    value: "",
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    start: null,
    end: null,
  }),
  beforeCreate() {
    api.get_comroom(this);
    api.get_start_time(this);
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
      this.month = start.month;
      this.year = start.year;
      this.events = [];
      api.get_monthly(this);
      api.get_fixed_monthly(this);
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    addNew() {
      api.get_monthly(this);
    },
    changeRoom(roomNo) {
      this.roomNo = roomNo;
      this.events = [];
      api.get_monthly(this);
      api.get_fixed_monthly(this);
    },
    cancelTime(idx) {
      api.delete_time(this, idx);
    },
  },
};
</script>
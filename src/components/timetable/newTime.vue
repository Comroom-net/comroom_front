<template>
  <div>
    <v-menu :close-on-content-click="false" v-model="showNew">
      <template v-slot:activator="{ on: menu, attrs }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn color="primary" outlined v-bind="attrs" v-on="{ ...tooltip, ...menu }">New</v-btn>
          </template>
          <span>시간표 등록</span>
        </v-tooltip>
      </template>
      <v-card min-width="200px" flat :loading="loading">
        <template slot="progress">
          <v-progress-linear color="teal lighten-3" height="10" indeterminate></v-progress-linear>
        </template>

        <v-toolbar color="blue dark-4 white--text">
          <v-spacer></v-spacer>
          <v-toolbar-title>시간표 등록</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon mid @click="cancel">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text>
          <v-text-field :value="date" label="날짜" outlined disabled></v-text-field>
          <p>시간</p>
          <div>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on">
                  {{times[newTime][0]}} - {{times[newTime][1]}}
                  <v-icon>mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item-group v-model="newTime" mandatory>
                  <v-list-item v-for="(time, index) in times" :key="index">
                    <v-list-item-title>{{ time[0] }} - {{time[1]}}</v-list-item-title>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu>
          </div>
          <span>학년</span>
          <v-chip-group
            v-model="newGrade"
            active-class="blue accent-4 white--text"
            column
            mandatory
          >
            <v-chip v-for="grade in grades" :key="grade" :value="grade">{{grade}}</v-chip>
          </v-chip-group>
          <v-text-field
            label="반"
            type="number"
            placeholder="1 (숫자를 입력해주세요)"
            v-model="newClass"
            :error-messages="errors.class"
            :rules="[rules.required, rules.number]"
          ></v-text-field>
          <v-text-field
            label="선생님 이름"
            placeholder="이은섭"
            v-model="teacher"
            :rules="[rules.required]"
            :error-messages="errors.teacher"
          ></v-text-field>
          <p v-show="apiError">{{apiError}}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="primary" @click="addNew">등록</v-btn>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-btn text color="secondary" @click="cancel">취소</v-btn>
          </v-card-actions>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import api from "@/api/functions/timetable";

export default {
  name: "newTime",
  props: {
    date: String
  },
  data() {
    return {
      loading: false,
      showNew: false,
      newDate: "",
      newGrade: 1,
      newClass: null,
      newTime: 0,
      teacher: null,
      errors: {
        teacher: null,
        class: null
      },
      roomNo: 1,
      grades: [1, 2, 3, 4, 5, 6],
      times: [
        ["09:00", "09:40"],
        ["09:50", "10:30"],
        ["10:40", "11:20"],
        ["11:30", "12:10"],
        ["12:20", "13:00"],
        ["13:10", "13:50"],
        ["14:00", "14:40"]
      ],
      rules: {
        required: value => !!value || "Required.",
        number: value => {
          const pattern = /^[0-9]+$/;
          return pattern.test(value) || "숫자를 입력해주세요.";
        },
        counter: value => value.length <= 20 || "Max 20 characters",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      },
      apiError: null
    };
  },
  methods: {
    getToday() {
      var date = new Date();
      var month = ("0" + (date.getMonth() + 1)).slice(-2);
      var day = ("0" + date.getDate()).slice(-2);
      return `${date.getFullYear()}-${month}-${day}`;
    },
    getNextyear() {
      var date = new Date();
      date.setFullYear(date.getFullYear() + 1);
      var month = ("0" + (date.getMonth() + 1)).slice(-2);
      var day = ("0" + date.getDate()).slice(-2);
      return `${date.getFullYear()}-${month}-${day}`;
    },
    cancel() {
      this.loading = false;
      this.showNew = false;
    },
    addNew() {
      const isNumber = /^[0-9]+$/;
      if (!this.newClass) {
        this.errors.class = "required";
      } else if (!isNumber.test(this.newClass)) {
        this.errors.class = "숫자를 입력해주세요";
      }
      if (!this.teacher) this.errors.teacher = "required";
      if (this.newClass && this.teacher) {
        this.loading = true;
        api.addTime(this);
      }
    }
  }
};
</script>
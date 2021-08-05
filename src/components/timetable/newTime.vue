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
      <v-card min-width="200px" flat>
        <v-toolbar color="blue lighten-4">
          <v-spacer></v-spacer>
          <v-toolbar-title>시간표 등록</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon right @click="showNew = false">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text>
          <span>시간</span>
          {{date}}
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
          <v-btn text color="primary" @click="addNew()">등록</v-btn>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-btn text color="secondary" @click="showNew = false">취소</v-btn>
          </v-card-actions>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "newTime",
  props: {
    date: String
  },
  data() {
    return {
      showNew: false,
      newDate: "",
      newGrade: 1,
      newClass: null,
      newtime: null,
      grades: [1, 2, 3, 4, 5, 6],
      times: [
        ["09:00:00", "09:40:00"],
        ["09:50:00", "10:30:00"],
        ["10:40:00", "11:20:00"],
        ["11:30:00", "12:10:00"],
        ["12:20:00", "13:00:00"],
        ["13:10:00", "13:50:00"],
        ["14:00:00", "14:40:00"]
      ]
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
    addNew() {
      this.showNew = false;
      console.log(date);
    }
  }
};
</script>
<template>
  <div class="text-center" style="display: inline;">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on">
          관리자 메뉴
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in adminItems" :key="index">
          <v-list-item-title>
            <router-link :to="{name: item.routeName}">{{ item.name }}</router-link>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "activeHome",
  data() {
    return {
      adminItems: [
        {
          name: "컴퓨터실 정보 수정",
          routeName: "roomManager"
        },
        {
          name: "예약시간 수정",
          routeName: "timeManager"
        },
        {
          name: "고정시간 등록",
          routeName: "fixedTime"
        },
        {
          name: "일과시간 설정",
          routeName: "timeMap"
        }
      ]
    };
  }
};
</script>
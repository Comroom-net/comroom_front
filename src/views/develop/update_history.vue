<template>
  <div>
    <v-card
      class="mx-auto my-5"
      color="#77ab59"
      dark
      max-width="400"
      v-for="card in cards"
      :key="card.id"
    >
      <v-card-title>
        <v-icon large left>mdi-new-box</v-icon>
        <span class="text-h6">{{card.date}}</span>
      </v-card-title>

      <v-card-text class="text-h5 font-weight-bold">
        {{card.context}}
        <!-- <v-text-field label="댓글"></v-text-field> -->
      </v-card-text>

      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-avatar color="grey darken-3">
            <v-img
              class="elevation-6"
              alt
              src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairDreads02&accessoriesType=Round&hairColor=BrownDark&facialHairType=Blank&clotheType=Hoodie&clotheColor=Gray01&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>이은섭</v-list-item-title>
          </v-list-item-content>
          <v-spacer />

          <v-row align="center" justify="end">
            <v-icon class="mr-1" @click="card.like++">mdi-heart-outline</v-icon>
            <v-icon class="mr-1">mdi-heart</v-icon>
            <span class="subheading mr-2">{{card.like}}</span>
          </v-row>
        </v-list-item>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "UpdateHistory",
  data() {
    return {
      cards: [
        {
          date: "2021-09-02",
          context: "bug fix - fixedtimetable limit offset 70으로 증가",
          like: 1
        },
        {
          date: "2021-09-01",
          context: "메뉴 한글화",
          like: 1
        },
        {
          date: "2021-08-20",
          context: "메세지 버튼",
          like: 10
        },
        {
          date: "2021-08-15",
          context: "2.0 배포 완료",
          like: 20
        }
      ]
    };
  },
  methods: {}
};
</script>
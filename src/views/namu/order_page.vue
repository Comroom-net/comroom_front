<template>
  <div>
    <h3>{{room}}방</h3>
    <h4>MENU</h4>
    <v-container>
      <v-row>
        <v-col colspan="2" class="title">Coffee</v-col>
      </v-row>
      <v-row v-for="(coffee, cid) in coffees" :key="'coffee' + cid">
        <v-col>{{coffee}}</v-col>
        <v-col>
          <button
            type="button"
            class="btn btn-outline-primary btn-sm add"
            @click="addMenu(coffee, 'ICE')"
          >ICE</button>
          <button
            type="button"
            class="btn btn-outline-danger btn-sm add"
            @click="addMenu(coffee, 'HOT')"
          >HOT</button>
        </v-col>
      </v-row>
      <v-row>
        <v-col colspan="2" class="title">Latte</v-col>
      </v-row>
      <v-row v-for="(latte, lid) in lattes" :key="'latte' + lid">
        <v-col>{{latte}}</v-col>
        <v-col>
          <button
            type="button"
            class="btn btn-outline-primary btn-sm add"
            id="choco_latte_ice"
            @click="addMenu(latte, 'ICE')"
          >ICE</button>
          <button
            type="button"
            class="btn btn-outline-danger btn-sm add"
            id="choco_latte_hot"
            @click="addMenu(latte, 'HOT')"
          >HOT</button>
        </v-col>
      </v-row>

      <v-row>
        <v-col colspan="2" class="title">Ade</v-col>
      </v-row>
      <v-row>
        <v-col v-for="(ade, index) in ades" :key="'ade' + index" cols="6" lg="3">
          <button
            type="button"
            class="btn btn-outline-primary btn-sm ade"
            @click="addMenu(ade)"
          >{{ade}}</button>
        </v-col>
      </v-row>
      <v-row>
        <v-col colspan="2" class="title">Tea</v-col>
      </v-row>
      <v-row>
        <v-col v-for="(tea, index) in teas" :key="'tea' + index" cols="6" lg="3">
          <button
            type="button"
            class="btn btn-outline-danger btn-sm ade"
            @click="addMenu(tea)"
          >{{tea}}</button>
        </v-col>
      </v-row>
    </v-container>
    <hr />
    <div class="selected">
      <h4>주문목록</h4>
      <div
        class="alert alert-primary"
        role="alert"
        id="order_success"
        style="display: none;"
      >주문처리 중 잠시만 기다려주세요 :)</div>
      <div
        class="alert alert-danger"
        role="alert"
        id="order_fail"
        v-show="orderFail"
      >주문이나 요청사항을 입력해주세요 :)</div>
      <ul id="kart">
        <li v-for="(order, idx) in orders" :key="idx">
          {{order}}
          <v-btn fab text small color="grey darken-2" @click="cancelMenu(idx)">
            <v-icon small>mdi-close</v-icon>
          </v-btn>
        </li>
      </ul>
      <h4>요청사항</h4>
      <v-textarea solo name="request" label="다른 필요한게 있으면 적어주세요 :)" v-model="request"></v-textarea>
      <br />
      <button class="btn btn-outline-info" @click="sendOrder">주문</button>
    </div>
    <form action="/namu/order_msg" method="post" style="display: none;" id="order_form">
      <textarea name="order_list" id="order_list" cols="30" rows="10"></textarea>
    </form>
  </div>
</template>

<script>
import api from "Api/functions/namu";

export default {
  name: "OrderPage",
  created() {
    this.room = this.$session.get("namuRoom");
  },
  computed: {
    cols() {
      const { lg, sm } = this.$vuetify.breakpoint;
      return lg ? [3, 9] : sm ? [9, 3] : [6, 6];
    }
  },
  data() {
    return {
      coffees: ["아메리카노", "바닐라 라떼", "카페 라떼", "카페모카"],
      lattes: ["초코라떼", "말차라떼"],
      ades: ["복숭아 아이스티", "청포도 에이드", "레몬 에이드", "망고 에이드"],
      teas: [
        "팬넬",
        "그린앤젤",
        "클래식그린",
        "자스민",
        "마운틴허브",
        "루이보스 바닐라",
        "로즈힙",
        "얼그레이",
        "비베나",
        "다즐링",
        "케모마일",
        "잉글리쉬 브렉퍼스트",
        "실버라임 블라썸",
        "레드베리",
        "페퍼민트",
        "원더드림",
        "스윗진저",
        "레몬스카이",
        "아쌈"
      ],
      orderFail: false,
      orders: [],
      request: null,
      room: null
    };
  },
  methods: {
    addMenu(menu, type = "") {
      var ordered = menu + " " + type;
      this.orders.push(ordered);
      this.orderFail = false;
    },
    cancelMenu(idx) {
      this.orders.splice(idx, 1);
    },
    sendOrder() {
      this.orderFail = false;
      if (this.validOrder()) {
        api.sendOrder(this);
        this.orders = [];
        this.request = null;
        return;
      }
      this.orderFail = true;
    },
    validOrder() {
      if (!this.orders.length && !!!this.request) {
        return false;
      }
      return true;
    }
  }
};
</script>

<style>
h4,
td.title,
.selected {
  text-align: center;
}

table {
  margin: auto;
}

textarea {
  width: 100%;
}

.selected {
  margin-top: 15px;
}

.ade {
  width: 100%;
}

.add {
  width: 48%;
}

input.ea {
  width: 50px;
}

#kart {
  text-align: left;
}
</style>
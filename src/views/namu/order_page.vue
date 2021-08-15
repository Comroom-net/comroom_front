<template>
  <div>
    <h4>MENU</h4>
    <table>
      <tr>
        <td colspan="2" class="title">Coffee</td>
      </tr>
      <tr v-for="(coffee, cid) in coffees" :key="cid">
        <td>{{coffee}}</td>
        <td>
          <button type="button" class="btn btn-outline-primary btn-sm add" id="americano_ice">ICE</button>
          <button type="button" class="btn btn-outline-danger btn-sm add" id="americano_hot">HOT</button>
        </td>
      </tr>
      <tr>
        <td colspan="2" class="title">Latte</td>
      </tr>
      <tr v-for="(latte, lid) in lattes" :key="lid">
        <td>{{latte}}</td>
        <td>
          <button type="button" class="btn btn-outline-primary btn-sm add" id="choco_latte_ice">ICE</button>
          <button type="button" class="btn btn-outline-danger btn-sm add" id="choco_latte_hot">HOT</button>
        </td>
      </tr>

      <tr>
        <td colspan="2" class="title">Ade</td>
      </tr>
      <tr>
        <td v-for="(ade, index) in ades" :key="index">
          <button type="button" class="btn btn-outline-primary btn-sm ade" id="ice_tea">{{ade}}</button>
        </td>
      </tr>
      <tr>
        <td colspan="2" class="title">Tea</td>
      </tr>
      <tr v-for="(tea, index) in teas" :key="index">
        <td>
          <button type="button" class="btn btn-outline-danger btn-sm ade">{{tea}}</button>
        </td>
      </tr>
    </table>
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
        style="display: none;"
      >주문이나 요청사항을 입력해주세요 :)</div>
      <ul id="kart">
        <li v-for="order in orders" :key="order.id">
          {{order}}
          <span class="cancel">
            <svg
              class="bi bi-x-square"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
              />
              <path
                fill-rule="evenodd"
                d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
              />
              <path
                fill-rule="evenodd"
                d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
              />
            </svg>
          </span>
        </li>
      </ul>
      <h4>요청사항</h4>
      <textarea
        name="request"
        id="request"
        cols="30"
        rows="4"
        placeholder="다른 필요한게 있으면 적어주세요 :)"
        v-model="request"
      ></textarea>
      <br />
      <button class="btn btn-outline-info" id="order">주문</button>
    </div>
    <form action="/namu/order_msg" method="post" style="display: none;" id="order_form">
      <textarea name="order_list" id="order_list" cols="30" rows="10"></textarea>
    </form>
  </div>
</template>

<script>
export default {
  name: "OrderPage",
  created() {},
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
      request: null
    };
  },
  methods: {
    addMenu(menu) {
      this.$log.debug(menu);
      this.orders.push(menu);
      this.orderFail = false;
    },
    cancelMenu(idx) {
      this.orders.pop(idx);
    },
    sendOrder() {
      this.orderFail = false;
      if (this.validOrder()) {
        // api
      }
    },
    validOrder() {
      if (!!!this.orders && !!!this.request) {
        this.orderFail = true;
        return false;
      }
      return true;
    }
  }
};

function order() {
  if (valid_order()) {
    let kart = $("#kart").children("li");
    let order_list = [];
    jQuery.each(kart, function(i, val) {
      let menu = val.innerHTML.split("<")[0];
      console.log(menu);
      order_list.push(menu);
    });
    console.log(order_list);
    let msg = order_list.join("\n");
    console.log(msg);
    let extra = $("#request").val();
    if (extra != "") {
      extra_msg = "\n추가)\n" + extra;
      msg += extra_msg;
    }
    // send post to telegram api
    $("#order_list").val(msg);
    $("#order_success").show();
    $("#kart").empty();
    $("#order_form").submit();
  }
}
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
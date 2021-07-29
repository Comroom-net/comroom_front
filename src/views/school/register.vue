<template>
  <div>
    <div class="row mt-5">
      <div class="col-12 text-center">
        <h1>학교 관리자 등록</h1>
      </div>
    </div>
    <div class="row mt-5" v-if="errors">
      <div class="col-12">{{ errors }}</div>
    </div>
    <div class="row mt-5">
      <div class="col-12">
        <div class="form-group">
          <label for="province">교육청</label>
          <select name="province" id="province" class="form-control" v-model="reqData.province">
            <option
              :value="province[0]"
              v-for="province in provinces"
              :key="province.id"
            >{{province[1]}}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="school">학교명</label>
          <div class="input-group mb-3">
            <input
              v-model="reqData.schoolName"
              type="text"
              name="name"
              class="form-control"
              placeholder="삼양"
              aria-label="학교명"
              aria-describedby="basic-addon2"
            />
            <div class="input-group-append">
              <span class="input-group-text" id="basic-addon2">초등학교</span>
            </div>
          </div>
          <small class="form-text text-muted">'초등학교'를 제외한, 정확한 명칭을 입력해주세요.</small>
          <div class="form-group" v-for="form in forms" :key="form.id">
            <label :for="form.name">{{form.label}}</label>
            <input
              v-model="reqData[form.name]"
              :type="form.type"
              :name="form.name"
              :id="form.name"
              :placeholder="form.label"
              class="form-control"
            />
            <small class="form-text text-muted" v-if="form.small">{{ form.small }}</small>
          </div>
        </div>
        <button class="btn btn-primary" @click="registerSubmit">등록</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "Api/functions/school";

export default {
  name: "Register",
  data() {
    return {
      errors: null,
      provinces: [
        ["서울특별시교육청", "서울"],
        ["부산광역시교육청", "부산"],
        ["대구광역시교육청", "대구"],
        ["인천광역시교육청", "인천"],
        ["광주광역시교육청", "광주"],
        ["대전광역시교육청", "대전"],
        ["울산광역시교육청", "울산"],
        ["세종특별자치시교육청", "세종"],
        ["경기도교육청", "경기"],
        ["강원도교육청", "강원"],
        ["충청북도교육청", "충북"],
        ["충청남도교육청", "충남"],
        ["전라북도교육청", "전북"],
        ["전라남도교육청", "전남"],
        ["경상북도교육청", "경북"],
        ["경상남도교육청", "경남"],
        ["제주특별자치도교육청", "제주"]
      ],
      forms: [
        {
          label: "교내 컴퓨터실 수",
          type: "number",
          name: "ea",
          small: "특별실(스마트패드)을 포함한 수. 최대 5개."
        },
        {
          label: "아이디",
          type: "text",
          name: "user"
        },
        {
          label: "비밀번호",
          type: "password",
          name: "password"
        },
        {
          label: "비밀번호 확인",
          type: "password",
          name: "re_password"
        },
        {
          label: "담당자 이름",
          type: "text",
          name: "realname"
        },
        {
          label: "이메일",
          type: "email",
          name: "email",
          small: "비밀번호 분실시 사용됩니다."
        }
      ],
      reqData: {
        province: null,
        schoolName: null,
        ea: null,
        user: null,
        password: null,
        realname: null,
        email: null
      }
    };
  },
  methods: {
    registerSubmit() {
      this.$log.debug("submit");
      this.$log.debug(this.reqData);
      api.register(this.reqData, this);
    },
    onRegisterSuccess() {
      this.$router.push("/");
    },
    onRegisterFail() {
      this.$router.push("/");
      this.$log.error("register failed");
    }
  }
};
</script>
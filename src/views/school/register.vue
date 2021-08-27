<template>
  <v-container>
    <h1>학교 관리자 등록</h1>

    <v-form ref="form" lazy-validation>
      <v-select
        v-model="reqData.province"
        :items="provinces"
        :rules="[v => !!v || '필수선택란']"
        label="교육청"
      ></v-select>
      <v-text-field
        v-model="reqData.schoolName"
        label="학교"
        placeholder="내수"
        suffix="초등학교"
        :error-messages="errors.school"
        :rules="[rules.required]"
      ></v-text-field>
      <div v-for="form in forms" :key="form.id">
        <v-text-field
          v-model="reqData[form.name]"
          :type="form.type"
          :label="form.label"
          :placeholder="form.label"
          :error-messages="errors[form.name]"
          :rules="getRules(form.name)"
          :hint="form.small"
        ></v-text-field>
      </div>
      <v-btn color="success" class="mr-4" @click="registerSubmit">등록</v-btn>
      <v-btn text @click="cancel">취소</v-btn>
    </v-form>
    <v-snackbar v-model="snackbar" :timeout="10000">
      {{error}}
      <template v-slot:action="{ attrs }">
        <v-btn color="info" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import api from "Api/functions/school";

export default {
  name: "Register",
  data() {
    return {
      snackbar: false,
      error: null,
      errors: {
        school: null,
        ea: null,
        user: null,
        password: null,
        re_password: null,
        email: null,
        realname: null
      },
      rules: {
        required: value => !!value || "필수입력란",
        number: value => {
          const pattern = /^[0-9]+$/;
          return pattern.test(value) || "숫자를 입력해주세요.";
        },
        counter: value => (value && value.length <= 20) || "최대 20자",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        ea: value => value < 6 || "5개 이상이 필요한 경우 별도 연락바랍니다."
      },
      province: null,
      provinces: [
        "서울특별시교육청",
        "부산광역시교육청",
        "대구광역시교육청",
        "인천광역시교육청",
        "광주광역시교육청",
        "대전광역시교육청",
        "울산광역시교육청",
        "세종특별자치시교육청",
        "경기도교육청",
        "강원도교육청",
        "충청북도교육청",
        "충청남도교육청",
        "전라북도교육청",
        "전라남도교육청",
        "경상북도교육청",
        "경상남도교육청",
        "제주특별자치도교육청"
      ],
      forms: [
        {
          label: "교내 컴퓨터실 수",
          type: "number",
          name: "ea",
          small:
            "특별실(스마트패드)을 포함한 수. 최대 5개. 더 필요한 경우 연락주세요."
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
          small:
            "교육청(혹은 공무원)메일로는 메일을 받지 못합니다. 비밀번호 분실시 사용됩니다."
        }
      ],
      reqData: {
        province: null,
        schoolName: null,
        ea: null,
        user: null,
        password: null,
        re_password: null,
        realname: null,
        email: null
      }
    };
  },
  methods: {
    cancel() {
      this.$router.push("/");
    },
    getRules(name) {
      const rules = {
        ea: [this.rules.required, this.rules.number, this.rules.ea],
        user: [this.rules.required, this.rules.counter],
        password: [this.rules.required],
        re_password: [
          this.rules.required,
          this.reqData.password === this.reqData.re_password ||
            "비밀번호가 일치하지 않습니다."
        ],
        realname: [this.rules.required, this.rules.counter],
        email: [this.rules.required, this.rules.email]
      };
      return rules[name];
    },
    registerSubmit() {
      if (this.$refs.form.validate()) {
        this.$log.debug(this.reqData);
        api.register(this.reqData, this);
      }
    }
  }
};
</script>
<template>
  <div>
    <div class="row mt-5">
      <div class="col-12 text-center">
        <h3>유튜브 전체화면 링크 변환 - nocookie</h3>
      </div>
    </div>
    <div class="convertor">
      <div class="row mt-2">
        <div class="col-12">
          <h5>링크입력</h5>
        </div>
      </div>

      <v-text-field
        v-model="inputUrl"
        placeholder="복사한 유튜브 링크를 붙여넣기 하세요"
        filled
        rounded
        label="원본 유튜브 링크"
      ></v-text-field>
      <div class="buttons">
        <v-btn id="option_title" @click="moreOptions">{{optionBtnText}}</v-btn>
        <v-btn id="option_reset_btn" @click="reset_options" v-show="showMoreOptions">옵션 초기화</v-btn>
      </div>

      <div id="options" class="mt-1" v-show="showMoreOptions">
        <v-text-field v-model="start" label="시작지점" suffix="초" type="number"></v-text-field>
        <v-text-field v-model="end" label="종료지점" suffix="초" type="number"></v-text-field>

        <v-switch v-model="autoplay" label="자동실행(음소거)" color="info" hide-details></v-switch>
        <v-switch v-model="keyboardDisable" label="키보드로 건너뛰기 금지" color="info" hide-details></v-switch>
        <v-switch v-model="showTimeline" label="타임라인 표시" color="info" hide-details></v-switch>
      </div>
      <v-btn @click="convert_url" :disabled="!!!inputUrl">변환</v-btn>
      <div class="row mt-3" id="converted_title" v-show="!!result">
        <div class="col-12">
          <h5>변환된 링크</h5>
        </div>
      </div>
      <p id="result" v-show="!!result">{{result}}</p>
      <div
        id="copied"
        class="alert alert-success mt-3"
        role="alert"
        v-show="isCopied"
      >클립보드에 복사되었습니다! :)</div>
      <div
        id="wrong_url"
        class="alert alert-danger mt-3"
        role="alert"
        v-show="isInvalid"
      >링크를 확인해주세요 😥</div>
    </div>
    <div class="row mt-3">
      <div class="col-12">
        <p class="text-muted" v-for="notice in notices" :key="notice.id">
          <span v-html="notice.notice"></span>
        </p>
      </div>
      <div class="col-sm-4">
        <h6>&lt; embed를 허용하지 않은 채널 &gt;</h6>
        <ul>
          <li v-for="ch in disabledChannels" :key="ch.id">{{ch.ch_name}}</li>
        </ul>
      </div>
      <div class="col-sm-8">
        혹시 재생 안되는 영상이 있는 채널은 제보해주세요.
        <br />검토 후 공지하겠습니다.
        <div class="input-group mb-3">
          <input
            name="new_ch"
            type="text"
            class="form-control"
            placeholder="불가 채널 공유"
            aria-label="채널명"
            aria-describedby="button-addon2"
            v-model="newCh"
            required
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-info"
              id="button-addon2"
              @click="sendCh"
              :disabled="isSending"
            >
              <v-progress-circular indeterminate color="info" :size="20" v-if="isSending" />
              <span v-if="!isSending">전송</span>
            </button>
          </div>
        </div>
        <v-snackbar v-model="snackbar" :timeout="2500">
          제보되었습니다. 감사합니다 :)
          <template v-slot:action="{ attrs }">
            <v-btn color="info" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
          </template>
        </v-snackbar>
      </div>
    </div>
  </div>
</template>

<script>
import api from "Api/functions/etc";

String.prototype.startsWith = function(str) {
  if (this.length < str.length) {
    return false;
  }
  return this.indexOf(str) == 0;
};

export default {
  name: "Nocookie",
  data() {
    return {
      inputUrl: null,
      showMoreOptions: false,
      start: null,
      end: null,
      checkboxOpts: [
        {
          label: "자동실행(음소거)",
          value: false
        },
        {
          label: "키보드로 건너뛰기 금지",
          value: false
        },
        {
          label: "키보드로 건너뛰기 금지",
          value: false
        }
      ],
      keyboardDisable: false,
      showTimeline: true,
      autoplay: false,
      optionBtnText: "옵션 보기",
      notices: [],
      disabledChannels: [],
      result: null,
      isInvalid: false,
      isCopied: false,
      isSending: false,
      newCh: null,
      snackbar: false
    };
  },
  created() {
    api.getNotice(this);
    api.getDisabledChannel(this);
  },
  methods: {
    sendCh() {
      this.isSending = true;
      api.newCh(this);
    },
    convert_url() {
      if (this.valid_url(this.inputUrl)) {
        const nocookie_prefix = "https://www.youtube-nocookie.com/embed/";
        var temp = this.inputUrl.split("/");
        temp = temp[temp.length - 1];
        if (temp.startsWith("watch")) {
          temp = temp.split("=")[1];
          temp = temp.split("&")[0];
          temp = temp.split("?")[0];
        } else {
          temp = temp.split("?")[0];
        }
        var video_id = temp;
        var result = nocookie_prefix + video_id + "?rel=0" + this.options();
        this.result = result;

        // copy url to clipboard
        var tempElem = document.createElement("textarea");
        tempElem.value = result;
        document.body.appendChild(tempElem);

        tempElem.select();
        document.execCommand("copy");
        document.body.removeChild(tempElem);
        this.isCopied = true;
        this.isInvalid = false;
      } else {
        this.isInvalid = true;
        this.isCopied = false;
        this.result = null;
      }
    },
    moreOptions() {
      this.showMoreOptions = !this.showMoreOptions;
      this.optionBtnText = this.showMoreOptions ? "옵션 닫기" : "옵션 보기";
    },
    reset_options() {
      this.start = null;
      this.end = null;
      this.keyboardDisable = false;
      this.autoplay = false;
      this.showTimeline = true;
    },
    options() {
      var url_suffix = "";
      if (!!this.start) {
        url_suffix += "&start=" + this.start;
      }
      if (!!this.end) {
        url_suffix += "&end=" + this.end;
      }
      if (!!this.autoplay) {
        url_suffix += "&autoplay=1&mute=1";
      }
      if (!!this.keyboardDisable) {
        url_suffix += "&disablekb=1";
      }
      if (!!!this.showTimeline) {
        url_suffix += "&controls=0";
      }

      return url_suffix;
    },
    valid_url(given) {
      if (!given.startsWith("http")) {
        return false;
      }
      if (!given.includes("you")) {
        return false;
      }

      return true;
    }
  }
};
</script>

<style>
.convertor {
  background-color: #e9f0ec;
  padding: 3px 5px 3px 5px;
}

.alert {
  margin-bottom: 0.3rem;
}

div.buttons {
  margin-top: 5px;
}

div.buttons .btn {
  margin-right: 10px;
}
</style>
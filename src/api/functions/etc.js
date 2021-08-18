import Vue from 'vue';
import api from "../index";
import API_URL from "Api/url";


export default {
    newCh(component) {
        const REQUEST_URL = API_URL.ETC_DISABLED_CHANNEL_URL

        const reqData = {
            ch_name: component.newCh
        }

        api.post(REQUEST_URL, reqData)
            .then((response) => {
                Vue.$log.debug(response.data)
                component.isSending = false
                component.newCh = null
                component.snackbar = true
            })
            .catch((err) => {
                Vue.$log.error(err)
            })
    },
    getNotice(component) {
        const REQUEST_URL = API_URL.ETC_NOTICE_NOCOOKIE_URL

        api.get(REQUEST_URL)
            .then((response) => {
                Vue.$log.debug(response.data)
                component.notices = response.data.results
            })
            .catch((err) => {
                Vue.$log.error(err)
            })
    },
    getDisabledChannel(component) {
        const REQUEST_URL = API_URL.ETC_DISABLED_CHANNEL_URL

        api.get(REQUEST_URL)
            .then((response) => {
                Vue.$log.debug(response.data)
                component.disabledChannels = response.data.results
            })
            .catch((err) => {
                Vue.$log.error(err)
            })
    },
}
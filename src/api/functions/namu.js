import Vue from 'vue';
import api from "../index";
import API_URL from "Api/url";


export default {
    sendOrder(component) {
        const REQUEST_URL = API_URL.NAMU_ORDER_URL

        let msg = component.orders.join("\n")
        if (component.request != null) {
            msg += `\n\n요청사항)\n${component.request}`
        }

        component.$log.info(msg)

        const reqData = {
            order_list: msg,
            room: component.room
        }

        api.post(REQUEST_URL, reqData)
            .then((response) => {
                Vue.$log.debug(response)
                Vue.$log.debug(response.data)
            })
            .catch((err) => {
                Vue.$log.error(err)
            })
    },
}
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AOS from 'aos'
import 'aos/dist/aos.css'
import axios from 'axios'
// import jsSHA from "jssha"
import VueAxios from 'vue-axios'


Vue.config.productionTip = false
Vue.use(VueAxios, axios)
// Vue.use(jsSHA)

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    AOS.init({})
  },
}).$mount('#app')

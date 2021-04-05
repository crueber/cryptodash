import Vue from 'vue'
import Trend from 'vuetrend'

Vue.use(Trend)

Vue.config.keyCodes = {
  e: 69
}

import App from './App.vue'

Vue.config.productionTip = false

window.EventBus = new Vue()
new Vue({
  render: h => h(App),
}).$mount('#app')

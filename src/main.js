import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import VueDragDrop from 'vue-drag-drop';

import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@/assets/fa/css/all.css'

Vue.use(VueDragDrop);


Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

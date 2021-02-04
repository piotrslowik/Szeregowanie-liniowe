import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import store from './store';
import './vee-validate';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import VuetifyConfirm from 'vuetify-confirm';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.use(VuetifyConfirm, { vuetify });

Vue.config.productionTip = false;

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app');

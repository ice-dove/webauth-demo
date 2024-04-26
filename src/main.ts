import '@unocss/reset/tailwind.css';
import 'ant-design-vue/dist/reset.css';
import 'uno.css';

import setIcon from '@/components/Icons';
import '@/style.less';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';

const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives,
});

setIcon(app);
app.use(vuetify);
app.use(router).mount('#app');


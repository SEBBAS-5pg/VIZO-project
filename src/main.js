import { createApp } from 'vue'
import App from './App.vue'
import VueMasonry from 'vue-masonry-css'

const app = createApp(App)
app.use(VueMasonry)
app.mount('#app')
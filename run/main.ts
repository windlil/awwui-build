import {createApp} from 'vue'
import App from './app.vue'
import awwui from '@awwui/components'


const app = createApp(App)
app.use(awwui)

app.mount('#app')

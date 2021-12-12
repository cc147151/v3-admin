import { createI18n } from 'vue-i18n'
import zhLang from './lang/zh'
import enLang from './lang/en'
import store from '../store'
const messages = {
  en: {
    message: {
      hello: 'hello world',
      ...enLang
    }
  },
  zh: {
    message: {
      hello: '你好世界',
      ...zhLang
    }
  }
}
const i18n = createI18n({
  // something vue-i18n options here ...
  locale: store.getters.language, // set locale
  fallbackLocale: 'zh', // set fallback locale
  messages // set locale messages
})
export default i18n

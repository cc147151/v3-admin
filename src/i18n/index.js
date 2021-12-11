import { createI18n } from 'vue-i18n'
const messages = {
  en: {
    message: {
      hello: 'hello world'
    }
  },
  zh: {
    message: {
      hello: '你好世界'
    }
  }
}
const i18n = createI18n({
  // something vue-i18n options here ...
  locale: 'zh', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages // set locale messages
})
export default i18n

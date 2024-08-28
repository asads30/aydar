import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    phone: null,
    token: null,
    news: null
  },
  getters: {
    getUser(state){
      return state.user
    },
    getPhone(state){
      return state.phone
    },
    getToken(state){
      return state.token
    },
    getNews(state){
      return state.news
    }
  },
  mutations: {
    setUser(state, user){
      state.user = user
    },
    setPhone(state, phone){
      state.phone = phone
    },
    setToken(state, token){
      state.token = token
    },
    setNews(state, news){
      state.news = news
    }
  }
})

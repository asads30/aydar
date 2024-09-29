<template>
  <div class="home page">
    <div class="loading" v-if="loading == true">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <template v-else>
      <div class="main">
        <div class="not" v-if="getUser?.isLicense === 0">
          <div class="not-icon">
            <img src="@/assets/not.png" alt="">
          </div>
          <router-link to="/add" class="not-btn">Оформить разрешение</router-link>
        </div>
        <div class="active" v-else>
          <div class="active-card">
            <div class="active-qr">
              <img src="@/assets/qr.png" alt="">
            </div>
            <div class="active-text">
              <div class="active-title">№{{ getList[0]?.licenseId }}</div>
              <div class="active-des"><strong>{{ getList[0]?.type?.name_ru }}</strong></div>
              <div class="active-des">{{ getList[0]?.startDate }} - {{ getList[0]?.endDate }}</div>
            </div>
          </div>
          <button class="active-btn" @click="hunterSend(getList[0]?.licenseId)" v-if="getList[0]?.status?.id == 1 || getList[0]?.status?.id == 5">Подробнее</button>
          <button class="active-btn" @click="hunterSend(getList[0]?.licenseId)" v-if="getList[0]?.status?.id == 4">Сдать отчет</button>
        </div>
      </div>
      <Menu />
    </template>
  </div>
</template>

<script>
import axiosIns from '@/utils/axios';
import axios from 'axios';
import Menu from '@/components/Menu.vue'
import {mapGetters} from 'vuex';

export default {
  name: 'HomeView',
  data() {
    return {
      active: 0,
      list: [],
      loading: false
    }
  },
  components: {
    Menu
  },
  computed: {
    ...mapGetters([
      "getUser"
    ]),
    getList(){
      return this.list?.slice().reverse();
    },
  },
  mounted() {
    this.loading = true
    let tg = window?.Telegram?.WebApp;
    let token = localStorage.getItem('auth_token') ? localStorage.getItem('auth_token') : this.getToken
    let user = tg?.initDataUnsafe;
    tg?.BackButton?.hide();
    tg?.expand();
    axios.post('https://webapp.2bit.uz/api/v1/getMe', {
      user_id: user?.user?.id
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      if(res.status == 200){
        localStorage.setItem('auth_token', res?.data?.token)
        this.$store.commit('setToken', res?.data?.token)
        if(res.data.customer.name){
          this.$store.commit('setUser', res.data.customer)
          this.getLicenses()
          this.loading = false
        } else{
          this.$router.push('/verify')
        }
      }
    }).catch(err => {
      if(err.response.status === 401){
        this.$router.push('/login')
        localStorage.clear()
      }
    })
  },
  methods: {
    getLicenses(){
      let token = localStorage.getItem('auth_token') ? localStorage.getItem('auth_token') : this.getToken
      axios.get('/api/licenses/get', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        if(res.status == 200){
          if(res.data.data.length > 0){
            res.data.data.forEach(item => {
              this.list.push(item)
            });
          }
        }
      })
    },
    hunterSend(id){
      this.$router.push({name: 'hunterSend', params: {id: id}})

    }
  },
}
</script>

<style lang="scss">
  .not{
    &-icon{
      margin-bottom: 10px;
      img{
        width: 100%;
      }
    }
    &-btn{
      background: #2ecc71;
      height: 50px;
      line-height: 50px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      width: 100%;
      border: 0;
      margin-bottom: 10px;
      text-decoration: none;
    }
  }
  .active{
    &-card{
      margin-bottom: 10px;
      background: #fff;
      box-shadow: 0 0 5px rgba(0,0,0,0.05);
      padding: 10px;
      display: flex;
      align-items: center;
      gap: 10px;
      border-radius: 5px;
    }
    &-qr{
      width: 80px;
      img{
        width: 80px;
      }
    }
    &-des{
      font-size: 14px;
    }
    &-btn{
      background: #e67e22;
      height: 50px;
      line-height: 50px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      width: 100%;
      border: 0;
      margin-bottom: 10px;
      text-decoration: none;
    }
  }
</style>
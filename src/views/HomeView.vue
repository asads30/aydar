<template>
  <div class="home page">
    <div class="main">
      <div class="not" v-if="active == 0">
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
            <div class="active-title">№0000001</div>
            <div class="active-des"><strong>Рыбалка</strong></div>
            <div class="active-des">01.09.2024 - 03.09.2024</div>
          </div>
        </div>
        <router-link to="/send" class="active-btn">Сдать отчет</router-link>
      </div>
    </div>
    <Menu />
  </div>
</template>

<script>
import Menu from '@/components/Menu.vue'
import axios from 'axios'

export default {
  name: 'HomeView',
  data() {
    return {
      active: 0
    }
  },
  components: {
    Menu
  },
  mounted() {
    let tg = window?.Telegram?.WebApp;
    let user = tg?.initDataUnsafe;
    tg?.BackButton?.hide();
    tg?.expand();
    let data = {
      "user_id": user?.user?.id ? user?.user?.id : 386567097,
      "first_name": user?.user?.first_name ? user?.user?.first_name : "Asadbek",
      "last_name": user?.user?.last_name ? user?.user?.last_name : "Ibragimov",
      "username": user?.user?.username ? user?.user?.username : "@wpbrouz",
      "language_code": user?.user?.language_code ? user?.user?.language_code : "ru"
    }
    axios.post('https://webapp.2bit.uz/api/v1/getMe', data).then(res => {
      if(res.status == 200){
        this.$store.commit('setUser', res.data.data)
      }
    })
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
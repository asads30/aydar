<template>
  <div class="home page">
    <div class="main">
      <div class="not">
        <img src="@/assets/not.png" alt="">
      </div>
      <router-link to="/add" class="add">Оформить разрешение</router-link>
    </div>
    <Menu />
  </div>
</template>

<script>
import Menu from '@/components/Menu.vue'

export default {
  name: 'HomeView',
  components: {
    Menu
  },
  mounted() {
    let tg = window?.Telegram?.WebApp;
    tg?.BackButton?.hide();
    tg?.expand();
  },
}
</script>

<style lang="scss">
  .not{
    margin-bottom: 10px;
    img{
      max-width: 100%;
    }
  }
  .add{
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
</style>
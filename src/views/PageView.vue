<template>
    <div class="home page">
      <div class="main"></div>
      <Menu />
    </div>
  </template>
  
  <script>
  import Menu from '@/components/Menu.vue'
  
  export default {
    name: 'PageView',
    components: {
      Menu
    }
  }
  </script>
<template>
  <router-view/>
  <notifications position="top right" />
</template>

<style lang="scss">
  #app {
    font-family: "Rubik", sans-serif;
    background: #f9f9f9;
  }
  .vue-notification-group{
    top: 5px !important;
    right: 5px !important;
  }
</style>

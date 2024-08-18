<template>
    <div class="add page">
      <div class="main hide-menu">
        <div class="add-title">Что вы хотите?</div>
        <div class="add-list">
            <router-link to="/hunter/verify" class="add-item">
                <div class="add-item-img">
                    <img src="@/assets/type/02.png" alt="">
                </div>
                <div class="add-item-title">Охотиться</div>
            </router-link>
            <router-link to="/fishing/verify" class="add-item">
                <div class="add-item-img">
                    <img src="@/assets/type/01.png" alt="">
                </div>
                <div class="add-item-title">Рыбачить</div>
            </router-link>
        </div>
      </div>
    </div>
  </template>
  
<script>  
  export default {
    name: 'AddView'
  }
</script>
  
<style lang="scss">
    .add{
        &-title{
            text-align: center;
            font-size: 20px;
            font-weight: 700;
            color: #000;
            margin-bottom: 20px;
        }
        &-list{
            height: calc(100vh - 90px);
            display: flex;
            flex-direction: column;
            gap: 20px;
            overflow-x: hidden;
            overflow-y: auto;
        }
        &-item{
            height: calc(50% - 10px);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            position: relative;
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 0 5px rgba(0,0,0,0.2);
            padding: 50px 0 0 0;
            text-decoration: none;
            &-img{
                text-align: center;
                img{
                    max-width: calc(100% - 100px);
                }
            }
            &-title{
                width: 100%;
                height: 50px;
                line-height: 50px;
                text-align: center;
                background: #3498db;
                color: #fff;
                border-bottom-left-radius: 10px;
                border-bottom-right-radius: 10px;
            }
        }
    }
</style>
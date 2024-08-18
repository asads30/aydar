<template>
    <div class="code page">
      <div class="main hide-menu">
        <div class="code-box">
            <div class="code-top">
                <div class="code-title">Код подтверждения</div>
                <div class="profile-item">
                    <div class="profile-item-title">Код</div>
                    <input :value="code" v-imask="codemask" inputmode="number">
                </div>
            </div>
            <div class="code-bottom">
                <button class="code-btn">Подтвердить</button>
            </div>
        </div>
      </div>
    </div>
  </template>
  
<script>  
    import { IMaskDirective } from 'vue-imask';
    
    export default {
        name: 'HunterCodeView',
        data() {
            return {
                code: '',
                codemask: {
                    mask: '0000',
                    lazy: false
                }
            }
        },
        directives: {
            imask: IMaskDirective
        },
    }
</script>
  
<style lang="scss">
    .code{
        &-title{
            text-align: center;
            font-size: 20px;
            font-weight: 700;
            color: #000;
            margin-bottom: 20px;
        }
        &-box{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
        }
        &-btn{
            width: 100%;
            background: #2ecc71;
            height: 50px;
            line-height: 50px;
            border: 0;
            border-radius: 5px;
            color: #fff;
        }
    }
</style>
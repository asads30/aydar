<template>
    <div class="verify page">
      <div class="main hide-menu">
        <div class="verify-box">
            <div class="verify-top">
                <div class="verify-title">Пройти верификацию охотника</div>
                <div class="verify-list">
                    <div class="profile-item">
                        <div class="profile-item-title">Имя</div>
                        <input type="text" placeholder="Имя" v-model="name">
                    </div>
                    <div class="profile-item">
                        <div class="profile-item-title">Фамилия</div>
                        <input type="text" placeholder="Фамилия" v-model="surname">
                    </div>
                    <div class="profile-item">
                        <div class="profile-item-title">Отчество</div>
                        <input type="text" placeholder="Отчество" v-model="fathername">
                    </div>
                    <div class="profile-item">
                        <div class="profile-item-title">Номер телефона</div>
                        <input :value="phone" v-imask="phonemask" inputmode="tel">
                    </div>
                    <div class="profile-item">
                        <div class="profile-item-title">Разрешение на оружие</div>
                        <input type="text" placeholder="KA 000 000 00" v-model="weaponsPermits">
                    </div>
                </div>
            </div>
            <div class="verify-bottom">
                <button class="verify-btn" @click="verify">Отправить</button>
            </div>
        </div>
      </div>
    </div>
  </template>
  
<script>  
    import { IMaskDirective } from 'vue-imask';
    
    export default {
        name: 'HunterVerifyView',
        data() {
            return {
                name: '',
                surname: '',
                fathername: '',
                phone: '',
                phonemask: {
                    mask: '{998} 00 000 00 00',
                    lazy: false
                },
                weaponsPermits: ''
            }
        },
        directives: {
            imask: IMaskDirective
        },
        methods: {
            verify(){
                this.$router.push('/hunter/code')
            }
        },
    }
</script>
  
<style lang="scss">
    .verify{
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
<template>
    <div class="verify page">
      <div class="main hide-menu">
        <div class="verify-box">
            <div class="verify-top">
                <div class="verify-title">Верификация аккаунта</div>
                <div class="verify-list">
                    <div class="profile-item">
                        <div class="profile-item-title">ФИО</div>
                        <input type="text" placeholder="Имя" v-model="name" inputmode="text">
                        <input type="text" placeholder="Фамилия" v-model="surname" inputmode="text">
                    </div>
                    <div class="profile-item">
                        <div class="profile-item-title">Разрешение на охоту</div>
                        <input type="text" placeholder="AB 000 00" v-model="huntingPermit" inputmode="text">
                    </div>
                    <div class="profile-item">
                        <div class="profile-item-title">Разрешение на оружие</div>
                        <input type="text" placeholder="KA 000 000" v-model="weaponPermit" inputmode="text">
                    </div>
                </div>
            </div>
            <div class="verify-bottom">
                <button class="verify-btn" @click="verify" :disabled="loading">
                    <template v-if="loading">
                        <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                        <span role="status"> Загрузка...</span>
                    </template>
                    <template v-else>Продолжить</template>
                </button>
            </div>
        </div>
      </div>
    </div>
  </template>
  
<script>  
    import axios from 'axios'
    import {mapGetters} from 'vuex';

    export default {
        name: 'VerifyView',
        data() {
            return {
                loading: false,
                name: '',
                surname: '',
                huntingPermit: '',
                weaponPermit: '',
                user_id: null,
                username: null,
                lang: null
            }
        },
        computed: {
            ...mapGetters([
                "getToken",
            ])
        },
        mounted() {
            let tg = window?.Telegram?.WebApp;
            let user = tg?.initDataUnsafe;
            this.user_id = user?.user?.id
            this.username = user?.user?.username
            this.lang = user?.user?.language_code
        },
        methods: {
            verify(){
                let token = localStorage.getItem('auth_token') ? localStorage.getItem('auth_token') : this.getToken
                this.loading = true
                let data = {
                    name: this.name,
                    surname: this.surname,
                    hunting_permit: this.huntingPermit,
                    weapon_permit: this.weaponPermit,
                    user_id: this.user_id ? this.user_id : 123456,
                    username: this.username ? this.username : '@wpbrouz',
                    lang: this.lang ? this.lang : 'ru'
                }
                axios.post('https://webapp.2bit.uz/api/v1/customer/update', data, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => {
                    if(res.status == 200){
                        this.loading = false
                        this.$store.commit('setUser', res?.data?.customer)
                        this.$router.push('/')
                    }
                }).catch(err => {
                    if(err){
                        this.loading = false
                    }
                })
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
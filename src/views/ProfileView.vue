<template>
    <div class="profile page">
      <div class="main">
        <div class="profile-box">
            <div class="profile-top">
                <div class="profile-title">Мой профиль</div>
                <div class="profile-item">
                    <div class="profile-item-title">ФИО</div>
                    <input type="text" placeholder="Имя" v-model="name" inputmode="text">
                    <input type="text" placeholder="Фамилия" v-model="surname" inputmode="text">
                </div>
                <div class="profile-item">
                    <div class="profile-item-title">Username</div>
                    <input type="text" placeholder="@username" v-model="username" inputmode="text">
                </div>
                <div class="profile-item">
                    <div class="profile-item-title">Номер телефона</div>
                    <input :value="phone" v-imask="mask" inputmode="tel">
                </div>
                <div class="profile-item">
                    <div class="profile-item-title">Разрешение на оружие</div>
                    <input type="text" placeholder="KA 000 000 00" v-model="weaponsPermits" inputmode="text">
                </div>
            </div>
            <div class="profile-bottom">
                <button class="profile-btn">Сохранить</button>
            </div>
        </div>
      </div>
      <Menu />
    </div>
  </template>
  
<script>
import Menu from '@/components/Menu.vue'
import {mapGetters} from 'vuex';
import axios from 'axios'
import { IMaskDirective } from 'vue-imask';

export default {
    name: 'ProfileView',
    data() {
        return {
            name: '',
            surname: '',
            username: '',
            phone: '',
            weaponsPermits: '',
            value: '',
            mask: {
                mask: '{998} 00 000 00 00',
                lazy: false
            },
        }
    },
    components: {
      Menu,
    },
    directives: {
      imask: IMaskDirective
    },
    computed: {
        ...mapGetters([
            "getUser"
        ])
    },
    mounted() {
        if(this.getUser){
            this.name = this.getUser.name,
            this.surname = this.getUser.surname,
            this.username = this.getUser.userName,
            this.phone = this.getUser.phoneNumber
        } else{
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
                    this.name = this.getUser.name,
                    this.surname = this.getUser.surname,
                    this.username = this.getUser.userName,
                    this.phone = this.getUser.phoneNumber
                }
            })
        }
    },
    methods: {
        onAccept (e) {
            const maskRef = e.detail;
            this.value = maskRef.value;
            console.log('accept', maskRef.value);
        },
        onComplete (e) {
            const maskRef = e.detail;
            console.log('complete', maskRef.unmaskedValue);
        },
    },
}
</script>

  <style lang="scss">
    .profile{
        &-title{
            font-size: 20px;
            margin-bottom: 20px;
            font-weight: 700;
        }
        &-box{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
            gap: 20px;
        }
        &-item{
            margin-bottom: 15px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            input{
                width: 100%;
                height: 45px;
                border: 1px solid #ccc;
                border-radius: 5px;
                padding: 0 12px;
                transition: 0.25s;
                color: #000;
                &:focus{
                    border: 1px solid #3498db;
                    outline: 0;
                    transition: 0.25s;
                }
            }
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
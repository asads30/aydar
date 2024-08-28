<template>
    <div class="profile page">
      <div class="main">
        <div class="profile-box">
            <div class="profile-top">
                <div class="profile-top-box">
                    <div class="profile-title">Мой профиль</div>
                    <div class="profile-top-right">
                        <div class="profile-verify" v-if="getUser?.status == 1"><i class="fa-regular fa-circle-check"></i> Верифицирован</div>
                        <div class="profile-verify not" v-else><i class="fa-regular fa-circle-check"></i> Не верифицирован</div>
                    </div>
                </div>
                <div class="profile-list">
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
                        <input :value="phone" v-imask="mask" inputmode="tel" readonly disabled />
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
            <div class="profile-bottom">
                <button class="verify-btn" @click="saveUser" :disabled="loading">
                    <template v-if="loading">
                        <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                        <span role="status"> Загрузка...</span>
                    </template>
                    <template v-else>Сохранить</template>
                </button>
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
            loading: false,
            name: '',
            surname: '',
            username: '',
            phone: '',
            huntingPermit: '',
            weaponPermit: '',
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
            "getUser",
            "getToken"
        ])
    },
    mounted() {
        if(this.getUser){
            this.name = this.getUser.name,
            this.surname = this.getUser.surname,
            this.username = this.getUser.userName,
            this.phone = this.getUser.phoneNumber
            this.huntingPermit = this.getUser.huntingPermit
            this.weaponPermit = this.getUser.weaponPermit
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
            axios.post('/api/getMe', data).then(res => {
                if(res.status == 200){
                    this.$store.commit('setUser', res.data.customer)
                    this.$store.commit('setToken', res.data.token)
                    this.name = res.data.customer.name,
                    this.surname = res.data.customer.surname,
                    this.username = res.data.customer.userName,
                    this.phone = res.data.customer.phoneNumber
                    this.huntingPermit = res.data.customer.huntingPermit
                    this.weaponPermit = res.data.customer.weaponPermit
                }
            })
        }
    },
    methods: {
        saveUser(){
            this.loading = true
            const data = {
                name: this.name,
                surname: this.surname,
                hunting_permit: this.huntingPermit,
                weapon_permit: this.weaponPermit
            }
            axios.post('https://webapp.2bit.uz/api/v1/customer/update', data, {
                headers: {
                    Authorization: `Bearer ${this.getToken}`
                }
            }).then(res => {
                if(res.status == 200){
                    this.loading = false
                    this.$notify("Данные успешно сохранены!");
                }
            })
        },
    },
}
</script>

  <style lang="scss">
    .profile{
        &-list{
            height: calc(100vh - 226px);
            overflow-y: auto;
            overflow-x: hidden;
        }
        &-top{
            &-box{
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
            }
        }
        &-verify{
            color: #fff;
            background: #2ecc71;
            height: 25px;
            line-height: 25px;
            padding: 0 10px;
            display: flex;
            align-items: center;
            gap: 5px;
            border-radius: 10px;
            font-size: 14px;
        }
        &-verify.not{
            background: #e74c3c;
        }
        &-title{
            font-size: 20px;
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
            &:last-child{
                margin-bottom: 0;
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
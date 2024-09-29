<template>
    <div class="perms page">
      <div class="main">
        <div class="perms-box">
            <ul class="nav nav-tabs nav-pills nav-fill perms-tabs" id="permissionsTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="perm1-tab" data-bs-toggle="tab" data-bs-target="#perm1-tab-pane" type="button" role="tab" aria-controls="perm1-tab-pane" aria-selected="true">Охота</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="perm2-tab" data-bs-toggle="tab" data-bs-target="#perm2-tab-pane" type="button" role="tab" aria-controls="perm2-tab-pane" aria-selected="false">Рабылка</button>
                </li>
            </ul>
            <div class="tab-content perms-content" id="permissionsTabContent">
                <div class="tab-pane fade show active" id="perm1-tab-pane" role="tabpanel" aria-labelledby="perm1-tab" tabindex="0">
                    <div class="perms-list" v-if="getHunters?.length > 0">
                        <router-link :to="'/hunter/send/' + item?.licenseId" class="perms-item" v-for="item in getHunters" :key="item?.licenseId">
                            <div class="perms-item-qr">
                                <img src="@/assets/qr.png" alt="">
                            </div>
                            <div class="perms-item-text">
                                <div class="perms-item-top">
                                    <div class="perms-item-title">№{{ item?.licenseId }}</div>
                                    <div :class="'perms-item-status perms-item-status-' + item?.status?.id">{{ item?.status?.name_ru }}</div>
                                </div>
                                <div class="perms-item-des">{{ item.startDate }} - {{ item.endDate }}</div>
                            </div>
                        </router-link>
                    </div>
                    <div class="text-center" v-else>
                        <p>Разрешений не найдено</p>
                    </div>
                </div>
                <div class="tab-pane fade" id="perm2-tab-pane" role="tabpanel" aria-labelledby="perm2-tab" tabindex="0">
                    <div class="perms-list" v-if="getFishing?.length > 0">
                        <router-link :to="'/hunter/send/' + item?.licenseId" class="perms-item" v-for="item in getFishing" :key="item?.licenseId">
                            <div class="perms-item-qr">
                                <img src="@/assets/qr.png" alt="">
                            </div>
                            <div class="perms-item-text">
                                <div class="perms-item-top">
                                    <div class="perms-item-title">№{{ item?.licenseId }}</div>
                                    <div class="perms-item-status active">{{ item?.status?.name_ru }}</div>
                                </div>
                                <div class="perms-item-des">{{ item.startDate }} - {{ item.endDate }}</div>
                            </div>
                        </router-link>
                    </div>
                    <div class="text-center" v-else>
                        <p>Разрешений не найдено</p>
                    </div>
                </div>
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

export default {
    name: 'PermissionsView',
    data() {
        return {
            list: null
        }
    },
    computed: {
        ...mapGetters([
            "getToken",
            "getUser"
        ]),
        getHunters(){
            let result = this.list?.filter(item => item.type.id === 1);
            return result?.slice().reverse();
        },
        getFishing(){
            let result = this.list?.filter(item => item.type.id === 2);
            return result?.slice().reverse();
        }
    },
    components: {
        Menu
    },
    mounted() {
        if(!this.getUser){
            let tg = window?.Telegram?.WebApp;
            let token = localStorage.getItem('auth_token') ? localStorage.getItem('auth_token') : this.getToken
            let user = tg?.initDataUnsafe;
            tg?.BackButton?.hide();
            tg?.expand();
            axios.post('https://webapp.2bit.uz/api/v1/getMe', {
                user_id: user?.user?.id
            }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            }).then(res => {
                if(res.status == 200){
                    localStorage.setItem('auth_token', res?.data?.token)
                    this.$store.commit('setToken', res?.data?.token)
                    if(res.data.customer.name){
                    this.$store.commit('setUser', res.data.customer)
                    this.getLicenses()
                    this.loading = false
                    } else{
                    this.$router.push('/verify')
                    }
                }
            }).catch(err => {
                if(err.response.status === 401){
                    this.$router.push('/login')
                    localStorage.clear()
                }
            })
        }
        this.getLicenses()
    },
    methods: {
        getLicenses(){
            let token = localStorage.getItem('auth_token') ? localStorage.getItem('auth_token') : this.getToken
            axios.get('/api/licenses/get', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                if(res.status == 200){
                    this.list = res.data.data
                }
            })
        }
    },
}
</script>

<style lang="scss">
    .perms{
        &-tabs{
            border: 1px solid #EAE9EE;
            border-radius: 5px;
            background: #fff;
            .nav-link{
                color: #000;
                margin: 0;
                border: 0;
                &:hover{
                    border: 0;
                    margin: 0;
                }
            }
            .nav-link.active{
                background: #3498db;
            }
        }
        &-box{
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        &-content{
            height: calc(100vh - 168px);
            overflow-y: auto;
            overflow-x: hidden;
        }
        &-list{
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        &-item{
            display: flex;
            gap: 10px;
            background: #fff;
            box-shadow: 0 0 5px rgba(0,0,0,0.05);
            padding: 10px;
            border-radius: 5px;
            align-items: center;
            color: #000;
            text-decoration: none;
            &-qr{
                width: 50px;
                img{
                    width: 50px;
                }
            }
            &-des{
                font-size: 14px;
            }
            &-text{
                width: calc(100% - 60px);
            }
            &-top{
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
            }
            &-status{
                background: #2ecc71;
                color: #fff;
                font-size: 12px;
                height: 20px;
                padding: 0 5px;
                border-radius: 5px;
                line-height: 20px;
            }
            &-status{
                background: #2f3542;
                color: #fff;
                font-size: 12px;
                height: 20px;
                padding: 0 5px;
                border-radius: 5px;
                line-height: 20px;
            }
            &-status-1{
                background: #2ecc71;
            }
            &-status-2{
                background: #b33939;
            }
            &-status-3{
                background: #ffa502;
            }
        }
    }
</style>
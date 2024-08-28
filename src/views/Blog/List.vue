<template>
    <div class="blog page">
      <div class="main">
        <div class="blog-list">
            <router-link to="/blog/01" class="blog-item" v-for="item in list" :key="item.id">
                <div class="blog-img">
                    <img :src="'https://webapp.2bit.uz/storage/' + item.image" alt="">
                </div>
                <div class="blog-text">
                    <div class="blog-date">{{ item.date }}</div>
                    <div class="blog-name">{{ item.name_ru }}</div>
                    <div class="blog-des" v-html="item.contentRu"></div>
                </div>
            </router-link>
        </div>
      </div>
      <Menu />
    </div>
  </template>
  
  <script>
  import Menu from '@/components/Menu.vue'
  import axios from 'axios'
  import {mapGetters} from 'vuex'

  export default {
    name: 'BlogList',
    data() {
        return {
            list: null
        }
    },
    components: {
      Menu
    },
    computed: {
        ...mapGetters([
            "getToken"
        ])
    },
    mounted() {
        let tg = window?.Telegram?.WebApp;
        let user = tg?.initDataUnsafe;
        tg?.BackButton?.hide();
        if(this.getToken){
            axios.get('/api/news', {
                headers: {
                    Authorization: `Bearer ${this.getToken}`
                }
            }).then(res => {
                if(res.status == 200){
                    this.$store.commit('setNews', res.data.data)
                    this.list = res.data.data
                }
            }).catch(err => {
                console.log(err)
            })
        } else{
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
                    if(res.data.customer.status == 0){
                        this.$router.push('/verify')
                    }
                    axios.get('/api/news', {
                        headers: {
                            Authorization: `Bearer ${res.data.token}`
                        }
                    }).then(response => {
                        if(response.status == 200){
                            this.$store.commit('setNews', response.data.data)
                            this.list = response.data.data
                        }
                    }).catch(error => {
                        console.log(error)
                    })
                }
            })
        }
    },
  }
  </script>

  <style lang="scss">
    .blog{
        &-list{
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        &-item{
            position: relative;
            overflow: hidden;
            border-radius: 5px;
            text-decoration: none;
            &::before{
                content: '';
                width: 100%;
                height: 100%;
                border-radius: 5px;
                background: rgba(0,0,0,0.6);
                position: absolute;
                left: 0;
                top: 0;
                z-index: 1;
            }
        }
        &-img{
            position: absolute;
            z-index: 0;
            border-radius: 5px;
            img{
                width: 100%;
                border-radius: 5px;
            }
        }
        &-text{
            color: #fff;
            position: relative;
            padding: 120px 20px 15px;
            z-index: 5;
        }
        &-name{
            font-size: 16px;
            font-weight: 700;
            margin-bottom: 5px;
        }
        &-des{
            font-size: 14px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        &-date{
            font-size: 12px;
            font-weight: 300;
        }
    }
  </style>
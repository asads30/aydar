<template>
    <div class="verify page">
      <div class="main hide-menu">
        <div class="verify-box">
            <div class="verify-top">
                <div class="verify-title">Регистрация</div>
                <div class="verify-list">
                    <div class="profile-item">
                        <div class="profile-item-title">Номер телефона</div>
                        <input v-model="phone" v-imask="phonemask" inputmode="tel">
                    </div>
                </div>
            </div>
            <div class="verify-bottom">
                <button class="verify-btn" @click="verify" :disabled="loading">
                    <template v-if="loading">
                        <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                        <span role="status"> Регистрирую...</span>
                    </template>
                    <template v-else>Зарегистрироваться</template>
                </button>
            </div>
        </div>
      </div>
    </div>
  </template>
  
<script>  
    import { IMaskDirective } from 'vue-imask';
    import axios from 'axios'
    import {mapGetters} from 'vuex';

    export default {
        name: 'VerifyView',
        data() {
            return {
                loading: false,
                name: '',
                surname: '',
                phone: '',
                phonemask: {
                    mask: '{998} 00 000 00 00',
                    lazy: true
                }
            }
        },
        computed: {
            ...mapGetters([
                "getUser",
                "getToken"
            ])
        },
        directives: {
            imask: IMaskDirective
        },
        methods: {
            verify(){
                this.loading = true
                let data = {
                    user_id: this.getUser.userId,
                    phone_number: this.phone.replace(/\s/g, '')
                }
                axios.post('https://webapp.2bit.uz/api/v1/verify/send', data, {
                    headers: {
                        Authorization: `Bearer ${this.getToken}`
                    }
                }).then(res => {
                    if(res.status == 200){
                        this.$store.commit('setPhone', this.phone.replace(/\s/g, ''))
                        this.loading = false
                        this.$router.push('/verify/code')
                    }
                }).catch(err => {
                    this.loading = false
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
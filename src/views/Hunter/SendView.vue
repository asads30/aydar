<template>
    <div class="send page">
        <div class="main hide-menu">
            <div class="send-box">
                <div class="send-top">
                    <div class="send-title">
                        <div class="send-id">#{{ id }}</div>
                        <div :class="'send-status send-status-' + item?.status?.id">{{ item?.status?.name_ru }}</div>
                    </div>
                    <div class="send-info">
                        <div class="send-date">Срок лицензии: <strong>{{ item?.startDate }} - {{ item?.endDate }}</strong></div>
                        <div class="send-infobox">
                            <div class="send-text">
                                <div class="send-label send-label-name">{{ item?.customer?.name }} {{ item?.customer?.surname }}</div>
                                <div class="send-label">Охотничий билет: <strong>{{ item?.customer?.hunting_permit }}</strong></div>
                                <div class="send-label">Разрешение на оружие: <strong>{{ item?.customer?.weapon_permit }}</strong></div>
                                <div class="send-label">{{ item?.region?.name_ru }}, {{ item?.district?.name_ru }}</div>
                            </div>
                            <div class="send-qr">
                                <qrcode-vue
                                    :value="url"
                                    :size="100"
                                    :level="'S'"
                                />
                                <button class="send-qr-btn" @click="generatePdf">Скачать</button>
                            </div>
                        </div>
                        <div class="send-summ">Сумма заказа: <strong>{{ formatPrice(item?.sum) }} сум</strong></div>
                        <div class="send-animals">
                            <div class="send-animals-top">
                                <div class="send-animals-title">Название</div>
                                <div class="send-animals-title2">Куплено</div>
                                <div class="send-animals-title2">Добыто</div>
                            </div>
                            <div class="send-animal" v-for="(animal, index) in animals" :key="animal.animalId">
                                <div class="send-animal-name">{{ animal?.animal?.name_ru }}</div>
                                <div class="send-animal-value">{{ animal?.count }}</div>
                                <div class="send-animal-value2">
                                    <input inputmode="numeric" v-model="animals[index].value" :max="animal?.count" :disabled="item?.status?.id == 2 || item?.status?.id == 3 || item?.status?.id == 5" v-if="item?.status?.id == 1 || item?.status?.id == 4">
                                    <span v-else>{{ animal?.countAfter }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="send-bottom" v-if="item?.status?.id == 1 || item?.status?.id == 4">
                    <button class="send-btn" @click="closeOrder">Отправить отчет</button>
                </div>
            </div>
        </div>
    </div>
  </template>
  
<script>  
import {mapGetters} from 'vuex';
import axios from 'axios'
import QrcodeVue from 'qrcode.vue';

export default {
    name: 'SendOrderView',
    data() {
        return {
            item: null,
            url: 'https://www.google.com/',
            animals: []
        }
    },
    components: {
        QrcodeVue
    },
    mounted() {
        window.Telegram.WebApp.BackButton.show();
        window.Telegram.WebApp.onEvent('backButtonClicked', this.goHome);
        this.getLicenseById();
    },
    computed: {
        id(){
            return this.$route.params.id
        },
        ...mapGetters([
            "getToken"
        ]),
    },
    methods: {
        goHome(){
            this.$router.push('/')
        },
        getLicenseById(){
            let token = localStorage.getItem('auth_token') ? localStorage.getItem('auth_token') : this.getToken
            axios.get(`/api/licenses/get?license_id=${this.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                if(res.status == 200){
                    this.item = res.data.data
                    this.animals = res.data.data.animals
                }
            })
        },
        formatPrice(number) {
            const [integerPart, fractionalPart] = Number(number).toFixed(2).split('.');
            const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            return fractionalPart ? `${formattedIntegerPart}` : formattedIntegerPart;
        },
        closeOrder(){
            let list = [];
            this.animals.forEach(animal => {
                if(animal.value){
                    let item = {
                        id: animal.animalId,
                        count_after: animal.value
                    }
                    list.push(item)
                }
            });
            let data = {
                license_id: this.id,
                animals: list
            }
            let token = localStorage.getItem('auth_token') ? localStorage.getItem('auth_token') : this.getToken
            axios.post('/api/licenses/close', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                if(res.status == 200){
                    this.$notify(res.data.message);
                    this.$router.push('/')
                }
            })
        },
        generatePdf(){
            let token = localStorage.getItem('auth_token') ? localStorage.getItem('auth_token') : this.getToken
            axios.get(`/api/licenses/pdf?number=${this.item.UUID}&send=true`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                if(res){
                    this.$notify('PDF успешно скачан, закройте приложение и перейдите в бот');
                }
            })
        }
    },
}
</script>
  
<style lang="scss">
    .send{
        &-title{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
        }
        &-id{
            font-size: 20px;
            font-weight: 900;
        }
        &-status{
            height: 30px;
            line-height: 30px;
            padding: 0 8px;
            border-radius: 5px;
            color: #fff;
            font-size: 14px;
            background: #2f3542;
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
        &-date{
            font-size: 16px;
            margin-bottom: 10px;
        }
        &-infobox{
            display: flex;
            gap: 10px;
            justify-content: space-between;
        }
        &-text{
            width: calc(100% - 110px);
            margin-bottom: 20px;
        }
        &-label{
            font-size: 14px;
            margin-bottom: 2.5px;
        }
        &-label:last-child{
            margin-bottom: 0;
        }
        &-label-name{
            font-size: 16px;
            margin-bottom: 10px;
            font-weight: 500;
        }
        &-summ{
            font-size: 18px;
            margin-bottom: 20px;
        }
        &-info{
            margin-bottom: 30px;
        }
        &-box{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: calc(100vh - 40px)
        }
        &-btn{
            width: 100%;
            height: 50px;
            line-height: 50px;
            border: 0;
            background: #2ecc71;
            color: #fff;
            border-radius: 5px;
            font-size: 16px;
            font-weight: 600;
        }
        &-animals{
            margin-bottom: 20px;
            border: 1px solid #dfe4ea;
            &-top{
                display: flex;
                background: #747d8c;
                color: #fff;
                padding: 10px;
            }
            &-title{
                width: 50%;
            }
            &-title2{
                width: 25%;
                text-align: center;
            }
        }
        &-animal{
            display: flex;
            align-items: center;
            padding: 10px;
            &-name{
                width: 50%;
                font-size: 14px;
                font-weight: 500;
            }
            &-value{
                width: 25%;
                font-size: 14px;
                font-weight: 600;
                text-align: center;
            }
            &-value2{
                width: 25%;
                padding: 0 5px;
                font-size: 14px;
                font-weight: 500;
                text-align: center;
                input{
                    background: #a4b0be;
                    width: 100%;
                    border: 0;
                    margin: 0;
                    padding: 0;
                    height: 30px;
                    color: #fff;
                    text-align: center;
                    border-radius: 5px;
                    &:focus{
                        outline: 0;
                        font-size: 14px;
                    }
                    &:disabled{
                        
                    }
                }
            }
        }
        &-qr{
            text-align: center;
            &-btn{
                font-size: 14px;
                background: #2ecc71;
                border: 0;
                color: #fff;
                font-weight: 500;
                padding: 5px 10px;
                border-radius: 5px;
                text-decoration: none;
            }
        }
    }
</style>
<template>
    <div class="order page">
      <div class="main hide-menu">
        <div class="order-box">
            <div class="order-top">
                <div class="order-title">Оформить разрешение</div>
                <div class="profile-item" v-if="regions">
                    <div class="profile-item-title">Регион добычи</div>
                    <select class="form-select" v-model="region">
                        <option v-for="region in regions" :key="region.id" :value="region.id">{{ region.name_ru }}</option>
                    </select>
                </div>
                <div class="profile-item" v-if="districts">
                    <div class="profile-item-title">Место добычи</div>
                    <select class="form-select" v-model="district">
                        <option v-for="district in districts" :value="district.id">{{ district.name_ru }}</option>
                    </select>
                </div>
                <div class="order-item">
                    <div class="profile-item-title">Срок проведения добычи</div>
                    <VueDatePicker v-model="date" :enable-time-picker="false" :range="{ maxRange: 3 }" :min-date="new Date()"></VueDatePicker>
                </div>
                <div class="order-animals">
                    <div class="order-animal" v-for="(animal, index) in animals" :key="index">
                        <div class="order-animal-name">{{ animal.name_ru }}</div>
                        <div class="order-animal-price">{{ formatPrice(animal.cost) }} сум</div>
                        <div class="order-animal-box">
                            <button @click="minusPrice(index)" class="order-animal-minus"><i class="fa-solid fa-minus"></i></button>
                            <div class="order-animal-quantity">{{ prices[index] }}</div>
                            <button @click="plusPrice(index)" class="order-animal-plus"><i class="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="order-bottom">
                <div class="order-price">
                    <div class="order-price-title">Предварительная стоимость:</div>
                    <div class="order-price-value">{{ formatPrice(totalSum) }} <span>сум</span></div>
                </div>
                <button class="order-btn" @click="createOrder" :disabled="loading || totalSum == 0">
                    <template v-if="loading">
                        <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                        <span role="status"> Загрузка...</span>
                    </template>
                    <template v-else>Оплатить</template>
                </button>
            </div>
        </div>
      </div>
    </div>
  </template>
  
<script>  
    import axios from 'axios'
    import { IMaskDirective } from 'vue-imask';
    import VueDatePicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css'
    import {mapGetters} from 'vuex';

    export default {
        name: 'HunterOrderView',
        data() {
            return {
                date: null,
                animals: null,
                prices: [],
                regions: null,
                districts: null,
                region: 1,
                district: 1,
                loading: false
            };
        },
        components: { VueDatePicker },
        directives: {
            imask: IMaskDirective
        },
        computed: {
            totalSum() {
                let totals = []
                this.prices.forEach((price, i) => {
                    totals.push(this.animals[i].cost * price)
                });
                return totals.reduce((sum, price) => sum + parseFloat(price) || 0, 0);
            },
            ...mapGetters([
                "getToken",
                "getUser"
            ])
        },
        mounted() {
            const startDate = new Date();
            const endDate = new Date(new Date().setDate(startDate.getDate() + 3));
            this.date = [startDate, endDate];
            axios.get('/api/regions', {
                headers: {
                    Authorization: `Bearer ${this.getToken}`
                }
            }).then(res => {
                if(res.status == 200){
                    this.regions = res.data.data
                }
            })
            axios.get('/api/districts', {
                headers: {
                    Authorization: `Bearer ${this.getToken}`
                }
            }).then(res => {
                if(res.status == 200){
                    this.districts = res.data.data
                }
            })
            axios.get('/api/animals/grouped-by-category', {
                headers: {
                    Authorization: `Bearer ${this.getToken}`
                }
            }).then(res => {
                if(res.status == 200){
                    this.animals = res?.data?.data[0]?.animals
                    res?.data?.data[0]?.animals.forEach((animal, index) => {
                        this.prices[index] = 0
                    });
                }
            })
            window.Telegram.WebApp.BackButton.show();
            window.Telegram.WebApp.onEvent('backButtonClicked', this.goHome);
        },
        methods: {
            formatPrice(number) {
                const [integerPart, fractionalPart] = number.toFixed(2).split('.');
                const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                return fractionalPart ? `${formattedIntegerPart}` : formattedIntegerPart;
            },
            plusPrice(index){
                this.prices[index] = this.prices[index] + 1
            },
            minusPrice(index){
                if(this.prices[index] != 0){
                    this.prices[index] = this.prices[index] - 1
                }
            },
            createOrder(){
                let animals = []
                this.prices.forEach((price, index) => {
                    if(price > 0){
                        let item = {
                            id: this.animals[index].id,
                            count: price
                        }
                        animals.push(item)
                    }
                });
                let data = {
                    licenseType: 1,
                    regionId: this.region,
                    districtId: this.district,
                    startDate: this.date[0].toISOString().split('T')[0],
                    endDate: this.date[1].toISOString().split('T')[0],
                    statusId: 1,
                    animals: animals
                }
                axios.post('https://webapp.2bit.uz/api/v1/licenses/create', data, {
                    headers: {
                        Authorization: `Bearer ${this.getToken}`
                    }
                }).then(res => {
                    if(res){
                        let data = {
                            license_id: res?.data?.license_id,
                            phone_number: '+' + this.getUser?.phoneNumber
                        }
                        axios.post('/api/payment/initiate', data, {
                            headers: {
                                Authorization: `Bearer ${this.getToken}`
                            }
                        }).then(result => {
                            window.location.href = result?.data?.payment_url
                        })
                    }
                })
            },
            goHome(){
                this.$router.push('/')
            }
        },
    }
</script>
  
<style lang="scss">
    .order{
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
        &-bottom{
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        &-btn{
            width: 100%;
            background: #2ecc71;
            height: 50px;
            line-height: 50px;
            border: 0;
            border-radius: 5px;
            color: #fff;
            &:disabled{
                background: #636e72;
            }
        }
        &-item{
            margin-bottom: 15px;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        &-animals{
            display: flex;
            flex-direction: column;
            gap: 10px;
            background: #dfe6e9;
            padding: 20px;
            border-radius: 5px;
        }
        &-price{
            &-value{
                color: #000;
                font-size: 18px;
                font-weight: 700;
            }
        }
        &-animal{
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            &-name{
                font-size: 14px;
                font-weight: 700;
                color: #000;
                width: 30%;
            }
            &-price{
                text-align: center;
                width: 40%;
                color: #000;
                font-size: 14px;
            }
            &-box{
                display: flex;
                align-items: center;
                width: 30%;
            }
            &-quantity{
                width: 40px;
                background: none;
                border-radius: 5px;
                border: 0;
                text-align: center;
                color: #000;
                font-size: 14px;
                line-height: 20px;
                &:focus{
                    outline: 0;
                    border: 0;
                }
            }
            &-plus, &-minus{
                height: 20px;
                background: none;
                border-radius: 20px;
                width: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 0;
                padding: 0;
                font-size: 14px;
                color: #000;
                background: #fff;
            }
        }
    }
</style>
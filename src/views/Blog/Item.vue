<template>
    <div class="item page">
      <div class="main hide-menu">
        <div class="item-title">{{ item.name_ru }}</div>
        <div class="item-img">
            <img :src="'https://webapp.2bit.uz/storage/' + item.image" alt="">
        </div>
        <div class="item-date">{{ item.date }}</div>
        <div class="item-content" v-html="item.contentRu"></div>
      </div>
    </div>
</template>

<script>
export default {
    name: 'BlogItem',
    computed: {
        item() {
            const id = this.$route.params.id
            return this.$store.state.news?.find(item => item.id == id)
        }
    },
    mounted() {
        window.Telegram.WebApp.BackButton.show();
        window.Telegram.WebApp.onEvent('backButtonClicked', this.goBlog);
    },
    methods: {
        goBlog(){
            this.$router.push('/blog')
        }
    },
}
</script>

<style lang="scss" scoped>
    .item{
        &-title{
            font-size: 18px;
            font-weight: 700;
            color: #000;
            margin-bottom: 10px;
        }
        &-img{
            margin-bottom: 15px;
            img{
                width: 100%;
                border-radius: 10px;
            }
        }
        &-date{
            font-size: 12px;
            margin-bottom: 10px;
        }
        &-content{
            font-size: 14px;
        }
    }
</style>
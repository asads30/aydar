<template>
    <div class="success">
        <div class="success-top"></div>
        <div class="success-center">
            <div class="success-icon">
                <img src="@/assets/success.png" alt="">
            </div>
            <div class="success-text">Лицензия успешно была оплачена</div>
        </div>
        <a href="https://t.me/uzhunterbot/startapp" class="success-btn">Перейти в приложение</a>
    </div>
</template>

<style lang="scss" scoped>
    .success{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100vh;
        padding: 0 20px 20px;
        &-center{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 15px;
        }
        &-icon{
            text-align: center;
            img{
                width: 100px;
            }
        }
        &-text{
            font-size: 18px;
            color: #000;
            font-weight: 600
        }
        &-btn{
            width: 100%;
            height: 50px;
            line-height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-weight: 600;
            background: #2ecc71;
            text-decoration: none;
            border-radius: 10px;
        }
    }
</style>
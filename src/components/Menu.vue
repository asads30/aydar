<template>
    <div class="menu">
        <router-link to="/" class="menu-item">
            <i class="fa-solid fa-house"></i>
            <span>Главная</span>
        </router-link>
        <router-link to="/permissions" class="menu-item">
            <i class="fa-solid fa-book"></i>
            <span>Разрешения</span>
        </router-link>
        <router-link to="/blog" class="menu-item">
            <i class="fa-solid fa-newspaper"></i>
            <span>Блог</span>
        </router-link>
        <router-link to="/profile" class="menu-item">
            <i class="fa-solid fa-user"></i>
            <span>Профиль</span>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'Menu'
}
</script>

<style lang="scss">
    .menu{
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #fff;
        box-shadow: 0 0 5px rgba(0,0,0,0.05);
        &-item{
            width: 25%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 15px 0;
            color: #717394;
            text-decoration: none;
            font-size: 14px;
            gap: 5px;
            i{
                font-size: 20px;
            }
        }
        &-item.router-link-active{
            color: #3498db;
        }
    }
</style>
<template>
    <div class="blog page">
      <div class="main">
        <div class="blog-list">
            <router-link to="/blog/01" class="blog-item">
                <div class="blog-img">
                    <img src="@/assets/blog/01.jpg" alt="">
                </div>
                <div class="blog-text">
                    <div class="blog-date">16 сентября 2024</div>
                    <div class="blog-name">Сезон охоты в Узбекистане начался</div>
                    <div class="blog-des">Начиная с 1 сентября с нашего прекрасного приложения вы можете оформить разрешение на охоту и охотиться законно на горных баранов на территории Узбекистана.</div>
                </div>
            </router-link>
            <router-link to="/blog/02" class="blog-item">
                <div class="blog-img">
                    <img src="@/assets/blog/02.jpg" alt="">
                </div>
                <div class="blog-text">
                    <div class="blog-date">16 сентября 2024</div>
                    <div class="blog-name">Сезон охоты в Узбекистане начался</div>
                    <div class="blog-des">Начиная с 1 сентября с нашего прекрасного приложения вы можете оформить разрешение на охоту и охотиться законно на горных баранов на территории Узбекистана.</div>
                </div>
            </router-link>
            <router-link to="/blog/03" class="blog-item">
                <div class="blog-img">
                    <img src="@/assets/blog/03.jpg" alt="">
                </div>
                <div class="blog-text">
                    <div class="blog-date">16 сентября 2024</div>
                    <div class="blog-name">Сезон охоты в Узбекистане начался</div>
                    <div class="blog-des">Начиная с 1 сентября с нашего прекрасного приложения вы можете оформить разрешение на охоту и охотиться законно на горных баранов на территории Узбекистана.</div>
                </div>
            </router-link>
            <router-link to="/blog/01" class="blog-item">
                <div class="blog-img">
                    <img src="@/assets/blog/01.jpg" alt="">
                </div>
                <div class="blog-text">
                    <div class="blog-date">16 сентября 2024</div>
                    <div class="blog-name">Сезон охоты в Узбекистане начался</div>
                    <div class="blog-des">Начиная с 1 сентября с нашего прекрасного приложения вы можете оформить разрешение на охоту и охотиться законно на горных баранов на территории Узбекистана.</div>
                </div>
            </router-link>
        </div>
      </div>
      <Menu />
    </div>
  </template>
  
  <script>
  import Menu from '@/components/Menu.vue'
  
  export default {
    name: 'BlogView',
    components: {
      Menu
    }
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
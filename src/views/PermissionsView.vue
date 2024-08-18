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
                    <div class="perms-list">
                        <router-link to="/permissions/01" class="perms-item">
                            <div class="perms-item-qr">
                                <img src="@/assets/qr.png" alt="">
                            </div>
                            <div class="perms-item-text">
                                <div class="perms-item-top">
                                    <div class="perms-item-title">№0000002</div>
                                    <div class="perms-item-status active">Активный</div>
                                </div>
                                <div class="perms-item-des"><strong>Охота</strong></div>
                                <div class="perms-item-des">01.09.2024 - 03.09.2024</div>
                            </div>
                        </router-link>
                    </div>
                </div>
                <div class="tab-pane fade" id="perm2-tab-pane" role="tabpanel" aria-labelledby="perm2-tab" tabindex="0">
                    <div class="text-center">
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
  
  export default {
    name: 'PermissionsView',
    components: {
      Menu
    }
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
                width: 80px;
                img{
                    width: 80px;
                }
            }
            &-des{
                font-size: 14px;
            }
            &-text{
                width: calc(100% - 90px);
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
        }
    }
  </style>
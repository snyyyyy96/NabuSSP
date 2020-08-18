<template>
  <div style="padding:32px 48px 32px 48px;">
    <el-page-header content="Recent Events" @back="goBack" />
    <br><br>
      <div v-for="(service,serviceindex) in servicesData.Common" :key="serviceindex">
        <span v-if="service.status!= 'normal'" class="alert-title">
          <div v-for="(subservice,subserviceindex) in service.triggers" :key="subserviceindex">
            <div class="card-panel" v-if="subservice.Status != 'normal'">
              <el-row class="alert-wrapper">
                <el-col :span="1">
                  <span class="alert-content">{{ subservice.Date }}</span>
                </el-col>
                <el-col :span="2">
                  <span class="alert-content">{{ subservice.Time }}</span>
                </el-col>
                <el-col :span="1">
                  <i v-if="subservice.Status== 'danger'" class="el-icon-s-flag" style="color:#BD271A; font-size:16px;"/>
                  <i v-if="subservice.Status== 'warning'" class="el-icon-s-flag" style="color:#F0B44F; font-size:16px;"/>
                </el-col>
                <el-col :span="20">
                  <span class="alert-title">{{ serviceindex }}</span>
                  <span class="alert-name">{{ subservice.Name }}</span>      
                  <p class="alert-content">{{ subservice.CustomerImpact }} </p>
                </el-col>
              </el-row>
            </div>
          </div>
        </span>
      </div>
  </div>
</template>

<script>
import { getServicesData } from '@/api/panelgroup'

export default {
  name: 'RecentEvents',
  data() {
    return {
      servicesData: undefined,
    }
  },
  created() {
    this.getData()
  },
  methods: {
    goBack() {
      console.log('go back')
    },
    async getData() {
      const res = await getServicesData()
      this.servicesData = res.data
      this.gridData = res.data.Common
    },
  }
}
</script>

<style lang="scss" scoped>
  .card-panel {
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    margin: 8px 0 8px 0;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
  }
  .alert-wrapper {
    padding-top: 16px;
    padding-bottom: 4px;
    padding-left: 24px; 
  }
  .alert-title {
    font-size: 13px;
    font-weight: bold;
    padding-right: 16px;
  }
  .alert-name {
    font-weight: normal;
    color: #409EFF;
  }
  .alert-content {
    font-weight: normal;
  }
</style>

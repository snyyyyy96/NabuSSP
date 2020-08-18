<template>
  <el-row :gutter="20" class="panel-group">
    <div v-for="(city,index) in servicesData.PrimaryCities" :key="index">
      <el-col :xs="12" :sm="12" :md="4" :lg="4" class="card-panel-col">
        <!-- <router-link to="/office-aus"> -->
        <router-link :to="{path:routeLink[index]}">
          <div class="card-panel office-bg" :style="{ 'background-image': 'url(' + grps[index].bgimage + ')' }">
            <div class="card-panel-description">
              <div class="card-panel-text">{{ city.name }}</div>
              <i v-if="city.normal==city.total " style="color:#49A659; font-size:14px;" class="el-icon-success" />
              <i v-if="city.normal!=city.total" style="color:#BD271A; font-size:14px;" class="el-icon-success" />
              <div class="card-panel-cal">
                <span class="card-panel-num">{{ city.normal }}/{{ city.total }}</span>
              </div>
            </div>
          </div>
        </router-link>
      </el-col>
    </div>

    <div class="notification">
      <el-col :xs="24" :sm="24" :md="8" :lg="8" class="card-panel-col">
        <div class="card-panel notice-bg" @click="noticeVisible = true">
          <div class="card-panel-description">
            <div class="notice-title">
              <i style="color:#BD271A; font-size:24px;" class="el-icon-info" />
              <h2>{{ servicesData.Notification.Title }}</h2><i class="el-icon-edit" style=" padding-left: 24px; font-size:18px;" />
            </div>
            <div class="card-panel-text notice-text">
              {{ servicesData.Notification.Content }}
            </div>
          </div>
        </div>
      </el-col>
    </div>
    <el-dialog title="Edit notification" :visible.sync="noticeVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="Title">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="Content">
          <el-input v-model="form.desc" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button style="color:white; background-color:#BD271A" @click="onSubmit(form)">Publish</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <div class="service-wrapper">
      <el-col :xs="24" :sm="24" :md="16" :lg="16" class="card-panel-col">
        <div class="service-status panel-gap">
          <h2 style="margin-top:24px; margin-bottom:28px">Services Status</h2>
          <el-row :gutter="16" class="panel-group">

            <div v-for="(service,index) in servicesData.Common" :key="index">
              <el-col :xs="6" :sm="6" :lg="6" class="card-panel-col">
                <div v-if="service.status=='normal'">
                  <div class="service-block" style="background-color: #49A659 ">
                    <p type="text" @click="showTable(service)">{{ index }}</p>
                  </div>
                </div>
                <div v-else-if="service.status=='warning'">
                  <div class="service-block" style="background-color: #F0B44F">
                    <p type="text" @click="showTable(service)">{{ index }}</p>
                  </div>
                </div>
                <div v-else-if="service.status=='danger'">
                  <div class="service-block" style="background-color: #C6322D">
                    <p type="text" @click="showTable(service)">{{ index }}</p>
                  </div>
                </div>
              </el-col>
            </div>
          </el-row>
          <img :src="require('../../../../assets/images/common-legend.png')" width="100%" style="position: absolute; bottom: 0;">
        </div>
      </el-col>
    </div>
    <el-dialog width="70%" title="Detail Information" :visible.sync="dialogTableVisible">
      <el-table stripe :data="gridData">
        <el-table-column property="Name" label="Triggers" width="150">
          <template slot-scope="scope">
            <a href="###" style="color:#409EFF">{{ scope.row.Name }}</a>
          </template>
        </el-table-column>
        <el-table-column property="CustomerImpact" label="Description" width="300" />
        <el-table-column property="Treshold" label="Treshold" width="300" />
        <el-table-column property="Status" label="Status">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.Status=='danger'" type="danger">danger</el-tag>
            <el-tag v-else-if="scope.row.Status=='normal'" type="success">normal</el-tag>
            <el-tag v-else-if="scope.row.Status=='warning'" type="warning">warning</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <div class="map-event">
      <el-col :xs="24" :sm="24" :md="8" :lg="8" class="card-panel-col">
        <div class="card-panel map-panel panel-gap" style="overflow:auto">
          <div class="map-position">
            <!-- <p>this is a map </p> -->
            <Usamap />
          </div>

          <div>
            <accordion>
              <accordion-item v-for="(service,index) in servicesData.Common" :key="index">
                <template v-if="service.status!= 'normal'" slot="accordion-trigger" class="alert-title">
                  <i v-if="service.status== 'danger'" style="color:#BD271A; font-size:16px; position: absolute; margin-left: -24px; margin-top:6px;" class="el-icon-s-flag" />
                  <i v-if="service.status== 'warning'" style="color:#F0B44F; font-size:16px; position: absolute; margin-left: -24px; margin-top:6px;" class="el-icon-s-flag" />
                  <h4 class="alert-title">{{ index }}</h4>
                </template>
                <template slot="accordion-content" class="alert-content">
                  <div v-for="(subservice,index) in service.triggers" :key="index">
                    <div v-if="subservice.Status != 'normal'">
                      <h4 class="alert-name">{{ subservice.Name }}</h4>
                      <p class="alert-content">{{ subservice.CustomerImpact }} </p>

                    </div>
                  </div>
                </template>
              </accordion-item>
            </accordion>
          </div>
        </div>
      </el-col>
    </div>
  </el-row>

</template>

<script>
import CountTo from 'vue-count-to'
import Accordion from './accordion'
import AccordionItem from './accordion-item'
import Usamap from '../../../../layout/components/Usamap'
import { getServicesData } from '@/api/panelgroup'
import { postNotification } from '@/api/panelgroup'

export default {
  components: {
    CountTo,
    Accordion,
    AccordionItem,
    Usamap
  },
  data() {
    return {
      servicesData: undefined,
      gridData: undefined,
      dialogTableVisible: false,
      noticeVisible: false,
      form: {
        name: '',
        desc: ''
      },
      grps:
      [
        { bgimage: require('../../../../assets/images/bg-aus.png') },
        { bgimage: require('../../../../assets/images/bg-las.png') },
        { bgimage: require('../../../../assets/images/bg-otw.png') },
        { bgimage: require('../../../../assets/images/bg-sjc.png') }
      ],
      routeLink: [
        '/office-aus',
        '/office-las',
        '/office-otw',
        '/office-sjc'
      ]

    }
  },
  created() {
    this.getData()
    clearInterval(this.timer)
    this.timer = null
    this.setTimer()
  },
  methods: {
    onSubmit(form) {
      postNotification(form).then(() => {
        this.servicesData.Notification.Content = form.desc
        this.servicesData.Notification.Title = form.name
        this.noticeVisible = false
      })
    },
    showTable(service) {
      this.gridData = service.triggers
      this.dialogTableVisible = true
    },

    setTimer() {
      if (this.timer == null) {
        this.timer = setInterval(() => {
          console.log('aaaaa')
          this.getData()
        }, 300000)
      }
    },

    async getData() {
      const res = await getServicesData()
      this.servicesData = res.data
      this.gridData = res.data.Common
    },

    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel {
  padding: 0 18px;
  display: none;
  background-color: white;
  overflow: hidden;
}

.alert-wrapper {
  background-color: red;
}
.panel-gap {
  margin-top: 24px !important;
}

.panel-group {
  margin-top: 12px;
  font-family: "Open Sans" !important;

  .card-panel-col {
    margin-bottom: 16px;
  }

  .notice-bg {
    background: #fff;
    padding: 0px 18px 0px 21px;
  }

  .notice-text {
    font-size: 13px !important;
    font-weight: lighter;
    margin-top: 8px;
    margin-left: 36px;
  }

  .notice-title i {
    display: inline-block;
  }
  .notice-title h2 {
    display: inline-block;
    margin: 0px 0px 4px 12px;
    font-size: 16px !important;
  }

  .el-icon-success {
    margin: -28px 0px 0px 0px;
    float: right;
  }

  .service-block {
    padding-top: 4px;
  }

  .map-panel {
    background: #fff;
    height: 540px !important;
  }
  .map-position {
    height: 260px;
    margin: 20px;
  }

  h3 {
    margin-top: 12px !important;
    margin-bottom: 12px !important;
  }

  .alert-title {
    margin-top: 10px !important;
    margin-bottom: 10px !important;
  }

  .alert-name {
    margin-bottom: 0px !important;
  }
  .alert-content {
    margin-top: 6px !important;
  }

  .card-panel {
    height: 116px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    // background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      font-weight: bold;
      margin: 16px;
      margin-left: 12px;

      .card-panel-text {
        line-height: 16px;
        color: #646464;
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        float: right;
        font-size: 36px;
        margin-top: 8px;
      }
    }
  }

  .service-status {
    height: 540px;
    padding: 0px 30px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
  }

  .service-block {
    height: 48px;
    // background-color: green;
    color: white;
    text-align: center;
  }

  .service-block:hover {
    background-color: #006912;
    box-shadow: 0 0 10px rgba(170, 129, 129, 0.5);
  }

  .service-block p {
    font-size: 20px;
    margin: 10px 10px;
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>

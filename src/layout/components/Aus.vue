<template>
  <div class="office">

    <div class="back">
      <router-link to="/dashboard">
        <el-page-header content="Austin" @back="goBack" />
      </router-link>
    </div>

    <el-row :gutter="20" class="office-body">
      <!-- <el-col :xs="24" :sm="24" :md="10" :lg="10" >
        <div class="office-services bg-white">
          <el-row :gutter="16" class="services">
            <el-col :span="8">
              <div class="service bg-green"></div>
            </el-col>
          </el-row>
        </div>
      </el-col> -->
      <div class="service-wrapper">
        <el-col :xs="24" :sm="24" :md="10" :lg="10" class="card-panel-col">
          <div class="service-status panel-gap bg-white">
            <h2 style="margin-top:24px; margin-bottom:28px">Service Status</h2>
            <el-row :gutter="16" class="panel-group">

              <div v-for="(service,index) in servicesData.Austin" :key="index">
                <el-col :xs="8" :sm="8" :lg="8" class="card-panel-col">
                  <div v-if="service.status=='normal'">
                    <div class="service-block" style="background-color: #49A659 ">
                      <p type="text" @click="showTable(service)">{{ index }}</p>
                    </div>
                  </div>
                  <div v-else-if="service.status=='danger'">
                    <div class="service-block" style="background-color: #C6322D">
                      <p type="text" @click="showTable(service)">{{ index }}</p>
                    </div>
                  </div>
                  <div v-else-if="service.status=='warning'">
                    <div class="service-block" style="background-color: #F0B44F">
                      <p type="text" @click="showTable(service)">{{ index }}</p>
                    </div>
                  </div>
                </el-col>
              </div>
            </el-row>
            <img :src="require('@/assets/images/office-legend.png')" width="100%" style="position: absolute; bottom: 0; left:0;">

          </div>
        </el-col>
      </div>

      <el-dialog width="70%" title="Detail Information" :visible.sync="dialogTableVisible">
        <el-table stripe :data="gridData">
          <el-table-column property="Name" label="Triggers" width="150">
            <template slot-scope="scope">
              <a href="###" style="color:#409EFF">{{scope.row.Name}}</a>
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

      <el-col :xs="24" :sm="24" :md="14" :lg="14">
        <div class="office-maps bg-white">
          <el-dropdown>
            <span class="el-dropdown-link">
              <strong>Floor Plan<i class="el-icon-arrow-down el-icon--right" /></strong>
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- @/assets/images/aus-f1.jpg -->
              <el-dropdown-item @click.native="showFloor('1')">Floor 1</el-dropdown-item>
              <el-dropdown-item @click.native="showFloor('2')">Floor 2</el-dropdown-item>
              <el-dropdown-item @click.native="showFloor('3')">Floor 3</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <div class="map-wrapper" > -->
          <div class="map-wrapper">
            <!-- <img :src="floorplan == 1 ? require('@/assets/images/aus-f1.jpg') : require('@/assets/images/aus-f2.jpg')" width="100%"> -->
            <img v-if="floorplan == 1" :src="require('@/assets/images/aus-f1.jpg')" width="100%">
            <img v-else-if="floorplan == 2" :src="require('@/assets/images/aus-f2.jpg')" width="100%">
            <img v-else-if="floorplan == 3" :src="require('@/assets/images/aus-f3.jpg')" width="100%">
            <img v-else :src="require('@/assets/images/aus-f1.jpg')" width="100%">
          </div>
          <hr>
          <div class="map-footer">
            <img src="@/assets/images/map-footer.jpg" width="50%">
          </div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import store from '@/store'
import { getServicesData } from '@/api/panelgroup'

export default {
  data() {
    return {
      servicesData: undefined,
      gridData: undefined,
      dialogTableVisible: false,
      timer: null
    }
  },

  created() {
    this.getData()
    clearInterval(this.timer)
    this.timer = null
    this.setTimer()
  },

  methods: {
    goBack() {
      console.log('go back')
    },

    showTable(service) {
      this.gridData = service.triggers
      this.dialogTableVisible = true
    },

    showFloor(pic) {
      // this.floorplan = require(pic)
      this.floorplan = pic
    },

    setTimer() {
        if(this.timer == null) {
            this.timer = setInterval( () => {
                console.log('aaaaa')
                this.getData()
            }, 30000)
        }
    },

    async getData() {
      const res = await getServicesData()
      this.servicesData = res.data
      this.gridData = res.data.Austin
    },

    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  },

  destroyed() {
    clearInterval(this.timer)
    this.timer = null
  },
}
</script>

<style lang="scss" scoped>
  .office {
    background-color: #F3F4F8;
    padding-bottom: 5rem;
  }
  .back {
    padding: 2rem 2rem 1rem 2rem;
  }
  .office-body {
    padding: 0 3rem;
  }

  .bg-white {
    background: #fff;
  }

  .service-wrapper {
  margin-top: 12px;
  font-family: "Open Sans" !important;

    .card-panel-col {
      margin-bottom: 16px;
    }

    .service-block {
      padding-top: 4px;
      height: 48px;
      color: white;
      text-align: center;
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
      font-size: 18px;
      margin: 10px 10px;
    }
  }

  .office-maps {
    padding: 2rem 2rem;
  }
  .map-wrapper {
    border: 5px solid #B8B8B8;
    height:400px;
    margin-top: 1rem;
    background-color: #FCFCFC;
  }
  .el-dropdown-link {
    cursor: pointer;
  }
  hr {
    margin-top: 1rem;
    border-top: 1px solid #B8B8B8;
    border-bottom: 0px ;
  }
  .map-footer {
    margin: 1rem 0 0 0;
    text-align: right;
  }

</style>

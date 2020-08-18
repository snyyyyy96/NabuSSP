<template>
  <div>
    <!-- <br/><br/><br/> -->
    <v-chart :options="map" />
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import { getServicesData } from '@/api/panelgroup'

const serviceData1 =  {
  PrimaryCities:
    [
      {
        "name":"Austin Office",
        "normal":"23",
        "total":"25",
        value:[150, 2],
        geo:[-97.5, 30],
        "status":"normal"
      },  
      {
        "name":"Las Colinas",
        "normal":"25",
        "total":"25",
        value:[150, 1],
        geo:[-96.9, 33],
        "status":"normal"
      },
      {
        "name":"Ottawa Office",
        "normal":"23",
        "total":"23",
        value:[150, 1],
        geo:[-122, 37],
        "status":"normal"
      },
      {
        "name":"San Jose",
        "normal":"22",
        "total":"22",
        value:[120, 1],
        geo:[-75, 37],
        "status":"normal"
      },
    ],

  OtherCities:
    {
      "Chicago": {
        "name":"Chicago",
        "status":"normal"
      },
      "Jersey": {
        "name":"Jersey",
        "status":"normal"
      },
      "Seattle": {
        "name":"Seattle",
        "status":"normal"
      },
    },

  Notification:
    {
      "Title": "Shift From Zoom To MS",
      "Content": "Lorem ipsum dolor sit, amet consectet ectet adipisicing elit. Soluta, fugiat."
    },


  Common: {
    "service1": {
      "triggers": [{
          "CustomerImpact": "service1_1 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, illum?",
          "Treshold": "ping 'xxxx' > 300ms",
          "Name": "service1_1",
          "Status": "normal",
      },
      {
        "CustomerImpact": "service1_2 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, illum?",
        "Treshold": "ping 'xxxx' > 300ms",
        "Name": "service1_2",
        "Status": "normal",
      }],
      "status": "normal",
    },
    "O365_email": {
      "triggers": [{
          "CustomerImpact": "Cannot send or receive emails",
          "Treshold": "ping 'xxxx' > 300ms",
          "Name": "TestPoint01",
          "Status": "danger",
      },
      {
        "CustomerImpact": "Cannot send or receive emails",
        "Treshold": "ping 'xxxx' > 300ms",
        "Name": "TestPoint02",
        "Status": "danger",
      }],
      "status": "danger",
    },
    "service3": {
      "triggers": [{
          "CustomerImpact": "service3_1 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, illum?",
          "Treshold": "ping 'xxxx' > 300ms",
          "Name": "service3_1",
          "Status": "normal",
      },
      {
        "CustomerImpact": "service3_2 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, illum?",
        "Treshold": "ping 'xxxx' > 300ms",
        "Name": "service3_2",
        "Status": "normal",
      }],
      "status": "normal",
    },
    "service4": {
      "triggers": [{
          "CustomerImpact": "service4_1 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, illum?",
          "Treshold": "ping 'xxxx' > 300ms",
          "Name": "service4_1",
          "Status": "danger",
      },
      {
        "CustomerImpact": "service4_2 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, illum?",
        "Treshold": "ping 'xxxx' > 300ms",
        "Name": "service4_2",
        "Status": "normal",
      }],
      "status": "danger",
    },
  },

 
  Austin: {
    "Internet_Access": {
      "triggers": [{
          "CustomerImpact": "Unable to access Internet",
          "Treshold": "ping 'xxxx' > 300ms",
          "Name": "AP01",
          "Status": "warning",
      },
      {
        "CustomerImpact": "Unable to access Internet",
        "Treshold": "ping 'xxxx' > 300ms",
        "Name": "AP02",
        "Status": "danger",
      },
      {
        "CustomerImpact": "Unable to access Internet",
        "Treshold": "ping 'xxxx' > 300ms",
        "Name": "AP03",
        "Status": "danger",
      },
      {
        "CustomerImpact": "Unable to access Internet",
        "Treshold": "ping 'xxxx' > 300ms",
        "Name": "AP04",
        "Status": "danger",
      }],
      "status": "danger",
    },
    "Wifi": {
      "triggers": [{
          "CustomerImpact": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, illum?",
          "Treshold": "ping 'xxxx' > 300ms",
          "Name": "wifi01",
          "Status": "normal",
      },
     {
        "CustomerImpact": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, illum?",
        "Treshold": "ping 'xxxx' > 300ms",
        "Name": "wifi02",
        "Status": "normal",
      },
      {
        "CustomerImpact": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, illum?",
        "Treshold": "ping 'xxxx' > 300ms",
        "Name": "wifi03",
        "Status": "normal",
      }],
      "status": "normal",
    },
    "Printers": {
      "triggers": [{
          "CustomerImpact": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, illum?",
          "Treshold": "ping 'xxxx' > 300ms",
          "Name": "printer01",
          "Status": "normal",
      },
     {
        "CustomerImpact": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, illum?",
        "Treshold": "ping 'xxxx' > 300ms",
        "Name": "printer02",
        "Status": "normal",
      }],
      "status": "normal",
    },
  },
  
  LasColinas: {

  }
}


export default {
  name: 'Usamap',
  components: {
    'v-chart': ECharts
  },

  data() {
    function convertData(data) {
      const res = []
      for (let i = 0; i < data.length; i++) {
        const geoCoord = geoCoordMap[data[i].name]
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          })
        }
      }
      return res
    }

    function convertData1(data) {
      const res = []
      if(data == undefined) return res
      for (let i = 0; i < data.PrimaryCities.length; i++) {
        const geoCoord = data.PrimaryCities[i].geo
        data.PrimaryCities[i].value[1] = data.PrimaryCities[i].status
        //dd[3] = data.PrimaryCities[i].status
        if (geoCoord) {
          res.push({
            name: data.PrimaryCities[i].name,
            value: geoCoord.concat(data.PrimaryCities[i].value)
          })
        }
      }
      return res
    }

    return {
      servicesData: undefined,
      
      map: {
        background: '#fff',
        // title: {
        //     text: 'American Sites Status Map',
        //     subtext: 'data from ...',
        //     left: 'left',
        //     textStyle: {
        //     color: '#000'
        //     }
        // },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          y: 'bottom',
          x: 'right',
          data: ['Offices'],
          textStyle: {
            color: '#BD271A'
          }
        },
        geo: {
          map: 'usa',
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#E3EAEF',
              borderColor: '#fff',
              borderWidth: 2
            },
            emphasis: {
              areaColor: '#D7DCDF'
            }
          }
        },
        series: [
          // {
          //   name: 'pm2.5',
          //   type: 'scatter',
          //   coordinateSystem: 'geo',
          //   data: convertData(data),
          //   symbolSize: val => val[2] / 10,
          //   tooltip: {
          //     formatter: function(val) {
          //       return val.name + ': ' + val.value[2]
          //     }
          //   },
          //   itemStyle: {
          //     normal: {
          //       color: '#BD271A'
          //     }
          //   }
          // },
          {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData1(serviceData1),
            //data: convertData(data),

            symbolSize: val => val[2] / 10,
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            tooltip: {
              formatter: function(val) {
                return val.name 
              }
            },
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false
              }
            },
            itemStyle: {
              normal: {
                // color: '#BD271A',
                color: function(params) {
                  var color = ''
                  var value = params.value
                  if (value[3] != 'normal') {
                    color = '#BD271A'
                  } else {
                    color = '#49A659'
                  }
                  return color
                }

              },
              shadowBlur: 10,
              shadowColor: '#333'
            },

            zlevel: 1
          }

        ]
      }

    }
  },
  created() {
    this.getData()
    
    clearInterval(this.timer)
    this.timer = null
    this.setTimer()
  },
  mounted() {
      this.mapEchartsInit();
  },
  methods: {
    mapEchartsInit(){
        var myChart=echarts.init(this.$refs.map);
        myChart.setOption(map, true);
    },
    setTimer() {
        if(this.timer == null) {
            this.timer = setInterval( () => {
                console.log('aaaaa')
                this.getData()
                this.map.series[0].data=this.convertDataM(this.servicesData)

            }, 5000)
        }
    },
    convertDataM(data) {
      const res = []
      if(data == undefined) return res
      for (let i = 0; i < data.PrimaryCities.length; i++) {
        const geoCoord = data.PrimaryCities[i].geo
        data.PrimaryCities[i].value[1] = data.PrimaryCities[i].status
        //dd[3] = data.PrimaryCities[i].status
        if (geoCoord) {
          res.push({
            name: data.PrimaryCities[i].name,
            value: geoCoord.concat(data.PrimaryCities[i].value)
          })
        }
      }
      return res
    },
    
    
    async getData() {
      const res = await getServicesData()
      this.servicesData = res.data
    },

  }
}

</script>

<style>
.echarts {
    height:270px;
    margin-left: -110px;
}
</style>

const Mock = require('mockjs')

const serviceData =  {
  PrimaryCities:
    [
      {
        "name":"Austin Office",
        "normal":"23",
        "total":"25",
        value:[150, 0],
        geo:[-97.5, 30],
        "status":"danger"
      },  
      {
        "name":"Las Colinas",
        "normal":"25",
        "total":"25",
        value:[150, 0],
        geo:[-96.9, 33],
        "status":"normal"
      },
      {
        "name":"Ottawa Office",
        "normal":"23",
        "total":"23",
        value:[150, 0],
        geo:[-122, 37],
        "status":"normal"
      },
      {
        "name":"San Jose",
        "normal":"22",
        "total":"22",
        value:[120, 0],
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
          "Date": "May 27",
          "Time": "3:13 pm",
          "Status": "danger",
      },
      {
        "CustomerImpact": "Cannot send or receive emails",
        "Treshold": "ping 'xxxx' > 300ms",
        "Name": "TestPoint02",
        "Date": "May 27",
        "Time": "3:13 pm",
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
          "Date": "May 27",
          "Time": "3:13 pm",
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



module.exports = [
  // get service data
  {
      url: '/vue-element-admin/servicesdata',
      type: 'get',
      response: _ => {
        return {
          code: 20000,
          data: serviceData
        }
      }
    },
    
    {
      url: '/vue-element-admin/notification',
      type: 'post',
      response: _ => {
        return {
          code: 20000,
          data: 'success'
        }
      }
    }    
    ]

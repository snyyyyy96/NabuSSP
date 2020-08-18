import request from '@/utils/request'

export function getServicesData() {
  return request({
    url: '/vue-element-admin/servicesdata',
    method: 'get'
  })
}

export function postNotification(data) {
  return request({
    url: '/vue-element-admin/notification',
    method: 'post',
    data
  })
}

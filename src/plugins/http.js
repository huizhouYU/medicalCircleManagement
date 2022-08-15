import axios from 'axios'

const MyServerHttp = {}

MyServerHttp.install = (Vue) => {
  // 设置基准地址
  axios.defaults.baseURL = ''
  // 添加实例方法
  Vue.prototype.$http = axios
}
export default MyServerHttp

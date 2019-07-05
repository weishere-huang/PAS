import axios from 'axios';
axios.defaults.withCredentials = true;
import global from './components/global/Global';

export default ({
  url,
  type,
  params,
  config,
  option,
  loadingConfig
}, vue) => {
  //process.env.NODE_ENV === 'development' && url = `/api${url}`;
  option = Object.assign({
    requestTarget: 'd',
    enableMsg: true,
    successMsg: '数据请求完成~'
  }, option || {});
  loadingConfig = Object.assign({
    begin: () => {},
    done: () => {}
  }, loadingConfig || {})
  // const loadInit = function () {
  //     if(!option.enableLoad){
  //         return {close:()=>{}}
  //     }
  //     return Loading.service(Object.assign({
  //         lock: true,
  //         text: '正加载中，请稍候...',
  //         spinner: 'el-icon-loading',
  //         background: 'rgba(255,255,255, 0.8)',
  //         target: document.querySelector('.mainContentWrapper'),
  //         customClass: 'loadingStyle'
  //     }, loadingConfig || {}));
  // }
  if (Object.prototype.toString.call(url) === '[object Array]') {
    //数组
    // params = Object.prototype.toString.call(params)!== '[object Array]'?[params||{},params||{}]:params;
    // type=Object.prototype.toString.call(type)!== '[object Array]'?[(type||"post"),(type||"post")]:type;
    //const loading = loadInit();
    loadingConfig.begin();
    const runAsync = url.map((_url, index) => {
      //api的url加入统一前缀  /${option.requestTarget}
      _url = `${global.apiSrc}${_url}`;
      const _params = Object.prototype.toString.call(params) !== '[object Array]' ? params || {} : params[index];
      const _type = Object.prototype.toString.call(type) !== '[object Array]' ? type || "post" : type[index];
      return new Promise(function (resolve, reject) {
        axios[_type](_url, _type === "get" ? {
          params: _params
        } : _params, config || {}).then(res => {
          loadingConfig.done();
          if (res.status === 200 && (res.data.code === 200 || res.data.code === 204)) {
            resolve(res);
          } else if (res.status === 200 && res.data.code >= 300 && res.data.code < 400) {
            this.$message.error(`登录失效，即将跳转至登录页`);
            window.setTimeout(() => {
              vue.$router.replace("/Login");
            }, 1000);
          } else {
            //console.log(res.data.msg);
            this.$message.error(`${res.data.msg}(${res.data.code})`);
            reject({
              type: 'faild',
              info: res.data
            });
          }
        }).catch(res => {
          loadingConfig.done();
          this.$message.error(`网络异常：${res.message}`);
          reject({
            type: 'error',
            info: res
          });
        })
      });
    });
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        Promise.all(runAsync).then(function (results) {
          option.enableMsg && this.$message.error(option.successMsg);
          resolve(results);
        });
      }, 10);
    });
  } else {
    url = `${global.apiSrc}${url}`;
    params = params || {};
    return new Promise((resolve, reject = () => {}) => {
      //这里加一个通用的数据重置后门
      if (params.reset === true) {
        resolve({
          code: 0,
          data: params.resetData
        });
        return;
      }
      //const loading = loadInit();
      loadingConfig.begin();
      axios[type || 'post'](url, type === 'get' ? {
        params: params
      } : params, config || {}).then(res => {
        if (res.status === 200 && (res.data.code === 200 || res.data.code === 204)) {
          //success && success(res.data);
          option.enableMsg && option.enableMsg && this.$message.success(option.successMsg);
          resolve(res);
        } else if (res.status === 200 && res.data.code >= 300 && res.data.code < 400) {
          this.$message.error(`登录失效，即将跳转至登录页`);
          window.setTimeout(() => {
            vue.$router.replace("/Login");
          }, 1000);
        } else {
          //faild && faild(res.data);
          console.log(res.data.msg);
          this.$message.error(`${res.data.msg}(${res.data.code})`);
          reject({
            type: 'faild',
            info: res.data
          });
        }
        loadingConfig.done();
      }).catch(res => {
        //error && error(res);
        loadingConfig.done();
        //console.log(info);
        this.$message.error(`网络异常：${res.message}`);
        reject({
          type: 'error',
          info: res
        });
      })
    })
  }
}


# vue 需要记录总结的点

### 1. 子组件直接修改父组件参数

1. js写法

```javascript
  :payMethod.sync="payMethod"
  this.$emit('update:payMethod',this.methodData);
```

2. ts 写法

```typescript
@Emit('update:userCard')
  private updateUserCard(val: object[]){}

  private confirmAdd(){
    this.updateUserCard(this.userData);
  }
```

### 2. 监听路由变化并重置 data

```javascript
watch:{
    '$route' (to, from){
      Object.assign(this.$data,this.$options.data())
      this.initData();
    }
  },
```

### 3. json 请求格式转换成 formdata

```javascript
// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api 的 base_url
  baseURL: 'https://api.suikezou.com/api/',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  // formData 数据传输方式
  transformRequest: (data) => {
    let ret = '';
    for (const it of Object.keys(data)) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
    }
    return ret;
  },
  // withCredentials: true,
  timeout: 5000, // 请求超时时间
});
```

### 4.1 vue 接收 iframe 通知(跨域方式)

```javascript
// 框架页面
window.addEventListener('message', (event: any) => {
      const data = JSON.parse(event.data);
      if (data.name === 'eventName' && event.origin + '/' === config.baseURL) {
        this.loaded(data.data);
      }
    });
```

```html
//iframe页面
<script>
  top.postMessage(data,targetUrl)
</script>
```

### 4.2 vue 接收 iframe 通知(不跨域方式)

```javascript
// 框架页面
window['eventName'] = () => {
  //处理事件
}
```

```html
//iframe页面

<script>
  window.parent.eventName()
</script>
```

### 5. 判断 undefined

```javascript
if (!(value !== '0' && !value && typeof(value) !== undefined))
```

### 6. vue-cli 3.0 跨域（最外层：vue.config.js /无则手动创建）

```javascript
module.exports = {
  lintOnSave: false,
  devServer:{
    proxy: {
      //配置跨域
        '/ws': {
            target: "https://apis.map.qq.com/",
            ws:true,
            changOrigin:true,
            pathRewrite:{
                '^/ws':'/'
            }
        }
      }
  }
}
```

### 7. es6 判断微信浏览器

```javascript
let isWeiXin = () => { return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1 }
  if (isWeiXin()) {
    next()
  } else {
    Toast.fail('请使用微信打开！')
    return false
  }
```

### 8. 前端重定向

```javascript
window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb57af6881fb3db44sd&redirect_uri=' + encodeURI('https://www.suikezou.com') + '&response_type=code&scope=snsapi_userinfo&state=#wechat_redirect'
```

### 9.页面缓存-后退不刷新

```html
<keep-alive>
  <component v-bind:is="currentTabComponent">keep-alive 内置组件</component>
</keep-alive>
```

### 9. ts 下在组件中使用导航钩子

```typescript
import Component from 'vue-class-component'

// Register the router hooks with their names
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate' // for vue-router 2.2+
])
//这样就能够在组件中直接调用钩子方法

or

@Component({
  components: {
    'card-view' : CardView,
  },
  beforeRouteLeave: (to, from, next) => {
    // ...
    if (to.path === '/'){
      next()
    }
    if (to.path === '/about/order'){
      next()
    }else{
      next('/')
    }
  }
})

```

### 10. 跨域设置

```typescript
//vue.config.js

module.exports = {
  devServer:{
    proxy: {
      //配置跨域
        '/weixin': {
          target: "https://open.weixin.qq.com/",
          ws:true,
          changOrigin:true,
          pathRewrite:{
              '^/weixin':'/'
          }
        }
      }
  }
}

```
# uni-uView
基于[uView2.0](https://www.uviewui.com/components/intro.html)
```bash
npm install
# or
yarn install
```

### 目录结构
```
uniuView
├─common          公共模块、方法
│  ├─apis         接口集合
│  ├─request      请求拦截器
│  ├─scss         公共样式
│  ├─config.js    公共配置
│  └─dialog.js    原生弹窗框，仅app可用
├─components      公共组件
├─mine            分包
├─pages           主包
├─static          资源
├─store           vuex
│  └─modules      vuex module
├─App.vue         
├─main.js         入口文件
├─manifest.json   uniapp配置文件
├─page.json       页面配置文件
└─permission.js   路由拦截
```


## 盛业资本 前端项目脚手架


``` bash
建议使用yarn 或者 cnpm

yarn
https://yarnpkg.com/zh-Hans/
yarn add -g sy-init-cli

cnpm 或 npm
$ cnpm install -g sy-init-cli
$ npm install -g sy-init-cli
```

``` bash
# 初始化项目，添加依赖
sy-cli init

yarn add
cnpm install

# 更新所有依赖包或单个依赖包到最新并保存package.json
yarn upgrade --latest
yarn upgrade 包名 --latest

# 启动本地服务 localhost:8080
npm start
npm run serve-t(调用测试环境接口)
npm run serve-p(调用生产环境接口)

# 打包生产环境代码
npm run build

# 打包正式测试环境代码
npm run build-t

# 打包开发测试环境代码
npm run build-d

# build for production and view the bundle analyzer report
npm run build --report


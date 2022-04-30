<div align="center">
<br/>
  <h1 algin="center">
    aas (Api Admin Starter)
  </h1>
</div>

<p align="center">
  <a href="#">
    <img src="https://img.shields.io/badge/nestjs-v8.x-green.svg" >
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/vue-v3.x-green.svg">
  </a>
</p>

#### 项目说明
```Api Admin Starter``` 管理系统，是基于 ```Nestjs```，```Vue``` 入门级别 RBAC 管理平台。

核心模块包括： 用户、角色、菜单、日志、文件管理等功能。快速搭建企业级中后台产品。

#### 本地开发

下载源码

```sh
git clone https://github.com/hexuntao/aas.git
```

前端

```sh
# 打开前端根目录
cd aas/client
# 安装依赖包
pnpm i
# 本地运行开发
pnpm serve
```

后端

> 后端需要 ```MySql``` 、```Redis``` 环境

本项目使用 ```TypeOrm``` 连接 ```MySql``` 数据库， 运行前请在 ```server/src/config/dev.yml``` 文件中配置好数据库连接

```MySql``` 数据库文件在 ```aas/db/kapok.sql``` ，可以通过 ```MySQL WorkBench``` 或 ``` Navicat``` 等工具软件导入。

```sh
# 打开后端根目录
cd aas/server
# 如果 安装不成功，建议使用 pnpm i
npm i
# 本地运行开发
npm run start:dev
```

启动好前、后端后，浏览器访问 http://localhost:9200 即可打开页面， swagger 文档地址 http://localhost:9100/api/docs

测试帐号密码： admin/admin

> 批量导入的用户默认密码： Q123456 ， 可在 ```server/src/config``` 中配置 初始密码

#### 功能

- [X] 用户管理
- [X] 角色管理
- [X] 菜单管理
- [X] 文件上传
- [ ] 定时任务

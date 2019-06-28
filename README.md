## 美剧前端项目
### 开发环境
Node.js v10.16.0

npm 6.9.0

### 主要框架

React、Redux、Antd、Axios

### 开发环境运行

1. 依赖另外两个项目，请先运行

    [美剧服务端项目](https://github.com/JokerQuan/meiju-server)

    [美剧爬虫项目](https://github.com/JokerQuan/meiju_spider)

2. 克隆到本地

    > git clone https://github.com/JokerQuan/meiju-client.git

3. 安装依赖

    > npm i

4. 启动项目

    > npm start

    启动成功后会自动唤起浏览器。

    *默认运行在80端口，可在package.json中配置*

    *服务端运行在本地的其他端口，需要配置反向代理，见package.json中的proxy字段。*

### 生产环境运行

1. 依赖另外两个项目，请先运行

    [美剧服务端项目](https://github.com/JokerQuan/meiju-server)

    [美剧爬虫项目](https://github.com/JokerQuan/meiju_spider)

2. 克隆到本地或服务器，安装依赖（同开发环境）

3. 本地编译打包（也可以直接在服务器编译）

    > npm run build

    把打包好的 build 文件夹放到服务器上。

4. 在服务器上安装配置好 nginx，启动 nginx

    基本配置项为 build 目录路径、监听域名及端口、反向代理端口（即服务端运行端口）。

### 开发计划

- [x] 界面框架搭建
- [x] 美剧列表 item 组件开发
- [x] 主页、推荐列表
- [x] 美剧详情界面，可查看下载链接
- [x] 分类（分类、地区、标签）列表
- [x] 搜索列表
- [x] 响应式布局（应该提前做好的，留了坑，后面需要重构导航菜单和用户菜单）
- [x] 用户注册、登录
- [x] 登录用户可收藏、取消收藏美剧
- [x] 我的收藏列表
- [x] 关于本站
- [x] 关于本站界面的评论、点赞、回复功能
- [x] 美剧详情评论、点赞、回复
- [x] 重构导航菜单、用户菜单
- [ ] 网站数据统计图表展示
- [ ] 收藏的美剧更新时，用户登录可收到通知

    *欢迎提出提意见或建议*
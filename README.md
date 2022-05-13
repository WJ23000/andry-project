# andry-app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm start
```

### Compiles and minifies for production
```
npm run build
```

### pm2进程管理常用命令
```
1、启动进程/应用：pm2 start bin/www 或 pm2 start app.js
2、指定名称启动进程/应用：pm2 start bin/www --name andry
3、监听模式启动进程/应用：pm2 start bin/www --watch
4、结束指定进程/应用：pm2 stop www
5、结束所有进程/应用：pm2 stop all
6、删除指定进程/应用：pm2 delete www
7、删除所有进程/应用；pm2 delete all
8、查看所有进程/应用：pm2 list
9、查看指定进程/应用的具体情况：pm2 describe www
10、查看所有进程/应用的资源消耗情况：pm2 monit
11、查看指定进程/应用的日志：pm2 logs www
12、查看所有进程/应用的日志：pm2 logs
13、重新启动指定进程/应用：pm2 restart www
14、重新启动所有进程/应用：pm2 restart all
```

### 前端使用token
```
设置Headers的authorization = 'Bearer ' + ${token}(登录接口会返回，Bearer后面加一个空格)
```

### github太慢，hosts配置
```
140.82.112.4 github.com
199.232.69.194 github.global.ssl.fastly.net
185.199.108.153 assets-cdn.github.com
185.199.110.153 assets-cdn.github.com
185.199.111.153 assets-cdn.github.com
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



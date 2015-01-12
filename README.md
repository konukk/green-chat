# green-chat
A simply web im, javascript chat ui component. javascript即时聊天组件

## 功能
- 单人聊天
- 在线、下线状态
- 信息发送状态
- 聊天历史记录
- 兼容IE8+（IE7未测试）、chrome等主流浏览器

## TODO
- 群聊
- 移动端适配

## 项目说明
- 如何运行例子
  1. 项目需在服务器环境下运行
  2. 同时打开 http://xxxx/im.html#1, http://xxxx/im.html#2 即可开始测试。改变#后面的数字可切换用户身份
  
- 组件说明

![](https://github.com/kinkk/green-chat/blob/master/image/component.png)

- 组件间通过事件驱动，详见代码

- 组件依赖（jquery, EventEmitter, nanoScroller, avchat.js, web_socket.js等）

- 项目基于[LeanCloud](https://www.avoscloud.com) Javascript Chat实现
  1. 实现了 获取聊天记录-conversation.php, 签名认证-signature.php
  2. 如使用本项目代码需申请LeanCloud账号，将im.html, conversation.php, signature.php中的appId, appKey, masterKey做相应替换
  
## 如何集成
1. 加载相关依赖（详见例子im.html）

2. 实现“获取联系人列表”接口（本例中的rosters.php）

3. 初始化组件 

  ```javascript
  Green.init({
      rostersUrl      : 'rosters.php', // 联系人列表接口
      conversationUrl : 'conversation.php',// 聊天记录接口
      authUrl         : 'signature.php'// 可选，签名认证接口
  });
  ```

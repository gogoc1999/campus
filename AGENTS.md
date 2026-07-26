## 项目基础信息

项目路径：C:\Users\18749\Desktop\codex\campus-food-front

项目类型：纯前端校园外卖静态页面，无后端、无MySQL数据库；登录、商铺、购物车、订单全部使用浏览器LocalStorage模拟持久化数据

技术栈：Vite5 + Vue3 + Element Plus + Vue Router4

## Codex执行强制规范

1. 全程使用分段计划模式迭代开发，一项计划交付代码后，由我本地运行验证正常，才允许执行下一个任务
2. 权限锁定：禁止修改、编辑 /.agents/skills/render-deploy 内部任意原始文件；该部署技能只允许放在最终部署阶段使用
3. 代码标准：Vue组件统一使用<script setup>语法糖，所有业务代码放置在src目录，输出代码标明对应文件名，终端命令适配Windows CMD
4. 开发阶段绝对不能自动触发Render部署逻辑，部署为最后一步专属任务

## Git & GitHub 配套管理规则

1. 自动生成项目根目录.gitignore文件，屏蔽node_modules、dist、本地环境配置、系统缓存等文件
2. 给出标准化Git提交规范，固定commit格式：feat(页面): 新增功能 / fix: 修复问题 / build: 打包部署
3. 全程配套提供全套Git命令：初始化仓库、绑定GitHub远程仓库、日常add/commit/push推送指令
4. 所有代码文件生成完成后，统一指导完成代码上传GitHub远程库，为render-deploy部署提供可用Git仓库源

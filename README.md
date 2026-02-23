# 简历编辑器 (ResumeCraft)

一个美观、强大且易用的简历生成工具，支持实时预览和PDF导出功能。

## 功能特性

- 简洁直观的编辑界面
- 实时简历预览
- 多种简历模板选择
- 支持导出为PDF格式
- 数据本地存储，防止意外丢失
- 响应式设计，支持多设备访问
- 支持导出和导入json格式，保存信息

## 技术栈

- React 18
- Material-UI
- html2canvas
- jsPDF
- React DnD

## 快速开始

1. 克隆项目：
   
   ```bash
   git clone <repository-url>
   cd resumecraft-frontend
   ```

2. 安装依赖：
   
   ```bash
   npm install
   ```

3. 启动开发服务器：
   
   ```bash
   npm start
   ```

4. 在浏览器中打开 `http://localhost:3000` 查看应用

## 使用说明

1. 在左侧编辑面板填写个人信息、工作经验、教育背景等内容
2. 右侧会实时显示简历预览效果
3. 完成编辑后点击"导出PDF"按钮下载简历文件

## 项目结构

```
src/
├── components/      # UI组件
│   ├── Editor/      # 编辑器组件
│   ├── Preview/     # 预览组件
│   └── UI/          # 通用UI组件
├── contexts/        # React上下文
├── services/        # 服务层
├── utils/           # 工具函数
├── hooks/           # 自定义Hook
├── styles/          # 样式文件
└── App.js           # 主应用组件
```

## 未来功能

- 更多样化的简历模板
- 云端存储支持
- AI优化建议
- 多语言支持



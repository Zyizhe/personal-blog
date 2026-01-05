# ⚡ 快速安装修复

## 🎯 需要做什么

安装新的依赖包以修复 Markdown 渲染问题。

## 📦 步骤 1: 安装依赖

在终端中运行：

```bash
npm install
```

这会安装以下新包：
- `react-markdown` - Markdown 渲染
- `remark-gfm` - GitHub Markdown 支持
- `rehype-highlight` - 代码语法高亮
- `rehype-raw` - HTML 支持

## 🔄 步骤 2: 重启服务器

```bash
# 按 Ctrl + C 停止当前服务器
# 然后重新启动
npm run dev
```

## ✅ 步骤 3: 验证

1. **验证头像**:
   - 访问 http://localhost:3000
   - 文章卡片应该显示彩色字母头像

2. **验证 Markdown**:
   - 点击任意文章
   - 内容应该正确格式化
   - 代码块应该有语法高亮

## 🎨 效果预览

### 头像效果
- 如果有真实头像 → 显示真实头像
- 如果没有头像 → 显示彩色字母头像（蓝底白字）

### Markdown 效果
- ✅ 标题层级清晰
- ✅ 代码块有深色背景和语法高亮
- ✅ 列表格式正确
- ✅ 链接可点击
- ✅ 引用块有左边框

## ⚠️ 注意事项

如果遇到问题：

1. **清除缓存**:
   ```bash
   rm -rf .next
   npm run dev
   ```

2. **重新安装**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run dev
   ```

3. **检查版本**:
   ```bash
   npm list react-markdown
   ```

## 🎉 完成！

安装完成后，你的博客应该：
- ✅ 显示漂亮的头像
- ✅ 正确渲染 Markdown 内容
- ✅ 代码块有语法高亮

---

**预计时间**: 2-3 分钟
**需要重启**: 是

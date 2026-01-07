#!/bin/bash

# 要删除的 MD 文件列表
md_files=(
  "ARCHITECTURE.md"
  "CHANGES_SUMMARY.md"
  "CHECKLIST.md"
  "DATA_MIGRATION_COMPLETE.md"
  "DOCUMENTATION_INDEX.md"
  "FIXES_APPLIED.md"
  "INSTALL_FIXES.md"
  "LOGIN_SETUP.md"
  "PROJECT_COMPLETION_REPORT.md"
  "PROJECT_OVERVIEW.md"
  "QUICK_START.md"
  "SUPABASE_SETUP.md"
  "TODO.md"
  "SAFARI_MOBILE_FIX.md"
  "CHINA_ACCESS_GUIDE.md"
)

# 要删除的 SQL 文件列表
sql_files=(
  "supabase-schema.sql"
  "supabase-seed.sql"
  "create-admin.sql"
  "create-author-trigger.sql"
  "increment-views-function.sql"
  "update-rls-policies.sql"
  "debug-images.sql"
)

# 要删除的 SH 文件列表（除了当前脚本）
sh_files=(
  # 如果有其他 .sh 文件，在这里添加
)

echo "从 Git 索引中删除文件（保留本地文件）..."
echo ""

# 删除 MD 文件
echo "📄 删除 Markdown 文件..."
for file in "${md_files[@]}"; do
  if git ls-files --error-unmatch "$file" > /dev/null 2>&1; then
    echo "  ✓ 删除: $file"
    git rm --cached "$file"
  else
    echo "  - 跳过: $file (未被追踪)"
  fi
done

echo ""
echo "🗄️  删除 SQL 文件..."
for file in "${sql_files[@]}"; do
  if git ls-files --error-unmatch "$file" > /dev/null 2>&1; then
    echo "  ✓ 删除: $file"
    git rm --cached "$file"
  else
    echo "  - 跳过: $file (未被追踪)"
  fi
done

echo ""
echo "🔧 删除 Shell 脚本文件..."
for file in "${sh_files[@]}"; do
  if git ls-files --error-unmatch "$file" > /dev/null 2>&1; then
    echo "  ✓ 删除: $file"
    git rm --cached "$file"
  else
    echo "  - 跳过: $file (未被追踪)"
  fi
done

echo ""
echo "✅ 完成！现在可以提交更改："
echo "  git commit -m 'chore: remove ignored files from repository'"
echo "  git push"
echo ""
echo "💡 提示：这些文件仍保留在本地，只是不再被 Git 追踪"

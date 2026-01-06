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
)

echo "从 Git 索引中删除文件（保留本地文件）..."

# 删除 MD 文件
for file in "${md_files[@]}"; do
  if git ls-files --error-unmatch "$file" > /dev/null 2>&1; then
    echo "删除: $file"
    git rm --cached "$file"
  else
    echo "跳过: $file (未被追踪)"
  fi
done

echo ""
echo "完成！现在可以提交更改："
echo "  git commit -m 'chore: remove ignored files from repository'"
echo "  git push"

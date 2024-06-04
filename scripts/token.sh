#!/bin/bash

if [ -f .npmrc ]; then
    cp .npmrc .npmrc.bak
    echo ".npmrc file has been backed up successfully"
else
    echo ".npmrc file not found"
fi

if [ -f .env.local ]; then
    export $(grep -v '^#' .env.local | xargs)
else
    echo ".env.local file not found"
    exit 1
fi

# 检查 GITHUB_TOKEN 是否存在
if [ -z "$GITHUB_TOKEN" ]; then
    echo "GitHub token not found in .env.local file"
    exit 1
fi

# 替换 .npmrc 文件中的占位符
if [ -f .npmrc ]; then
    sed -i.bak "s/\$YOUR_GITHUB_TOKEN/$GITHUB_TOKEN/g" .npmrc
    echo ".npmrc file has been updated successfully"
else
    echo ".npmrc file not found"
    exit 1
fi

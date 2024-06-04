#!/bin/bash

./scripts/token.sh

npm login --registry=https://npm.pkg.github.com --scope=@stevenleep

npm publish

if [ -f .npmrc.bak ]; then
    cp .npmrc.bak .npmrc
    echo ".npmrc file has been reset successfully"
else
    echo ".npmrc.bak file not found"
    exit 1
fi

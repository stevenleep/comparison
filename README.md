[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/stevenleep/comparison)

https://deepwiki.com/stevenleep/comparison/1-overview

![Feature](./feature.png)
<br />

# A semantic version comparison tool
You want to know if a version is greater than another version? This tool is for you!<br />
Usage Scenarios:
- *App Update*：you are developing an app and need to check if it needs to be updated!
- *Dependency Update...*
- *A version management platform for file systems*

## Install
```bash
pnpm install @stevenleep/comparison
```

## Features
- [Only one API](#API)
- [Compare semantic versions](./example/index.html)
- [Support pre-release tags](./example/custom-prerelease.html)
- [Support custom pre-release tags](./example/custom-prerelease-validate.html)
- [Support custom verification](./example/complex.html)
- [Support CoreCode based definition extension](./example/completely-customized.html)

## API
- [API Documents](https://branlice.github.io/version/modules.html)

  ```typescript
  import { compare } from "@stevenleep/comparison";

  const version1 = "1.0.0";
  const version2 = "2.0.0";

  const result = compare(version1, version2);
  result.isGreater; // false
  result.status; // negative
  ```
- the comparison of the version is only one of the application scenarios. Parser at the bottom only provides the ability to install specific characters split. You can expand a lot of things based on this (depending on your own interests and ideas)

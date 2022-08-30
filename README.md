![Feature](./feature.png)
<br />
A semantic version comparison tool

## Install

```bash
pnpm install @renovator/version
```

## Feature

- [Only one API](#API)
- [Compare semantic versions](./example/index.html)
- [Support pre-release tags](./example/custom-prerelease.html)
- [Support custom pre-release tags](./example/custom-prerelease-validate.html)
- [Support custom verification](./example/complex.html)
- [Support CoreCode based definition extension](./example/completely-customized.html)

## API

- [API Documents](https://branlice.github.io/version/modules.html)

  ```typescript
  import { compare } from "@renovator/version";

  const version1 = "1.0.0";
  const version2 = "2.0.0";

  const result = compare(version1, version2);
  result.isGreater; // false
  result.status; // negative
  ```
- the comparison of the version is only one of the application scenarios. Parser at the bottom only provides the ability to install specific characters split. You can expand a lot of things based on this (depending on your own interests and ideas)

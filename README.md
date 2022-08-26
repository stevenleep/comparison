# @renovator/version

A semantic version comparison tool

## API

- [x] [API Documents](https://branlice.github.io/version/modules.html)

## Example

### Normal

```typescript
import * as version from "@renovator/version";

version.compare("1.1.0", "1.0.0"); // { isGreater: true }
version.compare("1.0.0", "1.1.0"); // { isGreater: false }
version.compare("1.1.1", "1.1.0"); // { isGreater: true }
```

### Prerelease

```typescript
import { compare } from "@renovator/version";
compare("1.1.0-alpha", "1.1.0"); // { isGreater: true }
compare("1.1.0", "1.1.0-alpha"); // { isGreater: false }
compare("1.1.1-alpha", "1.1.0-alpha"); // { isGreater: true }
compare("1.1.1-alpha", "1.1.1"); // { isGreater: true }
compare("1.1.1-beta", "1.1.1-alpha"); // { isGreater: true }
```

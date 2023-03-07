# SMake C++ lib fmt
[fmt v9.1.0](https://github.com/fmtlib/fmt/tree/9.1.0)

```js
const { LLVM } = require('@smake/llvm');
const { vscode } = require('@smake/llvm-vscode');
const { LibFmt } = require('@smake/fmt');

const target = 'aarch64-apple-darwin';
const fmt = new LibFmt(target);
const test = new LLVM('test', target);
test.files = ['src/test.cc'];
LibFmt.config(test);
vscode(test);

module.exports = [fmt, test];
```
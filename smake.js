const { LLVM } = require('@smake/llvm');
const { vscode } = require('@smake/llvm-vscode');
const { LibFmt } = require('./lib');

const target = 'x86_64-pc-windows-msvc';
const fmt = new LibFmt(target);
const test = new LLVM('test', target);
test.files = ['src/test.cc'];
LibFmt.config(test);
vscode(test);

module.exports = [fmt, test];

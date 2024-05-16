import { resolve } from 'path';
import { LLVM } from '@smake/llvm';

const includeDir = resolve(__dirname, '..', 'fmt', 'include').replace(
  /\\/g,
  '/'
);
const filesDir = resolve(__dirname, '..', 'fmt', 'src').replace(/\\/g, '/');
const files = [filesDir + '/format.cc', filesDir + '/os.cc'];

type TargetType =
  | 'x86_64-apple-darwin'
  | 'arm64-apple-darwin'
  | 'x86_64-linux-gnu'
  | 'aarch64-linux-gnu'
  | 'arm-linux-gnueabihf'
  | 'x86_64-pc-windows-msvc'
  | 'i386-pc-windows-msvc'
  | string;
export class LibFmt extends LLVM {
  constructor(target: TargetType) {
    super('fmt', target);
    this.type = 'static';
    this.includedirs = [...this.includedirs, includeDir];
    this.files = files;
    if (target.includes('msvc')) {
      this.cxflags.push('/EHsc');
    } else if (target.includes('linux')) {
      this.cxflags.push('-fPIC');
    }
  }

  static config(llvm: LLVM) {
    const t = new LibFmt(llvm.target);
    llvm.includedirs = [...llvm.includedirs, includeDir];
    llvm.linkdirs = [...llvm.linkdirs, t.outputDir];
    llvm.libs = [...llvm.libs, t.name];
  }
}

import { sep, resolve } from 'path';
import { LLVM } from 'smake';

export function fmt(t: LLVM) {
  Object.defineProperty(t, 'sysIncludedirs', {
    value: [
      ...t.sysIncludedirs,
      resolve(__dirname, '..', 'fmt', 'include').replace(
        new RegExp(sep, 'g'),
        '/'
      ),
    ],
    configurable: true,
  });
  Object.defineProperty(t, 'cxxflags', {
    value: [...t.cxxflags, '-DFMT_HEADER_ONLY'],
    configurable: true,
  });
}

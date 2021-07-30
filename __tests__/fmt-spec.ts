import { fmt } from '../src/fmt';
import { LLVM_Darwin } from 'smake';
import { addLibs } from '@smake/libs';
import { resolve, sep } from 'path';

test('fmt', () => {
  class A extends LLVM_Darwin {
    files = [];
  }
  const B = addLibs(A, fmt, fmt, fmt);
  const b = new B();
  const p = resolve(__dirname, '..', 'fmt', 'include').replace(
    new RegExp(sep, 'g'),
    '/'
  );
  expect(b.sysIncludedirs.includes(p)).toBe(true);
  expect(b.cxxflags.includes('-DFMT_HEADER_ONLY')).toBe(true);
  expect(b.sysIncludedirs.length).toBe(3);
});

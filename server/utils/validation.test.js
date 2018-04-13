const expect = require('expect');
const {isRealString} = require('./validation');

describe('Testing isRealString func', () => {
  it('should reject non-string values', () => {
    const obj = {
      val: 1
    };
    const res = isRealString(obj);
    expect(res).toBe(false);
  })

  it('should reject string with only spaces', () => {
    const res = isRealString('    ');
    expect(res).toBe(false);
  })

  it('should accept strings with non space chars', () => {
    const res = isRealString('Lord of the Rings');
    expect(res).toBe(true);
  })
})

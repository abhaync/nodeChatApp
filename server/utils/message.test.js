const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'Abhay';
    const text = 'Hello';
    let res = generateMessage(from, text);
    expect(res.from).toBe(from);
    expect(res.text).toBe(text);
    expect(typeof res.createdAt).toBe('number');
  });
})

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const from = 'Abhay';
    const lat = 1;
    const lng = 1;
    const url = `https://www.google.com/maps?q=${lat},${lng}`;

    let res = generateLocationMessage(from, lat, lng);
    expect(res.from).toBe(from);
    expect(res.url).toBe(url);
    expect(typeof res.createdAt).toBe('number');
  })
})

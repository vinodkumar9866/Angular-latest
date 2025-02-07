import { DateOnlyPipe } from './date-format.pipe';

describe('DateFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new DateOnlyPipe();
    expect(pipe).toBeTruthy();
  });
});

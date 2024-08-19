import { TimeFormatWithoutSecondPipe } from './time-format-without-second.pipe';

describe('TimeFormatWithoutSecondPipe', () => {
  it('create an instance', () => {
    const pipe = new TimeFormatWithoutSecondPipe();
    expect(pipe).toBeTruthy();
  });
});

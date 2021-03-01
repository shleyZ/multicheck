
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jsdom-global/register';
import React from 'react';
import MultiCheck from './MultiCheck';
// TODO more tests

configure({adapter: new Adapter()});
describe('MultiCheck', () => {
  describe('initialize', () => {
    it('renders the label if label provided', (done) => {
      // TODO
      const wrapper = mount(
        <MultiCheck label='my-multi-check' options={[]} />
      );
      expect(wrapper.html()).toContain('<label>my-multi-check</label>');
      done()
    });
  });
});

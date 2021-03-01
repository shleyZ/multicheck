
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import 'jsdom-global/register';
import React from 'react';
import CheckBox from './CheckBox';
// TODO more tests

configure({adapter: new Adapter()});

describe('CheckBox', () => {
  describe('initialize', () => {
    it('test the checked props', (done) => {
      const wrapper = mount(
        <CheckBox checked={false} value="no" handleChanged={() => {}} />
      );
      expect(wrapper.find('input[type="checkbox"]').first().props().checked).toBe(false)
      done()
    });

    it('test the value props', (done) => {
      const wrapper = mount(
        <CheckBox checked={false} value="no" handleChanged={() => {}}/>
      );
      expect(wrapper.find('input[type="checkbox"]').first().props().value).toBe('no')
      done()
    });

    it('test the label props', (done) => {
      const wrapper = mount(
        <CheckBox checked={false} value="no" label="status" handleChanged={() => {}}/>
      );
      expect(wrapper.find('span').first().props().children).toBe('status')
      done()
    });
  });

  describe('snapshot', () => {
    it('get snapshot', () => {
      const wrapper = mount(
        <CheckBox checked={false} value="no" handleChanged={() => {}} />
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    })
  })
});

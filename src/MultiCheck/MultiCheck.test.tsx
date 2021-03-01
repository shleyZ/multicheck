
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import 'jsdom-global/register';
import React from 'react';
import MultiCheck from './MultiCheck';
import type { Option } from './MultiCheck';
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

    it('renders the columns if columns is not provided', (done) => {
      const options: Option[] = [
        {label: 'aaa', value: '111',},
        {label: 'bbb', value: '222',},
        {label: 'ccc', value: '333',},
        {label: 'ddd', value: '444',},
        {label: 'eee', value: '555',},
        {label: 'fff', value: '666',},
        {label: 'ggg', value: '777',},
        {label: 'hhh', value: '888',},
        {label: 'iii', value: '999',},
      ]
      const wrapper = mount(
        <MultiCheck label='my-multi-check' options={options}/>
      );
      expect(wrapper.find('.MultiCheckContent').children().length).toBe(1);
      done()
    });

    it('renders the columns if columns provided', (done) => {
      const options: Option[] = [
        {label: 'aaa', value: '111',},
        {label: 'bbb', value: '222',},
        {label: 'ccc', value: '333',},
        {label: 'ddd', value: '444',},
        {label: 'eee', value: '555',},
        {label: 'fff', value: '666',},
        {label: 'ggg', value: '777',},
        {label: 'hhh', value: '888',},
        {label: 'iii', value: '999',},
      ]
      const wrapper = mount(
        <MultiCheck label='my-multi-check' options={options} columns={6}/>
      );
      expect(wrapper.find('.MultiCheckContent').children().length).toBe(6);
      done()
    });
  });

  describe('snapshot', () => {
    it('get snapshot', () => {
      const wrapper = mount(
        <MultiCheck label='my-multi-check' options={[]} />
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    })
  })
});


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

    it('renders 1 columns if columns is not provided', (done) => {
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

    it('renders 6 columns if columns provided 6', (done) => {
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

    it('renders 2 columns', (done) => {
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
        <MultiCheck label='my-multi-check' options={options} columns={2}/>
      );
      expect(wrapper.find('.MultiCheckContent').children().length).toBe(2);
      done()
    });

    it('select all checked status must be true', (done) => {
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
      const checkedValues = [
        '111',
        '222',
        '333',
        '444',
        '555',
        '666',
        '777',
        '888',
        '999'
      ]
      const wrapper = mount(
        <MultiCheck label='my-multi-check' options={options} columns={2} values={checkedValues}/>
      );
      const columns = wrapper.find('.MultiCheckContent').children();
      const selectAll = columns.first().find('input[type="checkbox"]').first()
      expect(selectAll.props().checked).toBe(true);
      done()
    })
  });

  describe('status changed', () => {
    it('simulate checked all changed to false', (done) => {
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
      const checkedValues = [
        '111',
        '222',
        '333',
        '444',
        '555',
        '666',
        '777',
        '888',
        '999'
      ]
      const wrapper = mount(
        <MultiCheck label='my-multi-check' options={options} columns={2} values={checkedValues} />
      );
      
      const columns = () => wrapper.find('.MultiCheckContent').children();
      const selectAllEle = columns().first().find('input[type="checkbox"]').first();
      expect(selectAllEle.props().checked).toEqual(true);;
      selectAllEle.simulate('change', {target: {checked: false}});
      expect(wrapper.find('.MultiCheckContent').children().first().find('input[type="checkbox"]').first().props().checked).toEqual(false);;
      done()
    })

    it('simulate checked all changed to true', (done) => {
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
      const checkedValues = [
        '111',
      ]
      const wrapper = mount(
        <MultiCheck label='my-multi-check' options={options} columns={2} values={checkedValues} />
      );
      
      const columns = () => wrapper.find('.MultiCheckContent').children();
      const selectAllEle = columns().first().find('input[type="checkbox"]').first();
      expect(selectAllEle.props().checked).toEqual(false);;
      selectAllEle.simulate('change', {target: {checked: true}});
      expect(wrapper.find('.MultiCheckContent').children().first().find('input[type="checkbox"]').first().props().checked).toEqual(true);;
      done()
    })

    it('simulate checked item changed', (done) => {
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
      const checkedValues = [
        '222',
        '333',
        '444',
        '555',
        '666',
        '777',
        '888',
        '999'
      ]
      const wrapper = mount(
        <MultiCheck label='my-multi-check' options={options} columns={2} values={checkedValues} />
      );
      
      const columns = () => wrapper.find('.MultiCheckContent').children();
      const firstCheckEle = columns().first().find('input[type="checkbox"]').first();
      // expect the select all is unchecked
      expect(firstCheckEle.props().checked).toEqual(false);
      const unchecked = columns().first().find('input[type="checkbox"]').at(1);
      unchecked.simulate('change', {target: {checked: true}});
      expect(wrapper.find('.MultiCheckContent').children().first().find('input[type="checkbox"]').first().props().checked).toEqual(true);;
      done()
    })
  })

  describe('snapshot', () => {
    it('get snapshot', () => {
      const wrapper = mount(
        <MultiCheck label='my-multi-check' options={[]} />
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    })
  })
});

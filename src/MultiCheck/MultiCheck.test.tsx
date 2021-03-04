
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import 'jsdom-global/register';
import React from 'react';
import MultiCheck from './MultiCheck';
import type { Option } from './MultiCheck';
// TODO more tests

configure({adapter: new Adapter()});

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

describe('MultiCheck', () => {
  describe('initialize', () => {
    it('renders the label if label provided', () => {
      // TODO
      const wrapper = mount(
        <MultiCheck label='my-multi-check' options={[]} />
      );
      expect(wrapper.html()).toContain('<label>my-multi-check</label>');
    });

    it('renders 1 columns if columns is not provided', () => {
      const wrapper = mount(
        <MultiCheck label='my-multi-check' options={options}/>
      );
      expect(wrapper.find('.MultiCheckContent').children().length).toBe(1);
    });

    it('renders 6 columns if columns provided 6', () => {
      const wrapper = mount(
        <MultiCheck label='my-multi-check' options={options} columns={6}/>
      );
      expect(wrapper.find('.MultiCheckContent').children().length).toBe(6);
    });

    it('renders 2 columns', () => {
      const wrapper = mount(
        <MultiCheck label='my-multi-check' options={options} columns={2}/>
      );
      expect(wrapper.find('.MultiCheckContent').children().length).toBe(2);
    });

    it('select all checked status must be true', () => {
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
    })
  });

  describe('status changed', () => {
    it('simulate checked all changed to false', () => {
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
    })

    it('simulate checked all changed to true', () => {
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
    })

    it('simulate checked item changed', () => {
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

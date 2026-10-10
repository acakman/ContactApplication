import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import {__rows} from '@op-engineering/op-sqlite';
import Nav from '../navigators/navigator';

const flush = () => new Promise(resolve => setTimeout(resolve, 0));

const render = async () => {
  let tree;
  await ReactTestRenderer.act(async () => {
    tree = ReactTestRenderer.create(<Nav />);
    await flush();
  });
  return tree;
};

const texts = tree => tree.root.findAll(node => typeof node.props.children === 'string').map(node => node.props.children);

test('shows an empty state when there are no contacts', async () => {
  __rows.length = 0;
  const tree = await render();
  expect(texts(tree)).toContain('No contacts yet. Tap the add button to create one.');
});

test('lists contacts from the database', async () => {
  __rows.push({id: 1, firstname: 'Ada', lastname: 'Lovelace', number: '123', email: null, notes: null, image: null});
  const tree = await render();
  expect(texts(tree)).toContain('Ada Lovelace');
  expect(texts(tree)).toContain('AL');
});

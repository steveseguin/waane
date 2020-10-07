import { expect, test } from '@jest/globals'
import { contextMenu, setup } from './helpers'

test('has no node by default', () => {
  const { getGraphNodes } = setup()
  expect(getGraphNodes()).toHaveLength(0)
})

test('opens context menu on node editor', () => {
  const { nodeEditor, getMenuItems } = setup()
  contextMenu(nodeEditor)
  expect(getMenuItems().map((menuItem) => menuItem.textContent)).toEqual([
    'Oscillator',
    'Audio destination',
  ])
  document.body.dispatchEvent(new MouseEvent('mousedown'))
  expect(getMenuItems()).toHaveLength(0)
})

test('adds an oscillator node', () => {
  const { getGraphNodes, addAudioNode } = setup()
  addAudioNode('Oscillator')
  expect(getGraphNodes()).toEqual([
    expect.objectContaining({
      textContent: expect.stringContaining('Oscillator'),
      selected: true,
    }),
  ])
})

test('adds an audio destination node', () => {
  const { getGraphNodes, addAudioNode } = setup()
  addAudioNode('Audio destination')
  expect(getGraphNodes()).toEqual([
    expect.objectContaining({
      textContent: expect.stringContaining('Audio destination'),
      selected: true,
    }),
  ])
})

test('starts and stops oscillator', () => {
  const {
    handleAudioNodeStart,
    handleAudioNodeStop,
    getGraphNodes,
    getMenuItem,
    addAudioNode,
  } = setup()

  addAudioNode('Oscillator')

  expect(handleAudioNodeStart).toHaveBeenCalledTimes(1)

  const [oscillator] = getGraphNodes()
  contextMenu(oscillator)
  getMenuItem('Delete').click()

  expect(handleAudioNodeStop).toHaveBeenCalledTimes(1)
})
import { render, fireEvent, screen } from '@testing-library/vue'
import { expect, test } from 'vitest'
import CalculatorComponent from './CalculatorComponent.vue'

test('completes basic addition', async () => {
  render(CalculatorComponent)

  const num1 = screen.getByRole('button', {
    name: /1/i
  })
  const plus = screen.getByRole('button', {
    name: /\+/i
  })
  const num2 = screen.getByRole('button', {
    name: /5/i
  })
  const eq = screen.getByRole('button', {
    name: /=/i
  })
  const [input1, input2] = screen.getAllByRole('spinbutton')

  await fireEvent.click(num1)
  await fireEvent.click(plus)
  await fireEvent.click(num2)
  await fireEvent.click(eq)

  expect(input1.value).toBe('6')
  expect(input2.value).toBe('')
})

test('should allow continue calculations based on previous result', async () => {
  render(CalculatorComponent)

  const num1 = screen.getByRole('button', {
    name: /1/i
  })
  const plus = screen.getByRole('button', {
    name: /\+/i
  })
  const minus = screen.getByRole('button', {
    name: /\-/i
  })
  const num2 = screen.getByRole('button', {
    name: /5/i
  })
  const eq = screen.getByRole('button', {
    name: /=/i
  })
  const [input1, input2] = screen.getAllByRole('spinbutton')

  await fireEvent.click(num1)
  await fireEvent.click(plus)
  await fireEvent.click(num2)
  await fireEvent.click(eq)
  await fireEvent.click(minus)
  await fireEvent.click(num1)
  await fireEvent.click(eq)

  expect(input1.value).toBe('5')
  expect(input2.value).toBe('')
})

test('should delete result and do new calculation', async () => {
  render(CalculatorComponent)

  const num1 = screen.getByRole('button', {
    name: /1/i
  })
  const plus = screen.getByRole('button', {
    name: /\+/i
  })
  const minus = screen.getByRole('button', {
    name: /\-/i
  })
  const num2 = screen.getByRole('button', {
    name: /5/i
  })
  const num3 = screen.getByRole('button', {
    name: /7/i
  })
  const eq = screen.getByRole('button', {
    name: /=/i
  })
  const clear = screen.getByRole('button', {
    name: /c/i
  })
  const [input1, input2] = screen.getAllByRole('spinbutton')

  await fireEvent.click(num1)
  await fireEvent.click(plus)
  await fireEvent.click(num2)
  await fireEvent.click(eq)
  await fireEvent.click(clear)
  await fireEvent.click(num3)
  await fireEvent.click(minus)
  await fireEvent.click(num1)
  await fireEvent.click(eq)

  expect(input1.value).toBe('6')
  expect(input2.value).toBe('')
})

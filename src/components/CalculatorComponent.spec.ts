import { render, fireEvent, screen } from '@testing-library/vue'
import { expect, test } from 'vitest'
import CalculatorComponent from './CalculatorComponent.vue'

test('completes basic addition', async () => {
  const driver = getDriver()
  render(CalculatorComponent)

  await fireEvent.click(driver.getButtonByName('1'))
  await fireEvent.click(driver.getButtonByName('+'))
  await fireEvent.click(driver.getButtonByName('5'))
  await fireEvent.click(driver.getButtonByName('='))

  expect(driver.getInputAt(0).value).toBe('6')
  expect(driver.getInputAt(1).value).toBe('')
})

test('should allow continue calculations based on previous result', async () => {
  const driver = getDriver()
  render(CalculatorComponent)

  await fireEvent.click(driver.getButtonByName('1'))
  await fireEvent.click(driver.getButtonByName('+'))
  await fireEvent.click(driver.getButtonByName('5'))
  await fireEvent.click(driver.getButtonByName('='))
  await fireEvent.click(driver.getButtonByName('-'))
  await fireEvent.click(driver.getButtonByName('1'))
  await fireEvent.click(driver.getButtonByName('='))

  expect(driver.getInputAt(0).value).toBe('5')
  expect(driver.getInputAt(1).value).toBe('')
})

test('should delete result and do new calculation', async () => {
  const driver = getDriver()
  render(CalculatorComponent)

  await fireEvent.click(driver.getButtonByName('1'))
  await fireEvent.click(driver.getButtonByName('+'))
  await fireEvent.click(driver.getButtonByName('5'))
  await fireEvent.click(driver.getButtonByName('='))
  await fireEvent.click(driver.getButtonByName('C'))
  await fireEvent.click(driver.getButtonByName('7'))
  await fireEvent.click(driver.getButtonByName('-'))
  await fireEvent.click(driver.getButtonByName('1'))
  await fireEvent.click(driver.getButtonByName('='))

  expect(driver.getInputAt(0).value).toBe('6')
  expect(driver.getInputAt(1).value).toBe('')
})

const getDriver = () => ({
  getButtonByName: (name: string) =>
    screen.getByRole('button', {
      name
    }),
  getInputAt: (index: number) => screen.getAllByRole<HTMLInputElement>('spinbutton')[index]
})

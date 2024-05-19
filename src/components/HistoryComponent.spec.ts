import { render, fireEvent, screen } from '@testing-library/vue'
import { expect, test } from 'vitest'
import { default as HistoryComponent } from './HistoryComponent.vue'

test('should show history', async () => {
  const driver = getDriver()
  render(HistoryComponent)

  await fireEvent.click(driver.getButtonByName('1'))
  await fireEvent.click(driver.getButtonByName('+'))
  await fireEvent.click(driver.getButtonByName('5'))
  await fireEvent.click(driver.getButtonByName('='))

  await fireEvent.click(driver.getButtonByName('C'))
  await fireEvent.click(driver.getButtonByName('2'))
  await fireEvent.click(driver.getButtonByName('+'))
  await fireEvent.click(driver.getButtonByName('6'))
  await fireEvent.click(driver.getButtonByName('='))

  expect(driver.getLabelByText('1 + 5 = 6')).toBeDefined()
  expect(driver.getLabelByText('2 + 6 = 8')).toBeDefined()
})

test('should show history', async () => {
  const driver = getDriver()
  render(HistoryComponent)

  await fireEvent.click(driver.getButtonByName('1'))
  await fireEvent.click(driver.getButtonByName('+'))
  await fireEvent.click(driver.getButtonByName('5'))
  await fireEvent.click(driver.getButtonByName('='))

  await fireEvent.click(driver.getButtonByName('C'))
  await fireEvent.click(driver.getButtonByName('2'))
  await fireEvent.click(driver.getButtonByName('+'))
  await fireEvent.click(driver.getButtonByName('6'))
  await fireEvent.click(driver.getButtonByName('='))

  expect(driver.getLabelByText('1 + 5 = 6')).toBeDefined()
  expect(driver.getLabelByText('2 + 6 = 8')).toBeDefined()

  await fireEvent.click(driver.getButtonByName('Clear History'))

  expect(driver.getLabelByText('1 + 5 = 6')).toBeNull()
  expect(driver.getLabelByText('2 + 6 = 8')).toBeNull()
})

const getDriver = () => ({
  getButtonByName: (name: string) =>
    screen.getByRole('button', {
      name
    }),
  getLabelByText: (text: string) => screen.queryByText(text)
})

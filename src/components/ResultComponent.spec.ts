import { render, fireEvent, screen } from '@testing-library/vue'
import { expect, test, describe } from 'vitest'
import userEvent from '@testing-library/user-event'
import { default as ResultComponent } from './ResultComponent.vue'

describe('history action buttons', () => {
  test('should only show "import" button', async () => {
    const driver = getDriver()
    render(ResultComponent)

    expect(driver.getImportHistoryButton()).not.toBeNull()
    expect(driver.getExportHistoryButton()).toBeNull()
    expect(driver.getClearHistoryButton()).toBeNull()
  })

  test('should show history if calculations have been made', async () => {
    const driver = getDriver()
    render(ResultComponent)

    await driver.setInputAt(0, '5')
    await driver.setInputAt(1, '6')
    await fireEvent.click(driver.getCalculateButton())

    expect(driver.getImportHistoryButton()).not.toBeNull()
    expect(driver.getExportHistoryButton()).not.toBeNull()
    expect(driver.getClearHistoryButton()).not.toBeNull()
  })
})

describe('history', () => {
  test('should clear history', async () => {
    const equation = '4 + 5 = 9'
    const driver = getDriver()
    render(ResultComponent)

    await driver.setInputAt(0, '4')
    await driver.setInputAt(1, '5')
    await fireEvent.click(driver.getButtonByName('Calculate'))

    expect(driver.getLabelByText(equation)).not.toBeNull()

    await fireEvent.click(driver.getClearHistoryButton())

    expect(driver.getLabelByText(equation)).toBeNull()
  })

  test('should go back to history', async () => {
    const equations = ['4 + 5 = 9', '1 + 2 = 3', '3 + 3 = 6']
    const driver = getDriver()
    render(ResultComponent)

    await driver.setInputAt(0, '4')
    await driver.setInputAt(1, '5')

    await fireEvent.click(driver.getCalculateButton())

    await driver.setInputAt(0, '1')
    await driver.setInputAt(1, '2')

    await fireEvent.click(driver.getCalculateButton())

    await driver.setInputAt(0, '3')
    await driver.setInputAt(1, '3')

    await fireEvent.click(driver.getCalculateButton())

    expect(driver.getLabelByText(equations[0])).not.toBeNull()
    expect(driver.getLabelByText(equations[1])).not.toBeNull()
    expect(driver.getLabelByText(equations[2])).not.toBeNull()

    await fireEvent.click(driver.getLabelByText(equations[0]))

    expect(driver.getInputAt(0).value).toBe('4')
    expect(driver.getInputAt(1).value).toBe('5')
  })
})

describe('result', () => {
  test('should show calculated result', async () => {
    const driver = getDriver()
    render(ResultComponent)

    await driver.setInputAt(0, '4')
    await driver.setInputAt(1, '5')

    await fireEvent.click(driver.getCalculateButton())

    await fireEvent.click(driver.getCalculateButton())

    expect(driver.getLabelByText('Result: 9')).not.toBeNull()
  })
})

const getDriver = () => ({
  getButtonByName: (name: string) =>
    screen.queryByRole('button', {
      name
    }),
  getExportHistoryButton: () =>
    screen.queryByRole('button', {
      name: 'Export History'
    }),
  getClearHistoryButton: () =>
    screen.queryByRole('button', {
      name: 'Clear History'
    }),
  getCalculateButton: () =>
    screen.queryByRole('button', {
      name: 'Calculate'
    }),
  getImportHistoryButton: () => screen.queryByText('Import History'),
  getLabelByText: (text: string) => screen.queryByText(text),
  getInputAt: (index: number) => screen.getAllByRole<HTMLInputElement>('spinbutton')[index],
  setInputAt: async (index: number, value: string) => {
    const input = screen.getAllByRole('spinbutton')[index]
    await userEvent.clear(input)
    await userEvent.type(input, value)
  }
})

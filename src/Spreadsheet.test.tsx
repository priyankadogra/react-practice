import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Spreadsheet from './Spreadsheet'

describe('Spreadsheet', () => {
  it('lets users enter a value in a cell', async () => {
    const user = userEvent.setup()
    render(<Spreadsheet cols={2} rows={2} />)

    const cells = screen.getAllByRole('textbox')
    await user.type(cells[0], '42')

    expect(cells[0]).toHaveValue('42')
  })
})
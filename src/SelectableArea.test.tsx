import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import SelectableArea from './SelectableArea'

describe('SelectableArea', () => {
  it('text is displayed', async () => {
    const text = "The quick brown fox jumps over the lazy dog. It was a bright cold day in April.";
    render(<SelectableArea text={text}/>)

    const textElement = document.querySelector('.selectable-area');
    const textContent = textElement?.textContent;

    expect(textElement).toBeInTheDocument();
    expect(textContent).toBe(text);
  });
})
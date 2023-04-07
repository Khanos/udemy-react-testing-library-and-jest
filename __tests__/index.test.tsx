import { render, screen } from '@testing-library/react'
import Home from '@/pages/index'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })
    expect(heading).toBeInTheDocument()
  });

  it('shows 12 pokemons cards', async() => {
    render(<Home />);
    const cards = await screen.findAllByTestId('pokemon-card')
    expect(cards).toHaveLength(12);
  });
})

import { render, screen } from '@testing-library/react'

import Card from '@/pages/components/Card'

const setup = (overrideProps?: any) => {
  const defaultProps = {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
    ...overrideProps,
  }
  const wrapper = render(<Card item={defaultProps} />)
  return {
    wrapper,
  }
};

describe('Card', () => {
  it('should render a card with the pokemon name', async () => {
    setup();
    // screen.logTestingPlaygroundURL();
    const card = await screen.findByRole('heading', {
      name: /bulbasaur/i
    });
    expect(card).toBeInTheDocument();
  });
});
import { render, screen } from '@testing-library/react'

import Cards from '@/pages/components/Cards'

// Mock Card component
// this overrides the Card component with a mock component
jest.mock('./Card', () => {
  return function MockCard({ item }: any) {
    return <div data-testid="pokemon-card">{item.name}</div>
  }
});

const setup = (overrideProps?: any) => {
  const defaultProps = {
    items: [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
      { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
      { name: 'charmeleon', url: 'https://pokeapi.co/api/v2/pokemon/5/' },
      { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
      { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
      { name: 'wartortle', url: 'https://pokeapi.co/api/v2/pokemon/8/' },
      { name: 'blastoise', url: 'https://pokeapi.co/api/v2/pokemon/9/' },
      { name: 'caterpie', url: 'https://pokeapi.co/api/v2/pokemon/10/' },
      { name: 'metapod', url: 'https://pokeapi.co/api/v2/pokemon/11/' },
      { name: 'butterfree', url: 'https://pokeapi.co/api/v2/pokemon/12/' }
    ],
    ...overrideProps,
  };
  const wrapper = render(<Cards {...defaultProps} />);
  return {
    wrapper,
  }
};

describe('Cards', () => {
  it('should show a deader with th amount of pokemons', () => {
    setup();
    const header = screen.getByRole('heading', {
      name: /Pokemons/i,
    });
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent('Pokemons: 12');
  });

  it('should show 12 cards', () => {
    setup();
    // screen.logTestingPlaygroundURL();
    const cards = screen.getAllByTestId('pokemon-card');
    expect(cards).toHaveLength(12);
  });
});

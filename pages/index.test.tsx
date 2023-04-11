import {rest} from 'msw'
import {setupServer} from 'msw/node'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from '@/pages/index'
import { pokemonResponse, polemonDetailResponse } from '../mocks/data'

const server = setupServer(
  rest.get('https://pokeapi.co/api/v2/pokemon', (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(ctx.json({...pokemonResponse}))
  }),
  rest.get('https://pokeapi.co/api/v2/pokemon/*', (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(ctx.json({...polemonDetailResponse}))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', {
      name: /Welcome to pokemons!/i,
    })
    expect(heading).toBeInTheDocument()
  });

  it('shows 12 pokemons cards', async() => {
    render(<Home />);
    const cards = await screen.findAllByTestId('pokemon-card')
    expect(cards).toHaveLength(12);
  });

  it('should render 24 pokemon cards after load more button is clicked', async() => {
    render(<Home />);
    const loadMoreButton = await screen.findByRole('button', {
      name: /Load More/i,
    })
    expect(loadMoreButton).toBeInTheDocument();

    const cards = await screen.findAllByTestId('pokemon-card')
    expect(cards).toHaveLength(12);

    await userEvent.click(loadMoreButton);
    const newCards = await screen.findAllByTestId('pokemon-card')
    expect(newCards).toHaveLength(24);
  });
})

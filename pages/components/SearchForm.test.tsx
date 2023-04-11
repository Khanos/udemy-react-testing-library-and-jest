import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchForm from './SearchForm';


const setup = (overrideProps?: any) => {
  const defaultProps = {
    searchPokemons: jest.fn(),
    resetSearch: jest.fn(),
    search: '',
    setSearch: jest.fn(),
    ...overrideProps,
  };
  const wrapper = render(<SearchForm {...defaultProps} />);
  const searchInput = screen.getByTestId('search-input') as HTMLInputElement;
  const searchButton = screen.getByTestId('search-button') as HTMLButtonElement;
  return {
    user: userEvent.setup(),
    wrapper,
    searchInput,
    searchButton,
  }
};

describe('SearchForm', () => {
  it('shows a search input and a button', () => {
    // Render the stuff and find elements
    const { searchInput, searchButton } = setup();

    // Make sure the stuff is doing what it's supposed to
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it('should call searchPokemons when search button is clicked', async () => {
    const search = 'pikachu';
    const searchPokemons = jest.fn();
    const { user, searchButton } = setup({searchPokemons, search});
    await user.click(searchButton);
    expect(searchPokemons).toHaveBeenCalled();
    expect(searchPokemons).toHaveBeenCalledWith(search);
  });

  it('should call setSearch when the input is changed', async() => {
    const searchValues = [] as String[];
    const setSearch = jest.fn((value: string) => {
      searchValues.push(value);
    });
    const { searchInput } = setup({setSearch});
    await userEvent.type(searchInput, 'pikachu');
    expect(setSearch).toHaveBeenCalled();
    expect(setSearch).toHaveBeenCalledWith('p' && 'i' && 'k' && 'a' && 'c' && 'h' && 'u');
    expect(searchValues.join('')).toEqual('pikachu');
  });

  it('should call resetSearch when the input is emptyed out', async() => {
    const resetSearch = jest.fn();
    const search = 'pikachu';
    const { searchInput } = setup({resetSearch, search});
    expect(searchInput.value).toBe(search);
    await userEvent.clear(searchInput);
    expect(resetSearch).toHaveBeenCalled();
  });
});
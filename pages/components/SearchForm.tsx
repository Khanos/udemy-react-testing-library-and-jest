import React, { useState } from 'react';
import styles from '@/styles/SearchForm.module.css';

interface Props {
  searchPokemons: (search: string) => void;
  resetSearch: () => void;
  search: string;
  setSearch: (search: string) => void;
}
export default function SearchForm({searchPokemons, resetSearch, search, setSearch}: Props) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchPokemons(search);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    if (event.target.value === '') {
      resetSearch();
    }
  };
  return (
    <div className={styles['form-container']}>
      <form onSubmit={handleSubmit}>
        <label>
          Search:
          <input
            className={styles['form-input']}
            type="text"
            value={search}
            onChange={handleChange}
            data-testid='search-input'
          />
        </label>
        <div className={styles['form-button-container']}>
          <button type='submit' className={styles['form-button']} data-testid='search-button'>Search</button>
        </div>
      </form>
    </div>
  );
}
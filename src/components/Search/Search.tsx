import { useState } from 'react';
import { DebounceInput } from 'react-debounce-input'
import CountryDetails from '../../containers/CountryDetails/CountryDetails';
import { url } from '../../containers/HomePage/HomePage';
import { mapCountryData } from '../../helper';
import { CountryProps, GridRowProps } from '../../types';
import './Search.css';

export default function Search() {
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [results, setResults] = useState<CountryProps[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<GridRowProps[]>([]);
  const [searchString, setSearchString] = useState<string>('');

  const onSearch = (string: string) => {
    fetch(`${url}/${string}`)
      .then(response => response.json())
      .then(data => {
        const size = Math.min(data.length, 10);
        data.length = size;
        setResults(data);
        setShowSuggestions(true);
      })
      .catch(error => console.log(error))
    }

  const closeSuggestions = () => {
    setShowSuggestions(false);
    setSearchString('');
  }

  const closeDetails = () => setShowDetails(false);

  const openDetails = (index: number) => {
    const selected = mapCountryData(results[index])
    selected && setSelectedCountry(selected);
    setShowDetails(true);
  }

  const hendleSearch = (value: string) => {
    setSearchString(value);
    onSearch(value);
  };

  const renderSuggestionsPopup = (results: CountryProps[]) => {
    if (!results.length) {
      return (
        <div className='suggestions_wrapper'>No results found</div>
      )
    }
    return (
      <div className='suggestions_wrapper'>
        {results.length && results.map((country: CountryProps, index: number) => {
          return <div key={index} onClick={() => openDetails(index)}>{country.name}</div>
        })}
      </div>
    )
  }

  return (
    <>
      {showDetails && <CountryDetails
        closePopup={closeDetails}
        selectedCountry={selectedCountry}
      />}
      <div className='search_wrapper'>
        <DebounceInput
          value={searchString}
          placeholder='Search country'
          minLength={2}
          debounceTimeout={500}
          onChange={(e) => hendleSearch(e.target.value)}
        />
        <div className='suggestions_close' onClick={closeSuggestions}>&#10006;</div>
        {showSuggestions && renderSuggestionsPopup(results)}
      </div>
    </>
  )
};
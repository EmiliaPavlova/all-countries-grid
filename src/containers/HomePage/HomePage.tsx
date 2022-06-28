import { useState, useEffect, useRef } from 'react';
import CountryDetails from '../CountryDetails/CountryDetails';
import spinner from '../../assets/loading.gif';
import Header from '../../components/Header/Header';
import Grid from '../../components/Grid/Grid';
import { CountryProps, GridRowProps } from '../../types';
import { mapCountryData } from '../../helper';
import './HomePage.css';

export const url = '/countries';

export default function HomePage() {
  const [data, setData] = useState<CountryProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>();
  const [selectedCountry, setSelectedCountry] = useState<GridRowProps[]>([]);
  const [showCounter, setShowCounter] = useState<number>(0);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    setLoading(true);
    stopCounter();

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      })
  }, []);

  const startCounter = () => {
    let count = 5;
    intervalRef.current = setInterval(() => {
      setShowCounter(count);
      if (count === 0) {
        stopCounter();
        setOpenPopup(true);
      } else {
        count--;
      }
    }, 500);
  }

  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setShowCounter(0);
    }
  };

  const closePopup = () => setOpenPopup(false);

  const sourceData: GridRowProps[][] = (data && data.length && data.map((country: CountryProps) => mapCountryData(country))) || [];

  const onMouseDown = (data: GridRowProps[]) => {
    setSelectedCountry(data);
    setOpenPopup(false);
    startCounter();
  }

  const onMouseUp = () => stopCounter();

  const renderCounterPopup = () => {
    return <div className='popup_counter'>{showCounter}</div>
  }

  return (
    <div className='wrapper'>
      {!!showCounter && renderCounterPopup()}
      {openPopup && <CountryDetails
        closePopup={closePopup}
        selectedCountry={selectedCountry}
      />}
      <Header title='Countries' />
      <div className=''>
        {loading
          ? <div className=''><img src={spinner} alt='loading' /></div>
          : data && data.length
            ? <Grid
              data={sourceData}
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
            />
            : error
              ? <div>An error occured</div>
              : <div>No countries found</div>
        }
      </div>
    </div>
  );
}
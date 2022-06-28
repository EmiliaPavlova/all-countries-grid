import { GridRowProps } from "../../types"

type CountryDetailsProps = {
  closePopup: () => void;
  selectedCountry: GridRowProps[];
}

export default function CountryDetails({closePopup, selectedCountry}: CountryDetailsProps) {
  return (
    <div className='popup_details'>
      <div className='popup_details_header'>
        <div className='popup_details_title'>Country details</div>
        <div className='popup_details_close' onClick={closePopup}>&#10006;</div>
      </div>
      {selectedCountry.map((row: GridRowProps, index: number) => {
        return (
          <div className='popup_details_row' key={index}>
            <div>{row.label}: </div>
            <div>{row.source}</div>
          </div>
        )}
      )}
    </div>
  )
}
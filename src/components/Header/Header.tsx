import Search from '../Search/Search';
import './Header.css';

type HeaderProps = {
  title: string;
}

export default function Header(
  { title }: HeaderProps) {

  return (
    <div className='header'>
      <div className='header_title'>{title}</div>
      <Search />
    </div>
  )
};
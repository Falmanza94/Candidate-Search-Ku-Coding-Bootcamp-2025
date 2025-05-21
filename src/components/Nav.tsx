import { Link } from 'react-router-dom';

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <nav style={{ display: 'flex', gap: '1rem' }}>
      <Link to="/">Search</Link>
      <Link to="/saved">Saved Candidates</Link>
    </nav>
  )
};

export default Nav;

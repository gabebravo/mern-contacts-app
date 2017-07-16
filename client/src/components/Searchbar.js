import React from 'react'
import { Link } from 'react-router-dom'

const Searchbar = props => (
  <div className='list-contacts-top'>
    <input
      className='search-contacts'
      type='text'
      placeholder='Search contacts'
      value={props.searchValue}
      onChange={props.queryHandler}
    />
    <Link
      to='/newContact'
      className='add-contact'
    >Add Contact</Link>
  </div>
);

export default Searchbar;
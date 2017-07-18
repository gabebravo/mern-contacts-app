import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Searchbar = ({ searchValue, queryHandler }) => (
  <div className='list-contacts-top'>
    <input
      className='search-contacts'
      type='text'
      placeholder='Search contacts'
      value={searchValue}
      onChange={queryHandler}
    />
    <Link
      to='/newContact'
      className='add-contact'
    >Add Contact</Link>
  </div>
);

Searchbar.propTypes = {
  searchValue: PropTypes.string.isRequired, 
  queryHandler: PropTypes.func.isRequired
}

export default Searchbar;
import React from 'react'
import { Link } from 'react-router-dom'

const printContacts = (...args) => {
  let [arr, deleteFunc] = args;
  return arr.map( (contact, index) => {
    return (
        <li key={index} className='contact-list-item'>
        <div className='contact-details'>
          <p>{contact.name}</p>
          <p>{contact.email}</p>
        </div>
        <Link to={`/editContact/${contact._id}`}><i className="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></Link>
        <button className='contact-remove' onClick={() => deleteFunc(contact.email)}>
          Remove
        </button>
      </li>
    );
  })
}

const ContactList = props => (
  <ol className='contact-list'>
    {printContacts(props.contacts, props.handleDelete)}
  </ol>
);

export default ContactList;
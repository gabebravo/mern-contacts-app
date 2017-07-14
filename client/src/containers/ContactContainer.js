import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import ContactList from '../components/ContactList'

class ContactContainer extends Component {
  constructor(){
    super();
    this.state = {
      contacts: null
    }
  }

  componentDidMount(){
    axios.get('/contact')
      .then( response => {
        this.setState({ contacts: response.data });
      })
      .catch( error => {
        console.log(error);
      });
  }

  deleteContact = (email) => {
    axios.delete('/contact/delete', {
      params: { email: email }
    })
    .then( response => {
      this.setState({ contacts: response.data.contacts });
      console.log(response.data.message);
    })
    .catch( error => {
      console.log(error);
    });
  }

  render() {
    const contacts = this.state.contacts ? 
      <ContactList contacts={this.state.contacts} handleDelete={this.deleteContact} /> : '';
    return (
      <div className='list-contacts'>
        <div className='list-contacts-top'>
          <input
            className='search-contacts'
            type='text'
            placeholder='Search contacts'
            value=''
            //onChange={(event) => this.updateQuery(event.target.value)}
          />
          <Link
            to='/newContact'
            className='add-contact'
          >Add Contact</Link>
        </div>

        {/* {showingContacts.length !== contacts.length && (
          <div className='showing-contacts'>
            <span>Now showing {showingContacts.length} of {contacts.length} total</span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
        )} */}

        { contacts }
      </div>
    );
  }
}

export default ContactContainer;
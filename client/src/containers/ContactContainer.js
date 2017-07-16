import React, { Component } from 'react';
import axios from 'axios';

import ContactList from '../components/ContactList'
import Searchbar from '../components/Searchbar'

class ContactContainer extends Component {
  constructor(){
    super();
    this.state = {
      contacts: null, 
      searchTerm: ''
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

  updateQuery = (e) => {
    this.setState({ searchTerm: e.target.value });
  }

  filterItems = (query) => {
    let contactsArr = Array.from(this.state.contacts);
    return contactsArr.filter( contact => {
      return contact.name.toLowerCase().indexOf( query.toLowerCase() ) > -1; 
    })
  }

  render() {
    let contacts = '';
    if (this.state.searchTerm.length > 0) {
      contacts = <ContactList contacts={this.filterItems(this.state.searchTerm)} handleDelete={this.deleteContact} />
    } else if (this.state.contacts) {
      contacts = <ContactList contacts={this.state.contacts} handleDelete={this.deleteContact} />
    } 
    return (
      <div className='list-contacts'>
        <Searchbar searchValue={this.state.searchTerm} queryHandler={this.updateQuery} />
        { contacts }
      </div>
    );
  }
}

export default ContactContainer;
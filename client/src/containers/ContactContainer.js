import React, { Component } from 'react'
import axios from 'axios'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

import ContactList from '../components/ContactList'
import Searchbar from '../components/Searchbar'
import Modal from '../components/Modal'

class ContactContainer extends Component {

  state = {
    contacts: [], 
    searchTerm: '', 
    modalMessage: ''
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
      this.setState({ 
        contacts: response.data.contacts, 
        modalMessage: response.data.message 
      });
    })
    .catch( error => {
      console.log(error);
    });
  }

  updateQuery = (e) => {
    this.setState({ searchTerm: e.target.value.trim(), modalMessage: '' });
  }

  filterItems = (query) => {
    let contactsArr = Array.from(this.state.contacts); // make a copy of the current array, so as not to alter it
    const match = new RegExp(escapeRegExp(query), 'i'); // defines regex pattern: escapeRegExp = special chars as literals not regex chars / ignore case
    return contactsArr.filter( contact => match.test(contact.name)).sort(sortBy('name')); // only return matching instances 
  }

  resetContacts = () => this.setState({ searchTerm: '' });

  render() {
    let showingContacts = this.state.searchTerm.length > 0 ?
      <ContactList contacts={this.filterItems(this.state.searchTerm)} 
      handleDelete={this.deleteContact} /> : 
      <ContactList contacts={this.state.contacts} handleDelete={this.deleteContact} />;

    return (
      <div className='list-contacts'>
        {/* {JSON.stringify(this.state.searchTerm)} */}
        <Searchbar searchValue={this.state.searchTerm} queryHandler={this.updateQuery} />
        { showingContacts }

     {/* LOGIC FOR THE RESULTS AND RESET DISPLAY */}
        {this.state.searchTerm.length > 0 && showingContacts.length !== this.state.contacts.length && ( 
          <div className='showing-contacts'>
            <span>Now showing {showingContacts.props.contacts.length} of {this.state.contacts.length} total</span>
            <button onClick={this.resetContacts}>Show all</button>
          </div>
        )}

        { this.state.modalMessage.length > 0 && ( 
        <Modal message={this.state.modalMessage} /> )}
      </div>
    );
  }
}

export default ContactContainer;

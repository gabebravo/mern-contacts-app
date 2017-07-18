import React, { Component } from 'react';
import CreateForm from '../components/GeneralForm';
import axios from 'axios';

import Modal from '../components/Modal'

class CreateUserContianer extends Component {

  state = {
      name: '',
      email: '', 
      modalMessage: ''
  }

  setName = (e) => {
    this.setState({
      name: e.target.value, 
      modalMessage: ''
    });
  }

  setEmail = (e) => {
    this.setState({
      email: e.target.value, 
      modalMessage: ''
    });
  }

  setContactInfo = () => {
    axios.post('/contact/create', {
      name: this.state.name,
      email: this.state.email
    })
      .then( response => {
        this.setState({
          name: '', 
          email: '', 
          modalMessage: response.data.message
        });
      })
      .catch( error => {
        console.log(error);
      });
  }

  render() {
    const { name, email, modalMessage } = this.state;
    return (
      <div>
        <CreateForm btnText="Add Contact"
        name={name} email={email}
        handleName={this.setName} handleEmail={this.setEmail}
        handleSubmit={this.setContactInfo} 
        />
        { modalMessage.length > 0 && ( 
          <Modal message={modalMessage} /> )}
      </div>
    );
  }
}

export default CreateUserContianer;
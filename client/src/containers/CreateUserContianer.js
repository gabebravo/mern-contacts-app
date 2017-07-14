import React, { Component } from 'react';
import CreateForm from '../components/GeneralForm';
import axios from 'axios';

class CreateUserContianer extends Component {

  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: ''
    }
  }

  setName = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  setEmail = (e) => {
    this.setState({
      email: e.target.value
    });
  }

  setContactInfo = () => {
    axios.post('/contact/create', {
      name: this.state.name,
      email: this.state.email
    })
      .then( response => {
        console.log(response.data.message);
        this.setState({
          name: '', 
          email: ''
        });
      })
      .catch( error => {
        console.log(error);
      });
  }

  render() {
    return (
      <CreateForm btnText="Add Contact"
        name={this.state.name} email={this.state.email}
        handleName={this.setName} handleEmail={this.setEmail}
        handleSubmit={this.setContactInfo} 
      />
    );
  }
}

export default CreateUserContianer;
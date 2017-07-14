import React, { Component } from 'react';
import EditForm from '../components/GeneralForm';
import axios from 'axios';

class EditUserContianer extends Component {

  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '', 
      id: this.props.match.params.id
    }
  }
  
  componentDidMount(){
    axios.get('/contact/find', {
      params: { id: this.state.id }
    })
      .then( response => {
        this.setState({ name: response.data.name, email: response.data.email });
      })
      .catch( error => {
        console.log(error.message);
      });
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

  updateContactInfo = () => {
    axios.put('/contact/edit', {
      id: this.state.id,
      name: this.state.name,
      email: this.state.email
    })
      .then( response => {
        console.log(response.data.message);
        this.setState({ name: response.data.name, email: response.data.email });
      })
      .catch( error => {
        console.log(error);
      });
  }

  render() {
    return (
      <EditForm btnText="Update Contact"
        name={this.state.name} email={this.state.email}
        handleName={this.setName} handleEmail={this.setEmail}
        handleSubmit={this.updateContactInfo} 
      />
    );
  }
}

export default EditUserContianer;
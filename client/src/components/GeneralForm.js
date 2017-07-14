import React from 'react';
import { Link } from 'react-router-dom';

const GeneralForm = props => (
  <div>
    <Link className='close-create-contact' to='/'>Close</Link>
    <div className='create-contact-form'>
      <div className='create-contact-details'>
        <input type='text' value={props.name} name='name' 
          placeholder='Name' onChange={props.handleName} />
        <input type='text' value={props.email} name='email' 
          placeholder='Email' onChange={props.handleEmail} />
        <button onClick={props.handleSubmit}>{props.btnText}</button>
      </div>
    </div>
  </div>
);

export default GeneralForm;
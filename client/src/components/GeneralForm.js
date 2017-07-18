import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

const GeneralForm = props => {
  const { name, handleName, email, handleEmail, handleSubmit, btnText } = props
  return(
    <div>
      <Link className='close-create-contact' to='/'>Close</Link>
      <div className='create-contact-form'>
        <div className='create-contact-details'>
          <input type='text' value={name} name='name' 
            placeholder='Name' onChange={handleName} />
          <input type='text' value={email} name='email' 
            placeholder='Email' onChange={handleEmail} />
          <button onClick={handleSubmit}>{btnText}</button>
        </div>
      </div>
    </div>
  )
}

GeneralForm.propTypes = {
  name: PropTypes.string.isRequired,
  handleName: PropTypes.func.isRequired, 
  handleEmail: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  btnText: PropTypes.string.isRequired
}

export default GeneralForm;
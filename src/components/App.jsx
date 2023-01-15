import React, { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount(){
    console.log ('App componentDidMount');
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if(parsedContacts){
      this.setState({contacts: parsedContacts});
    }

  };

  componentDidUpdate(prevProps, prevState){
if (this.state.contacts !== prevState.contacts) {
  localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
}
  };


  findDubleContact = name => {
    const dubleContact = this.state.contacts.find(
      contact => contact.name === name
    );

    if (dubleContact) {
      return true;
    }
    return false;
  };

  formSubmitHandler = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    if (this.findDubleContact(name)) {
   
      alert(`${name} is already in contacts`);
      
      return false;
    }

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
    return true;
  };

  changeFilter = event => {
    this.setState({ filter: event.target.value });
  };

  getUpdateContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  handleDelete = id => {
    this.setState(prevState => {
      let newContactsList = prevState.contacts.filter(
        contact => contact.id !== id
      );

      return { contacts: newContactsList };
    });
  };

  render() {
    return (
      <div>
        <h1
          style={{
            display: 'block',
            fontSize: 32,
            color: '#010101',
            margin: 30,
          }}
        >
          Phonebook
        </h1>
        <ContactForm
          onSubmit={this.formSubmitHandler}          
        />
        <h2
          style={{
            display: 'block',
            fontSize: 32,
            color: '#010101',
            margin: 30,
          }}
        >
          Contacts
        </h2>
        <Filter value={this.state.filter} onChangeFilter={this.changeFilter} />
        <ContactList
          contacts={this.getUpdateContacts()}
          onDelete={this.handleDelete}
        />
      </div>
    );
  }
}


import { Component } from "react";
import ContactsForm from './ContactsForm/ContactsForm';
import ContactsList from './ContactsList/ContactsList'
import { nanoid } from "nanoid";

class App extends Component {

state = {
  contacts: [
          {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: "",
};
  
  addContact = (data) => {
    // Якщо контакт вже існує:
    const isExist = this.state.contacts.some(
    (contact) => contact.name.toLowerCase() === data.name.toLowerCase()
  );
    if (isExist) {
  alert(`${data.name} is already in contacts.`);
  return
}
    // Якщо контакта не існує додаємо його в state
    this.setState((prevState) => {
      const newContact = {
        id: nanoid(),
        ...data,
      };

      return { contacts: [...prevState.contacts, newContact] };
    });
  };

  deleteContact = (id) => {
    this.setState((prevState) => {
      // Треба повертати об'єкт для оновлення стану а не відфільтрований масив
      const newList = prevState.contacts.filter(contact => contact.id !== id)
      return {contacts: newList}
    })
  }

  // Лише зміна значення filter в state
  changeFitler = ({ target }) => {
    this.setState({
            filter: target.value
        })
  }
  
  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(({ name }) => name.toLowerCase().includes(normalizedFilter));
        return filteredContacts;
  }

  render() {
    const {addContact, deleteContact, changeFitler} = this;
        const contacts = this.getFilteredContacts();

    return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        fontSize: 30,
        color: '#010101'
      }}
    >
        <h1>Phonebook</h1>
        <ContactsForm onSubmit={addContact} />
        <h2>Contacts</h2>
        <h3>Find contacts by name</h3>
        <input name="filter" onChange={changeFitler} />
        <ContactsList items={contacts} deleteContact={deleteContact} />
    </div>
  );
    
  }
};

export default App;



// const search = target.value.toLowerCase();

//     this.setState((prevState) => {
//       const filterList = prevState.contacts.filter(contact => contact.name.toLowerCase().includes(search))
//       return {contacts: filterList}
//     })
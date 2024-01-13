import { Component } from "react";

class ContactsList extends Component {

  render() {
    const { items, deleteContact } = this.props; 
    const elements = items.map(({id, name, number }) => <li key={id}>{name}: {number}.  <button onClick={()=> deleteContact(id)} type="button">Delete</button></li>)
    
    return <ul>{elements }</ul>
  }
}

export default ContactsList;
import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListItems from './ListItems'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

// Adding the trash icon
library.add(faTrash)

class App extends React.Component {
// Sets all the variables
  constructor(props){
    super(props);
    this.state = {
      items:[],
      currentItem:{
        text:'',
        key:''
      }
    }
    this.addItem = this.addItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }

  //what happens when you click on add
  addItem(e){
    e.preventDefault();
    const newItem = this.state.currentItem;
    if(newItem.text !==""){
      const items = [...this.state.items, newItem];
    this.setState({
      items: items,
      currentItem:{
        text:'',
        key:''
      }
    })
    }
  }

  //Enables it to enter text in the input field.
  handleInput(e){
    this.setState({
      currentItem:{
        text: e.target.value,
        key: Date.now()
      }
    })
  }

  //Back-end about what happens when you click on the bin icon.
  deleteItem(key){
    const filteredItems= this.state.items.filter(item =>
      item.key!==key);
    this.setState({
      items: filteredItems
    })

  }

  //Back-end about what happen when you want to change the text of an item.
  setUpdate(text,key){
    console.log("items:"+this.state.items);
    const items = this.state.items;
    items.map(item=>{
      if(item.key===key){
        console.log(item.key +"    "+key)
        item.text= text;
      }
    })
    this.setState({
      items: items
    })
  }

// Front-end of the app. It shows the input fields and the buttons.

 render(){
  return (
    <div className="App">
    <div className = "Title">
    <h1> Mijn eerste <br/> To Do app </h1>
    </div>
      <header>
        <form id="to-do-form" onSubmit={this.addItem}>
          <input type="text" placeholder="Voer taak in" value= {this.state.currentItem.text} onChange={this.handleInput}></input>
          <button type="submit">Voeg toe</button>
        </form>
        <p>{this.state.items.text}</p>

          <ListItems items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate}/>

      </header>
    </div>
  );
 }
}


export default App;

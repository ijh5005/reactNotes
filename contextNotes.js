// the main component the bring in the other components
import React, { Component } from 'react';
import Provider from './context';
import Contact from './contact';

class App extends Component {
  render() {
    return (
      <Provider>
        <div>
          <Contact />
        </div>
      </Provider>
    );
  }
}

export default App;

// contact.js
import React, { Component } from 'react'
import Consumer from 'context';

class Contact extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { variable } = value;
          return (
            <div>
              {variable}
            </div>
          )
        }}
      </Consumer>
    );
  }
}

export default Contact;

// context.js
import React, { Component } from 'react'
const Context = React.createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case 'SOME_ACTION':
      return {
        ...state,
        somethingInState: state.somethingInState.filter(data => { data !== action.payload })
      }
      break;
    case 'ANOTHER_ACTION'
      return {
        ...state,
        someArray: [...state.someArray, action.payload]
      }
    default:
      return state
  }
}

export class Provider extends Component {
  state = {
    contacts: [
      {
        name: 'isaiah harrison',
        email: 'isaiahharrison14@gmail.com'
      }
    ],
    dispatch: action => {
      this.setState(state => {
        reducer(state, action)
      })
    }
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;


//inputs
...
state = {
  name: 'isaiah harrison',
  email: 'isaiahharrison14@gmail.com'
}
onSubmit = () => {
  e.preventDefault();
  ...
}
onChange = (e) => {
  this.setState({ [e.target.name]: e.target.value })
}
...
render(){
  const {name, email} = this.state;
  return (
    <form onSubmit={this.onSubmit}>
      <input name='name'  value={name}  onChange={this.onChange}/>
      <input name='email' value={email} onChange={this.onChange}/>
    </form>
  )
}

//inputs refs
...
constructor(props){
  super(props);
  this.nameInput  = React.createRef();
  this.emailInput = React.createRef();
}
static defaultProps = {
  name: 'isaiah harrison',
  emal: 'isaiahharrison14@gmail.com'
}
onSubmit = () => {
  e.preventDefault();
  const contact = {
    name: this.nameInput.current.value,
    emal: this.emailInput.current.value
  }
  ...
}
...
render(){
  const {name, email} = this.props;
  return (
    <form onSubmit={this.onSubmit}>
      <input name='name'  defaultValue={name}  onChange={this.onChange} ref={this.nameInput} />
      <input name='email' defaultValue={email} onChange={this.onChange} ref={this.emailInput}/>
    </form>
  )
}

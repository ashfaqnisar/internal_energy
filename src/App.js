import React from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from './firebase'


const FetchData = (props) => {
    return (
        <React.Fragment>
            {props.Data.map(mappedData => <PrintData {...mappedData}/>)}
        </React.Fragment>
    )
};
const PrintData = (props) =>{
    return (
      <div className="App">
        <header className="App-header">
          <p>Voltage: <a class="blue">{props.solar}V</a></p>
          <p>Current: <a class="blue">{props.estimatedConsumption}mA</a></p>
          <p>Power: <a class="blue">{props.consumption}mW</a></p>
          <p>Shunt Voltage: <a class="blue">{props.efficiency}mV</a></p>
        </header>
      </div>
    )
}
class App extends React.Component {
  state = {
    data : []
  }
  componentDidMount(){
    const dataRef = firebase.database().ref('home_data');//This is for the comments
        dataRef.on('value', (snapshot) => {
            let AllTheData = snapshot.val();
            let newState = [];

            for (let item in AllTheData) {
                newState.push({
                    id: item,
                    consumption: AllTheData[item].consumption,
                    estimatedConsumption: AllTheData[item].estimatedConsumption,
                    cost: AllTheData[item].cost,
                    solar: AllTheData[item].solar,
                    efficiency: AllTheData[item].efficiency
                });
            }
            this.setState({
                data: newState
            })
        });
    }
  constructor() {
    super();
  }
  render(){
    return(
      <FetchData Data = {this.state.data}/>
    )
  }
}

export default App;

import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import NewsContainer from './components/NewsContainer';
import{
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import About from './components/About';
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state = {
    progress:0
  }
  setProgress = (progress) => {
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
    <Router>
        <Navbar key={'navbar'}/>
        <LoadingBar key={'loadingbar'} color='white' height={3} progress={this.state.progress}/>
        
    <Routes>
        <Route exact path="/"  element={ <NewsContainer setProgress={this.setProgress} key={'general'} category="general" pageSize={15} country='in'/>} />
        <Route exact path="/technology"  element={ <NewsContainer setProgress={this.setProgress} key={'technology'} category="technology" pageSize={15} country='in'/>} />
        <Route exact path="/entertainment"  element={ <NewsContainer setProgress={this.setProgress} key={'entertainment'} category="entertainment" pageSize={15} country='in'/>} />
        <Route exact path="/business"  element={ <NewsContainer setProgress={this.setProgress} key={'business'} category="business" pageSize={15} country='in'/>} />
        <Route exact path="/sports"  element={ <NewsContainer setProgress={this.setProgress} key={'sports'} category="sports" pageSize={15} country='in'/>} />
        <Route exact path="/science"  element={ <NewsContainer setProgress={this.setProgress} key={'science'} category="science" pageSize={15} country='in'/>} />
        <Route exact path="/health"  element={ <NewsContainer setProgress={this.setProgress} key={'health'} category="health" pageSize={15} country='in'/>} />
        <Route exact path="/about"  element={ <About/>} />
    </Routes>

    </Router>
      </div>
    )
  }
}


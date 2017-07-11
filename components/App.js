import React, { Component } from 'react';
import { render } from 'react-dom';
import ViewJob from './viewJob.js';
import Job from './Job.js';
import Navbar from './Navbar.js';
import FormOfInformation from './Form.js';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
import $ from 'jquery';
import mapController from './../controller/mapController'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        //this.removeFloatFromRoot = this.removeFloatFromRoot.bind(this);
        //this.addFloatFromRoot = this.addFloatFromRoot.bind(this);
    }

    retrieveDataFromServer() {
        $.get('http://localhost:3000/api', (data) => {
          this.parseDataFromServer(data);
        });
    }

    parseDataFromServer(data) {
      let validLocations = mapController.getDistance(data);
       validLocations.then(jobdata => {
         mapController.filteredData = jobdata;
         this.setState({'jobs': jobdata})
       });
    }
    // Creates a job component for each job request in the database
    componentDidMount() {
        this.retrieveDataFromServer();
        console.log('passed');
    }

    // removeFloatFromRoot() {
    //     let root = document.getElementById('root');
    //     if (root.style.float = 'right') root.style.float = 'none';
    // }

    // addFloatFromRoot() {
    //     let root = document.getElementById('root');
    //     if (root.style.float = 'none') root.style.float = 'right';
    // }

    render() {
        // ViewJob Component with relevant props passed down 
            const customHistory = createBrowserHistory();

            const navBar = (props) => {
            return (
                <Navbar />
            );
            }

        const viewJob = (props) => {
            return (
                <ViewJob jobs={this.state.jobs} />
            );
        }
        // const styles = {
        //     float: 'none',
        //     'text-align': 'center',
        // }

        const form = (props) => {
            return (
                <FormOfInformation />
                // <FormOfInformation style={styles} />
            )
        }
        
        return (
            // React Router is used to render components based on the route specified
            
            <Router history={customHistory}>
                    {/*<ul>
                        <button ><Link 
                        to="/PostJob">PostJob</Link></button>
                        <button >
                            <Link to="/ViewJob">ViewJob</Link></button>
                    </ul>*/}
                    <div>
                        
                   <Route path="/" component={navBar} />
                    <div id='postjob'>
                   <Route path="/PostJob" component={form} />
                    </div>
                   <Route path="/ViewJob" component={viewJob} />
                   </div>
            </Router>
        )
    }
}

export default App;
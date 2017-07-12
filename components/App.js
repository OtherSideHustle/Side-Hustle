import React, { Component } from 'react';
import { render } from 'react-dom';
import ViewJob from './viewJob.js';
import Job from './Job.js';
import Navbar from './Navbar.js';
import FormOfInformation from './Form.js';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import $ from 'jquery';
import mapController from './../controller/mapController'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    retrieveDataFromServer() {
        console.log('running')
        $.get('http://localhost:3000/api', (data) => {
          this.parseDataFromServer(data);
        });
    }

    parseDataFromServer(data) {
      let validLocations = mapController.getDistance(data);
       validLocations.then(jobdata => {
         mapController.filteredData = jobdata;
         this.setState({'jobs': jobdata})
         sessionStorage.setItem('jobs', JSON.stringify(jobdata));
       });
    }
    // Creates a job component for each job request in the database
    componentDidMount() {
        this.retrieveDataFromServer();
        console.log('passed');
        console.log('from session', sessionStorage.getItem('jobs'));
        console.log(JSON.parse(sessionStorage.getItem('jobs')))
    }

    render() {
        // ViewJob Component with relevant props passed down 

            const navBar = (props) => {
            return (
                <Navbar />
            );
            }

        const viewJob = (props) => {
            console.log('state jobs', this.state.jobs);
            return (
                // <ViewJob jobs={this.state.jobs} />
                <ViewJob jobs={JSON.parse(sessionStorage.getItem('jobs'))} />
            );
        }

        const form = (props) => {
            return (
                <FormOfInformation />
            )
        }
        
        return (
            // React Router is used to render components based on the route specified
            
                <div>
                    <Route path="/" component={navBar} />
                    <div id='postjob'>
                        <Route path="/PostJob" component={form} />
                    </div>
                    <Route path="/ViewJob" component={viewJob} />
                </div>
        )
    }
}

export default App;
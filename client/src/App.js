import React from 'react';
import './App.css';
import VkAuth from './VkAuth'
import 'bootstrap/dist/css/bootstrap.css';
import Friends from './Friends';

const initState = {
    isLogon: false,
    firstName: "",
    lastName: "",
    userId: "",
    photo: ""
}

class App extends React.Component {
    constructor(props) {
        super(props);

        //localStorage.clear();       
        this.state = initState;
    }

    render() {
        if (this.state.isLogon) {
            return <React.Fragment>
                <nav className="navbar navbar-dark bg-primary">
                    <div className="navbar-brand">
                        <img src={this.state.photo} width="30" height="30" className="d-inline-block align-top rounded-circle" alt=""></img>
                        <strong className="ml-3">{this.state.firstName + " " + this.state.lastName}</strong>
                    </div>
                    <div className="navbar-right cursor-pointer" onClick={() => this.logout()}>
                        <span className="font-weight-light text-light">Выход</span>
                    </div>
                </nav>
                <div className="d-flex align-items-center justify-content-center h-100 mt-3">
                    <div className="d-flex flex-column">
                        <Friends userId={this.state.userId} />                        
                    </div>
                </div>
            </React.Fragment>
        }
        else {
            return <React.Fragment>
                <VkAuth login={(userName, userId, firstName, lastName, photo) => this.login(userName, userId, firstName, lastName, photo)} logout={() => this.logout()}/>
            </React.Fragment>
        }
    }    

    login(userName, userId, firstName, lastName, photo) {
        localStorage.setItem('user_id', userId);
        localStorage.setItem('user_name', userName);
        localStorage.setItem('first_name', firstName);
        localStorage.setItem('last_name', lastName);
        this.setState({
            isLogon: true,
            firstName: firstName,
            lastName: lastName,
            userId: userId
        });        
    }

    logout() {
        localStorage.clear();
        this.setState(initState);
    }

    componentDidMount() {
        let userId = localStorage.getItem('user_id');
        if (userId != null) {
            this.setState({
                isLogon: true,
                firstName: localStorage.getItem('first_name'),
                lastName: localStorage.getItem('last_name'),
                userId: userId
            });
        }
        else
            this.setState(initState);
    }    
}

export default App;


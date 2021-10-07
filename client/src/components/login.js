import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
 
export default class Create extends Component {
    // This is the constructor that stores the data.
    constructor(props) {
        super(props);
    
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    
        this.state = {
        username: "",
        password: "",
        };
    }
    
    // These methods will update the state properties.
    onChangeUsername(e) {
        this.setState({
        username: e.target.value,
        });
    }
    
    onChangePassword(e) {
        this.setState({
        password: e.target.value,
        });
    }
    
    // This function will handle the submission.
    onSubmit(e) {
        e.preventDefault();
    
        // When post request is sent to the login url, axios will try to find the user in the database.
        const user = {
            username: this.state.username,
            password: this.state.password,
        };
    
        axios
            .post("http://localhost:5000/user/login", user)
            .then((res) => console.log(res.data));
    
        // We will empty the state after getting the data from the database
        this.setState({
            username: "",
            password: "",
        });
    }
    
    // This following section will display the form that takes the input from the user.
    render() {
        return (
        <div style={{ margin: 20 }}>
            <h3>Welcome Back to Asha Music! </h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input
                    type="text"
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input
                    type="text"
                    className="form-control"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    />
                </div>
                <div className="form-group">
                    <input
                    type="submit"
                    value="Login"
                    className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
        );
    }
}
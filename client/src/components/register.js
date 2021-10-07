import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
 
export default class Create extends Component {
    // This is the constructor that stores the data.
    constructor(props) {
        super(props);
    
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeDOB = this.onChangeDOB.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        dob: "",
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
    
    onChangeFirstName(e) {
        this.setState({
        firstName: e.target.value,
        });
    }

    onChangeLastName(e) {
        this.setState({
        lastName: e.target.value,
        });
    }

    onChangeEmail(e) {
        this.setState({
        email: e.target.value,
        });
    }

    onChangeDOB(e) {
        this.setState({
        dob: e.target.value,
        });
    }
    
    // This function will handle the submission.
    onSubmit(e) {
        e.preventDefault();
    
        // When post request is sent to the create url, axios will add a new user to the database.
        const newUser = {
            username: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            dob: this.state.dob,
        };
    
        axios
            .post("http://localhost:5000/user/register", newUser)
            .then((res) => console.log(res.data));
    
        // We will empty the state after posting the data to the database
        this.setState({
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            email: "",
            dob: "",
        });
    }
    
    // This following section will display the form that takes the input from the user.
    render() {
        return (
        <div style={{ margin: 20 }}>
            <h3>Welcome to Asha Music! </h3>
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
                    <label>First Name: </label>
                    <input
                    type="text"
                    className="form-control"
                    value={this.state.firstName}
                    onChange={this.onChangeFirstName}
                    />
                </div>
                <div className="form-group">
                    <label>Last Name: </label>
                    <input
                    type="text"
                    className="form-control"
                    value={this.state.lastName}
                    onChange={this.onChangeLastName}
                    />
                </div>
                <div className="form-group">
                    <label>Email: </label>
                    <input
                    type="text"
                    className="form-control"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    />
                </div>
                <div className="form-group">
                    <label>Date of Birth - mm/dd/yyyy:</label>
                    <input
                    type="text"
                    className="form-control"
                    value={this.state.dob}
                    onChange={this.onChangeDOB}
                    />
                </div>
                <div className="form-group">
                    <input
                    type="submit"
                    value="Create Account"
                    className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
        );
    }
}
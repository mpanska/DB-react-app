import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Register extends Component {

    state = {
        name: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
        errors: [] //error can happen not only in one part (u can have wrong pssw and email)
    }

    
    handleChange = event =>{
        this.setState({[event.target.name]:event.target.value }) //the value as we type smth the text changes
    }

    submitForm = event =>{
        event.preventDefault(); 
        let dataToSubmit ={
            name: this.state.name,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            passwordConfirm: this.state.passwordConfirm
        };

        if(this.isFormvalid(this.state)){ //if validation is true
            
        } else{
            console.log("Invalid input on form, or no input at all.");
        }
    }

    isFormvalid = () => {
        let errors = [];
        let error;

        if(this.isFormEmpty(this.state)){
            error = { message: "It is required to fill all fields."}
        }
    }

    isFormEmpty = ({ name, lastName, email, password, passwordConfirm  }) => {
        return( //if we dont have any of this
            !name.length || !lastName.length || !email.length || !password.length || !passwordConfirm.length
        );
    }




    render() {
        return (
            <div className="container">
                <h1>Sign up</h1>
                <div className="row">

                    <form className="col s12"> 
    
                    <div className="row">
                            <div className= "input-field col s12">
                                <input 
                                    name="name" 
                                    value={this.state.name}  
                                    onChange={e => this.handleChange(e)} //if we type - u see what u type
                                    id="name"
                                    type="text"
                                    className="validate" //materialize css feature
                                    placeholder="Name"
                                />

                                <span 
                                    className="helper-text"
                                    data-error="Wrong email input"//if validation fails we get this error
                                    data-sccess="right"
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className= "input-field col s12">
                                <input 
                                    name="lastName" 
                                    value={this.state.lastName}  
                                    onChange={e => this.handleChange(e)} //if we type - u see what u type
                                    id="lastName"
                                    type="text"
                                    className="validate" //materialize css feature
                                    placeholder="Last name"
                                />

                                <span 
                                    className="helper-text"
                                    data-error="Wrong email input"//if validation fails we get this error
                                    data-sccess="right"
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className= "input-field col s12">
                                <input 
                                    name="email" 
                                    value={this.state.email}  
                                    onChange={e => this.handleChange(e)} //if we type - u see what u type
                                    id="email"
                                    type="email"
                                    className="validate" //materialize css feature
                                    placeholder="Email"
                                />

                                <span 
                                    className="helper-text"
                                    data-error="Wrong email input"//if validation fails we get this error
                                    data-sccess="right"
                                />
                            </div>
                        </div>
    
                        <div className="row">
                            <div className= "input-field col s12">
                                <input 
                                    name="password" 
                                    value={this.state.password} 
                                    onChange={e => this.handleChange(e)} 
                                    placeholder="Password"
                                    id="password"
                                    type="password"
                                    className="validate" //materialize css feature
                                />
                                
                                <span 
                                    className="helper-text"
                                    data-error="Wrong password input"//if validation fails we get this error
                                    data-sccess="right"
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className= "input-field col s12">
                                <input 
                                    name="passwordConfirm" 
                                    value={this.state.passwordConfirm} 
                                    onChange={e => this.handleChange(e)} 
                                    placeholder="Confirm password"
                                    id="passwordConfirm"
                                    type="password"
                                    className="validate" //materialize css feature
                                />
                                
                                <span 
                                    className="helper-text"
                                    data-error="Wrong password input"//if validation fails we get this error
                                    data-sccess="right"
                                />
                            </div>
                        </div>
    
                            
                            {this.state.errors.length > 0 && ( //if there's at least 1 error
                                <div>
                                    {this.displayErrors(this.state.errors)}
                                </div>
                            )}
    
                            <div className="row">
                                <div className="col 12">
                                    <Link to="/register">
                                        <button 
                                            className="btn-large green"
                                            type="submit"
                                            name="action"
                                        >
                                            Sign up
                                        </button>
                                    </Link>
                                </div>
                            </div>
    
                        </form>
                </div>
            </div>
        );
    }
}

export default Register;
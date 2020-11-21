import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/user_actions';
import { Link } from 'react-router-dom';

// styling done with  materializecss

class LoginRegister extends Component {

    state = {
        email: "",
        password: "",
        errors: [] //error can happen not only in one part (u can have wrong pssw and email)
    }

    displayErrors = errors => errors.map((error, i) => <p key={i}>{error}</p> ) //i - index if errors array; foreach
    

    handleChange = event =>{
        this.setState({[event.target.name]:event.target.value }) //the value as we type smth the text changes
    }

    submitForm = event =>{
        event.preventDefault(); 
        let dataToSubmit ={
            email: this.state.email,
            password: this.state.password
        };

        if(this.isFormvalid(this.state)){ //if validation is true
            this.setState({ errors: []})
            this.props.dispatch(loginUser(dataToSubmit))
            .then(response =>{
                console.log(response)

                if(response.payload.loginSuccess){
                    this.props.history.push('/home')
                } else{
                    this.setState({ errors: this.state.errors.concat("Email or parrword are wrong. Please, try again.") })
                }
            })
        } else{
            console.log("Invalid input on form, or no input at all.");
        }
    }

    isFormvalid = ({email, password}) => email && password;
   

//---------------------------------CONTENT TO RENDER--------------------------------------------------------------   
    render() {
        return (
            <div className="container">
                <h1>Log in</h1>

                <div className="row">
                    <form className="col s12"> 

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

                        
                        {this.state.errors.length > 0 && ( //if there's at least 1 error
                            <div>
                                {this.displayErrors(this.state.errors)}
                            </div>
                        )}

                        <div className="row">
                            <div className="col 12">
                                <button 
                                    className="btn-large green"
                                    type="submit"
                                    name="action"
                                    onClick={this.submitForm}
                                >
                                    Log in
                                </button>
                            </div>
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

function mapStateToProps(state){
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(LoginRegister);
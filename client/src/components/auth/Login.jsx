import React from 'react'
import PropTypes from 'prop-types'

class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this)
  }
    onChange(e){
      this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e){
      e.preventDefault();

      const loginInfo = {
        email: this.state.email,
        password: this.state.password
      }
      console.log(loginInfo);
    }


  render () {
    return(
      <div class="login">
        <div class="container">
          <div class="row">
            <div class="col-md-8 m-auto">
              <h1 class="display-4 text-center">Log In</h1>
              <p class="lead text-center">Sign in to your DevConnector account</p>
              <form onSubmit={this.onSubmit}>
                <div class="form-group">
                  <input onChange={this.onChange} type="email" class="form-control form-control-lg" placeholder="Email Address" name="email" />
                </div>
                <div class="form-group">
                  <input onChange={this.onChange} type="password" class="form-control form-control-lg" placeholder="Password" name="password" />
                </div>
                <input type="submit" class="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>

    )

  }
}

export default Login;

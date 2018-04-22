import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    this.isUserLoggedIn();
  }

  isUserLoggedIn() {
    axios.get('/user/session')
      .then((res) => {
        console.log('response', res)
        // if user is in session
        if (res.data.id) {
          this.setState({ user: res.data })
        }
        // this.props.history.push('/protected')
      }).catch((err) => console.log(err));
  };

  createLoginButton() {
    if (!this.state.user) {
      return (
        <a href="http://localhost:5000/auth/google" className='button'>Login with Google</a>
      );
    }
  }

  createLogoutButton() {
    if (this.state.user) {
      return (
        <a href="http://localhost:5000/logout" className='button'>Logout</a>
      );
    }
  }

  createUserInfo() {
    if (this.state.user) {
      return (
        <div>
          <p>Google Id: {this.state.user.id}</p>
          <p>Name: {this.state.user.displayName}</p>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.createLoginButton()}
        {this.createLogoutButton()}
        {this.createUserInfo()}
      </div>
    );
  }

}

export default Login;

// import React, { Component } from 'react';
//
// export default class LoginForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: '',
//       password: '',
//     };
//
//     // this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//
//   // handleChange(event) {
//   //   this.setState({value: event.target.value});
//   // }
//
//   handleSubmit(event) {
//     alert('A name was submitted: ' + this.state.username);
//     event.preventDefault();
//   }
//
//   render() {
//     return (
//       <div>
//         <h3>Please Login</h3>
//         <form onSubmit={this.handleSubmit}>
//           <p>
//             Username:
//             <input type="text" value={this.state.username} />
//           </p>
//           <p>
//             Password:
//             <input type="text" value={this.state.password} />
//           </p>
//           <input type="submit" value="Submit" />
//         </form>
//       </div>
//     );
//   }
// }

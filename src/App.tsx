import React, { Component } from 'react';

// test imports
import TextField from '@material-ui/core/TextField';

class App extends Component {

    render() {
    return (
      <div className="App">
          <TextField
              id="filled-email-input"
              label="Email"
              className={"authEmail"}
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              variant="filled"
          />
          <TextField
              id="filled-password-input"
              label="Password"
              className={"authPassword"}
              type="password"
              autoComplete="current-password"
              margin="normal"
              variant="filled"
          />
      </div>
    );
  }
}

export default App;

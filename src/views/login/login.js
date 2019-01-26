import React from "react";
import { withRouter } from "react-router";
import style from "./login.css";
import { Button, Modal, ModalFooter, ModalBody, ModalHeader } from "reactstrap";
import { Form, FormGroup, Label, Input } from 'reactstrap';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      loading: false,
      ModalState: false
    };
  }

  click(e) {
    this.setState({ loading: true })
    setTimeout(() => {
      this.setState({ loading: false })
    }, 2000)
  }

  emailChange(e) {
    this.setState({ selected_email: e.target.value });
  }

  passwordChange(e) {
    this.setState({ selected_password: e.target.value });
  }

  signIn(e) {
    let x = false;
    this.props.users.map(user => {
      if (user.email === this.state.selected_email && user.password === this.state.selected_password)
        x = true;
    })
    if (x === true) {
      this.props.signedIn(this.state.selected_email);
      this.props.history.push("/profile");
    }
  }

  handleChange(e) {
    this.setState({ login: e.target.value })
    console.log(this.state.login);
  }

  toggle(e) {
    let currState = this.state.ModalState;
    this.setState({ ModalState: !currState })
  }

  handleEmailChangeForRegistaration(e) {
    this.setState({ email: e.target.value })
  }

  handlePasswordChangeForRegistaration(e) {
    this.setState({ password: e.target.value })
  }

  registration(e) {
    if (this.state.email === "") {
      this.setState({ error: "error!" })
    } else {
      this.props.newUser({ email: this.state.email, password: this.state.password }); this.setState({ ModalState: false })
    }
  }

  render() {
    return <div className={style.container}>
      <div>
        <div className={style.inputs}>
          <div className={style.inp_rows}><span className={style.L}>Email</span> <input className={style.authInputs} type="text" onChange={(e) => this.emailChange(e)} /></div>
          <div className={style.inp_rows}><span className={style.L}>Password</span> <input className={style.authInputs} type="password" onChange={(e) => this.passwordChange(e)} /></div>
        </div>
        <button className={style.submitBtn} onClick={(e) => this.signIn()}>Submit</button>
        {(this.state.incorrect) ? <div>Wrong password!</div>
          : null
        }
      </div>
      <div className={style.aboutUs}>
        <div>About us</div>
      </div>
      <div> 
        <ol>
          {this.props.users.map(user=><li>{user.email} </li>)} 
        </ol>
      </div>
      <div>
        {this.state.loading ? "Loading" :
          <div>
            <input type="password" onChange={this.handleChange.bind(this)} />
            <Button onClick={this.click.bind(this)} >Hello!</Button>
            <Button color="link" onClick={this.toggle.bind(this)}>Registration</Button>
          </div>
        }
        <Modal isOpen={this.state.ModalState} toggle={this.toggle.bind(this)}>
          <ModalHeader><span style={{ color: "red" }}>Registration</span></ModalHeader>
          <ModalBody>{this.state.error !== "" ? this.state.error : null}
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input type="email" name="email" onChange={this.handleEmailChangeForRegistaration.bind(this)} id="exampleEmail" placeholder="email" />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input type="password" name="password" onChange={this.handlePasswordChangeForRegistaration.bind(this)} id="examplePassword" placeholder="password" />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.registration.bind(this)}>Registration</Button>
            <Button onClick={this.toggle.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>


  }
}

export default withRouter(Login);
import React, { Component } from 'react';
import {Button, Col} from 'react-bootstrap';
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class TokenFrame extends Component {
    constructor(props) {
    super(props);
    this.state = {
      authClient: this.props.client,              
      options: this.props.options,
      isRedirected: (this.props.isRedirected === "true"),
      verifyRespData: "Verification Response Data",
      token: this.props.token,
      tokenValue: "",
      idToken: "",
      accessToken: "",
      decodeRespData: "Decode Response Data",
      userInfoData: "User Info Data"
    };
    this.verifyToken = this.verifyToken.bind(this);
    this.handleTokenInput = this.handleTokenInput.bind(this);
    this.decodeToken = this.decodeToken.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  verifyToken() {
    if(this.state.isRedirected) {
        var aClient = this.state.authClient;
        var that = this;

       console.log("Id-Token:"+this.props.token[0]);

       aClient.token.verify(this.props.token[0])
         .then(function () {
           // the idToken is valid
           that.setState({
             verifyRespData: "Id Token is Valid.",
             idToken: that.props.token[0],
             accessToken: that.props.token[1],
             tokenValue: that.props.token[0].idToken
           });
         })
         .catch(function (err) {
           that.setState({
             verifyRespData: "Token Verification Error:" + err
           });
         });
    }
    
  }

  handleTokenInput(e) {
    this.setState({tokenValue: e.target.value});
  } 

  decodeToken() {
    console.log("Token-Value:" + this.state.tokenValue);

    try {
      var decodedToken = this.state.authClient.token.decode(this.state.tokenValue);
      var decodeResult = JSON.stringify(decodedToken,null,"\t");
      this.setState({ decodeRespData: decodeResult });
    }
    catch (err) {
      this.setState({ decodeRespData: err });
    }
  }

  getUserInfo() {
 
    var that = this;
    
    this.state.authClient.token.getUserInfo(this.state.accessToken)
      .then(function (user) {
        that.setState({
          userInfoData: JSON.stringify(user,null,"\t")
        });
      })
      .catch(function (err) {
        that.setState({
          userInfoData: "Can't get User Info:" + err,
        });
      });
  }

  render() {
    return (
      <Form horizontal>

        <FormGroup controlId="formVerifyButton">
          <Col smOffset={1} sm={10}>
            <Button bsStyle="primary" componentClass="submit" onClick={this.verifyToken}>Verify Id Token</Button>
          </Col>
        </FormGroup>
        <FormGroup controlId="formVerifyResp">
          <Col componentClass={ControlLabel} sm={4}>
            Verification Response:
          </Col>
          <Col sm={6}>
            <FormControl componentClass="textarea" rows="1" value={this.state.verifyRespData} />
          </Col>
        </FormGroup>

        <FormGroup controlId="formDecodeButton">
          <Col smOffset={1} sm={10}>
            <Button bsStyle="primary" componentClass="submit" onClick={this.decodeToken}>Decode Token</Button>
          </Col>
        </FormGroup>
        <FormGroup controlId="formDecodeInput">
          <Col componentClass={ControlLabel} sm={4}>
            Input Token:
          </Col>
          <Col sm={6}>
            <FormControl componentClass="textarea" rows="1" value={this.state.tokenValue} onChange={this.handleTokenInput} />
          </Col>
        </FormGroup>
        <FormGroup controlId="formDecodeResp">
          <Col componentClass={ControlLabel} sm={4}>
            Decode Response:
          </Col>
          <Col sm={6}>
            <FormControl componentClass="textarea" rows="5" value={this.state.decodeRespData} />
          </Col>
        </FormGroup>

        <Form horizontal>
          <FormGroup controlId="formUserButton">
            <Col smOffset={1} sm={10}>
              <Button bsStyle="primary" componentClass="submit" onClick={this.getUserInfo}>Get User Info</Button>
            </Col>
          </FormGroup>
          <FormGroup controlId="formUserResp">
            <Col componentClass={ControlLabel} sm={4}>
              User Info Response:
          </Col>
            <Col sm={6}>
              <FormControl componentClass="textarea" rows="10" value={this.state.userInfoData} />
            </Col>
          </FormGroup>
        </Form>

      </Form>

    );
  }
}

export default TokenFrame;

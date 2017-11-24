This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Configuration](#configuration)
  - [Okta](#okta)
  - [Client](#client)

## Overview

This application is a reference implementation of OAuth2/OpeinId implicit grant flow. It is built to verify Okta client libraries, configuration and implicit flow details. 
The proof-of-concept features include:

* `Authentication` client is authenticated against Okta.
* `Token Validation` access token is validated using Okta libraries.
* `OpenId user info` user information can be retrieved using OpenId getUserInfo.

>Note: This application represents a sample of public client. The features listed above are for client only. The backend reference implementation for REST API is provided separately.

>Note: This application shouldn't be used as a reference for best practices of React app development. It is built using older pre-16.0 version of React.

## Installation

`npm install`

Install all dependencies from package.json

## Configuration

Both client and Okta components need to be configured. The assumption is that you have an account in Okta.

### Okta

* Auth server configuration
* Application

### Client

* Auth server Url.
* Client Id
* Redirect URL


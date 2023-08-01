[![Actions Status](https://github.com/Auqpiro/frontend-project-12/workflows/hexlet-check/badge.svg)](https://github.com/Auqpiro/frontend-project-12/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/7339edd6a66ae6cfbfd4/maintainability)](https://codeclimate.com/github/Auqpiro/frontend-project-12/maintainability)

# Chat

View demo: [deployed version](https://chat-project-hexlet.up.railway.app/)

### Description
Chat is a simplified version of Slack Chat (Real-time React/Redux app) that includes web socketing, interaction with REST APIs, use of React (with hooks), Redux (via reduxjs/toolkit), client-side routing, authorization and authentication, and of course build and deploy.

## Features

- Communication in channels
- Creating, deleting and renaming channels
- Bad word filtering
- Pop-up notifications

### Setup
```bash
git clone git@github.com:Auqpiro/frontend-project-12.git
make install
```

### Use case in local environment

Running EsLint
```bash
make lint
```
Running build
```bash
make build
```
Launch backend server
```bash
make start
```

### Use case in deploy

To deploy to any PaaS use the build and start commands
```bash
make build
make start
```
Project uses [Rollbar](https://rollbar.com/) environment variable. Use this in your deployment
```bash
REACT_APP_ROLLBAR_ACCESS_TOKEN
```

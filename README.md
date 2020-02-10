# Building Serverless ReactJS Apps with AWS Amplify Udemy Course

## Intro
Welcome to Building Serverless ReactJS Apps with AWS Amplify. In this class you will learn how to create production grade ReactJS apps using AWS Amplify. We will cover all of the features of Amplify including initial setup, Authentication, GraphQL APIs, Serverless Lambda Functions, Creating REST APIs, Sotorage with s3, Analytics, and Deployment. Docs: https://aws-amplify.github.io/docs/js/start?platform=purejs


## Setup
- Install Node.js: https://nodejs.org/en/download/
- Clone React App 
```console
~$ git clone https://github.com/tdiderich/react-amplify-class.git
~$ cd react-amplify-class/todo-list/
```
- Install dependancies
```console
~$ npm install
```
- Start App
```console
~$ npm start
```
- Install Amplify CLI (You NEED an AWS account for this. If you do not have one, you can get a free tier account by signing up here: https://aws.amazon.com/console/)
```console
~$ npm install --save aws-amplify aws-amplify-react uuid
~$ npm install -g @aws-amplify/cli
```

## Authentication
- Add with CLI
- Simple Auth (withAuthenticator wrapping the app)
    - Customize the form? 
- Custom Auth Flows
 - Create Sign Up Page (as class)
 - Add signup route
 - Import Signup component
 - Update Signup button to be link
 - Test link out
 - Copy form imports / form from todo component
 - Add the handle signup function
 - Copy / update schema
 - Update the form to make sense (don't forget the function)
 - Add Sign In page
 - Add Sign In Route
 - Add Auth listener for constructor + auth updates
 - Remove old fake login functions
 - Update all LOGIN buttons
 - Update all LOGOUT buttons

- AWS Auth
- Social Provider
- Sign Up
- Sign In / Sign Out
- Change / Forgot Password 
- Customizing withAuthenticator 

## GraphQL API
- Add with CLI
- Schema 
- Mutations
- Querying / Filtering
- Subscriptions
- Authorization 

## Serverless Lambda Functions
- Add Basic Function with CLI
- Edit function 
- Manually invoke 
- Add Express Function with CLI
- Add REST API to your Lambda Functions
- Interacting with the new API

## Storage with s3
- Create bucket with CLI
- Adding to bucket from the app
- Reading from the bucket from the app
- Working with images

## Analytics 
- Add with CLI
- Recording events

## Deployment 
- Deploy with CLI


## MASTER TODOS
- 
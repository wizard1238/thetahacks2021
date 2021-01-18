# PPEConnect

> PPEConnect is an application for donors of healthcare equipment to connect with local hospitals.
> During COVID-19, it serves as a logistical hub to save as many lives as possible.

With the resurgence of new coronavirus cases and the imbalance of personal protective equipment (PPE) among hospitals, we were wondering whether there already existed a solution to connect hospitals in need of PPE with donors and independent manufacturers. Additionally, given the more recent news of COVID-19 vaccine distributions, we were motivated to create an application that would allow healthcare supplies to be distributed—without waste—and save as many lives as possible. 

## The Stack
1. Vue.js
2. MongoDB
3. Express.js
4. Node.js

## Get Started (Development)
### Client
First clone this repo, then run
```bash
cd client && yarn # installs dependencies
yarn twbuild # builds CSS files
yarn serve # starts dev server
```
### Server
First add the following to **server/.env**, after creating a MongoDB database either locally or on MongoDB Atlas.
```
MONGOOSEURL="YOUR_MONGODB_CONNECTION_STRING"
```
In a separate terminal window, run
```bash
yarn # installs dependencies
yarn dev # start dev server
```

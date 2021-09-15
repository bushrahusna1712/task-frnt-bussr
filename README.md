# RN-task
The task is to develope an authenticated app that fetchs list of items from a remote server. Each item contains these fields (uid, title, isChecked).
We can create a new item or edit existing one.

I have followed these technologies in back-end and front-end.

## Back-end 
I have used firebase as baas server to authenticate users to fetch, update, create items.

The authentication token is saved on the device storage to auto login.

## Front-end 
I have used react-navigation v5 to navigate between 3 screens (authenticate, items List, new item).

I have selected redux to be the store of application states.

I have developed custom input component to check validty of email and passowrd on authentication.

I have developed text query to filter items when a user starts to typing in search box.


### Project setup via react-native cli. The files is uploaded on this repo (the final released .apk file is provided).

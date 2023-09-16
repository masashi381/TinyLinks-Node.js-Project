[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/D56eEpAT)

# Mid Term Project - TinyLinks

## Goal

This project will have you building a web app using Node. The app will allow users to shorten long URLs much like TinyURL.com and bit.ly do.

You will build an HTTP Server that handles requests from the browser (client). Along the way you'll practice some advanced JavaScript and Node concepts, and you'll also understand more about Express, a web framework which is very popular in the Node community.

## Project Outcome

You will build a simple multipage app:

- with authentication protection
- that reacts appropriately to the user's logged-in state,
- and permits the user to create, read, update, and delete (CRUD) a simple entity (e.g. blog posts, URL shortener).

## Project Setup

- One member of the team can accept the invitation by clicking the link:
  [GitHub Classroom - Assignment](https://classroom.github.com/a/D56eEpAT)
- Add other members to the team
- Clone repository
- Install dependencies
- Run the app with `npm start`

## User Stories

_As an_ avid twitter poster,

_I want_ to be able to shorten links

_so that_ I can fit more non-link text in my tweets.

_As a_ twitter reader,

_I want_ to be able to visit sites via shortened links,

_so that_ I can read interesting content.

(Stretch) _As an_ avid twitter poster,

_I want_ to be able to see how many times my subscribers visit my links

_so that_ I can learn what content they like.

## Project Requirements

- Express
- HTML+CSS / EJS
- FS module (read and write files)
- Cookie Session (encrypted cookies)
- Body Parser

## Bonus

- Bcrypt (password hashing)

### Site Header:

if a user is logged in, the header shows:

- the user's email
- a logout button which makes a POST request to /logout

if a user is not logged in, the header shows:

- a link to the login page (/login)
- a link to the registration page (/register)

## Route Checklist

### GET `/`

cookieをチェック

if user is logged in:

- redirect to /urls

if user is not logged in:

- redirect to /login

### GET `/urls`

if user is logged in:
myURLsを見せる

- returns HTML with:
  - the site header (see Display Requirements above)
  - a list (or table) of URLs the user has created, each list item containing:
    - a short URL
    - the short URL's matching long URL
    - an edit button which makes a GET request to /urls/:id
    - a delete button which makes a POST request to /urls/:id/delete
    - (Stretch) the date the short URL was created
    - (Stretch) the number of times the short URL was visited
    - (Stretch) the number number of unique visits for the short URL
    - a link to "Create a New Short Link" which makes a GET request to /urls/new

if user is not logged in:

- returns HTML with a relevant error message

### GET `/urls/new`

create URL
URLを作る

if user is logged in:

- returns HTML with:
  - the site header (see Display Requirements above)
  - a form which contains:
    - a text input field for the original (long) URL
    - a submit button which makes a POST request to /urls

if user is not logged in:

- redirects to the /login page

### GET `/urls/:id`

短くしたURLの詳細（一つだけ取ってくる）
if user is logged in and owns the URL for the given ID:

- returns HTML with:
  - the site header (see Display Requirements above)
  - the short URL (for the given ID)
  - a form which contains:
    - the corresponding long URL
    - an update button which makes a POST request to /urls/:id
  - (Stretch) the date the short URL was created
  - (Stretch) the number of times the short URL was visited
  - (Stretch) the number of unique visits for the short URL

if a URL for the given ID does not exist:

- returns HTML with a relevant error message

if user is not logged in:

- returns HTML with a relevant error message

if user is logged it but does not own the URL with the given ID:

- returns HTML with a relevant error message

### GET `/urls/u/:id`

if URL for the given ID exists:

- redirects to the corresponding long URL

if URL for the given ID does not exist:

- returns HTML with a relevant error message

### POST `/urls`

create URL(submit)

if user is logged in:

- generates a short URL (random string with 6 alpha numeric characters), saves it, and associates it with the user
- updates the `urls.json` file
- redirects to `/urls/:id`, where :id matches the ID of the newly saved URL
  ※submitするとその短くしたURLのページにとぶ

if user is not logged in:

- returns HTML with a relevant error message

### PUT `/urls/:id`

編集ボタンが押された時
if user is logged in and owns the URL for the given ID:

- updates the URL
- updates `urls.json` file
- redirects to /urls

if user is not logged in:

- returns HTML with a relevant error message

if user is logged it but does not own the URL for the given ID:

- returns HTML with a relevant error message

### DELETE `/urls/:id/delete`

if user is logged in and owns the URL for the given ID:

- deletes the URL
- updates the `urls.json` file
- redirects to /urls

if user is not logged in:

- returns HTML with a relevant error message
  if user is logged it but does not own the URL for the given ID:

- returns HTML with a relevant error message

### GET `/login`

if user is logged in:

- redirects to /urls

if user is not logged in:

- returns HTML with:
  - a form which contains:
  - input fields for email and password
  - submit button that makes a POST request to /login

### GET `/register`

ページにアクセス

if user is logged in:

- redirects to /urls

if user is not logged in:

- returns HTML with:
  - a form which contains:
  - input fields for email and password
  - a register button that makes a POST request to /register

### POST `/login`

JSONと比較して認証

if email and password params match an existing user:

- sets a cookie
- redirects to /urls

if email or password params don't match an existing user:

- returns HTML with a relevant error message

### POST `/register`

if email or password are empty:

- returns HTML with a relevant error message

if email already exists:

- returns HTML with a relevant error message

otherwise:

- creates a new user
- user id should be generated by `uuid` package (search how to use it)
- encrypts the new user's password with bcrypt
- updates the `users.json` file
- sets a cookie
- redirects to /urls

### POST `/logout`

- delete cookie
- redirects to /login

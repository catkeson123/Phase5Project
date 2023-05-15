# Introduction
This is an application created during Phase 5 of Flatiron School's Full Stack Software Engineering Program.

This program is an album review site which allows users to log in to their account or sign up for a new one. Basic user solutions include:

Browsing/sorting available albums
Reviewing an album
Viewing other users reviews and like/disliking them
Viewing other users profiles
Deleting own reviews
Editing profile information

## Languages
Python, Flask, SQLAlchemy, React.js, CSS, JavaScript

# Program Composition

Upon log in, a nav bar displays links to home, albums, reviews, users, and profile pages as well as a log out button for the user. 

## Home
The home page displays a welcome message and gif to the user. If the user is not logged in, it will display log in and sign up buttons

## Albums
The albums page is where a user can view all of the available albums to review. Users can filter albums by genre as well as sort by title and release date. 

## Reviews
The reviews page displays all of the reviews from every user on the site. Here, users can like or dislike reviews as well. This page cannot be viewed if the user is not logged in.

## Users
The users page display links to other users' profile pages. This page cannot be viewed if the user is not logged in.

## Profile
The profile page displays a user's name, username, and reviews. Users can delete reviews from their profile and edit information in their profile. 

# MODELS
The models file contains the following three models which constitute the framework for our database tables.

Each table in our database contains a primary key represented by an id.

The individual properties of each table are listed below:

## User
first_name: The user's first name represented as a string.
last_name: The user's last name represented as a string.
user_name: The user's username represented as a string.
email: The user's email represented as a string.
picture: The url of the user's profile picture represented as a string.
_password_hash: The password hash for the user.

## Album
title: The album title represented as a string.
artist: The album artist represented as a string.
release: The album release represented as a string.
genre: The album genre represented as a string.
image: The album image url represented as a string.

## Review
rating: The rating of the review represented as a string.
comment: The comment of the review represented as a string.
album_id: A foreign key representing the id of the album associated with the review.
user_id: A foreign key representing the id of the user associated with the review.
likes: The number of likes the review has represented as an integer.

Users can have many reviews. Albums can have many reviews. A Review belongs to one User and one Album.

User -----< Review >----- Albums

# DATABASE
The database was set up using SQLalchemy and Flask. I took advantage of SQLalchemy's relationship, backref, and association_proxy to create relationships between models in the database. 

# APP.PY
I used flask to create a RESTful API on the backend. I included routes for full CRUD for users and reviews and a GET request for albums.

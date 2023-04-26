#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Song, Review

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        User.query.delete()
        Song.query.delete()
        Review.query.delete()
        db.session.commit()

        print("Starting seed...")
        # Seed code goes here!

        u1 = User(first_name = 'Calvin', last_name = 'Atkeson', user_name = 'catkeson')
        u2 = User(first_name = 'Bob', last_name = 'Smith', user_name = 'bobbysmith')
        u3 = User(first_name = 'Joe', last_name = 'Dirt', user_name = 'joedirt123')

        s1 = Song( title = "Thriller", artist = "Micheal Jackson", album = "Thriller")
        s2 = Song( title = "Imagine", artist = "John Lennon", album = "Imagine")
        s3 = Song( title = "Hey Jude", artist = "The Beatles")

        r1 = Review(user_id = 1, song_id = 2, rating = 4, comment = 'Example comment')
        r2 = Review(user_id = 2, song_id = 1, rating = 3, comment = 'Example comment')
        r3 = Review(user_id = 2, song_id = 3, rating = 5, comment = 'Example comment')
        r4 = Review(user_id = 3, song_id = 1, rating = 5, comment = 'Example comment')

        db.session.add_all([u1, u2, u3, s1, s2, s3, r1, r2, r3, r4])
        db.session.commit()
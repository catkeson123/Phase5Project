from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from config import bcrypt

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-songs','-reviews.user')

    id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    user_name = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String)
    _password_hash = db.Column(db.String, nullable=False)

    reviews = db.relationship('Review', backref='user', cascade='all, delete-orphan')
    songs = association_proxy('reviews', 'song')

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        # utf-8 encoding and decoding is required in python 3
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    @validates('email')
    def validate_email(self, key, email):
        if '@' not in email:
            raise ValueError('Must be a valid email address')
        return email

class Song(db.Model, SerializerMixin):
    __tablename__ = 'songs'

    serialize_rules = ('-reviews', '-users')

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String, nullable=False)
    artist = db.Column(db.String, nullable=False)
    album = db.Column(db.String)

    reviews = db.relationship('Review', backref='song', cascade='all, delete-orphan')
    users = association_proxy('reviews', 'user')

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    serialize_rules = ('-user.reviews', '-song.reviews', '-song.users', '-user.songs')

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    song_id = db.Column(db.Integer, db.ForeignKey('songs.id'))
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String)

    @validates('rating')
    def validate_rating(self, key, rt):
        if rt < 1 or rt > 5 or type(rt) != int:
            raise ValueError('Rating must be a number between 1 and 5')
        return rt
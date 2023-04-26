from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-reviews', '-songs')

    id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    user_name = db.Column(db.String, unique=True)

    reviews = db.relationship('Review', backref='user', cascade='all, delete-orphan')
    songs = association_proxy('reviews', 'song')

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

    serilize_rules = ('-user.reviews', '-song.reviews', '-song.users', '-user.songs')

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
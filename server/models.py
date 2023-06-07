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

followers = db.Table('followers',
    db.Column('follower_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('followed_id', db.Integer, db.ForeignKey('users.id'))
)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-albums','-reviews.user', '-followers')

    id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    user_name = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String)
    picture = db.Column(db.String, default="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR82DN9JU-hbIhhkPR-AX8KiYzA4fBMVwjLAG82fz7GLg&s")
    _password_hash = db.Column(db.String, nullable=False)

    reviews = db.relationship('Review', backref='user', cascade='all, delete-orphan')
    followed = db.relationship(
        'User', secondary=followers,
        primaryjoin=(followers.c.follower_id == id),
        secondaryjoin=(followers.c.followed_id == id),
        backref=db.backref('followers', lazy='dynamic'), lazy='dynamic')
    albums = association_proxy('reviews', 'album')

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
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
    
    def follow(self, user):
        if not self.is_following(user):
            self.followed.append(user)

    def unfollow(self, user):
        if self.is_following(user):
            self.followed.remove(user)

    def is_following(self, user):
        return self.followed.filter(
            followers.c.followed_id == user.id).count() > 0
    
    def followed_reviews(self):
        return Review.query.join(
            followers, (followers.c.followed_id == Review.user_id)).filter(
                followers.c.follower_id == self.id)
    
    def liked_reviews(self):
        l_list = []
        for like in self.liked:
            l_list.append(like.review_id)
        return l_list

    def user_dict(self):
        return {
            "id": self.id,
            "user_name": self.user_name,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "picture": self.picture,
            "likes": self.liked_reviews(),
            "followers": [follower.follower_dict() for follower in self.followers],
            "followed": [followed.follower_dict() for followed in self.followed],
            "reviews":[review.review_dict() for review in self.reviews]
        }
    
    def follower_dict(self):
        return {
            "id": self.id,
            "username": self.user_name,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "picture": self.picture,
        }
    
    liked = db.relationship(
        'ReviewLike',
        foreign_keys='ReviewLike.user_id',
        backref='user', lazy='dynamic')

    def like_review(self, review):
        if not self.has_liked_review(review):
            like = ReviewLike(user_id=self.id, review_id=review.id)
            db.session.add(like)

    def unlike_review(self, review):
        if self.has_liked_review(review):
            ReviewLike.query.filter_by(
                user_id=self.id,
                review_id=review.id).delete()

    def has_liked_review(self, review):
        return ReviewLike.query.filter(
            ReviewLike.user_id == self.id,
            ReviewLike.review_id == review.id).count() > 0

class Album(db.Model, SerializerMixin):
    __tablename__ = 'albums'

    serialize_rules = ('-reviews', '-users')

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String, nullable=False)
    artist = db.Column(db.String, nullable=False)
    release = db.Column(db.String)
    genre = db.Column(db.String)
    image = db.Column(db.String, default="data:image/jpeg;base64,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")

    reviews = db.relationship('Review', backref='album', cascade='all, delete-orphan')
    users = association_proxy('reviews', 'user')

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    serialize_rules = ('-user.reviews', '-album.reviews', '-album.users', '-user.albums', '-user.liked')

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    album_id = db.Column(db.Integer, db.ForeignKey('albums.id'))
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String)
    likes = db.relationship('ReviewLike', backref='review', lazy='dynamic')

    @validates('rating')
    def validate_rating(self, key, rt):
        if rt < 1 or rt > 5 or type(rt) != int:
            raise ValueError('Rating must be a number between 1 and 5')
        return rt
    
    def review_dict(self):
        count = self.count_likes()

        a = Album.query.filter_by(id = self.album_id).first()
        a_dict = {"id": a.id, "title": a.title, "artist": a.artist, "release": a.release, "genre": a.genre, "image": a.image}

        u = User.query.filter_by(id = self.user_id).first()
        u_dict = {"id": u.id, "first_name": u.first_name, "last_name": u.last_name, "user_name": u.user_name, "email": u.email, "picture": u.picture}

        r = {"id": self.id, "user_id": self.user_id, "album_id": self.album_id, "rating": self.rating,
             "comment": self.comment, "likes": count, "album": a_dict, "user": u_dict}
        return r

    def count_likes(self):
        count = 0
        for like in self.likes:
            count = count+1

        return count

class ReviewLike(db.Model):
    __tablename__ = 'review_likes'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    review_id = db.Column(db.Integer, db.ForeignKey('reviews.id'))
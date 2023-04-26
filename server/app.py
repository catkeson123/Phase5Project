#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, make_response, jsonify
from flask_migrate import Migrate
from flask_restful import Api, Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
from models import db, User, Song, Review

# Views go here!
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)
api = Api(app)

class Home(Resource):
    def get(self):
        return "Welcome to SoundScape"
    
api.add_resource(Home, '/')

class Users(Resource):
    def get(self):
        u_list = [u.to_dict() for u in User.query.all()]
        return make_response(u_list, 200)
    
api.add_resource(Users, '/users')

class UserByID(Resource):
    def get(self, id):
        u = User.query.filter_by(id=id).first()
        if u == None:
            return make_response({'error': 'User not found'}, 404) 
        return make_response(u.to_dict(), 200)

api.add_resource(UserByID, '/users/<int:id>')

class Songs(Resource):
    def get(self):
        s_list = [s.to_dict() for s in Song.query.all()]
        return make_response(s_list, 200)
    
api.add_resource(Songs, '/songs')

class Reviews(Resource):
    def get(self):
        r_list = [r.to_dict() for r in Review.query.all()]
        return make_response(r_list, 200)

api.add_resource(Reviews, '/reviews')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

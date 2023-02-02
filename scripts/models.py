from sqlalchemy import (
    Boolean,
    Identity,
    Integer,
    create_engine,
    String,
    Column,
)
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from dotenv import load_dotenv
import os

load_dotenv()

engine = create_engine(f"{os.getenv('DB_URI')}")
Session = sessionmaker(engine)

Base = declarative_base()

class Song(Base):
    __tablename__ = "songs"

    id = Column(Integer, Identity(start=1, cycle=True), primary_key=True)
    music = Column(String, nullable=False)
    artist = Column(String, nullable=False)
    album = Column(String, nullable=False)
    release_year = Column(String, nullable=False)
    genre = Column(String, nullable=False)
    is_banned = Column(Boolean, default = False)

Base.metadata.drop_all(engine)
Base.metadata.create_all(engine)

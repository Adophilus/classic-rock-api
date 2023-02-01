import pandas as pd
from .models import Song, Session

df = pd.read_csv("./datasets/classic_rock_playlist.csv")

# cleaning up the df
df = df.drop_duplicates(subset = "Music")
df = df.dropna()

with Session() as session:
    for _, row in df.iterrows():
        song = Song(
            artist = row["Artist"],
            music = row["Music"],
            album = row["Album"],
            release_year = row["Year"],
            genre = row["Genre"]
        )
        session.add(song)

    session.commit()

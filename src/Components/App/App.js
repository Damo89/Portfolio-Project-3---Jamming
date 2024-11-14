import React, {useState} from "react";
import styles from "./App.module.css";
import SearchResults from "../SearchResult/SearchResult";
import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import {Spotify} from "../../Utility/Spotify";

function App () {
    const [searchResults, setSearchResults] = useState([
    {
      name: "example track name 1",
      artist: "example track artist 1",
      album: "example track album 1",
      id: 1
    },
    {
      name: "example track name 2",
      artist: "example track artist 2",
      album: "example track album 2",
      id: 2
    },
    {
      name: "example track name 3",
      artist: "example track artist 3",
      album: "example track album 3",
      id: 3
    },
    {
      name: "example track name 4",
      artist: "example track artist 4",
      album: "example track album 4",
      id: 4
    }
    ]);
    const [playlistName, setPlaylistName] = useState("Example Playlist Name");
    const [playlistTracks, setPlaylistTracks] = useState([
      {
        name: "example playlist name 1",
        artist: "example playlist artist 1",
        album: "example playlist album 1",
        id: 1
      },
      {
        name: "example playlist name 2",
        artist: "example playlist artist 2",
        album: "example playlist album 2",
        id: 2
      },
      {
        name: "example playlist name 3",
        artist: "example playlist artist 3",
        album: "example playlist album 3",
        id: 3
      },
      {
        name: "example playlist name 4",
        artist: "example playlist artist 4",
        album: "example playlist album 4",
        id: 4
      }
    ]);

    function addTrack(track) {
      const existingTrack = playlistTracks.find((t) => t.id === track.id);
      const newTrack = playlistTracks.concat(track);
      if (existingTrack) {
        console.log("Track already exists");
      } else {
        setPlaylistTracks(newTrack);
      }
    }

    function removeTrack(track) {
      const existingTrack = playlistTracks.filter((t) => t.id !== track.id);
      setPlaylistTracks(existingTrack);
    }

    function updatePlaylistName(name) {
      setPlaylistName(name);
    }

    function savePlaylist() {
      const trackURIs = playlistTracks.map((t) => t.uri);
      Spotify.savePlaylist(playlistName, trackURIs).then(() => {
        setPlaylistName("New Playlist");
        setPlaylistTracks([]);
      });
    }

    function search(term) {
      Spotify.search(term).then((result) => setSearchResults(result));
      console.log(term);
    }

    return (
      <div>
        <h1>
          Ja<span className={styles.highlight}>mmm</span>ing
        </h1>
        <div className={styles.App}>
          <SearchBar onSearch={search} />
          
          <div className={styles['App-playlist']}>
            <SearchResults 
              userSearchResults={searchResults} 
              onAdd={addTrack} 
            />
          
            <Playlist 
              playlistName={playlistName} 
              playlistTracks={playlistTracks} 
              onRemove={removeTrack}
              onNameChange={updatePlaylistName}
              onSave={savePlaylist}
            />
          </div>
        </div>
      </div>
    );
}

export default App;

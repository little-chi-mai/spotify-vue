<template>
  <div class="recent-played" id="container" ref="container">
    <Dashboard :setSearchTerm="setSearchTerm"/>
    <div
      v-if="recentTracks.length && selectedTab === 'recentTracks'"
      class="recent-tracks block"
    >
      <h3>Your Recent Tracks</h3>
      <span v-for="track in recentTracks" :key="track.played_at">
        <TrackImage :scrollToEnd="scrollToEnd" :track="track.track" />
      </span>
    </div>

    <div
      v-if="topTracks.length && selectedTab === 'topTracks'"
      class="recent-tracks block"
    >
      <h3>Your Top Tracks</h3>
      <span v-for="track in topTracks" :key="track.id">
        <TrackImage :scrollToEnd="scrollToEnd" :track="track" />
      </span>
    </div>

    <div
      v-if="topArtists.length && selectedTab === 'topArtists'"
    >
      <BlockTopArtists />
    </div>

    <div
      v-if="likedTracks.length && selectedTab === 'likedTracks'"
      class="recent-tracks block"
    >
      <h3>Your Liked Tracks</h3>
      <span v-for="track in likedTracks" :key="track.track.id">
        <TrackImage :scrollToEnd="scrollToEnd" :track="track.track" />
      </span>
    </div>

    <div
      v-if="newRelease.length && selectedTab === 'newRelease'"
      class="recent-tracks block"
    >
      <h3>New release</h3>
      <span v-for="album in newRelease" :key="album.id">
        <NewRelease :album="album" />
      </span>
    </div>

    <div
      v-if="searchResults.length && selectedTab === 'searchResults'"
      class="recent-tracks block"
    >
      <h3>Your search result for <span>{{searchTerm}}</span></h3>
      <span v-for="track in searchResults" :key="track.id">
        <TrackImage :scrollToEnd="scrollToEnd" :track="track" />
      </span>
    </div>

    <BlockPreview :scrollToEnd="scrollToEnd" />

    <BlockTrackInfo :scrollToEnd="scrollToEnd" />

    <div v-for="artistId in artistIds" :key="artistId">
      <BlockArtistTracks :scrollToEnd="scrollToEnd" :artistId="artistId" />
    </div>

    <BlockAlbumInfo :scrollToEnd="scrollToEnd" />
  </div>
</template>

<script>
import BlockPreview from "@/components/BlockPreview";
import TrackImage from "@/components/TrackImage";
import BlockTrackInfo from "@/components/BlockTrackInfo";
import BlockArtistTracks from "@/components/BlockArtistTracks";
import BlockAlbumInfo from "@/components/BlockAlbumInfo";
import NewRelease from "@/components/NewRelease";
import Dashboard from "@/components/Dashboard";
import BlockTopArtists from "@/components/BlockTopArtists";

export default {
  data() {
    return {
      searchTerm: ""
    }
  },
  components: {
    BlockPreview,
    TrackImage,
    BlockTrackInfo,
    BlockArtistTracks,
    BlockAlbumInfo,
    NewRelease,
    Dashboard,
    BlockTopArtists,
  },
  computed: {
    artistIds() {
      return this.$store.state.artistIds;
    },
    recentTracks() {
      return this.$store.state.userRecentTracks;
    },
    topTracks() {
      return this.$store.state.userTopTracks;
    },
    likedTracks() {
      return this.$store.state.userLikedTracks;
    },
    selectedTab() {
      return this.$store.state.selectedTab;
    },
    newRelease() {
      return this.$store.state.newRelease;
    },
    searchResults() {
      return this.$store.state.searchResults;
    },
    topArtists() {
      return this.$store.state.userTopArtists;
    },
    
  },
  methods: {
    scrollToEnd() {
      setTimeout(() => {
        const container = this.$refs.container;
        // container.scrollTop = container.scrollHeight;
        let bottom = container.scrollHeight;
        window.scrollTo({
          top: bottom,
          left: 0,
          behavior: "smooth",
        });
      }, 500);
    },
    setSearchTerm(term) {
      return this.searchTerm = term;
    }
  },
};
</script>

<style scoped>
.recent-tracks {
  margin-bottom: 1rem;
  padding: 0.5rem;
}

.recent-tracks > h3 {
  color: rgb(43, 43, 43);
  text-transform: uppercase;
}

span {
  color: rgb(255, 127, 7);
}

</style>

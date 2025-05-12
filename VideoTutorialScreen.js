import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
const YOUTUBE_API_KEY = "AIzaSyCdTAiA1wzxZtnmQN_A4eNYVV_R91RNpis";
export default function VideoTutorialScreen() {
  const route = useRoute();
  const { issue } = route.params;
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null); // Track the selected video
  const [modalVisible, setModalVisible] = useState(false); // Control modal visibility

  useEffect(() => {
    fetchVideos(issue);
  }, [issue]);
  const fetchVideos = async (query) => {
    try {
      const searchResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}+car+repair&type=video&maxResults=5&key=${YOUTUBE_API_KEY}`
      );
      const searchData = await searchResponse.json();
      const videoIds = searchData.items.map((item) => item.id.videoId).join(",");
      const statsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`
      );
      const statsData = await statsResponse.json();
      const videosWithStats = searchData.items.map((item) => {
        const stats = statsData.items.find((video) => video.id === item.id.videoId);
        return {
          ...item,
          statistics: stats ? stats.statistics : null,
          snippet: {
            ...item.snippet,
            publishedAt: stats ? stats.snippet.publishedAt : item.snippet.publishedAt,
          },
        };
      });
      setVideos(videosWithStats);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Format the upload date (e.g., "2 weeks ago")
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffInDays < 1) return "Today";
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) > 1 ? "s" : ""} ago`;
    return `${Math.floor(diffInDays / 30)} month${Math.floor(diffInDays / 30) > 1 ? "s" : ""} ago`;
  };

  // Open video in modal
  const openVideo = (videoId) => {
    setSelectedVideo(videoId);
    setModalVisible(true);
  };

  // Close modal
  const closeVideo = () => {
    setModalVisible(false);
    setSelectedVideo(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>
          {issue.charAt(0).toUpperCase() + issue.slice(1)} Video Tutorials
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
        ) : (
          videos.map((video, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => openVideo(video.id.videoId)}
              activeOpacity={0.8}
            >
              <Image
                source={{ uri: video.snippet.thumbnails.high.url }}
                style={styles.thumbnail}
              />
              <View style={styles.textContainer}>
                <Text style={styles.videoTitle} numberOfLines={2}>
                  {video.snippet.title}
                </Text>
                <Text style={styles.channelName} numberOfLines={1}>
                  {video.snippet.channelTitle}
                </Text>
                <View style={styles.metaContainer}>
                  <Ionicons name="eye" size={14} color="#666" />
                  <Text style={styles.metaText}>
                    {video.statistics ? `${parseInt(video.statistics.viewCount).toLocaleString()} views` : "N/A"}
                  </Text>
                  {/* <Ionicons name="thumbs-up" size={14} color="#666" style={styles.metaIcon} />
                  <Text style={styles.metaText}>
                    {video.statistics ? `${parseInt(video.statistics.likeCount).toLocaleString()} likes` : "N/A"}
                  </Text> */}
                  {/* <Ionicons name="time" size={14} color="#666" style={styles.metaIcon} />
                  <Text style={styles.metaText}>
                    {formatDate(video.snippet.publishedAt)}
                  </Text> */}
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Video Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeVideo}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeVideo}>
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>
          <WebView
            source={{ uri: `https://www.youtube.com/embed/${selectedVideo}` }}
            style={styles.webview}
            allowsFullscreenVideo={true}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
    marginTop:20,
  },
  loader: {
    marginTop: 50,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 17,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnail: {
    width: 130,
    height: 90,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "space-between",
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  channelName: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  metaText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 5,
  },
  metaIcon: {
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  webview: {
    flex: 1,
  },
});
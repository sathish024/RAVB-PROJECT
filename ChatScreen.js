import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Linking,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
const ChatScreen = ({route}) => {
  const {name} = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [recording, setRecording] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const twilioAccountSid = "AC3a60c7701d0a9ba8b77880f3c80c1a7f";
  const twilioAuthToken = "6fe192ee6f6deffd69152ce6f352a4eb";
  const fromNumber = "+17623769325";
  const toNumber = "+916381338346";
  const encodeBase64 = (str) => {
    try {
      return btoa(str);
    } catch (e) {
      Alert.alert("Error", "Failed to encode credentials");
      throw e;
    }
  };
  const sendSMS = async (message) => {
    setIsSending(true);
    try {
      const authString = `${twilioAccountSid}:${twilioAuthToken}`;
      const encodedAuth = encodeBase64(authString);

      const response = await axios.post(
        `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`,
        `Body=${encodeURIComponent(message)}&From=${encodeURIComponent(fromNumber)}&To=${encodeURIComponent(toNumber)}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${encodedAuth}`,
          },
        }
      );
      if (response.status === 201) {
        console.log("SMS sent successfully");
        return true;
      }
      return false;
    } catch (error) {
      Alert.alert("Error", error.message);
      return false;
    } finally {
      setIsSending(false);
    }
  };
  const sendMessage = async () => {
    if (inputText.trim() && !isSending) {
      const newMessage = { text: inputText, sender: "user", type: "text" };
      setMessages([...messages, newMessage]);
      setInputText("");
      const smsSent = await sendSMS(inputText);
      if (!smsSent) {
        setMessages(messages.filter(msg => msg !== newMessage));
      }
    }
  };
  const handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newMessage = { image: result.assets[0].uri, sender: "user", type: "image" };
      setMessages([...messages, newMessage]);
      await sendSMS("(Sent an image)");
    }
  };
  const handleVoiceMessage = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        const newMessage = { audio: uri, sender: "user", type: "voice" };
        setMessages([...messages, newMessage]);
        setRecording(null);
        await sendSMS("(Sent a voice message)");
      } else {
        const { granted } = await Audio.requestPermissionsAsync();
        if (!granted) return;

        const newRecording = new Audio.Recording();
        await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        await newRecording.startAsync();
        setRecording(newRecording);
      }
    } catch (error) {
      console.error("Recording error:", error);
    }
  };
  const handleCall = () => {
    Linking.openURL("tel:+916381338346");
  };

  return (
    <View style={styles.container}>
      {/* Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity style = {{marginTop:20}} >
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>

        <View style={styles.profileContainer}>
          <Image source={require("./roadside/profile.jpg")} style={styles.profileImage} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{name}</Text>
            <Text style={styles.phoneNumber}>+91 6381338346</Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleCall} style = {{marginTop:20}}>
          <Ionicons name="call" size={28} color="green" />
        </TouchableOpacity>
      </View>

      {/* Message List */}
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBubble,
              item.sender === "user" ? styles.userMessage : styles.mechanicMessage,
            ]}
          >
            {item.type === "text" && <Text style={styles.messageText}>{item.text}</Text>}
            {item.type === "voice" && <Text style={styles.messageText}>🎤 Voice Message</Text>}
            {item.type === "image" && <Image source={{ uri: item.image }} style={styles.messageImage} />}
          </View>
        )}
        ListEmptyComponent={<Text style={[styles.noMessages, { textAlign: 'center', alignSelf: 'center' }]}>No messages</Text>}
        contentContainerStyle={{ flexGrow: 1, justifyContent: messages.length ? "flex-start" : "center" }}
      />

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={handleImageUpload} style={styles.iconButton}>
          <Ionicons name="image" size={26} color="gray" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          editable={!isSending}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.iconButton} disabled={isSending}>
          <Ionicons name="send" size={26} color={isSending ? "gray" : "#007bff"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleVoiceMessage} style={styles.iconButton} disabled={isSending}>
          <Ionicons 
            name={recording ? "mic-off" : "mic"} 
            size={26} 
            color={isSending ? "gray" : recording ? "red" : "gray"} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "white",
    elevation: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    justifyContent: "space-between",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginLeft: 10,
    marginTop:20,

  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  phoneNumber: {
    fontSize: 14,
    color: "gray",
  },
  messageBubble: {
    maxWidth: "75%",
    padding: 12,
    marginVertical: 5,
    borderRadius: 12,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007bff",
    borderTopRightRadius: 0,
  },
  mechanicMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#ddd",
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
    color: "white",
  },
  messageImage: {
    width: 160,
    height: 160,
    borderRadius: 10,
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  iconButton: {
    padding: 8,
  },
});

export default ChatScreen;
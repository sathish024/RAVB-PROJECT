import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet,
  Keyboard, ActivityIndicator, Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Dialogflow_V2 } from "react-native-dialogflow";
const { width } = Dimensions.get('window');
const COLORS = {
  primary: '#6C63FF',
  background: '#F8F9FA',
  textDark: '#2D3748',
  textLight: '#4A5568',
  white: '#FFFFFF',
  bubbleUser: '#6C63FF',
  bubbleBot: '#EDF2F7',
};
export default function ChatbotScreen() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I assist you today? 😊", sender: "bot" },
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(false);
  const flatListRef = useRef(null);
  const renderMessage = useCallback(({ item }) => (
    <View style={[
      styles.messageBubble, 
      item.sender === "user" ? styles.userMessage : styles.botMessage
    ]}>
      <Text style={[
        styles.messageText, 
        item.sender === "bot" ? styles.botText : styles.userText
      ]}>
        {item.text}
      </Text>
    </View>
  ), []);
  useEffect(() => {
    const initDialogflow = async () => {
      try {
        const dialogflowConfig = {
          client_email: 'ravb-213@ravb-edob.iam.gserviceaccount.com',
          private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCkvTUxpiUkJxGg\n8SSm7dD21XHcdxuvupcJ4Umrf8BVyI7CV+tOPT0XPSw9R8vH9yC0+5yYN95DmJT0\nQDU/ccxmpsfIyUnr4NrjZNGwMa+qUIF958IE6tkeer4So5cSKjJZGwEnTaK4apSs\nmT+gxKL1EfPmFxxHpHf2uNLmxwAtOfeK+jBfM4lyjl/sEpSsHYbz0DAGghZyS3wA\nqbYqyYG21NYfPW2wpkW6dn1R6IcyUo3ctiRIGXSI+HuoHQdVTZieJY+YsiY794SX\nH2vaqOmxl1qZ7PP8VUeX9M8TAyqxFOh6D4GsdnSiLm8tpzXGIAShcCFrQanLEf4d\nAEeBUnkpAgMBAAECggEALm7GF4Bk55O7fEl7szFEvM3cke9gdl95QuelBBm19Hfb\nBRwSzrKkDXDIj101Kt+U8G4a7SySEStokI+ocoF4w1Yu6YESvNFb4MwB7k+S28Zl\nOT+hiBFJsTWXbVl+szgBiOv7n0BapPAlh6CKNp418C1nOWs6JVdOGNRvXWypuBUy\nqo8yHGsgdYlumYU1X85RWb2WdbN81PDHzAq9HnkBUWt8jVKa20KI6uVjO+CywAbR\nTcBOxfYAPV90f2/WmtyN6BRdTem1HrQo9oGgap0oel19KYq6D7cBhShvxKc8//dA\nw8q+xcCP5liBQBRcBaBrGpH6nPin/mODc3mE8++4oQKBgQDYkLhEsrBFIDQAW7Ex\n6Zhf9vAyZhoQe811eWCxmdGfxp6B04uUgJLjE20h6+1Aurd19hr15yrKGlHnNX0V\nthLOEGu6ge5ARmMspYpMNPR+gmuvdbmhrPUiFWqFJ/6LjwpngPEslvraVTPyokLx\nbaE0R0VNz2Ld7WrR21aKWBbXuwKBgQDCvJZzN+pPESKMUJO8ftaD5X757BqZv0/W\ndGbv0RPTKLCJZDVy/qnjvcnaqQDy3F2KswdwXt7WEYYRossZf3oWb4mj1LM5xY4H\nTcp3nqSFd5jh7MRKSyXPv9MP+RzEuqaZbuzZPBMx/Jd8F8lvVf6jL76Ljr4FT1uI\noCqs5fsKawKBgAImtd3g1IVrQ3j5cDIputzBLDOj9gBR6oGPOhmpiH6Iz4xEmK9Z\n85uT1tKucEXjVO00C6KDsFYfms6sJljv3RH08c0Be2diC5wm7M/C+ubCzuUIS1bC\nzBCRm+REuG+UdSsACeVCfq1qiUCQwg954k8Noi+arsW7lQMOpbZsF5X/AoGBAIRu\nrj5TA2Sb+YvE7IOfGpF+TDj4qSpv4YKtjKeA32OV42C8JmE68RxxIEo07vE6jd7a\nW6++xPp91lg+BrMjb0q8tbUV3IDoaetrqspot+gQaocSdncz3dYH1SiiuD7N1Ki5\nuBcP9NnktrxsjM/Lgq1FtebAv1drHYuvqPYGPRBbAoGANZHW4QxVAIcZmVnYkzRN\nBlR4NXDK7xCLrCpJ5lHGxcUzHGhSh6ilLcvKlMnGin2G4+m2FOeHC0Zid5fkQ5+a\nIjMX2HIXcEp+shNTvyS4IbnF5NDYHLR0VANUi1ej0cv1L0AIAk/8Kre13vKxvj+E\nwZzRTDCVVw+F8g6D4j1aAdk=\n-----END PRIVATE KEY-----\n',
          project_id: 'ravb-edob'
        };
        const cleanedPrivateKey = dialogflowConfig.private_key.replace(/\\n/g, '\n');
        
        await Dialogflow_V2.setConfiguration(
          dialogflowConfig.client_email,
          cleanedPrivateKey,
          Dialogflow_V2.LANG_ENGLISH_US,
          dialogflowConfig.project_id
        );
        setAuthError(false);
      } catch (error) {
        console.error("Dialogflow init error:", error);
        setAuthError(true);
        addBotMessage("⚠️ Authentication issue detected. Please check service account configuration.");
      }
    };
    requestAnimationFrame(() => {
      initDialogflow();
    });
  }, []);

  const addBotMessage = (text) => {
    setMessages(prev => [
      ...prev,
      { id: Date.now(), text, sender: "bot" }
    ]);
  };

  const sendMessage = async () => {
    if (inputText.trim() === "" || authError) return;

    // Optimistic UI update
    const userMessage = { 
      id: Date.now(), 
      text: inputText, 
      sender: "user" 
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setLoading(true);
    
    try {
      await Dialogflow_V2.requestQuery(
        inputText,
        (result) => {
          const botReply = result.queryResult.fulfillmentText || "I didn't understand that. Could you rephrase?";
          addBotMessage(botReply);
        },
        (error) => {
          console.error("Dialogflow Error:", error);
          addBotMessage("⚠️ Failed to get response. Please try again.");
        }
      );
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({ animated: true });
      }, 50);
    }
  }, [messages]);

  return (
    <View style={styles.container}>
      {/* Simplified Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat Assistant</Text>
        <Text style={styles.statusText}>
          {authError ? 'Offline' : 'Online'}
        </Text>
      </View>

      {/* Replaced ScrollView with FlatList */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.chatContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          loading ? (
            <View style={[styles.messageBubble, styles.botMessage]}>
              <ActivityIndicator size="small" color={COLORS.primary} />
            </View>
          ) : null
        }
      />

      {/* Simplified Input Container */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={authError ? "Fix authentication to chat" : "Type a message..."}
          placeholderTextColor={authError ? '#F56565' : '#A0AEC0'}
          value={inputText}
          onChangeText={setInputText}
          editable={!loading && !authError}
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity 
          style={[
            styles.sendButton, 
            (!inputText || authError) && styles.sendButtonDisabled
          ]} 
          onPress={sendMessage} 
          disabled={!inputText || loading || authError}
        >
          <Ionicons 
            name="send" 
            size={20} 
            color={inputText && !authError ? COLORS.white : '#CBD5E0'} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  statusText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 4,
  },
  chatContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  messageBubble: {
    maxWidth: width * 0.75,
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.bubbleUser,
    borderBottomRightRadius: 4,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.bubbleBot,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  userText: {
    color: COLORS.white,
  },
  botText: {
    color: COLORS.textDark,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    paddingBottom: 25,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: '#EDF2F7',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
    backgroundColor: COLORS.white,
    fontSize: 15,
    color: COLORS.textDark,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#E2E8F0',
  },
}); 
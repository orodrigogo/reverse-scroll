import { useState } from "react"
import { Feather } from "@expo/vector-icons"
import {
  Text,
  View,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native"

const INITIAL_MESSAGES = [
  { id: "1", user_id: "1", message: "Oi" },
  { id: "2", user_id: "2", message: "Oi" },
  { id: "3", user_id: "2", message: "Tudo bem?" },
].reverse()

const MY_ID = "1"

export default function App() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState(INITIAL_MESSAGES)

  function sendMessage() {
    if (message.trim().length > 0) {
      const newMessage = {
        id: new Date().getTime().toString(),
        user_id: MY_ID,
        message,
      }

      setMessages((prevState) => [newMessage, ...prevState])
      setMessage("")
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        inverted
        renderItem={({ item }) => (
          <Text
            key={item.id}
            style={[
              styles.message,
              item.user_id === MY_ID ? styles.myMessage : styles.friendMessage,
            ]}
          >
            {item.message}
          </Text>
        )}
      />

      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          placeholder="Digite a mensagem aqui..."
          onChangeText={setMessage}
          value={message}
        />
        <TouchableOpacity
          style={styles.send}
          activeOpacity={0.7}
          onPress={sendMessage}
        >
          <Feather name="send" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 32,
  },
  message: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  myMessage: {
    color: "#FFFFFF",
    backgroundColor: "#105DFB",
    alignSelf: "flex-end",
    borderBottomRightRadius: 0,
  },
  friendMessage: {
    color: "#000000",
    backgroundColor: "#D7D7D7",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 0,
  },
  input: {
    flex: 1,
    height: 56,
    padding: 16,
    backgroundColor: "#d2d6da",
    borderRadius: 12,
  },
  send: {
    height: 56,
    width: 56,
    backgroundColor: "#105DFB",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    gap: 7,
  },
})

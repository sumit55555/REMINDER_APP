import React, { useEffect, useState } from "react";

import {
  View,
  Button,
  Platform,
  TextInput,
  Text,
  FlatList,
} from "react-native";
import * as Notifications from "expo-notifications";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Notification() {
  const [selectedSound, setSelectedSound] = useState("default"); // Initialize with the default sound

  const [reminderTime, setReminderTime] = useState(new Date()); // Initialize with current date/time
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [notifications, setNotifications] = useState([]); // Store notifications

  // Request notification permissions (iOS and Android)
  useEffect(() => {
    const requestPermissions = async () => {
      const { granted } = await Notifications.requestPermissionsAsync();
      if (!granted) {
        console.error("Permission to display notifications was denied.");
      }
    };

    requestPermissions();
    loadNotifications();
  }, []);
  const selectSound = (sound) => {
    setSelectedSound(sound);
  };
  const content = {
    title: "Reminder",
    body: "Don't forget to do something!",
    sound: selectedSound, // Use the selected sound
    vibrate: [1000, 1000],
  };

  const loadNotifications = async () => {
    const allScheduledNotifications =
      await Notifications.getAllScheduledNotificationsAsync();
    setNotifications(allScheduledNotifications);
  };

  const scheduleReminder = async () => {
    const currentTime = new Date().getTime();
    const selectedTime = reminderTime.getTime();

    // Calculate the delay in milliseconds
    const delay = selectedTime - currentTime;

    if (delay <= 0) {
      console.error(
        "Invalid reminder time. Please choose a time in the future."
      );
      return;
    }

    const identifier = "my-reminder"; // You can use a unique identifier
    const content = {
      title: "Reminder",
      body: "Don't forget to do something!",
      // Add sound and other properties as needed
      sound: "default",
      vibrate: [1000, 1000], // Vibration pattern
    };

    try {
      await Notifications.scheduleNotificationAsync({
        identifier,
        content,
        trigger: {
          seconds: delay / 1000, // Convert delay to seconds
        },
      });
      console.log("Reminder scheduled successfully!");
      // Reload the list of notifications
      loadNotifications();
    } catch (error) {
      console.error("Error scheduling reminder:", error);
    }
  };
  const onDateTimeChange = (event, selectedDate) => {
    if (selectedDate) {
      setReminderTime(selectedDate);
    }
    setShowDateTimePicker(false);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10%",
      }}
    >
      <Button
        title="Open Date and Time Picker"
        onPress={() => setShowDateTimePicker(true)}
      />
      {showDateTimePicker && (
        <DateTimePicker
          value={reminderTime}
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={onDateTimeChange}
        />
      )}
      <Button title="Schedule Reminder" onPress={scheduleReminder} />

      {/* Display the list of scheduled notifications */}
      <Text style={{ marginTop: 20, fontWeight: "bold" }}>
        Scheduled Notifications:
      </Text>
      <View>
        <Text>Select Notification Sound:</Text>
        <Picker
          selectedValue={selectedSound}
          onValueChange={(itemValue) => selectSound(itemValue)}
        >
          <Picker.Item label="Default" value="default" />
          <Picker.Item label="Sound 1" value="sound1" />
          <Picker.Item label="Sound 2" value="sound2" />
          {/* Add more sound options as needed */}
        </Picker>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.identifier}
        renderItem={({ item }) => (
          <View>
            <Text>{item.content.title}</Text>
            <Text>{item.content.body}</Text>
          </View>
        )}
      />
    </View>
  );
}

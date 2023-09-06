import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Platform,
  Alert,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
  Picker,
  TouchableWithoutFeedback,
} from "react-native";
import ModalDropdown from "react-native-modal-dropdown";

import styles from "./styles";

import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";

const ReminderScreen = () => {
  let normalReminderInterval;

  const [reminders, setReminders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showAddReminderButton, setShowAddReminderButton] = useState(false);
  const [userNote, setUserNote] = useState("");
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);
  const [editedNote, setEditedNote] = useState("");
  const [isCustomModalVisible, setIsCustomModalVisible] = useState(false);

  const [alertInterval, setAlertInterval] = useState("none");
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [isCustomInterval, setIsCustomInterval] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("Personal"); // Default category

  const handleDateChange = (event, date) => {
    if (date !== undefined) {
      setSelectedDate(date);
      setShowAddReminderButton(true);
    }
    setShowDatePicker(Platform.OS === "ios");
  };

  const addReminder = () => {
    const currentTime = new Date();
    if (selectedDate <= currentTime) {
      Alert.alert("Invalid Reminder", "Please choose a future date and time.");
      return;
    }

    const newReminder = {
      id: Date.now().toString(),
      date: selectedDate,
      note: userNote,
      alerted: false,
      category: selectedCategory,
    };

    setReminders([...reminders, newReminder]);
    setUserNote("");
    setShowDatePicker(false);
    setShowAddReminderButton(false);
  };

  const openEditModal = (reminder) => {
    setEditingReminder(reminder);
    setEditedNote(reminder.note);
    setSelectedDate(reminder.date);
    setSelectedCategory(reminder.category); // Populate the category in the edit modal
    setIsEditModalVisible(true);
  };

  const saveEditedReminder = () => {
    const updatedReminders = reminders.map((reminder) => {
      if (reminder.id === editingReminder.id) {
        return {
          ...reminder,
          date: selectedDate,
          note: editedNote,
          alerted: false,
          category: selectedCategory,
        };
      }
      return reminder;
    });

    setReminders(updatedReminders);
    setIsEditModalVisible(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();
      setReminders((prevReminders) =>
        prevReminders.map((reminder) => {
          if (currentTime >= reminder.date && !reminder.alerted) {
            Alert.alert(
              "Reminder",
              `It's time for your reminder!\nNote: ${reminder.note}`
            );
            return { ...reminder, alerted: true };
          }
          return reminder;
        })
      );
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const ReminderItem = ({ reminder }) => (
    <TouchableOpacity
      style={styles.reminderItem}
      onPress={() => openEditModal(reminder)}
    >
      <View style={styles.infoContainer}>
        <Text style={styles.dateText}>{reminder.date.toLocaleString()}</Text>
        <Text style={styles.noteText}>Note: {reminder.note}</Text>
        <Text style={styles.categoryText}>Category: {reminder.category}</Text>
      </View>
      <View style={styles.iconContainer}>
        {reminder.alerted && (
          <Ionicons name="checkmark-circle" size={24} color="green" />
        )}
        <FontAwesome name="edit" size={24} color="blue" />
      </View>
      <TouchableOpacity
        onPress={() => {
          const updatedReminders = reminders.filter(
            (rem) => rem.id !== reminder.id
          );
          setReminders(updatedReminders);
        }}
      >
        <Ionicons name="trash-bin-outline" size={24} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
  const openCustomModal = () => {
    setIsCustomModalVisible(true);
  };

  const closeCustomModal = () => {
    setIsCustomModalVisible(false);
  };
  const handleAlertIntervalChange = (value) => {
    if (value === "Select Alert Interval") {
      setIsAlertActive(false); // No custom interval selected
      setIsCustomInterval(false);
      setAlertInterval("none"); // Reset alert interval
    } else if (value === "Normal Reminder") {
      setIsAlertActive(true); // Normal reminder (default interval)
      setIsCustomInterval(false);
      setAlertInterval("none"); // Reset alert interval
    } else {
      setIsAlertActive(true); // Custom interval selected
      setIsCustomInterval(true);
      setAlertInterval(value);
    }
  };

  const startAlert = () => {
    // Clear any existing interval
    clearInterval(normalReminderInterval);

    if (isAlertActive && isCustomInterval) {
      // Custom interval selected
      switch (alertInterval) {
        case "5seconds":
          normalReminderInterval = setInterval(() => {
            Alert.alert("Reminder", "It's time for your reminder!");
          }, 5000);
          break;
        case "1week":
          normalReminderInterval = setInterval(() => {
            Alert.alert("Reminder", "It's time for your weekly reminder!");
          }, 7 * 24 * 60 * 60 * 1000);
          break;
        case "2days":
          normalReminderInterval = setInterval(() => {
            Alert.alert(
              "Reminder",
              "It's time for your reminder every 2 days!"
            );
          }, 2 * 24 * 60 * 60 * 1000);
          break;
        default:
          setIsAlertActive(false);
      }
    }
  };

  useEffect(() => {
    if (isAlertActive) {
      startAlert();
    }
  }, [isAlertActive]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Set a Reminder</Text>
      <Button
        title="Select Date and Time"
        onPress={() => setShowDatePicker(true)}
      />
      <ModalDropdown
        options={[
          "Select Alert Interval",
          "Normal Reminder",
          "Every 5 seconds",
          "Once a week",
          "Once every 2 days",
        ]}
        defaultValue="Select Alert Interval"
        onSelect={(index, value) => handleAlertIntervalChange(value)}
      />

      <TextInput
        style={styles.noteInput}
        placeholder="Add a note..."
        onChangeText={setUserNote}
        value={userNote}
      />
      <RNPickerSelect
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        items={[
          { label: "Personal", value: "Personal" },
          { label: "Work", value: "Work" },
        ]}
        value={selectedCategory}
      />
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}
      {showAddReminderButton && (
        <TouchableOpacity onPress={addReminder}>
          <Ionicons name="add-circle" size={40} color="green" />
        </TouchableOpacity>
      )}
      <Text style={styles.heading}>Reminders:</Text>
      <FlatList
        style={styles.reminderList}
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReminderItem reminder={item} />}
      />

      {/* Edit Reminder Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditModalVisible}
      >
        <View style={styles.editModal}>
          <Text>Edit Reminder</Text>

          <DateTimePicker
            value={selectedDate}
            mode="datetime"
            is24Hour={true}
            display="default"
            onChange={(event, date) => setSelectedDate(date)}
          />

          <TextInput
            style={styles.noteInput}
            placeholder="Edit note..."
            onChangeText={setEditedNote}
            value={editedNote}
          />
          <RNPickerSelect
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            items={[
              { label: "Personal", value: "Personal" },
              { label: "Work", value: "Work" },
            ]}
            value={selectedCategory}
          />
          <Button title="Save" onPress={saveEditedReminder} />
          <Button title="Cancel" onPress={() => setIsEditModalVisible(false)} />
        </View>
      </Modal>

      {/* Custom Modal */}
    </View>
  );
};

export default ReminderScreen;

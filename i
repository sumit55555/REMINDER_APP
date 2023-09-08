// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   Button,
//   Platform,
//   Alert,
//   FlatList,
//   TouchableOpacity,
//   TextInput,
//   StyleSheet,
//   Modal,
//   Picker,
//   TouchableWithoutFeedback,
// } from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { Ionicons, FontAwesome } from "@expo/vector-icons";
// import RNPickerSelect from "react-native-picker-select";
// import styles from "./styles";

// const ReminderScreen = () => {
//   const [reminders, setReminders] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [showAddReminderButton, setShowAddReminderButton] = useState(false);
//   const [userNote, setUserNote] = useState("");
//   const [isEditModalVisible, setIsEditModalVisible] = useState(false);
//   const [editingReminder, setEditingReminder] = useState(null);
//   const [editedNote, setEditedNote] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("Personal");
//   const [repeatInterval, setRepeatInterval] = useState("none");
//   const [editRepeatInterval, setEditRepeatInterval] = useState("none");

//   const handleDateChange = (event, date) => {
//     if (date !== undefined) {
//       setSelectedDate(date);
//       setShowAddReminderButton(true);
//     }
//     setShowDatePicker(Platform.OS === "ios");
//   };
//   const addReminder = () => {
//     const currentTime = new Date();
//     if (selectedDate <= currentTime) {
//       Alert.alert("Invalid Reminder", "Please choose a future date and time.");
//       return;
//     }

//     const newReminder = {
//       id: Date.now().toString(),
//       date: selectedDate,
//       note: userNote,
//       alerted: false,
//       category: selectedCategory,
//       repeatInterval, // Store the repeat interval
//     };

//     setReminders([...reminders, newReminder]);
//     setUserNote("");
//     setRepeatInterval("none"); // Reset the repeat interval
//     setShowDatePicker(false);
//     setShowAddReminderButton(false);
//   };

//   const openEditModal = (reminder) => {
//     setEditingReminder(reminder);
//     setEditedNote(reminder.note);
//     setSelectedDate(reminder.date);
//     setSelectedCategory(reminder.category);
//     setEditRepeatInterval(reminder.repeatInterval); // Set the repeat interval for editing
//     setIsEditModalVisible(true);
//   };

//   const saveEditedReminder = () => {
//     const updatedReminders = reminders.map((reminder) => {
//       if (reminder.id === editingReminder.id) {
//         return {
//           ...reminder,
//           date: selectedDate,
//           note: editedNote,
//           alerted: false,
//           category: selectedCategory,
//           repeatInterval: editRepeatInterval, // Include the edited repeat interval
//         };
//       }
//       return reminder;
//     });

//     setReminders(updatedReminders);
//     setIsEditModalVisible(false);
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const currentTime = new Date();
//       setReminders((prevReminders) =>
//         prevReminders.map((reminder) => {
//           if (currentTime >= reminder.date && !reminder.alerted) {
//             Alert.alert(
//               "Reminder",
//               `It's time for your reminder!\nNote: ${reminder.note}`
//             );
//             if (reminder.repeatInterval !== "none") {
//               // Schedule the next reminder based on the repeat interval
//               const nextReminderDate = new Date(reminder.date);
//               switch (reminder.repeatInterval) {
//                 case "10s":
//                   nextReminderDate.setSeconds(
//                     nextReminderDate.getSeconds() + 10
//                   );
//                   break;
//                 case "1w":
//                   nextReminderDate.setDate(nextReminderDate.getDate() + 7);
//                   break;
//                 case "2d":
//                   nextReminderDate.setDate(nextReminderDate.getDate() + 2);
//                   break;
//                 // Add more cases for other repeat intervals
//                 default:
//                   // Do nothing for "none" or unsupported intervals
//                   break;
//               }
//               reminder.date = nextReminderDate;
//             } else {
//               reminder.alerted = true;
//             }
//             return { ...reminder };
//           }
//           return reminder;
//         })
//       );
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, [reminders]);
//   const getRepeatLabel = (repeatInterval) => {
//     switch (repeatInterval) {
//       case "none":
//         return "None";
//       case "10s":
//         return "Every 10 seconds";
//       case "1w":
//         return "Once a week";
//       case "2d":
//         return "Once every two days";
//       // Add more cases for other repeat intervals
//       default:
//         return "Unknown";
//     }
//   };

//   const ReminderItem = ({ reminder }) => (
//     <TouchableOpacity
//       style={styles.reminderItem}
//       onPress={() => openEditModal(reminder)}
//     >
//       <View style={styles.infoContainer}>
//         <Text style={styles.dateText}>{reminder.date.toLocaleString()}</Text>
//         <Text style={styles.noteText}>Note: {reminder.note}</Text>
//         <Text style={styles.categoryText}>Category: {reminder.category}</Text>
//         <Text style={styles.repeatText}>
//           Repeat: {getRepeatLabel(reminder.repeatInterval)}
//         </Text>
//       </View>
//       <View style={styles.iconContainer}>
//         {reminder.alerted && (
//           <Ionicons name="checkmark-circle" size={24} color="green" />
//         )}
//         <FontAwesome name="edit" size={24} color="blue" />
//       </View>
//       <TouchableOpacity
//         onPress={() => {
//           const updatedReminders = reminders.filter(
//             (rem) => rem.id !== reminder.id
//           );
//           setReminders(updatedReminders);
//         }}
//       >
//         <Ionicons name="trash-bin-outline" size={24} color="red" />
//       </TouchableOpacity>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Set a Reminder</Text>
//       <Button
//         title="Select Date and Time"
//         onPress={() => setShowDatePicker(true)}
//       />
//       <TextInput
//         style={styles.noteInput}
//         placeholder="Add a note..."
//         onChangeText={setUserNote}
//         value={userNote}
//       />
//       <RNPickerSelect
//         onValueChange={(itemValue) => setRepeatInterval(itemValue)}
//         items={[
//           { label: "None", value: "none" },
//           { label: "Every 10 seconds", value: "10s" },
//           { label: "Once a week", value: "1w" },
//           { label: "Once every two days", value: "2d" },
//           // Add more options as needed
//         ]}
//         value={repeatInterval}
//       />
//       <RNPickerSelect
//         onValueChange={(itemValue) => setSelectedCategory(itemValue)}
//         items={[
//           { label: "Personal", value: "Personal" },
//           { label: "Work", value: "Work" },
//         ]}
//         value={selectedCategory}
//       />
//       {showDatePicker && (
//         <DateTimePicker
//           value={selectedDate}
//           mode="datetime"
//           is24Hour={true}
//           display="default"
//           onChange={handleDateChange}
//         />
//       )}
//       {showAddReminderButton && (
//         <TouchableOpacity onPress={addReminder}>
//           <Ionicons name="add-circle" size={40} color="green" />
//         </TouchableOpacity>
//       )}
//       <Text style={styles.heading}>Reminders:</Text>
//       <FlatList
//         style={styles.reminderList}
//         data={reminders}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => <ReminderItem reminder={item} />}
//       />

//       {/* Edit Reminder Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={isEditModalVisible}
//       >
//         <View style={styles.editModal}>
//           <Text>Edit Reminder</Text>
//           <DateTimePicker
//             value={selectedDate}
//             mode="datetime"
//             is24Hour={true}
//             display="default"
//             onChange={(event, date) => setSelectedDate(date)}
//           />
//           <TextInput
//             style={styles.noteInput}
//             placeholder="Edit note..."
//             onChangeText={setEditedNote}
//             value={editedNote}
//           />
//           <RNPickerSelect
//             onValueChange={(itemValue) => setEditRepeatInterval(itemValue)}
//             items={[
//               { label: "None", value: "none" },
//               { label: "Every 10 seconds", value: "10s" },
//               { label: "Once a week", value: "1w" },
//               { label: "Once every two days", value: "2d" },
//               // Add more options as needed
//             ]}
//             value={editRepeatInterval}
//           />
//           <RNPickerSelect
//             onValueChange={(itemValue) => setSelectedCategory(itemValue)}
//             items={[
//               { label: "Personal", value: "Personal" },
//               { label: "Work", value: "Work" },
//               // Add more category options as needed
//             ]}
//             value={selectedCategory}
//           />
//           <Button title="Save" onPress={saveEditedReminder} />
//           <Button title="Cancel" onPress={() => setIsEditModalVisible(false)} />
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default ReminderScreen;

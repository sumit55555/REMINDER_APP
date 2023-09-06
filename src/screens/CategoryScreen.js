import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const EventListItem = ({ title, emoji, date }) => (
  <View style={styles.eventListItem}>
    <Text style={styles.eventTitle}>{title}</Text>
    <Text style={styles.eventEmoji}>{emoji}</Text>
    <Text style={styles.eventDate}>{date}</Text>
  </View>
);

const CategoryScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <View style={styles.headingBox}>
          <Ionicons
            name="arrow-back-outline"
            size={35}
            color="white"
            style={styles.arrowIcon}
          />

          <Text style={styles.heading}>Weekly</Text>
          <Ionicons name="add" size={35} color="white" style={styles.addIcon} />
        </View>
      </View>
      <View>
        <EventListItem title="Meeting" emoji="📅" date="August 20, 2023" />
        <View style={styles.separator} />

        <EventListItem title="Birthday" emoji="🎂" date="September 5, 2023" />
        <View style={styles.separator} />

        <EventListItem title="Vacation" emoji="✈️" date="July 10, 2023" />
        <View style={styles.separator} />

        <EventListItem title="Anniversary" emoji="❤️" date="October 15, 2023" />
        <View style={styles.separator} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxContainer: {
    height: "12%",
    backgroundColor: "#FFE5B4",
    width: "100%",
  },
  headingBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontSize: 22,
    paddingTop: "15%",
    paddingLeft: "5%",
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  addIcon: {
    paddingTop: "13%",
    paddingRight: "5%",
  },
  arrowIcon: {
    paddingTop: "13%",
    paddingLeft: "5%",
  },
  eventListItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    marginTop: "10%",
    paddingLeft: 20,
  },
  eventTitle: {
    fontSize: 16,
    marginRight: 10,
  },
  eventEmoji: {
    fontSize: 20,
  },
  eventDate: {
    fontSize: 14,
    marginLeft: "auto",
    marginRight: 20,
  },
  separator: {
    borderBottomWidth: 1,
    width: "90%",
    borderBottomColor: "#ccc",
    marginLeft: "5%",
  },
});
export default CategoryScreen;

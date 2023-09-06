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

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <View style={styles.headingBox}>
          <Text style={styles.heading}>RemindME</Text>
          <Ionicons
            name="search"
            size={35}
            color="white"
            style={styles.addIcon}
          />
        </View>
        <View style={styles.categoriesContainer}>
          <View style={styles.categoryContainer}>
            <View style={styles.topLeft}>
              <Ionicons name="alarm" size={30} color="red" />
            </View>
            <View style={styles.topRight}>
              <Text style={styles.topRightText}>0</Text>
            </View>

            <View style={styles.bottomRight}>
              <Text style={styles.bottomRightText}>Daily</Text>
            </View>
          </View>
          <View style={styles.categoryContainer}>
            <View style={styles.topLeft}>
              <Ionicons name="cloud" size={30} color="green" />
            </View>
            <View style={styles.topRight}>
              <Text style={styles.topRightText}>13</Text>
            </View>

            <View style={styles.bottomRight}>
              <Text style={styles.bottomRightText}>Weekly</Text>
            </View>
          </View>
        </View>
        <View style={styles.categoriesContainer}>
          <View style={styles.categoryContainer}>
            <View style={styles.topLeft}>
              <Ionicons name="star" size={30} color="blue" />
            </View>
            <View style={styles.topRight}>
              <Text style={styles.topRightText}>98</Text>
            </View>

            <View style={styles.bottomRight}>
              <Text style={styles.bottomRightText}>Monthly</Text>
            </View>
          </View>
          <View style={styles.categoryContainer}>
            <View style={styles.topLeft}>
              <Ionicons name="heart" size={30} color="orange" />
            </View>
            <View style={styles.topRight}>
              <Text style={styles.topRightText}>123</Text>
            </View>

            <View style={styles.bottomRight}>
              <Text style={styles.bottomRightText}>Completed</Text>
            </View>
          </View>
        </View>
      </View>

      <Text style={styles.upcomingText}>upcomings</Text>

      <Text style={styles.subTitle}>EVENTS</Text>
      <View style={{ marginTop: "15%" }}>
        <EventListItem title="Meeting" emoji="📅" date="August 20, 2023" />
        <View style={styles.separator} />

        <EventListItem title="Birthday" emoji="🎂" date="September 5, 2023" />
        <View style={styles.separator} />

        <EventListItem title="Vacation" emoji="✈️" date="July 10, 2023" />
        <View style={styles.separator} />

        <EventListItem title="Anniversary" emoji="❤️" date="October 15, 2023" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxContainer: {
    height: "55%",
    backgroundColor: "#FFE5B4",
    width: "100%",
    borderBottomStartRadius: "15%",
    borderEndEndRadius: "15%",
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
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    marginTop: "8%",
  },
  categoryContainer: {
    height: 130,
    width: 170,
    borderRadius: 25,
    backgroundColor: "#fff",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  topLeft: {
    position: "absolute",
    top: 18,
    left: 15,
  },
  topRight: {
    position: "absolute",
    top: 7,
    right: 15,
  },

  bottomRight: {
    position: "absolute",
    bottom: 12,
    right: 15,
  },

  topRightText: {
    color: "black",
    fontSize: 45,
    maxWidth: "100%",
  },

  bottomRightText: {
    color: "black",
    fontSize: 20,
  },
  upcomingText: {
    position: "absolute",
    bottom: 347,
    right: 20,
  },

  subTitle: {
    position: "absolute",
    bottom: "41%",
    left: 20,
    zIndex: 1,
    fontSize: 18,
  },
  searchIcon: {
    position: "absolute",
    bottom: "3%",
    left: 30,
    zIndex: 1,
  },
  eventListItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
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
    marginTop: 5,
    marginBottom: 5,
    marginLeft: "5%",
  },
});

export default MainScreen;

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  heading: {
    fontSize: 18,
    paddingTop: "5%",
    fontWeight: "bold",
    marginBottom: 10,
  },
  customButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  customButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  customModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red", // Modal background color
  },
  customModalText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white", // Text color inside the modal
    marginBottom: 20,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "column",
  },
  reminderItem: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 12,
    paddingHorizontal: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 50,
  },
  iconContainer: {
    width: 30,
    alignItems: "center",
    marginLeft: "20%",
  },
  noteInput: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 10,
  },
  noteText: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#777",
  },
  reminderList: {
    width: "90%",
  },
  editModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryText: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#777",
  },
});

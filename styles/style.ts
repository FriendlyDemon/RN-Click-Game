import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  incrementalContainer: {
    flexDirection: "row",
    height: "50%",
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#cccccc",
  },
  clickContainer: {
    flex: 1,
    padding: 20,
    width: "60%",
    alignItems: "center",
  },
  upgradesContainer: {
    height: "100%",
    width: "40%",
    borderColor: "black",
    borderWidth: 1,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: "#666666",
  },
  upgradeScrollParent: {
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  upgradeScroll: {
    padding: 5,
    gap: 5,
  },
  clicker: {
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 200,
  },
  grave: { width: "100%", height: "100%" },
  upgradeBox: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
    width: "100%",
    backgroundColor: "#dddddd",
  },
  counterText: {},
  ShovelText: {},
  MinersText: {},
  icons: { height: 12, width: 12, resizeMode: "contain" },
});

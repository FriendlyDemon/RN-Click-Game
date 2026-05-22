import { StyleSheet } from "react-native";

const colors = {
  bg: "#1e1f24", // main background
  panel: "#2a2c33", // containers
  card: "#3a3d46", // upgrade boxes
  accent: "#c2a36b", // gold
  bone: "#d8d4c8", // bone text
  text: "#f1f1f1",
  subtext: "#a0a4ab",
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  incrementalContainer: {
    flexDirection: "row",
    height: "60%",
    backgroundColor: "#1e1f24",
  },
  clickContainer: {
    flex: 1,
    padding: 20,
    width: "60%",
    alignItems: "center",
    gap: 12,
  },
  upgradesContainer: {
    height: "100%",
    width: "40%",
    borderColor: "#444",
    borderWidth: 1,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: colors.panel,
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
    borderRadius: 100,
    backgroundColor: "#2a2c33",
    boxShadow: "0px 0px 10px 1px #00000040",
    elevation: 8,
  },
  grave: { width: "70%", height: "70%" },
  upgradeBox: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
    width: "100%",
    backgroundColor: colors.card,
  },
  counterText: { fontSize: 16, color: colors.text },
  UpgradeNameText: { fontWeight: "bold", color: colors.text },
  UpgradeText: { color: colors.text },
  icons: { height: 12, width: 12 },
  middle: {
    height: 50,
    flexDirection: "row",
    borderStyle: "solid",
    borderColor: "black",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  middleButtonsView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  middleButtons: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 25,
    justifyContent: "center",
    height: 40,
    padding: 5,
    boxShadow: "1px 5px 10px 1px #00000040",
  },
  bottom: { flex: 1, backgroundColor: "#dddddd" },
  optionsCog: { fontSize: 40, width: 40, color: "grey" },
  options: {
    flexDirection: "column",
    width: 100,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
  },
});

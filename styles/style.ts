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
    height: "50%",
    borderColor: "black",
    borderWidth: 1,
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
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 10,
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
  icons: { height: 12, width: 12, resizeMode: "contain" },
  bottom: { flex: 1, backgroundColor: "#dddddd" },
});

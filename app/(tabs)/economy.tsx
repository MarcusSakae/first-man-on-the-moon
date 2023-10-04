import { StyleSheet } from "react-native";
import GlobalStyles from "../../components/GlobalStyles";
import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";

export default function EconomyScreen() {
  return (
    <View style={GlobalStyles.contentContainer}>
      <Text style={GlobalStyles.title}>Economy</Text>
      <View style={styles.lightRow}>
        <Text style={styles.lightRowLeft}>Government funding</Text>
        <Text style={styles.lightRowRight}>
          $3 <Text style={{ color: Colors.primary }}>per second</Text>
        </Text>
      </View>
      <View style={styles.darkRow}>
        <Text style={styles.darkRowLeft}>Government funding</Text>
        <Text style={styles.darkRowRight}>
          $3 <Text style={{ color: Colors.primary }}>per second</Text>
        </Text>
      </View>
      <View style={styles.lightRow}>
        <Text style={styles.lightRowLeft}>Government funding</Text>
        <Text style={styles.lightRowRight}>
          $3 <Text style={{ color: Colors.primary }}>per second</Text>
        </Text>
      </View>
      <View style={styles.darkRow}>
        <Text style={styles.darkRowLeft}>Government funding</Text>
        <Text style={styles.darkRowRight}>
          $3 <Text style={{ color: Colors.primary }}>per second</Text>
        </Text>
      </View>
      <View style={styles.lightRow}>
        <Text style={styles.lightRowLeft}>Government funding</Text>
        <Text style={styles.lightRowRight}>
          $3 <Text style={{ color: Colors.primary }}>per second</Text>
        </Text>
      </View>
      <View style={styles.darkRow}>
        <Text style={styles.darkRowLeft}>Government funding</Text>
        <Text style={styles.darkRowRight}>
          $3 <Text style={{ color: Colors.primary }}>per second</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lightRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  lightRowLeft: {
    color: Colors.primary,
  },
  lightRowRight: {
    color: "white",
  },
  darkRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.15)",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  darkRowLeft: {
    color: Colors.primaryDark,
  },
  darkRowRight: {
    color: "white",
  },
});

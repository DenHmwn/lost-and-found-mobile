import { StyleSheet } from "react-native";

export const color = {
  primary: '#5B7FFF',       // Biru yang lebih cerah
  secondary: '#E8EFFF',     // Biru sangat muda untuk card
  background: '#F8FAFC',    // Abu-abu sangat terang
}

export const styles = StyleSheet.create({
  header: {
    backgroundColor: color.primary,
  },
  pageTitleContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    backgroundColor: color.background,
  },
  card: {
    backgroundColor: color.secondary,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 12,
    elevation: 2,    
    borderWidth: 0,   
  },
});

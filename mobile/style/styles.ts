import { StyleSheet } from "react-native";

export const color = {
  primary: '#486feeff',       // Biru yang lebih cerah
  secondary: '#c5d5f9ff',     // Biru sangat muda untuk card
  background: '#F8FAFC',    // Abu-abu sangat terang
}

export const styles = StyleSheet.create({
  background: {
    backgroundColor: color.primary,
  },
  PageTitle: {
    fontSize: 20,
    fontWeight: 'semibold',
    color: '#ffffff',
    alignItems: 'center',
    fontFamily: 'sans-serif-medium',
  },
  pageTitleContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 15,
    backgroundColor: color.primary,
    borderRadius: 10,
    fontSize: 50,
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

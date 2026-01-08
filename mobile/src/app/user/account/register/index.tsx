import { View } from "react-native";

export default function LoginPage() {
    return (
       <View style={{ flex: 1, backgroundColor: "#f7f7ff" }}>

       </View>
    )
}


const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",     
    paddingHorizontal: 24,
  },
  formCard: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },
  label: {
    fontSize: 12,
    color: "#4b5563",
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5f5",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f9fafb",
    fontSize: 13,
  },
  buttonPrimary: {
    marginTop: 24,
    backgroundColor: "#2f80ed",
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: "center",
  },
  buttonPrimaryText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },
  bottomTextWrapper: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  smallText: {
    fontSize: 12,
    color: "#6b7280",
  },
  linkText: {
    fontSize: 12,
    color: "#2f80ed",
    fontWeight: "600",
  },
});

import { styles } from "@/style/styles";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Appbar, TextInput } from "react-native-paper";

export default function LoginPage() {
    return (
       <View style={{ flex: 1, backgroundColor: "#f7f7ff" }}>
            <Appbar.Header style={styles.appBar} elevated>
            <Appbar.Content title="Register" titleStyle={styles.appBarTitle} />
            </Appbar.Header>

            <View style={localStyles.container}>
                <Text style={localStyles.label}>Nama</Text>
                <TextInput
                style={localStyles.input}
                placeholder="Masukkan nama"
             />

            <Text style={localStyles.label}>Email</Text>
            <TextInput
            style={localStyles.input}
            placeholder="Masukkan email"
            keyboardType="email-address"
            autoCapitalize="none"
            />

            <Text style={localStyles.label}>Password</Text>
            <TextInput
            style={localStyles.input}
            placeholder="Masukkan password"
            secureTextEntry
            />

            <Text style={localStyles.label}>No Telepon</Text>
            <TextInput
            style={localStyles.input}
            placeholder="Masukkan no telepon"
            keyboardType="phone-pad"
            />

            <TouchableOpacity
            style={localStyles.buttonPrimary}
                onPress={() => console.log("Register")}
            >
            <Text style={localStyles.buttonPrimaryText}>Register</Text>
            </TouchableOpacity>
            </View>
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

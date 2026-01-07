import { useState } from "react";


export default function LoginPage({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("login", { email, password });

  };

  const goToRegister = () => {
    navigation.navigate("RegisterPage");
  };

}


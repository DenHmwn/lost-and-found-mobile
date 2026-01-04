import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { AdminService } from "@/services/admin.service";
import { router } from "expo-router";

export default function CreateFound() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [reporterName, setReporterName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  return <View />;
}

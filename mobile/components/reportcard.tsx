import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Badge from "./Badge";
import { UiReport } from "../types/admin.ui";
import { formatDateTime } from "../utils/date";

function approvalColor(s: UiReport["approvalStatus"]) {
  if (s === "approved") return "green";
  if (s === "rejected") return "tomato";
  return "#999";
}

function processColor(s: UiReport["processStatus"]) {
  if (s === "in_progress") return "#f59e0b";
  if (s === "closed") return "#111";
  return "#2563eb";
}

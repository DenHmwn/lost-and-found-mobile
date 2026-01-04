import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { AdminService } from "@/services/admin.service";
import { toUiReport } from "@/adapters/admin.adapter";
import { UiReport } from "@/types/admin.ui";
import { formatDateTime } from "@/utils/date";

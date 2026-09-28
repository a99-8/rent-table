import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  Platform,
} from "react-native";
import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing"; // استيراد مكتبة المشاركة

import { RentFormData } from "../types";
import {
  calculateTotals,
  calculatePaymentBreakdown,
} from "../utils/calculations";
import { saveData, loadData } from "../database/storage";
import { InputForm } from "../components/InputForm";
import { SummaryTable } from "../components/SummaryTable";
import { PaymentsTable } from "../components/PaymentsTable";

export const HomeScreen = () => {
  const viewShotRef = useRef<any>(null);

  const [formData, setFormData] = useState<RentFormData>({
    tableName: "",
    rent: "",
    hasRentTax: false,
    insurance: "",
    water: "",
    paymentFrequency: 1,
  });

  useEffect(() => {
    loadData().then((saved) => {
      if (saved) setFormData(saved);
    });
  }, []);

  const handleInputChange = (key: keyof RentFormData, value: any) => {
    const updated = { ...formData, [key]: value };
    setFormData(updated);
    saveData(updated);
  };

  const totals = calculateTotals(formData);
  const perPayment = calculatePaymentBreakdown(
    totals,
    formData.paymentFrequency,
  );

  const captureTable = async (): Promise<string | null> => {
    try {
      if (viewShotRef.current) {
        return await viewShotRef.current.capture();
      }
      return null;
    } catch (e) {
      Alert.alert("خطأ", "حدث خطأ أثناء التقاط صورة الجدول");
      return null;
    }
  };

  // دالة المشاركة بدلاً من النسخ للحافظة
  const handleShareImage = async () => {
    const uri = await captureTable();
    if (!uri) return;

    // التحقق مما إذا كانت الميزة مدعومة على الجهاز
    const isAvailable = await Sharing.isAvailableAsync();
    if (isAvailable) {
      await Sharing.shareAsync(uri, {
        mimeType: "image/png",
        dialogTitle: "مشاركة جدول الإيجار",
      });
    } else {
      Alert.alert("خطأ", "المشاركة غير مدعومة على هذا الجهاز");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: Platform.OS === "ios" ? 60 : 80,
        }}
      >
        <Text style={styles.appTitle}>جدول الإيجار والدفعات</Text>

        <InputForm formData={formData} onChange={handleInputChange} />

        <ViewShot
          ref={viewShotRef}
          // العودة لحفظ الصورة كملف مؤقت بدلاً من base64
          options={{ format: "png", quality: 1.0, result: "tmpfile" }}
          style={{ backgroundColor: "#fff", padding: 12, borderRadius: 8 }}
        >
          <SummaryTable formData={formData} totals={totals} />

          <PaymentsTable formData={formData} perPayment={perPayment} />
        </ViewShot>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.btn} onPress={handleShareImage}>
            <Text style={styles.btnText}>مشاركة الصورة عبر الواتساب</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  appTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 12,
    color: "#222",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  btn: {
    backgroundColor: "#25D366", // لون الواتساب الأخضر
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

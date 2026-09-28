import React from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { RentFormData, PaymentFrequency } from "../types";

interface InputFormProps {
  formData: RentFormData;
  onChange: (key: keyof RentFormData, value: any) => void;
}

export const InputForm: React.FC<InputFormProps> = ({ formData, onChange }) => {
  const frequencies: PaymentFrequency[] = [1, 2, 4];

  const getFrequencyLabel = (freq: PaymentFrequency) => {
    switch (freq) {
      case 1:
        return "دفعة واحدة";
      case 2:
        return "دفعتان";
      case 4:
        return "أربع دفعات";
      default:
        return "";
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>البيانات الأساسية</Text>

      {/* اسم الجدول */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>اسم الجدول / العقار</Text>
        <TextInput
          style={styles.input}
          placeholder="مثال: شقة حي الملقا"
          value={formData.tableName}
          onChangeText={(val) => onChange("tableName", val)}
        />
      </View>

      {/* مبلغ الإيجار */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>مبلغ الإيجار السنوي</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          keyboardType="numeric"
          value={formData.rent}
          onChangeText={(val) => onChange("rent", val)}
        />
      </View>

      {/* مربع اختيار ضريبة الإيجار */}
      <View style={styles.switchRow}>
        <Text style={styles.label}>تطبيق ضريبة الإيجار (15%)</Text>
        <Switch
          value={formData.hasRentTax}
          onValueChange={(val) => onChange("hasRentTax", val)}
          trackColor={{ false: "#767577", true: "#28a745" }}
        />
      </View>

      {/* التأمين */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>مبلغ التأمين</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          keyboardType="numeric"
          value={formData.insurance}
          onChangeText={(val) => onChange("insurance", val)}
        />
      </View>

      {/* الماء */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>رسوم الماء</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          keyboardType="numeric"
          value={formData.water}
          onChangeText={(val) => onChange("water", val)}
        />
      </View>

      {/* مفتاح تفعيل نسبة العمولة اليدوية */}
      <View style={styles.switchRow}>
        <Text style={styles.label}>تحديد نسبة العمولة يدوياً (تلقائي 5%)</Text>
        <Switch
          value={formData.isCustomCommission}
          onValueChange={(val) => onChange("isCustomCommission", val)}
          trackColor={{ false: "#767577", true: "#28a745" }}
        />
      </View>

      {/* حقل إدخال نسبة العمولة */}
      {formData.isCustomCommission && (
        <View style={styles.inputGroup}>
          <Text style={styles.label}>نسبة العمولة (%)</Text>
          <TextInput
            style={styles.input}
            placeholder="مثال: 2.5 أو 5"
            keyboardType="numeric"
            value={formData.customCommission}
            onChangeText={(val) => onChange("customCommission", val)}
          />
        </View>
      )}

      {/* عدد الدفعات */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>عدد الدفعات</Text>
        <View style={styles.freqContainer}>
          {frequencies.map((freq) => (
            <TouchableOpacity
              key={freq}
              style={[
                styles.freqButton,
                formData.paymentFrequency === freq && styles.freqButtonActive,
              ]}
              onPress={() => onChange("paymentFrequency", freq)}
            >
              <Text
                style={[
                  styles.freqText,
                  formData.paymentFrequency === freq && styles.freqTextActive,
                ]}
              >
                {getFrequencyLabel(freq)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "right",
    color: "#333",
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    textAlign: "right",
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
    textAlign: "right",
    backgroundColor: "#fafafa",
  },
  switchRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  freqContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  freqButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#007bff",
    alignItems: "center",
  },
  freqButtonActive: {
    backgroundColor: "#007bff",
  },
  freqText: {
    color: "#007bff",
    fontWeight: "bold",
    fontSize: 13,
  },
  freqTextActive: {
    color: "#fff",
  },
});

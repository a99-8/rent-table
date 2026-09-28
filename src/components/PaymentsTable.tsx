import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RentFormData, CalculationResult } from "../types";

interface PaymentsTableProps {
  formData: RentFormData;
  perPayment: CalculationResult;
}

export const PaymentsTable: React.FC<PaymentsTableProps> = ({
  formData,
  perPayment,
}) => {
  const formatNum = (num: number) =>
    num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <View style={styles.container}>
      <View style={styles.tableCard}>
        <Text style={styles.tableTitle}>جدول الدفعة الأولى</Text>

        {/* الهيدر */}
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.headerCell, styles.labelCell]}>
            البيان
          </Text>
          <Text style={[styles.cell, styles.headerCell, styles.valueCell]}>
            قيمة الدفعة
          </Text>
        </View>

        {/* الإيجار */}
        <View style={styles.row}>
          <Text style={[styles.cell, styles.labelCell]}>الإيجار</Text>
          <Text style={[styles.cell, styles.valueCell]}>
            {formatNum(perPayment.rent)} ر.س
          </Text>
        </View>

        {/* ضريبة الإيجار - تظهر فقط عند التفعيل */}
        {formData.hasRentTax && (
          <View style={styles.row}>
            <Text style={[styles.cell, styles.labelCell]}>
              ضريبة الإيجار - 15%
            </Text>
            <Text style={[styles.cell, styles.valueCell]}>
              {formatNum(perPayment.rentTax)} ر.س
            </Text>
          </View>
        )}

        {/* التأمين */}
        <View style={styles.row}>
          <Text style={[styles.cell, styles.labelCell]}>التأمين</Text>
          <Text style={[styles.cell, styles.valueCell]}>
            {formatNum(perPayment.insurance)} ر.س
          </Text>
        </View>

        {/* الماء */}
        <View style={styles.row}>
          <Text style={[styles.cell, styles.labelCell]}>الماء</Text>
          <Text style={[styles.cell, styles.valueCell]}>
            {formatNum(perPayment.water)} ر.س
          </Text>
        </View>

        {/* العمولة */}
        <View style={styles.row}>
          <Text style={[styles.cell, styles.labelCell]}>العمولة</Text>
          <Text style={[styles.cell, styles.valueCell]}>
            {formatNum(perPayment.commission)} ر.س
          </Text>
        </View>

        {/* ضريبة العمولة */}
        <View style={styles.row}>
          <Text style={[styles.cell, styles.labelCell]}>
            ضريبة العمولة - 15%
          </Text>
          <Text style={[styles.cell, styles.valueCell]}>
            {formatNum(perPayment.commissionTax)} ر.س
          </Text>
        </View>

        {/* المجموع الخاص بالدفعة */}
        <View style={[styles.row, styles.totalRow]}>
          <Text style={[styles.cell, styles.labelCell, styles.totalText]}>
            مجموع الدفعة 1
          </Text>
          <Text style={[styles.cell, styles.valueCell, styles.totalText]}>
            {formatNum(perPayment.total)} ر.س
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  tableCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 16,
  },
  tableTitle: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#28a745",
  },
  row: {
    flexDirection: "row-reverse",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 8,
    alignItems: "center",
  },
  headerRow: {
    backgroundColor: "#28a745",
    borderRadius: 4,
  },
  cell: {
    fontSize: 13,
    color: "#333",
  },
  labelCell: {
    flex: 1.5,
    fontWeight: "600",
    textAlign: "right",
    paddingRight: 8,
  },
  valueCell: {
    flex: 1,
    textAlign: "left",
    paddingLeft: 8,
  },
  headerCell: {
    color: "#fff",
    fontWeight: "bold",
  },
  totalRow: {
    backgroundColor: "#d4edda",
    borderBottomWidth: 0,
    marginTop: 4,
    borderRadius: 4,
  },
  totalText: {
    fontWeight: "bold",
    color: "#155724",
    fontSize: 14,
  },
});

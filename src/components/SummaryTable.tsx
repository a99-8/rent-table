import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RentFormData, CalculationResult } from "../types";

interface SummaryTableProps {
  formData: RentFormData;
  totals: CalculationResult;
}

export const SummaryTable: React.FC<SummaryTableProps> = ({
  formData,
  totals,
}) => {
  const formatNum = (num: number) =>
    num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <View style={styles.tableCard}>
      <Text style={styles.tableTitle}>
        {`جدول حساب الأيجار لـ(${formData.tableName || "الوحدة"})`}
      </Text>

      {/* الهيدر: البيان أولاً على اليمين ثم المبلغ على اليسار */}
      <View style={[styles.row, styles.headerRow]}>
        <Text style={[styles.cell, styles.headerCell, styles.labelCell]}>
          البيان
        </Text>
        <Text style={[styles.cell, styles.headerCell, styles.valueCell]}>
          المبلغ
        </Text>
      </View>

      {/* الإيجار */}
      <View style={styles.row}>
        <Text style={[styles.cell, styles.labelCell]}>الإيجار</Text>
        <Text style={[styles.cell, styles.valueCell]}>
          {formatNum(totals.rent)} ر.س
        </Text>
      </View>

      {/* ضريبة الإيجار - تظهر فقط عند التفعيل */}
      {formData.hasRentTax && (
        <View style={styles.row}>
          <Text style={[styles.cell, styles.labelCell]}>
            ضريبة الإيجار - 15%
          </Text>
          <Text style={[styles.cell, styles.valueCell]}>
            {formatNum(totals.rentTax)} ر.س
          </Text>
        </View>
      )}

      {/* التأمين */}
      <View style={styles.row}>
        <Text style={[styles.cell, styles.labelCell]}>التأمين</Text>
        <Text style={[styles.cell, styles.valueCell]}>
          {formatNum(totals.insurance)} ر.س
        </Text>
      </View>

      {/* الماء */}
      <View style={styles.row}>
        <Text style={[styles.cell, styles.labelCell]}>الماء</Text>
        <Text style={[styles.cell, styles.valueCell]}>
          {formatNum(totals.water)} ر.س
        </Text>
      </View>

      {/* العمولة */}
      <View style={styles.row}>
        <Text style={[styles.cell, styles.labelCell]}>العمولة - 5%</Text>
        <Text style={[styles.cell, styles.valueCell]}>
          {formatNum(totals.commission)} ر.س
        </Text>
      </View>

      {/* ضريبة العمولة */}
      <View style={styles.row}>
        <Text style={[styles.cell, styles.labelCell]}>ضريبة العمولة - 15%</Text>
        <Text style={[styles.cell, styles.valueCell]}>
          {formatNum(totals.commissionTax)} ر.س
        </Text>
      </View>

      {/* المجموع الكلي */}
      <View style={[styles.row, styles.totalRow]}>
        <Text style={[styles.cell, styles.labelCell, styles.totalText]}>
          المجموع الكلي
        </Text>
        <Text style={[styles.cell, styles.valueCell, styles.totalText]}>
          {formatNum(totals.total)} ر.س
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tableCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 12,
  },
  tableTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#007bff",
  },
  row: {
    flexDirection: "row-reverse",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 8,
    alignItems: "center",
  },
  headerRow: {
    backgroundColor: "#007bff",
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
    backgroundColor: "#e9ecef",
    borderBottomWidth: 0,
    marginTop: 4,
    borderRadius: 4,
  },
  totalText: {
    fontWeight: "bold",
    color: "#000",
    fontSize: 14,
  },
});

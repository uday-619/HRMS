"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

// Sample data kept outside to prevent re-creation on renders
const samplePayslipData = {
  1: {
    user: "John Doe",
    payslipMonth: "2024-09",
    basicSalary: "50000",
    workingDays: "22",
    lopDays: "0",
    paidDays: "22",
    bonus: "5000",
    incentive: "2000",
    leaveDeduction: "0",
    overtimeHours: "5",
    overtimeRate: "500",
    overtimePayment: "2500",
    pf: "6000",
    esi: "1500",
    empEpf: "6000",
    emplrEpf: "6000",
    salAdvance: "0",
    paymentMethod: "bank",
    paymentDate: "2024-01-31",
    paymentStatus: "paid",
    allowances: [
      { name: "Transport Allowance", amount: "2000" },
      { name: "Medical Allowance", amount: "1500" }
    ],
  },
  2: {
    user: "Jane Smith",
    payslipMonth: "2024-09",
    basicSalary: "45000",
    workingDays: "20",
    lopDays: "2",
    paidDays: "20",
    bonus: "4000",
    incentive: "1500",
    leaveDeduction: "2000",
    overtimeHours: "3",
    overtimeRate: "400",
    overtimePayment: "1200",
    pf: "5400",
    esi: "1350",
    empEpf: "5400",
    emplrEpf: "5400",
    salAdvance: "0",
    paymentMethod: "bank",
    paymentDate: "2024-01-31",
    paymentStatus: "unpaid",
    allowances: [
      { name: "Transport Allowance", amount: "1800" },
      { name: "Medical Allowance", amount: "1200" }
    ],
  }
};

// Sub-component that actually uses searchParams
const PayrollFormContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode'); // 'view', 'edit', or null (create)
  const id = searchParams.get('id');

  const [formData, setFormData] = useState({
    user: "",
    payslipMonth: "",
    basicSalary: "",
    workingDays: "",
    lopDays: "",
    paidDays: "",
    bonus: "",
    incentive: "",
    leaveDeduction: "",
    overtimeHours: "",
    overtimeRate: "",
    overtimePayment: "",
    pf: "",
    esi: "",
    allowances: [],
    empEpf: "",
    emplrEpf: "",
    salAdvance: "",
    paymentMethod: "",
    paymentDate: "",
    paymentStatus: "",
  });

  const [allowances, setAllowances] = useState([{ name: "", amount: "" }]);

  useEffect(() => {
    if (mode && id && samplePayslipData[id]) {
      const data = samplePayslipData[id];
      setFormData(data);
      if (data.allowances && data.allowances.length > 0) {
        setAllowances(data.allowances);
      } else {
        setAllowances([{ name: "", amount: "" }]);
      }
    }
  }, [mode, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAllowanceChange = (index, field, value) => {
    const updatedAllowances = [...allowances];
    updatedAllowances[index] = { ...updatedAllowances[index], [field]: value };
    setAllowances(updatedAllowances);

    const validAllowances = updatedAllowances.filter(a => a.name && a.amount);
    setFormData((prev) => ({
      ...prev,
      allowances: validAllowances,
    }));
  };

  const addNewAllowance = () => {
    setAllowances([...allowances, { name: "", amount: "" }]);
  };

  const removeAllowance = (index) => {
    if (allowances.length > 1) {
      const updatedAllowances = allowances.filter((_, i) => i !== index);
      setAllowances(updatedAllowances);
      const validAllowances = updatedAllowances.filter(a => a.name && a.amount);
      setFormData((prev) => ({
        ...prev,
        allowances: validAllowances,
      }));
    }
  };

  const totalAllowance = (formData.allowances || []).reduce(
    (sum, a) => sum + parseFloat(a.amount || 0),
    0
  );

  const netPayable =
    parseFloat(formData.basicSalary || 0) +
    parseFloat(formData.bonus || 0) +
    parseFloat(formData.incentive || 0) +
    parseFloat(formData.overtimePayment || 0) +
    totalAllowance -
    (parseFloat(formData.leaveDeduction || 0) +
      parseFloat(formData.pf || 0) +
      parseFloat(formData.esi || 0) +
      parseFloat(formData.salAdvance || 0));

  const getPageTitle = () => {
    if (mode === 'view') return 'View Payslip';
    if (mode === 'edit') return 'Edit Payslip';
    return 'Create New Payslip';
  };

  const isViewMode = mode === 'view';
  const isEditMode = mode === 'edit';

  return (
    <Box sx={{ padding: "0.5rem" }}>
      <Box sx={{ marginBottom: "1rem" }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: "#1e293b" }}>
          {getPageTitle()}
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "0.75rem",
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
          border: "1px solid #e5e7eb",
          padding: "2rem",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <FormControl sx={{ flex: "1 1 30%" }}>
            <InputLabel>User</InputLabel>
            <Select
              name="user"
              value={formData.user}
              label="User"
              onChange={handleChange}
              disabled={isViewMode}
            >
              <MenuItem value="user1">User 1</MenuItem>
              <MenuItem value="user2">User 2</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ flex: "1 1 30%" }}>
            <InputLabel>Payslip Month</InputLabel>
            <Select
              name="payslipMonth"
              value={formData.payslipMonth}
              label="Payslip Month"
              onChange={handleChange}
              disabled={isViewMode}
            >
              {(() => {
                const currentYear = new Date().getFullYear();
                const months = [
                  'January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'
                ];
                return months.map((month, index) => {
                  const monthValue = `${currentYear}-${String(index + 1).padStart(2, '0')}`;
                  const displayText = `${month} ${currentYear}`;
                  return (
                    <MenuItem key={monthValue} value={monthValue}>
                      {displayText}
                    </MenuItem>
                  );
                });
              })()}
            </Select>
          </FormControl>

          <TextField
            sx={{ flex: "1 1 30%" }}
            label="Basic Salary"
            name="basicSalary"
            type="number"
            value={formData.basicSalary}
            onChange={handleChange}
            disabled={isViewMode}
          />

          <TextField
            sx={{ flex: "1 1 30%" }}
            label="Working Days"
            name="workingDays"
            type="number"
            value={formData.workingDays}
            onChange={handleChange}
            disabled={isViewMode}
          />

          <TextField
            sx={{ flex: "1 1 30%" }}
            label="Loss of Pay Days"
            name="lopDays"
            type="number"
            value={formData.lopDays}
            onChange={handleChange}
            disabled={isViewMode}
          />

          <TextField
            sx={{ flex: "1 1 30%" }}
            label="Paid Days"
            name="paidDays"
            type="number"
            value={formData.paidDays}
            onChange={handleChange}
            disabled={isViewMode}
          />

          <TextField
            sx={{ flex: "1 1 30%" }}
            label="Bonus"
            name="bonus"
            type="number"
            value={formData.bonus}
            onChange={handleChange}
            disabled={isViewMode}
          />

          <TextField
            sx={{ flex: "1 1 30%" }}
            label="Incentive"
            name="incentive"
            type="number"
            value={formData.incentive}
            onChange={handleChange}
            disabled={isViewMode}
          />

          <TextField
            sx={{ flex: "1 1 30%" }}
            label="PF"
            name="pf"
            type="number"
            value={formData.pf}
            onChange={handleChange}
            disabled={isViewMode}
          />
          <TextField
            sx={{ flex: "1 1 30%" }}
            label="ESI"
            name="esi"
            type="number"
            value={formData.esi}
            onChange={handleChange}
            disabled={isViewMode}
          />
          <TextField
            sx={{ flex: "1 1 30%" }}
            label="Leave Deduction"
            name="leaveDeduction"
            type="number"
            value={formData.leaveDeduction}
            onChange={handleChange}
            disabled={isViewMode}
          />
          <TextField
            sx={{ flex: "1 1 30%" }}
            label="Salary Advance"
            name="salAdvance"
            type="number"
            value={formData.salAdvance}
            onChange={handleChange}
            disabled={isViewMode}
          />

          <FormControl sx={{ flex: "1 1 30%" }}>
            <InputLabel>Payment Method</InputLabel>
            <Select
              name="paymentMethod"
              value={formData.paymentMethod}
              label="Payment Method"
              onChange={handleChange}
              disabled={isViewMode}
            >
              <MenuItem value="bank">Bank</MenuItem>
              <MenuItem value="cash">Cash</MenuItem>
            </Select>
          </FormControl>

          <TextField
            sx={{ flex: "1 1 30%" }}
            label="Payment Date"
            type="date"
            name="paymentDate"
            value={formData.paymentDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            disabled={isViewMode}
          />

          <FormControl sx={{ flex: "1 1 30%" }}>
            <InputLabel>Payment Status</InputLabel>
            <Select
              name="paymentStatus"
              value={formData.paymentStatus}
              label="Payment Status"
              onChange={handleChange}
              disabled={isViewMode}
            >
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="unpaid">Unpaid</MenuItem>
            </Select>
          </FormControl>

          {/* Allowance Section */}
          <Box sx={{ flex: "1 1 100%", mt: 3, p: 2, backgroundColor: "#ffffff", borderRadius: "0.5rem", border: "1px solid #e5e7eb" }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#1e293b", marginBottom: 2 }}>
              Allowances
            </Typography>

            {allowances.map((allowance, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  gap: 2,
                  marginBottom: 2,
                  alignItems: "center",
                  padding: "1rem",
                  backgroundColor: "#ffffff",
                  borderRadius: "0.5rem",
                  border: "1px solid #e5e7eb"
                }}
              >
                <Box sx={{ flex: "1 1 40%" }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#374151", marginBottom: 0.5 }}>
                    Allowance
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Please enter Allowance name"
                    value={allowance.name}
                    onChange={(e) => handleAllowanceChange(index, "name", e.target.value)}
                    disabled={isViewMode}
                    sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "#f9fafb" } }}
                  />
                </Box>

                <Box sx={{ flex: "1 1 30%" }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#374151", marginBottom: 0.5 }}>
                    Amount
                  </Typography>
                  <TextField
                    fullWidth
                    type="number"
                    placeholder="0"
                    value={allowance.amount}
                    onChange={(e) => handleAllowanceChange(index, "amount", e.target.value)}
                    disabled={isViewMode}
                    InputProps={{
                      startAdornment: <Typography sx={{ color: "#6b7280", mr: 1 }}>₹</Typography>
                    }}
                    sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "#f9fafb" } }}
                  />
                </Box>

                <Box sx={{ flex: "1 1 20%", display: "flex", gap: 1, justifyContent: "flex-end" }}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => removeAllowance(index)}
                    disabled={allowances.length === 1 || isViewMode}
                    sx={{
                      color: "#ef4444",
                      borderColor: "#ef4444",
                      "&:hover": { backgroundColor: "rgba(239, 68, 68, 0.04)", borderColor: "#dc2626" },
                      textTransform: "none", fontSize: "0.75rem", minWidth: "70px"
                    }}
                  >
                    Remove
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={addNewAllowance}
                    disabled={isViewMode}
                    sx={{
                      backgroundColor: "#3b82f6",
                      "&:hover": { backgroundColor: "#2563eb" },
                      textTransform: "none", fontSize: "0.75rem", minWidth: "50px"
                    }}
                  >
                    Add
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Summary Section */}
          <Box sx={{ flex: "1 1 100%", mt: 3, p: 2, backgroundColor: "#ffffff", borderRadius: "0.5rem", border: "1px solid #e5e7eb" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="body1" sx={{ color: "#000000", fontWeight: 500 }}>
                Total Allowance: ₹{totalAllowance.toFixed(2)}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600, color: "#000000" }}>
                Net Payable: ₹{netPayable.toFixed(2)}
              </Typography>
            </Box>
          </Box>

          <TextField
            sx={{ flex: "1 1 100%", mt: 2 }}
            label="Note"
            multiline
            rows={3}
            placeholder="Add any note here..."
            disabled={isViewMode}
          />

          {!isViewMode && (
            <Box sx={{ flex: "1 1 100%", mt: 3, display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                onClick={() => router.back()}
                sx={{
                  borderRadius: "0.5rem", textTransform: "none", fontWeight: 500,
                  borderColor: "#d1d5db", color: "#6b7280", px: 4
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "0.5rem", textTransform: "none", fontWeight: 500,
                  backgroundColor: "#3b82f6", px: 4
                }}
              >
                {isEditMode ? 'Update Payroll' : 'Create Payroll'}
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

// Main Export wrapping the content in Suspense
const CreatePayroll = () => {
  return (
    <Suspense fallback={
      <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
        <Typography>Loading Payroll Data...</Typography>
      </Box>
    }>
      <PayrollFormContent />
    </Suspense>
  );
};

export default CreatePayroll;
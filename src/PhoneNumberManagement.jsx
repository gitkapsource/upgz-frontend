import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Snackbar,
  Alert,
  Pagination,
} from "@mui/material";
import DataTable from "./components/DataTable";
import RecordForm from "./components/RecordForm";
import api from "./api";

function App() {
  const [records, setRecords] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchRecords = async (pageNum = 1) => {
    try {
      const res = await api.get("/phonenumbers", {
        params: { page: pageNum, page_size: 10 },
      });
      const { items, pages } = res.data;
      setRecords(items || []);
      setTotalPages(pages || 1);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  useEffect(() => {
    fetchRecords(page);
  }, [page]);

  const handleSave = async (record) => {
    try {
      if (record.Id) {
        await api.put("/phonenumbers", { ...record, PhoneNumber: record.PhoneNumber });
      } else {
        await api.post("/phonenumbers", record);
      }
      setEditingRecord(null);
      setOpenSnackbar(true);
      fetchRecords(page);
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

const handleDelete = async (record) => {
  try {
    console.log("Deleting phone number:", record.PhoneNumber); // 👈 Debug log
    await api.request({
      url: "/phonenumbers",
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      data: { PhoneNumber: record.PhoneNumber },
    });
    fetchRecords(page); // Refresh data after delete
  } catch (err) {
    console.error("Delete failed:", err);
  }
};

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        PhoneNumber Manager
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          onClick={() =>
            setEditingRecord({
              PhoneNumber: "",
              IncomingSIPTrunkID: "",
              OutgoingSIPTrunkID: "",
              FallbackSIPTrunkID: "",
              FallbackPhoneNumber: "",
              Status: "",
              Description: "",
            })
          }
        >
          + Add Record
        </Button>
      </Box>

      <DataTable
        records={records}
        onEdit={setEditingRecord}
        onDelete={(record) => handleDelete(record)}
      />

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, newPage) => setPage(newPage)}
          color="primary"
        />
      </Box>

      {editingRecord && (
        <RecordForm
          record={editingRecord}
          onClose={() => setEditingRecord(null)}
          onSave={handleSave}
        />
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" onClose={() => setOpenSnackbar(false)}>
          Operation successful!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;


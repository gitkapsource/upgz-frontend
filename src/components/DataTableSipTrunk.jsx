// src/components/SIPTrunkDataTable.jsx
import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  Paper,
  TableContainer,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function SIPTrunkDataTable({ records, onEdit, onDelete }) {
  if (!records || records.length === 0)
    return <p style={{ textAlign: "center", marginTop: "20px" }}>No SIP Trunks found. Mr.Kaps</p>;

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell sx={{ fontWeight: "bold" }}>SIPTrunkID</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>SIPTrunkName</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>SIPTrunkAddress</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((t) => (
            <TableRow key={t.SIPTrunkID} hover>
              <TableCell>{t.SIPTrunkID}</TableCell>
              <TableCell>{t.SIPTrunkName}</TableCell>
              <TableCell>{t.SIPTrunkAddress}</TableCell>
              <TableCell align="right">
                <Tooltip title="Edit">
                  <IconButton color="primary" onClick={() => onEdit(t)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton color="error" onClick={() => onDelete(t)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


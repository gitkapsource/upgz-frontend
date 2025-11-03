import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  TableContainer,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DataTable({ records, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>Phone Number</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
            <TableCell><strong>Incoming Trunk</strong></TableCell>
            <TableCell><strong>Outgoing Trunk</strong></TableCell>
            <TableCell><strong>Fallback Trunk</strong></TableCell>
            <TableCell><strong>Fallback Number</strong></TableCell>
            <TableCell><strong>Description</strong></TableCell>
            <TableCell align="right"><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((r) => (
            <TableRow key={r.Id}>
              <TableCell>{r.Id}</TableCell>
              <TableCell>{r.PhoneNumber}</TableCell>
              <TableCell>{r.Status}</TableCell>
              <TableCell>{r.IncomingSIPTrunkID}</TableCell>
              <TableCell>{r.OutgoingSIPTrunkID}</TableCell>
              <TableCell>{r.FallbackSIPTrunkID}</TableCell>
              <TableCell>{r.FallbackPhoneNumber}</TableCell>
              <TableCell>{r.Description}</TableCell>
              <TableCell align="right">
                <Tooltip title="Edit">
                  <IconButton color="primary" onClick={() => onEdit(r)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton color="error" onClick={() => onDelete(r)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
          {records.length === 0 && (
            <TableRow>
              <TableCell colSpan={9} align="center">
                No records found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


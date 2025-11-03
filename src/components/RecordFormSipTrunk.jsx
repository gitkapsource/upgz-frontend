import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Grid,
} from "@mui/material";

export default function RecordFormSipTrunk({ record, onSave, onClose }) {
  const [form, setForm] = useState({
    SIPTrunkID: "",
    SIPTrunkName: "",
    SIPTrunkAddress: "",
  });

  // Populate form when editing
  useEffect(() => {
    if (record) setForm(record);
  }, [record]);

  if (!record) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(form);
  };

  return (
    <Dialog open={!!record} onClose={onClose} fullWidth>
      <DialogTitle>
        {record.SIPTrunkID ? "Edit SIP Trunk" : "Add SIP Trunk"}
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {/* SIPTrunkID (read-only in edit mode) */}
          {record.SIPTrunkID && (
            <Grid item xs={12} sm={6}>
              <TextField
                label="SIPTrunkID"
                name="SIPTrunkID"
                value={form.SIPTrunkID ?? ""}
                fullWidth
                variant="standard"
                InputProps={{ readOnly: true }}
              />
            </Grid>
          )}

          {/* SIPTrunkName */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="SIPTrunkName"
              name="SIPTrunkName"
              value={form.SIPTrunkName ?? ""}
              onChange={handleChange}
              fullWidth
              variant="standard"
            />
          </Grid>

          {/* SIPTrunkAddress */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="SIPTrunkAddress"
              name="SIPTrunkAddress"
              value={form.SIPTrunkAddress ?? ""}
              onChange={handleChange}
              fullWidth
              variant="standard"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}


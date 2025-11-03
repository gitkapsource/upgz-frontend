import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function RecordForm({ record, onSave, onClose }) {
  const [form, setForm] = useState({
    PhoneNumber: "",
    IncomingSIPTrunkID: "",
    OutgoingSIPTrunkID: "",
    FallbackSIPTrunkID: "",
    FallbackPhoneNumber: "",
    Status: "",
    Description: "",
  });

  useEffect(() => {
    if (record) setForm(record);
  }, [record]);

  if (!record) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const readOnlyFields = ["Id"];

  return (
    <Dialog open={!!record} onClose={onClose} fullWidth>
      <DialogTitle>
        {record.Id ? "Edit Record" : "Add Record"}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {Object.keys(form).map((key) => {
	    if (key === "PortedMarkedAt" || key === "CreatedAt" || key === "UpdatedAt")
		  return null;
            // Render dropdown for Status only
            if (key === "Status") {
	      if (!record.Id)
		    return null;

              return (
                <Grid item xs={12} sm={6} key={key}>
                  <FormControl fullWidth variant="standard">
                    <InputLabel>Status</InputLabel>
                    <Select
                      name="Status"
                      value={form.Status || ""}
                      onChange={handleChange}
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Ported">Ported</MenuItem>
                      <MenuItem value="Suspended">Suspended</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              );
            }

            // Render all other fields as TextFields
            return (
              <Grid item xs={12} sm={6} key={key}>
                <TextField
                  label={key}
                  name={key}
                  value={form[key] ?? ""}
                  onChange={handleChange}
                  fullWidth
                  variant="standard"
		  InputProps={{
    			readOnly: readOnlyFields.includes(key),
 		  }}
                />
              </Grid>
            );
          })}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={() => onSave(form)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}


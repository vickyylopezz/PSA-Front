import React, { useState } from "react";
import {
  Button,
  FormControl,
  OutlinedInput,
  TextField,
  Typography,
  Select,
  MenuItem
} from "@material-ui/core";


const VerTicket = () => {
    const fields = ["FirstName", "LastName", "PostCode", "Gender"];
    const [searcBy, setSearchBy] = useState("FirstName");
    const [searchText, setSearchText] = useState("");
  
    return (
      <div>
        <form>
          <FormControl>
            <Typography variant="body1">
              Select search fields:
            </Typography>
          </FormControl>
          <FormControl>
            <TextField
              label="Enter search pattern"
              variant="outlined"
              size="small"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
          </FormControl>
        </form>
      </div>
    );
}

export default VerTicket;
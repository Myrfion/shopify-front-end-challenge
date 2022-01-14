import * as React from "react"
import PropTypes from "prop-types"
import TextField from "@mui/material/TextField"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import DatePicker from "@mui/lab/DatePicker"
import { isAfter, isBefore } from "date-fns"

DateRangePicker.propTypes = {
  dateRange: PropTypes.instanceOf(Object).isRequired,
  onDateChange: PropTypes.func.isRequired,
}

function DateRangePicker(props) {
  const { dateRange, onDateChange } = props

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="flex">
        <div className="mr-4">
          <DatePicker
            label="From date"
            value={dateRange.from}
            onChange={(newValue) => onDateChange(newValue, dateRange.to)}
            shouldDisableDate={(date) => isAfter(date, new Date(dateRange.to))}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
        <DatePicker
          label="To date"
          value={dateRange.to}
          onChange={(newValue) => onDateChange(dateRange.from, newValue)}
          disableFuture
          renderInput={(params) => <TextField {...params} />}
          shouldDisableDate={(date) => isBefore(date, new Date(dateRange.from))}
        />
      </div>
    </LocalizationProvider>
  )
}

export default DateRangePicker

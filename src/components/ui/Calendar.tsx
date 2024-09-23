import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

interface CalendarProps {
    // Define any props for the Calendar component here
}

const Calendar: React.FC<CalendarProps> = () => {
    return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar />
            </LocalizationProvider>

    );
};

export default Calendar;
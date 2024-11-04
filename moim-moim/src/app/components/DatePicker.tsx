import React, { useState } from 'react';
import './DatePicker.scss';

interface DatePickerProps {
    value: string;
    onChange: (date: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(value);

    const toggleCalendar = () => {
        setIsOpen((prev) => !prev);
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = event.target.value;
        setSelectedDate(date);
        onChange(date);
    };

    return (
        <div className="date-picker">
            <input
                type="text"
                value={selectedDate}
                onClick={toggleCalendar}
                readOnly
                placeholder="생년월일 선택"
                className="date-input"
            />
            {isOpen && (
                <div className="calendar">
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        className="date-selector"
                    />
                </div>
            )}
        </div>
    );
};

export default DatePicker;
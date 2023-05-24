import * as React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type DatePickerProps = {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
};

const CustomDatePicker: React.FC<DatePickerProps> = ({ label, value, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <DatePicker selected={value} onChange={onChange} className="datepicker" />
    </div>
  );
};

export default CustomDatePicker;

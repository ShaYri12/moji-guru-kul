// components/DateRangePicker.tsx

import React, { useState } from 'react';

const DateRangePicker: React.FC<{ onApply: (startDate: Date, endDate: Date) => void }> = ({ onApply }) => {
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    const handleApply = () => {
        onApply(new Date(startDate), new Date(endDate));
    };

    return (
        <div className="flex items-center flex-wrap justify-center gap-4">
            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border-[1.5px] border-[#928F95] bg-[#F8F8F8] w-[135px] h-[40px] text-[#B1AFB3] outline-none rounded px-2"
            />
            <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border-[1.5px] border-[#928F95] bg-[#F8F8F8] w-[135px] h-[40px] text-[#B1AFB3] outline-none rounded px-2"
            />
            <button onClick={handleApply} className="bg-[#753CBD] w-[91px] h-[40px] rounded text-white uppercase text-[14px] font-medium tracking-[2%]">
                Apply
            </button>
        </div>
    );
};

export default DateRangePicker;

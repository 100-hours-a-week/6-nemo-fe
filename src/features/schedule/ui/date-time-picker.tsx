import { ChangeEvent } from "react";

const DateTimePicker = ({
  dateTime,
  setDateTime,
}: {
  dateTime: string;
  setDateTime: (value: string) => void;
}) => {
  return (
    <div className="w-full max-w-md">
      <div className="mb-4">
        <input
          type="datetime-local"
          step="600"
          className="text-md border- w-full rounded border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          aria-label="모임 날짜 및 시간 선택"
        />
      </div>
    </div>
  );
};

export default DateTimePicker;

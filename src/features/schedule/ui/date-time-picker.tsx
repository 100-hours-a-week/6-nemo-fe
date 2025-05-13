import { ChangeEvent } from "react";

const DateTimePicker = ({
  dateTime,
  setDateTime,
}: {
  dateTime: string;
  setDateTime: (value: string) => void;
}) => {
  const handleDateTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDateTime(e.target.value);
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          모임 일시
        </label>
        <input
          type="datetime-local"
          className="w-full rounded border p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={dateTime}
          onChange={handleDateTimeChange}
          aria-label="모임 날짜 및 시간 선택"
        />
      </div>
    </div>
  );
};

export default DateTimePicker;

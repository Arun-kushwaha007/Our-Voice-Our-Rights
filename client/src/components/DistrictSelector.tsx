import React from "react";

type Props = {
  options: any[];
  value: string;
  onChange: (id: string) => void;
};

export default function DistrictSelector({ options, value, onChange }: Props) {
  return (
    <select
      className="w-full p-3 border rounded"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">— Select District —</option>
      {options.map((d) => (
        <option key={d.districtId} value={d.districtId}>
          {d.districtName} {d.state ? `(${d.state})` : ""}
        </option>
      ))}
    </select>
  );
}

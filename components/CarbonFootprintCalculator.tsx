import { useState } from "react";
import { CarbonFootprintData } from "@/types/CarbonFootprintData";

interface CarbonFootprintCalculatorProps {
  onCalculate: (score: number) => void;
}

const CarbonFootprintCalculator: React.FC<CarbonFootprintCalculatorProps> = ({ onCalculate }) => {
  const [electricityUsage, setElectricityUsage] = useState<number>(0);
  const [gasUsage, setGasUsage] = useState<number>(0);
  const [carMileage, setCarMileage] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const score = (electricityUsage * 0.5) + (gasUsage * 0.3) + (carMileage * 0.2);
    const normalizedScore = Math.min(100, Math.max(0, score));
    onCalculate(normalizedScore);

    const date = new Date().toISOString().split('T')[0];

    const newEntry: CarbonFootprintData = { date, score: normalizedScore };
    const savedData = localStorage.getItem('carbonFootprintData');
    const data = savedData ? JSON.parse(savedData) : [];
    data.push(newEntry);
    localStorage.setItem('carbonFootprintData', JSON.stringify(data));

    console.log("New Entry:", newEntry);
    console.log("Updated Data:", data);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4 bg-gray-200 p-6 rounded-lg shadow-md max-width: 14rem;'>
      <div className="form-item">
          <label className="form-label">Electricity Usage (kWh): </label>
          <input
            type="number"
            value={electricityUsage}
            onChange={(e) => setElectricityUsage(parseFloat(e.target.value))}
            className="input-class bg-gray-100 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            required
            />
          <label className="form-label">Gas Usage (therms): </label>
          <input
            type="number"
            value={gasUsage}
            onChange={(e) => setGasUsage(parseFloat(e.target.value))}
           className="input-class bg-gray-100 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            required
            />
          <label className="form-label">Car Milage (miles): </label>
          <input
            type="number"
            value={carMileage}
            onChange={(e) => setCarMileage(parseFloat(e.target.value))}
            className="input-class bg-gray-100 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            required
            />
        </div>
        <button type="submit" className="form-btn">Calculate</button>
     </form>
  )
}

export default CarbonFootprintCalculator;

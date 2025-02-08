import { useEffect, useState } from "react";
import { CarbonFootprintData } from "@/types/CarbonFootprintData";

const CarbonFootprintTable: React.FC = () => {
    const [data, setData] = useState<CarbonFootprintData[]>([]);

    useEffect(() => {
        const savedData = localStorage.getItem("carbonFootprintData");
        if (savedData) {
            setData(JSON.parse(savedData));
    }
    }, []);

    const getColorIndicator = (score: number): string => {
        if (score >= 75) return "bg-red-500";
        if (score >= 50) return "bg-yellow-500";
        
        return "bg-green-500";
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 border border-gray-200">Date</th>
                        <th className="px-4 py-2 border border-gray-200">Carbon Footprint Score</th>
                        <th className="px-4 py-2 border border-gray-200">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((entry, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-2 border border-gray-200 text-center">{entry.date}</td>
                            <td className="px-4 py-2 border border-gray-200 text-center">{entry.score}</td>
                            <td className="px-4 py-2 border border-gray-200 text-center">
                                <div className={`px-2 py-1 rounded-full ${getColorIndicator(entry.score)}`} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CarbonFootprintTable;
"use client";

import React from 'react';
import { useState } from 'react';
import HeaderBox from '@/components/HeaderBox';
import CarbonFootprintCalculator from '@/components/CarbonFootprintCalculator';
import CarbonFootprintChart from '@/components/CarbonFootprintChart';
import CarbonFootprintTable from '@/components/CarbonFootprintTable';

const Home = () => {
  const loggedIn = { firstName: 'Ben' };
  const [score, setScore] = useState<number | null>(null);

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access and Manage your Footprint"
          />
        </header>

        <h1 className="text-2xl font-bold text-gray-800">
          Carbon Footprint Calculator
        </h1>

        <div className="mb-8">
          <CarbonFootprintCalculator onCalculate={(score) => setScore(score)} />
        </div>

        {score !== null && (
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Your Carbon Footprint Score: <span className="text-green-600">{score.toFixed(2)}</span>
            </h2>
            <div className="max-w-xs mx-auto">
              <CarbonFootprintChart score={score} />
            </div>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Historical Carbon Footprint Data
          </h2>
          <CarbonFootprintTable />
        </div>
      </div>
    </section>
  );
};

export default Home;
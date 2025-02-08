"use client"

import React from 'react'
import { useState } from 'react'
import HeaderBox from '@/components/HeaderBox'
import CarbonFootprintCalculator from '@/components/CarbonFootprintCalculator'
import CarbonFootprintChart from '@/components/CarbonFootprintChart'

const Home = () => {
    const loggedIn = { firstName: 'Ben'}
    const [score, setScore] = useState<number | null>(null);

  return (
    <section className='home'>
        <div className='home-content'>
            <header className='home-header'>
                <HeaderBox
                    type="greeting"
                    title="Welcome"
                    user={loggedIn?.firstName || "Guest"}
                    subtext="Access and Manage your Footprint"
                />
            </header>
            <h1>
            Carbon Footprint Calculator

            <div className="mb-8">
                <CarbonFootprintCalculator onCalculate={(score) => setScore(score)} />
            </div>

            {score !== null && (
            <div className="text-center">
                Your Carbon Footprint Score: <span className="text-green-600">{score.toFixed(2)}</span>
                <div className="max-w-xs mx-auto">
                    <CarbonFootprintChart score={score} />
                </div>
            </div>
            )}
            </h1>
        </div>
    </section>
    )
}

export default Home
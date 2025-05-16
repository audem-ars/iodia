import React, { useState } from 'react';
import { 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, 
  ResponsiveContainer, RadialBarChart, RadialBar, Legend, Tooltip 
} from 'recharts';

// Number Energy Wheel Visualization
const NumberEnergyWheel = ({ number }) => {
  // Map numbers to their primary characteristics
  const characteristics = {
    1: [
      { name: "Leadership", value: 90 },
      { name: "Independence", value: 95 },
      { name: "Originality", value: 80 },
      { name: "Self-Confidence", value: 85 },
      { name: "Willpower", value: 90 }
    ],
    2: [
      { name: "Cooperation", value: 95 },
      { name: "Diplomacy", value: 90 },
      { name: "Sensitivity", value: 90 },
      { name: "Harmony", value: 85 },
      { name: "Patience", value: 80 }
    ],
    3: [
      { name: "Creativity", value: 95 },
      { name: "Expression", value: 90 },
      { name: "Joy", value: 95 },
      { name: "Sociability", value: 85 },
      { name: "Optimism", value: 90 }
    ],
    4: [
      { name: "Order", value: 95 },
      { name: "Service", value: 85 },
      { name: "Practicality", value: 90 },
      { name: "Determination", value: 85 },
      { name: "Reliability", value: 90 }
    ],
    5: [
      { name: "Freedom", value: 95 },
      { name: "Versatility", value: 90 },
      { name: "Adaptability", value: 90 },
      { name: "Adventure", value: 95 },
      { name: "Change", value: 85 }
    ],
    6: [
      { name: "Responsibility", value: 95 },
      { name: "Balance", value: 90 },
      { name: "Love", value: 90 },
      { name: "Harmony", value: 95 },
      { name: "Service", value: 85 }
    ],
    7: [
      { name: "Analysis", value: 95 },
      { name: "Wisdom", value: 90 },
      { name: "Introspection", value: 95 },
      { name: "Spirituality", value: 85 },
      { name: "Perfection", value: 80 }
    ],
    8: [
      { name: "Power", value: 90 },
      { name: "Achievement", value: 95 },
      { name: "Ambition", value: 90 },
      { name: "Organization", value: 85 },
      { name: "Efficiency", value: 90 }
    ],
    9: [
      { name: "Selflessness", value: 95 },
      { name: "Compassion", value: 90 },
      { name: "Universality", value: 85 },
      { name: "Completion", value: 90 },
      { name: "Wisdom", value: 90 }
    ],
    11: [
      { name: "Intuition", value: 95 },
      { name: "Inspiration", value: 90 },
      { name: "Spirituality", value: 95 },
      { name: "Idealism", value: 90 },
      { name: "Vision", value: 85 }
    ],
    22: [
      { name: "Mastery", value: 95 },
      { name: "Power", value: 90 },
      { name: "Practicality", value: 90 },
      { name: "Vision", value: 95 },
      { name: "Leadership", value: 90 }
    ]
  };
  
  const data = characteristics[number] || [];
  
  return (
    <div className="mt-6 p-4 bg-white/30 backdrop-blur-sm rounded-lg">
      <h4 className="font-bold mb-3 text-lg text-indigo-700">Number {number} Energy Profile</h4>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar name={`Number ${number}`} dataKey="value" 
              stroke={number === 1 ? "#ef4444" : 
                      number === 2 ? "#3b82f6" : 
                      number === 3 ? "#f59e0b" : 
                      number === 4 ? "#10b981" : 
                      number === 5 ? "#6366f1" : 
                      number === 6 ? "#ec4899" : 
                      number === 7 ? "#8b5cf6" : 
                      number === 8 ? "#f43f5e" : 
                      number === 9 ? "#14b8a6" : 
                      number === 11 ? "#6d28d9" : "#0f766e"}
              fill={number === 1 ? "#ef4444" : 
                    number === 2 ? "#3b82f6" : 
                    number === 3 ? "#f59e0b" : 
                    number === 4 ? "#10b981" : 
                    number === 5 ? "#6366f1" : 
                    number === 6 ? "#ec4899" : 
                    number === 7 ? "#8b5cf6" : 
                    number === 8 ? "#f43f5e" : 
                    number === 9 ? "#14b8a6" : 
                    number === 11 ? "#6d28d9" : "#0f766e"} 
              fillOpacity={0.3} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Positive/Negative Balance Meter
const PositiveNegativeBalance = ({ number }) => {
  // Map numbers to their positive/negative balance
  const balances = {
    1: { positive: 70, negative: 30 },
    2: { positive: 75, negative: 25 },
    3: { positive: 65, negative: 35 },
    4: { positive: 60, negative: 40 },
    5: { positive: 65, negative: 35 },
    6: { positive: 80, negative: 20 },
    7: { positive: 60, negative: 40 },
    8: { positive: 65, negative: 35 },
    9: { positive: 75, negative: 25 },
    11: { positive: 70, negative: 30 },
    22: { positive: 75, negative: 25 }
  };
  
  const balance = balances[number] || { positive: 50, negative: 50 };
  
  return (
    <div className="mt-6 p-4 bg-white/30 backdrop-blur-sm rounded-lg">
      <h4 className="font-bold mb-3 text-lg text-indigo-700">Positive/Negative Expression Balance</h4>
      <div className="h-10 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-green-500 to-blue-500"
          style={{ width: `${balance.positive}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-2 text-sm">
        <span>Positive Expression: {balance.positive}%</span>
        <span>Negative Expression: {balance.negative}%</span>
      </div>
    </div>
  );
};

// Life Path Journey Visualization
const LifePathJourney = ({ number }) => {
  const journeySteps = {
    1: [
      { stage: "Early Life", challenge: "Breaking from dependency", milestone: "Finding independence" },
      { stage: "Middle Years", challenge: "Harnessing leadership", milestone: "Creating and leading" },
      { stage: "Later Years", challenge: "Balancing self and others", milestone: "True attainment" }
    ],
    2: [
      { stage: "Early Life", challenge: "Managing sensitivity", milestone: "Building confidence" },
      { stage: "Middle Years", challenge: "Diplomacy and cooperation", milestone: "Facilitating harmony" },
      { stage: "Later Years", challenge: "Taking credit for work", milestone: "Quiet satisfaction" }
    ],
    3: [
      { stage: "Early Life", challenge: "Finding expression", milestone: "Social confidence" },
      { stage: "Middle Years", challenge: "Developing creative talents", milestone: "Joy of sharing" },
      { stage: "Later Years", challenge: "Depth with optimism", milestone: "Inspiring others" }
    ],
    4: [
      { stage: "Early Life", challenge: "Accepting limitations", milestone: "Building foundations" },
      { stage: "Middle Years", challenge: "Creating order", milestone: "Developing systems" },
      { stage: "Later Years", challenge: "Flexibility with structure", milestone: "Finding freedom in limits" }
    ],
    5: [
      { stage: "Early Life", challenge: "Managing restlessness", milestone: "Exploring constructively" },
      { stage: "Middle Years", challenge: "Channeling versatility", milestone: "Progressive adaptation" },
      { stage: "Later Years", challenge: "Depth with variety", milestone: "Wisdom from experience" }
    ],
    6: [
      { stage: "Early Life", challenge: "Taking responsibility", milestone: "Creating harmony" },
      { stage: "Middle Years", challenge: "Balancing others' needs", milestone: "Home and community" },
      { stage: "Later Years", challenge: "Self-care while giving", milestone: "Unconditional love" }
    ],
    7: [
      { stage: "Early Life", challenge: "Feeling different", milestone: "Inner knowledge" },
      { stage: "Middle Years", challenge: "Spiritual development", milestone: "Wisdom through analysis" },
      { stage: "Later Years", challenge: "Sharing insights", milestone: "Faith and trust" }
    ],
    8: [
      { stage: "Early Life", challenge: "Material ambition", milestone: "Organization skills" },
      { stage: "Middle Years", challenge: "Power and authority", milestone: "Material success" },
      { stage: "Later Years", challenge: "Balance of wealth", milestone: "True abundance" }
    ],
    9: [
      { stage: "Early Life", challenge: "Giving without return", milestone: "Compassion" },
      { stage: "Middle Years", challenge: "Humanitarian service", milestone: "Universal love" },
      { stage: "Later Years", challenge: "Completion and wisdom", milestone: "Selfless joy" }
    ],
    11: [
      { stage: "Early Life", challenge: "Nervous tension", milestone: "Intuitive development" },
      { stage: "Middle Years", challenge: "Idealism vs reality", milestone: "Spiritual insights" },
      { stage: "Later Years", challenge: "Teaching through example", milestone: "Illumination" }
    ],
    22: [
      { stage: "Early Life", challenge: "Overwhelming potential", milestone: "Practical vision" },
      { stage: "Middle Years", challenge: "Large-scale projects", milestone: "Material manifestation" },
      { stage: "Later Years", challenge: "Legacy creation", milestone: "Master building" }
    ]
  };
  
  const steps = journeySteps[number] || [];
  
  return (
    <div className="mt-6 p-4 bg-white/30 backdrop-blur-sm rounded-lg">
      <h4 className="font-bold mb-3 text-lg text-indigo-700">Life Path {number} Journey</h4>
      <div className="relative pt-10 pb-10">
        {/* Journey Line */}
        <div className="absolute h-1 bg-indigo-500 top-16 left-0 right-0 z-0"></div>
        
        {/* Journey Steps */}
        <div className="flex justify-between relative z-10">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center w-1/3 px-2">
              <div className="w-6 h-6 bg-indigo-600 rounded-full mb-2 flex items-center justify-center text-white font-bold">
                {index + 1}
              </div>
              <h5 className="font-semibold text-indigo-800 text-center">{step.stage}</h5>
              <div className="mt-2 text-center">
                <p className="text-sm text-gray-700"><span className="font-medium">Challenge:</span> {step.challenge}</p>
                <p className="text-sm text-gray-700 mt-1"><span className="font-medium">Milestone:</span> {step.milestone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Karmic Debt Visualization
const KarmicDebtVisual = ({ number }) => {
  // Only applies to karmic debt numbers 13, 14, 16, 19
  const karmicNumbers = {
    1: { karmic: true, debt: "19/1", weight: 70, theme: "Abuse of Power", pastLife: "Self-centered, blindness to others' needs", lesson: "Consider others' needs, develop true independence" },
    4: { karmic: true, debt: "13/4", weight: 80, theme: "Avoiding Work", pastLife: "Shirking responsibility, dawdling", lesson: "Hard work, appreciating order and detail" },
    5: { karmic: true, debt: "14/5", weight: 60, theme: "Freedom Misuse", pastLife: "Overindulgence, excess", lesson: "Constructive freedom, learning from experience" },
    7: { karmic: true, debt: "16/7", weight: 75, theme: "Illicit Relationships", pastLife: "Harmful love affairs", lesson: "Selfless love, spiritual awareness" },
    // Others aren't karmic
    2: { karmic: false },
    3: { karmic: false },
    6: { karmic: false },
    8: { karmic: false },
    9: { karmic: false },
    11: { karmic: false },
    22: { karmic: false }
  };
  
  const data = karmicNumbers[number];
  
  if (!data || !data.karmic) {
    return <div className="mt-6 p-4 bg-white/30 backdrop-blur-sm rounded-lg">
      <h4 className="font-bold mb-3 text-lg text-indigo-700">Karmic Debt Status</h4>
      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="flex">
          <div className="rounded-full bg-green-100 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="ml-3">
            <h5 className="text-lg font-medium text-green-800">No Karmic Debt</h5>
            <p className="text-green-700">Number {number} does not carry karmic debt from past lives.</p>
          </div>
        </div>
      </div>
    </div>;
  }
  
  return (
    <div className="mt-6 p-4 bg-white/30 backdrop-blur-sm rounded-lg">
      <h4 className="font-bold mb-3 text-lg text-indigo-700">Karmic Debt: {data.debt}</h4>
      
      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 mb-4">
        <div className="flex">
          <div className="rounded-full bg-purple-100 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3">
            <h5 className="text-lg font-medium text-purple-800">{data.theme}</h5>
            <p className="text-purple-700 mt-1"><span className="font-medium">Past Life Issue:</span> {data.pastLife}</p>
            <p className="text-purple-700 mt-1"><span className="font-medium">Current Life Lesson:</span> {data.lesson}</p>
          </div>
        </div>
      </div>
      
      <div className="relative pt-1">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
              Karmic Weight
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-purple-600">
              {data.weight}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
          <div style={{ width: `${data.weight}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"></div>
        </div>
      </div>
    </div>
  );
};

// Number Compatibility Chart (for the Aspects chart)
const NumberCompatibilityChart = ({ number }) => {
  const compatibilityData = {
    1: {
      1: "VERY DISCORDANT",
      2: "DISCORDANT",
      3: "HARMONIOUS",
      4: "HARMONIOUS",
      5: "VARIES",
      6: "DISCORDANT",
      7: "DISCORDANT",
      8: "HARMONIOUS",
      9: "DISCORDANT",
      11: "DISCORDANT",
      22: "DISCORDANT"
    },
    2: {
      1: "DISCORDANT",
      2: "VERY DISCORDANT",
      3: "HARMONIOUS",
      4: "HARMONIOUS",
      5: "DISCORDANT",
      6: "HARMONIOUS",
      7: "DISCORDANT",
      8: "DISCORDANT",
      9: "HARMONIOUS",
      11: "HARMONIOUS",
      22: "DISCORDANT"
    },
    3: {
      1: "HARMONIOUS",
      2: "HARMONIOUS",
      3: "VERY DISCORDANT",
      4: "DISCORDANT",
      5: "HARMONIOUS",
      6: "HARMONIOUS",
      7: "DISCORDANT",
      8: "DISCORDANT",
      9: "HARMONIOUS",
      11: "HARMONIOUS",
      22: "DISCORDANT"
    },
    4: {
      1: "HARMONIOUS",
      2: "HARMONIOUS",
      3: "DISCORDANT",
      4: "VERY DISCORDANT",
      5: "DISCORDANT",
      6: "HARMONIOUS",
      7: "HARMONIOUS",
      8: "DISCORDANT",
      9: "DISCORDANT",
      11: "DISCORDANT",
      22: "VARIES"
    },
    5: {
      1: "VARIES",
      2: "DISCORDANT",
      3: "HARMONIOUS",
      4: "DISCORDANT",
      5: "VERY DISCORDANT",
      6: "DISCORDANT",
      7: "DISCORDANT",
      8: "DISCORDANT",
      9: "DISCORDANT",
      11: "DISCORDANT",
      22: "DISCORDANT"
    },
    6: {
      1: "DISCORDANT",
      2: "HARMONIOUS",
      3: "HARMONIOUS",
      4: "HARMONIOUS",
      5: "DISCORDANT",
      6: "VERY DISCORDANT",
      7: "DISCORDANT",
      8: "DISCORDANT",
      9: "HARMONIOUS",
      11: "HARMONIOUS",
      22: "HARMONIOUS"
    },
    7: {
      1: "DISCORDANT",
      2: "DISCORDANT",
      3: "DISCORDANT",
      4: "HARMONIOUS",
      5: "DISCORDANT",
      6: "DISCORDANT",
      7: "VERY DISCORDANT",
      8: "DISCORDANT",
      9: "DISCORDANT",
      11: "HARMONIOUS",
      22: "DISCORDANT"
    },
    8: {
      1: "HARMONIOUS",
      2: "DISCORDANT",
      3: "DISCORDANT",
      4: "DISCORDANT",
      5: "DISCORDANT",
      6: "DISCORDANT",
      7: "DISCORDANT",
      8: "VERY DISCORDANT",
      9: "DISCORDANT",
      11: "DISCORDANT",
      22: "HARMONIOUS"
    },
    9: {
      1: "DISCORDANT",
      2: "HARMONIOUS",
      3: "HARMONIOUS",
      4: "DISCORDANT",
      5: "DISCORDANT",
      6: "HARMONIOUS",
      7: "DISCORDANT",
      8: "DISCORDANT",
      9: "VERY DISCORDANT",
      11: "HARMONIOUS",
      22: "HARMONIOUS"
    },
    11: {
      1: "DISCORDANT",
      2: "HARMONIOUS",
      3: "HARMONIOUS",
      4: "DISCORDANT",
      5: "DISCORDANT",
      6: "HARMONIOUS",
      7: "HARMONIOUS",
      8: "DISCORDANT",
      9: "HARMONIOUS",
      11: "VERY DISCORDANT",
      22: "DISCORDANT"
    },
    22: {
      1: "DISCORDANT",
      2: "DISCORDANT",
      3: "DISCORDANT",
      4: "VARIES",
      5: "DISCORDANT",
      6: "HARMONIOUS",
      7: "DISCORDANT",
      8: "HARMONIOUS",
      9: "HARMONIOUS",
      11: "DISCORDANT",
      22: "VERY DISCORDANT"
    }
  };
  
  const getCompatibilityColor = (description) => {
    if (description.includes("HARMONIOUS")) return "bg-green-100 text-green-800";
    if (description === "VERY DISCORDANT") return "bg-red-100 text-red-800";
    if (description === "DISCORDANT") return "bg-orange-100 text-orange-800";
    if (description === "VARIES") return "bg-blue-100 text-blue-800";
    return "bg-gray-100 text-gray-800";
  };
  
  const compatibilities = compatibilityData[number] || {};
  
  return (
    <div className="mt-6 p-4 bg-white/30 backdrop-blur-sm rounded-lg">
      <h4 className="font-bold mb-3 text-lg text-indigo-700">Number {number} Compatibility</h4>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
        {[1,2,3,4,5,6,7,8,9,11,22].map(num => {
          const compatibility = compatibilities[num] || "UNKNOWN";
          return (
            <div key={num} className={`p-2 rounded-lg text-center ${getCompatibilityColor(compatibility)}`}>
              <div className="font-bold">{num}</div>
              <div className="text-xs">{compatibility}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Expression Chart Visualization
const ExpressionRadialChart = ({ number }) => {
  const expressionData = {
    1: [
      { category: "Abilities", value: 85 },
      { category: "Positive Attitudes", value: 90 },
      { category: "Negative Attitudes", value: 40 }
    ],
    2: [
      { category: "Abilities", value: 80 },
      { category: "Positive Attitudes", value: 95 },
      { category: "Negative Attitudes", value: 35 }
    ],
    3: [
      { category: "Abilities", value: 90 },
      { category: "Positive Attitudes", value: 85 },
      { category: "Negative Attitudes", value: 45 }
    ],
    4: [
      { category: "Abilities", value: 75 },
      { category: "Positive Attitudes", value: 70 },
      { category: "Negative Attitudes", value: 50 }
    ],
    5: [
      { category: "Abilities", value: 95 },
      { category: "Positive Attitudes", value: 80 },
      { category: "Negative Attitudes", value: 60 }
    ],
    6: [
      { category: "Abilities", value: 85 },
      { category: "Positive Attitudes", value: 90 },
      { category: "Negative Attitudes", value: 40 }
    ],
    7: [
      { category: "Abilities", value: 90 },
      { category: "Positive Attitudes", value: 75 },
      { category: "Negative Attitudes", value: 55 }
    ],
    8: [
      { category: "Abilities", value: 95 },
      { category: "Positive Attitudes", value: 80 },
      { category: "Negative Attitudes", value: 60 }
    ],
    9: [
      { category: "Abilities", value: 90 },
      { category: "Positive Attitudes", value: 90 },
      { category: "Negative Attitudes", value: 40 }
    ],
    11: [
      { category: "Abilities", value: 95 },
      { category: "Positive Attitudes", value: 85 },
      { category: "Negative Attitudes", value: 65 }
    ],
    22: [
      { category: "Abilities", value: 100 },
      { category: "Positive Attitudes", value: 90 },
      { category: "Negative Attitudes", value: 70 }
    ]
  };

  const data = expressionData[number] || [];
  
  return (
    <div className="mt-6 p-4 bg-white/30 backdrop-blur-sm rounded-lg">
      <h4 className="font-bold mb-3 text-lg text-indigo-700">Expression Profile</h4>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart 
            cx="50%" 
            cy="50%" 
            innerRadius="20%" 
            outerRadius="80%" 
            barSize={20} 
            data={data}>
            <RadialBar
              background
              dataKey="value"
              cornerRadius={12}
              fill={number === 1 ? "#ef4444" : 
                    number === 2 ? "#3b82f6" : 
                    number === 3 ? "#f59e0b" : 
                    number === 4 ? "#10b981" : 
                    number === 5 ? "#6366f1" : 
                    number === 6 ? "#ec4899" : 
                    number === 7 ? "#8b5cf6" : 
                    number === 8 ? "#f43f5e" : 
                    number === 9 ? "#14b8a6" : 
                    number === 11 ? "#6d28d9" : "#0f766e"}
            />
            <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" />
            <Tooltip />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Soul Urge Visualization
const SoulUrgeVisualization = ({ number }) => {
  const soulUrgeData = {
    1: {
      motives: ["Independence", "Leadership", "Achievement", "Recognition", "Self-reliance"],
      strength: 90
    },
    2: {
      motives: ["Cooperation", "Peace", "Harmony", "Relationships", "Sensitivity"],
      strength: 85
    },
    3: {
      motives: ["Self-expression", "Creativity", "Joy", "Socializing", "Communication"],
      strength: 80
    },
    4: {
      motives: ["Order", "Stability", "Security", "Practicality", "Organization"],
      strength: 75
    },
    5: {
      motives: ["Freedom", "Adventure", "Variety", "Travel", "New experiences"],
      strength: 95
    },
    6: {
      motives: ["Responsibility", "Family", "Love", "Balance", "Beauty"],
      strength: 85
    },
    7: {
      motives: ["Knowledge", "Wisdom", "Solitude", "Spirituality", "Analysis"],
      strength: 90
    },
    8: {
      motives: ["Success", "Power", "Wealth", "Status", "Achievement"],
      strength: 95
    },
    9: {
      motives: ["Humanitarianism", "Giving", "Compassion", "Understanding", "Service"],
      strength: 85
    },
    11: {
      motives: ["Inspiration", "Intuition", "Spiritual growth", "Enlightenment", "Vision"],
      strength: 95
    },
    22: {
      motives: ["Master building", "Large-scale achievement", "Accomplishment", "Manifestation", "Power"],
      strength: 100
    }
  };

  const data = soulUrgeData[number] || { motives: [], strength: 0 };
  
  return (
    <div className="mt-6 p-4 bg-white/30 backdrop-blur-sm rounded-lg">
      <h4 className="font-bold mb-3 text-lg text-indigo-700">Soul Urge Motivation Strength</h4>
      
      <div className="relative pt-1 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-indigo-100 text-indigo-600">
              Inner Drive Intensity
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-indigo-600">
              {data.strength}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mt-2 text-xs flex rounded bg-indigo-100">
          <div 
            style={{ width: `${data.strength}%` }} 
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
          </div>
        </div>
      </div>
      
      <h5 className="font-semibold text-indigo-700 mb-2">Key Motivators</h5>
      <div className="flex flex-wrap gap-2">
        {data.motives.map((motive, index) => (
          <div 
            key={index}
            className="px-3 py-1 rounded-full text-sm bg-indigo-50 text-indigo-700 border border-indigo-200"
          >
            {motive}
          </div>
        ))}
      </div>
    </div>
  );
};

// Birthday Number Visualization
const BirthdayVisualization = ({ number }) => {
  const birthdayMap = {
    1: ["1", "10", "19", "28"],
    2: ["2", "11", "20", "29"],
    3: ["3", "12", "21", "30"],
    4: ["4", "13", "22", "31"],
    5: ["5", "14", "23"],
    6: ["6", "15", "24"],
    7: ["7", "16", "25"],
    8: ["8", "17", "26"],
    9: ["9", "18", "27"]
  };
  
  const traitEmphasis = {
    1: ["Leadership", "Independence", "Action", "Originality", "Pioneering"],
    2: ["Cooperation", "Diplomacy", "Patience", "Sensitivity", "Detail"],
    3: ["Expression", "Creativity", "Joy", "Optimism", "Communication"],
    4: ["Practicality", "System", "Order", "Determination", "Service"],
    5: ["Freedom", "Change", "Adventure", "Variety", "Travel"],
    6: ["Responsibility", "Harmony", "Balance", "Love", "Family"],
    7: ["Analysis", "Wisdom", "Spirituality", "Research", "Solitude"],
    8: ["Material success", "Organization", "Achievement", "Power", "Status"],
    9: ["Humanitarianism", "Compassion", "Giving", "Creativity", "Global view"],
    11: ["Inspiration", "Intuition", "Illumination", "Idealism", "Vision"],
    22: ["Master building", "Practicality", "Power", "Large-scale projects", "Leadership"]
  };
  
  const birthdays = birthdayMap[number] || [];
  const traits = traitEmphasis[number] || [];
  
  return (
    <div className="mt-6 p-4 bg-white/30 backdrop-blur-sm rounded-lg">
      <h4 className="font-bold mb-3 text-lg text-indigo-700">Associated Birth Days</h4>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {birthdays.map((day, index) => (
          <div 
            key={index}
            className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white 
              ${number === 11 || number === 22 || day === "11" || day === "22" || day === "29" 
                ? "bg-purple-600" 
                : `bg-gradient-to-br ${
                    number === 1 ? "from-red-500 to-red-600" : 
                    number === 2 ? "from-blue-500 to-blue-600" : 
                    number === 3 ? "from-amber-500 to-amber-600" : 
                    number === 4 ? "from-emerald-500 to-emerald-600" : 
                    number === 5 ? "from-indigo-500 to-indigo-600" : 
                    number === 6 ? "from-pink-500 to-pink-600" : 
                    number === 7 ? "from-violet-500 to-violet-600" : 
                    number === 8 ? "from-rose-500 to-rose-600" : 
                    "from-teal-500 to-teal-600"
                  }`
              }`}
          >
            {day}
          </div>
        ))}
      </div>
      
      <h5 className="font-semibold text-indigo-700 mb-2">Trait Emphasis</h5>
      <div className="flex flex-wrap gap-2">
        {traits.map((trait, index) => (
          <div 
            key={index}
            className="px-3 py-1 rounded-full text-sm bg-white/50 text-indigo-700 border border-indigo-200 shadow-sm"
          >
            {trait}
          </div>
        ))}
      </div>
    </div>
  );
};

// Intensity Table Visualization
const IntensityTableVisualization = ({ number }) => {
  const intensityLevels = {
    1: {
      average: 3, 
      description: "Self-confidence, independence, leadership, creativity",
      primeIntensifier: "Independent approach, leadership"
    },
    2: {
      average: 1, 
      description: "Cooperation, diplomacy, sensitivity, detail-orientation",
      primeIntensifier: "Sensitivity to others, harmony"
    }, 
    3: {
      average: 1, 
      description: "Creativity, expression, optimism, social ability",
      primeIntensifier: "Artistic expression, verbal ability"
    },
    4: {
      average: 1, 
      description: "Order, service, practicality, hard work",
      primeIntensifier: "System, order, practicality"
    },
    5: {
      average: 4, 
      description: "Freedom, versatility, change, adaptability",
      primeIntensifier: "Versatility, resourcefulness"
    },
    6: {
      average: 1, 
      description: "Responsibility, love, balance, harmony",
      primeIntensifier: "Responsibility, balancing abilities"
    },
    7: {
      average: 1, 
      description: "Analysis, wisdom, spirituality, introspection",
      primeIntensifier: "Analytical abilities, unique viewpoint"
    },
    8: {
      average: 1, 
      description: "Material satisfaction, achievement, organization",
      primeIntensifier: "Business abilities, materialism"
    },
    9: {
      average: 2, 
      description: "Selflessness, humanitarian work, compassion",
      primeIntensifier: "Humanitarian approach, creativity"
    }
  };
  
  const data = intensityLevels[number] || { average: 0, description: "", primeIntensifier: "" };
  
  // Simulate intensity bars for visualization
  const intensityBars = [
    { label: "Less than average", value: Math.max(data.average - 2, 0) },
    { label: "Average", value: data.average },
    { label: "Above average", value: data.average + 2 },
    { label: "Much above average", value: data.average + 4 }
  ];
  
  return (
    <div className="mt-6 p-4 bg-white/30 backdrop-blur-sm rounded-lg">
      <h4 className="font-bold mb-3 text-lg text-indigo-700">Number {number} Intensity Metrics</h4>
      
      <div className="mb-4">
        <h5 className="font-semibold text-indigo-600 mb-1">Prime Intensifier</h5>
        <p className="text-gray-700">{data.primeIntensifier}</p>
      </div>
      
      <div className="mb-4">
        <h5 className="font-semibold text-indigo-600 mb-1">Key Traits</h5>
        <p className="text-gray-700">{data.description}</p>
      </div>
      
      <h5 className="font-semibold text-indigo-600 mb-2">Intensity Scale</h5>
      <div className="space-y-3">
        {intensityBars.map((bar, index) => (
          <div key={index} className="relative">
            <div className="flex justify-between mb-1">
              <span className="text-xs font-medium text-gray-700">{bar.label}</span>
              <span className="text-xs font-medium text-gray-700">{bar.value}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className={`h-full rounded-full ${index === 0 ? "bg-red-400" : index === 1 ? "bg-yellow-400" : index === 2 ? "bg-green-400" : "bg-indigo-500"}`}
                style={{ width: `${(bar.value / 8) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Challenge/Growth Visualization
const ChallengeGrowthVisualization = ({ number }) => {
  const challengeData = {
    1: {
      challenge: "Dependency, domination by others",
      growth: "Independence, leadership, originality",
      stages: [
        { stage: "Youth", focus: "Breaking from dependency" },
        { stage: "Middle Age", focus: "Expressing leadership" },
        { stage: "Maturity", focus: "Balancing independence and interdependence" }
      ]
    },
    2: {
      challenge: "Fear, timidity, oversensitivity",
      growth: "Cooperation, sensitivity, diplomacy",
      stages: [
        { stage: "Youth", focus: "Managing sensitivity" },
        { stage: "Middle Age", focus: "Developing cooperation" },
        { stage: "Maturity", focus: "Finding balance in relationships" }
      ]
    },
    3: {
      challenge: "Self-expression, social anxiety",
      growth: "Creativity, joy, optimism, sociability",
      stages: [
        { stage: "Youth", focus: "Finding voice" },
        { stage: "Middle Age", focus: "Creative development" },
        { stage: "Maturity", focus: "Sharing joy with others" }
      ]
    },
    4: {
      challenge: "Rigidity, feeling restricted",
      growth: "Order, practicality, service",
      stages: [
        { stage: "Youth", focus: "Accepting limitations" },
        { stage: "Middle Age", focus: "Finding freedom within structure" },
        { stage: "Maturity", focus: "Service through order" }
      ]
    },
    5: {
      challenge: "Restlessness, excess, scattering energy",
      growth: "Freedom, adventure, adaptability",
      stages: [
        { stage: "Youth", focus: "Managing freedom constructively" },
        { stage: "Middle Age", focus: "Learning from experience" },
        { stage: "Maturity", focus: "Versatile wisdom" }
      ]
    },
    6: {
      challenge: "Over-responsibility, perfectionism",
      growth: "Balance, love, harmony, responsibility",
      stages: [
        { stage: "Youth", focus: "Balancing needs" },
        { stage: "Middle Age", focus: "Creating harmony" },
        { stage: "Maturity", focus: "Unconditional love" }
      ]
    },
    7: {
      challenge: "Isolation, criticism, skepticism",
      growth: "Analysis, spirituality, wisdom",
      stages: [
        { stage: "Youth", focus: "Finding inner trust" },
        { stage: "Middle Age", focus: "Spiritual development" },
        { stage: "Maturity", focus: "Sharing wisdom" }
      ]
    },
    8: {
      challenge: "Materialism, power struggles",
      growth: "Achievement, organization, abundance",
      stages: [
        { stage: "Youth", focus: "Balancing ambition" },
        { stage: "Middle Age", focus: "Material mastery" },
        { stage: "Maturity", focus: "True prosperity" }
      ]
    },
    9: {
      challenge: "Selfishness, emotional detachment",
      growth: "Giving, compassion, universal love",
      stages: [
        { stage: "Youth", focus: "Learning to give" },
        { stage: "Middle Age", focus: "Expanding compassion" },
        { stage: "Maturity", focus: "Universal perspective" }
      ]
    },
    11: {
      challenge: "Nervous tension, impracticality",
      growth: "Intuition, inspiration, illumination",
      stages: [
        { stage: "Youth", focus: "Managing sensitivity" },
        { stage: "Middle Age", focus: "Intuitive development" },
        { stage: "Maturity", focus: "Spiritual teaching" }
      ]
    },
    22: {
      challenge: "Overwhelming potential, procrastination",
      growth: "Master building, practical achievements",
      stages: [
        { stage: "Youth", focus: "Grounding vision" },
        { stage: "Middle Age", focus: "Building foundations" },
        { stage: "Maturity", focus: "Creating legacy" }
      ]
    }
  };
  
  const data = challengeData[number] || { challenge: "", growth: "", stages: [] };
  
  return (
    <div className="mt-6 p-4 bg-white/30 backdrop-blur-sm rounded-lg">
      <h4 className="font-bold mb-3 text-lg text-indigo-700">Challenge & Growth Path</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-red-50/70 rounded-lg border border-red-100">
          <h5 className="font-bold text-red-700 mb-2">Challenge</h5>
          <p className="text-red-800">{data.challenge}</p>
        </div>
        
        <div className="p-4 bg-green-50/70 rounded-lg border border-green-100">
          <h5 className="font-bold text-green-700 mb-2">Growth</h5>
          <p className="text-green-800">{data.growth}</p>
        </div>
      </div>
      
      <h5 className="font-semibold text-indigo-700 mb-3">Life Stages</h5>
      <div className="flex flex-col md:flex-row gap-3">
        {data.stages.map((stage, index) => (
          <div key={index} className="flex-1 p-3 bg-white/40 rounded-lg border border-indigo-100">
            <h6 className="font-semibold text-indigo-700">{stage.stage}</h6>
            <p className="text-gray-700 text-sm mt-1">{stage.focus}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Maturity Number Visualization
const MaturityVisualization = ({ number }) => {
  const maturityData = {
    1: {
      focus: "Independence and leadership",
      shift: "Redefining independence, shifting from personal goals to leadership that benefits others",
      challenge: "Balancing self-reliance with cooperation"
    },
    2: {
      focus: "Relationships and cooperation",
      shift: "Finding deeper meaning in relationships, developing ability to facilitate harmony",
      challenge: "Finding voice while maintaining sensitivity"
    },
    3: {
      focus: "Self-expression and creativity",
      shift: "Moving from superficial expression to meaningful creative contribution",
      challenge: "Adding depth to natural optimism"
    },
    4: {
      focus: "Order and practical success",
      shift: "Seeing limitations as opportunities, finding freedom within structure",
      challenge: "Avoiding rigidity while maintaining stability"
    },
    5: {
      focus: "Freedom and versatility",
      shift: "Using experiences constructively, finding meaningful purpose in versatility",
      challenge: "Focusing energy without feeling restricted"
    },
    6: {
      focus: "Responsibility and harmony",
      shift: "Balancing responsibility to others with self-care",
      challenge: "Setting boundaries while remaining nurturing"
    },
    7: {
      focus: "Wisdom and spiritual growth",
      shift: "Sharing inner wisdom rather than isolating, finding practical applications for spiritual insights",
      challenge: "Connecting with others while honoring need for solitude"
    },
    8: {
      focus: "Achievement and material mastery",
      shift: "Redefining success beyond material gain, using power for wider benefit",
      challenge: "Balancing personal ambition with higher purpose"
    },
    9: {
      focus: "Completion and humanitarian service",
      shift: "Finding deep satisfaction in selfless giving, releasing attachment to recognition",
      challenge: "Self-care while serving others"
    },
    11: {
      focus: "Spiritual illumination",
      shift: "Manifesting spiritual insights in practical ways, teaching through example",
      challenge: "Bringing vision into reality while managing nervous tension"
    },
    22: {
      focus: "Master building",
      shift: "Using immense potential for large-scale benefit, combining practical ability with spiritual awareness",
      challenge: "Manifesting full potential despite pressure"
    }
  };
  
  const data = maturityData[number] || { focus: "", shift: "", challenge: "" };
  
  return (
    <div className="mt-6 p-4 bg-white/30 backdrop-blur-sm rounded-lg">
      <h4 className="font-bold mb-3 text-lg text-indigo-700">Maturity Transition</h4>
      
      <div className="relative mb-8 pt-6">
        {/* Arrow flow */}
        <div className="absolute top-12 left-4 right-4 h-1 bg-gradient-to-r from-purple-400 to-indigo-600"></div>
        <div className="absolute top-8 right-4 w-6 h-6 rotate-45 border-t-2 border-r-2 border-indigo-600"></div>
        
        {/* Timeline points */}
        <div className="flex justify-between relative">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mb-2">
              1
            </div>
            <h6 className="font-semibold text-purple-700 text-center">Early Life</h6>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold mb-2">
              2
            </div>
            <h6 className="font-semibold text-indigo-700 text-center">Maturity</h6>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-purple-50/70 rounded-lg border border-purple-100 mb-4">
        <h5 className="font-bold text-purple-700 mb-2">Maturity Focus</h5>
        <p className="text-purple-800">{data.focus}</p>
      </div>
      
      <div className="p-4 bg-indigo-50/70 rounded-lg border border-indigo-100 mb-4">
        <h5 className="font-bold text-indigo-700 mb-2">Life Transition</h5>
        <p className="text-indigo-800">{data.shift}</p>
      </div>
      
      <div className="p-4 bg-blue-50/70 rounded-lg border border-blue-100">
        <h5 className="font-bold text-blue-700 mb-2">Maturity Challenge</h5>
        <p className="text-blue-800">{data.challenge}</p>
      </div>
    </div>
  );
};

// First Letter Visualization
const FirstLetterVisualization = ({ letter }) => {
  // Map letters to their qualities
  const letterQualities = {
    'A': { type: "Vowel", number: 1, traits: ["Leadership", "Independence", "Originality", "Willpower", "Ambition"] },
    'B': { type: "Consonant", number: 2, traits: ["Sensitivity", "Cooperation", "Diplomacy", "Patience", "Detail"] },
    'C': { type: "Consonant", number: 3, traits: ["Expression", "Creativity", "Joy", "Optimism", "Sociability"] },
    'D': { type: "Consonant", number: 4, traits: ["Practicality", "Order", "Service", "Determination", "Diligence"] },
    'E': { type: "Vowel", number: 5, traits: ["Freedom", "Change", "Versatility", "Adventure", "Adaptability"] },
    'F': { type: "Consonant", number: 6, traits: ["Responsibility", "Balance", "Love", "Harmony", "Nurturing"] },
    'G': { type: "Consonant", number: 7, traits: ["Analysis", "Wisdom", "Introspection", "Spirituality", "Research"] },
    'H': { type: "Consonant", number: 8, traits: ["Achievement", "Organization", "Power", "Status", "Success"] },
    'I': { type: "Vowel", number: 9, traits: ["Humanitarian", "Compassion", "Giving", "Creativity", "Emotion"] },
    'J': { type: "Consonant", number: 1, traits: ["Leadership", "Indecision", "Originality", "Contemplation", "Ambition"] },
    'K': { type: "Consonant", number: 11, traits: ["Intuition", "Inspiration", "Illumination", "Vision", "Idealism"] },
    'L': { type: "Consonant", number: 3, traits: ["Expression", "Creativity", "Reason", "Logic", "Communication"] },
    'M': { type: "Consonant", number: 4, traits: ["Practicality", "Order", "Control", "Structure", "Management"] },
    'N': { type: "Consonant", number: 5, traits: ["Freedom", "Mental agility", "Versatility", "Adventure", "Adaptability"] },
    'O': { type: "Vowel", number: 6, traits: ["Responsibility", "Balance", "Protection", "Harmony", "Secretive"] },
    'P': { type: "Consonant", number: 7, traits: ["Analysis", "Wisdom", "Inexpressive", "Research", "Introspection"] },
    'Q': { type: "Consonant", number: 8, traits: ["Achievement", "Power", "Non-conformity", "Leadership", "Innovation"] },
    'R': { type: "Consonant", number: 9, traits: ["Humanitarian", "Selfless", "Understanding", "Tolerance", "Power"] },
    'S': { type: "Consonant", number: 1, traits: ["Leadership", "Emotional", "Originality", "Dramatic", "Intuitive"] },
    'T': { type: "Consonant", number: 2, traits: ["Sensitivity", "Emotional", "Cooperation", "Service", "Sacrifice"] },
    'U': { type: "Vowel", number: 3, traits: ["Creativity", "Receptivity", "Sensitivity", "Indecision", "Intuition"] },
    'V': { type: "Consonant", number: 22, traits: ["Master Building", "Inspiration", "Vision", "Practicality", "Leadership"] },
    'W': { type: "Consonant", number: 5, traits: ["Freedom", "Limitation", "Versatility", "Restriction", "Experience"] },
    'X': { type: "Consonant", number: 6, traits: ["Responsibility", "Emotional", "Balance", "Harmony", "Crisis"] },
    'Y': { type: "Consonant", number: 7, traits: ["Analysis", "Uncertainty", "Wisdom", "Spirituality", "Intuition"] },
    'Z': { type: "Consonant", number: 8, traits: ["Achievement", "Inspiration", "Power", "Energy", "Emotion"] }
  };
  
  const data = letterQualities[letter] || { type: "", number: 0, traits: [] };
  
  return (
    <div className="mt-6 p-4 bg-white/30 backdrop-blur-sm rounded-lg">
     <h4 className="font-bold mb-3 text-lg text-indigo-700">Letter {letter} Profile</h4>
     
     <div className="flex items-center justify-center mb-6">
       <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold ${
         data.type === "Vowel" ? "bg-purple-100 text-purple-700 border-2 border-purple-300" : 
         "bg-indigo-100 text-indigo-700 border-2 border-indigo-300"
       }`}>
         {letter}
       </div>
       <div className="ml-6">
         <div className={`px-3 py-1 rounded-full text-sm ${
           data.type === "Vowel" ? "bg-purple-100 text-purple-700" : "bg-indigo-100 text-indigo-700"
         }`}>
           {data.type}
         </div>
         <div className="mt-1 px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
           Number: {data.number}
         </div>
       </div>
     </div>
     
     <h5 className="font-semibold text-indigo-700 mb-2">Key Traits</h5>
     <div className="flex flex-wrap gap-2">
       {data.traits.map((trait, index) => (
         <div 
           key={index}
           className={`px-3 py-1 rounded-full text-sm font-medium ${
             data.type === "Vowel" ? "bg-purple-50 text-purple-700 border border-purple-200" : 
             "bg-indigo-50 text-indigo-700 border border-indigo-200"
           }`}
         >
           {trait}
         </div>
       ))}
     </div>
   </div>
 );
};

// First Vowel Visualization
const FirstVowelVisualization = ({ vowel }) => {
 const vowelTypes = {
   'A': { 
     number: 1, 
     types: ["Long", "Short", "Combined"],
     emphasis: "Drive & Leadership",
     qualities: ["Pioneering", "Independence", "Originality", "Ambition", "Leadership"]
   },
   'E': { 
     number: 5, 
     types: ["Long", "Short", "Combined"],
     emphasis: "Freedom & Change",
     qualities: ["Adventure", "Freedom", "Versatility", "Change", "Excitement"]
   },
   'I': { 
     number: 9, 
     types: ["Long", "Short", "Combined"],
     emphasis: "Emotion & Humanitarianism",
     qualities: ["Emotion", "Giving", "Compassion", "Creativity", "Depth"]
   },
   'O': { 
     number: 6, 
     types: ["Long", "Short", "Combined"],
     emphasis: "Responsibility & Protection",
     qualities: ["Harmony", "Balance", "Protection", "Responsibility", "Service"]
   },
   'U': { 
     number: 3, 
     types: ["Long", "Short", "Combined"],
     emphasis: "Sensitivity & Expression",
     qualities: ["Creativity", "Sensitivity", "Receptivity", "Indecision", "Conservation"]
   },
   'Y': { 
     number: 7, 
     types: ["Long", "Short", "Combined"],
     emphasis: "Analysis & Intuition",
     qualities: ["Wisdom", "Introspection", "Uncertainty", "Analysis", "Spirituality"]
   },
   'W': { 
     number: 5, 
     types: ["Combined"],
     emphasis: "Energy & Restlessness",
     qualities: ["Energy", "Vacillation", "Restlessness", "Direction", "Enhancement"]
   }
 };
 
 const data = vowelTypes[vowel] || { number: 0, types: [], emphasis: "", qualities: [] };
 
 return (
   <div className="mt-6 p-4 bg-white/30 backdrop-blur-sm rounded-lg">
     <h4 className="font-bold mb-3 text-lg text-indigo-700">Vowel {vowel} Profile</h4>
     
     <div className="flex items-center justify-center mb-6">
       <div className="w-20 h-20 rounded-full bg-purple-100 text-purple-700 border-2 border-purple-300 flex items-center justify-center text-3xl font-bold">
         {vowel}
       </div>
       <div className="ml-6">
         <div className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-700">
           Vowel
         </div>
         <div className="mt-1 px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
           Number: {data.number}
         </div>
       </div>
     </div>
     
     <div className="p-4 bg-purple-50/70 rounded-lg border border-purple-100 mb-4">
       <h5 className="font-bold text-purple-700 mb-2">Main Emphasis</h5>
       <p className="text-purple-800">{data.emphasis}</p>
     </div>
     
     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
       <div>
         <h5 className="font-semibold text-indigo-700 mb-2">Vowel Types</h5>
         <div className="flex flex-wrap gap-2">
           {data.types.map((type, index) => (
             <div 
               key={index}
               className="px-3 py-1 rounded-full text-sm bg-purple-50 text-purple-700 border border-purple-200"
             >
               {type}
             </div>
           ))}
         </div>
       </div>
       
       <div>
         <h5 className="font-semibold text-indigo-700 mb-2">Key Qualities</h5>
         <div className="flex flex-wrap gap-2">
           {data.qualities.map((quality, index) => (
             <div 
               key={index}
               className="px-3 py-1 rounded-full text-sm bg-indigo-50 text-indigo-700 border border-indigo-200"
             >
               {quality}
             </div>
           ))}
         </div>
       </div>
     </div>
   </div>
 );
};

// Number Relationships Web - shows how numbers relate to each other
const NumberRelationshipsWeb = ({ number }) => {
  const relationshipData = {
    1: [
      { number: 1, relationship: "self" },
      { number: 3, relationship: "harmonious", strength: 70 },
      { number: 4, relationship: "harmonious", strength: 65 },
      { number: 8, relationship: "harmonious", strength: 75 },
      { number: 2, relationship: "discordant", strength: 30 },
      { number: 6, relationship: "discordant", strength: 35 },
      { number: 7, relationship: "discordant", strength: 40 },
      { number: 9, relationship: "discordant", strength: 35 }
    ],
    2: [
      { number: 2, relationship: "self" },
      { number: 3, relationship: "harmonious", strength: 70 },
      { number: 4, relationship: "harmonious", strength: 60 },
      { number: 6, relationship: "harmonious", strength: 80 },
      { number: 9, relationship: "harmonious", strength: 75 },
      { number: 1, relationship: "discordant", strength: 30 },
      { number: 5, relationship: "discordant", strength: 35 },
      { number: 7, relationship: "discordant", strength: 40 }
    ],
    3: [
      { number: 3, relationship: "self" },
      { number: 1, relationship: "harmonious", strength: 70 },
      { number: 2, relationship: "harmonious", strength: 70 },
      { number: 5, relationship: "harmonious", strength: 75 },
      { number: 6, relationship: "harmonious", strength: 70 },
      { number: 9, relationship: "harmonious", strength: 75 },
      { number: 4, relationship: "discordant", strength: 35 },
      { number: 7, relationship: "discordant", strength: 30 },
      { number: 8, relationship: "discordant", strength: 35 }
    ],
    // Add relationships for other numbers
  };

  const relationships = relationshipData[number] || [];
  
  // Filter harmonious and discordant relationships
  const harmonious = relationships.filter(rel => rel.relationship === "harmonious");
  const discordant = relationships.filter(rel => rel.relationship === "discordant");
  
  return (
    <div className="mt-6 p-4 bg-white/30 backdrop-blur-sm rounded-lg">
      <h4 className="font-bold mb-3 text-lg text-indigo-700">Number {number} Relationship Web</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h5 className="font-semibold text-green-700 mb-2">Harmonious Numbers</h5>
          <div className="flex flex-wrap gap-2">
            {harmonious.map((rel, index) => (
              <div key={index} className="relative">
                <div className="w-12 h-12 rounded-full bg-green-100 border-2 border-green-400 
                  flex items-center justify-center text-xl font-bold text-green-700">
                  {rel.number}
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-green-500 
                  flex items-center justify-center text-xs text-white font-medium">
                  {rel.strength}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h5 className="font-semibold text-red-700 mb-2">Discordant Numbers</h5>
          <div className="flex flex-wrap gap-2">
            {discordant.map((rel, index) => (
              <div key={index} className="relative">
                <div className="w-12 h-12 rounded-full bg-red-100 border-2 border-red-400 
                  flex items-center justify-center text-xl font-bold text-red-700">
                  {rel.number}
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 
                  flex items-center justify-center text-xs text-white font-medium">
                  {rel.strength}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Numerology Clock - shows how numbers relate in a cyclic pattern
const NumerologyClock = () => {
  return (
    <div className="mt-6 p-4 bg-white/30 backdrop-blur-sm rounded-lg">
      <h4 className="font-bold mb-3 text-lg text-indigo-700">Numerology Clock</h4>
      
      <div className="relative w-64 h-64 mx-auto">
        {/* Clock face */}
        <div className="absolute inset-0 rounded-full border-4 border-indigo-300 bg-white/50"></div>
        
        {/* Clock center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          w-4 h-4 rounded-full bg-indigo-600"></div>
        
        {/* Numbers */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, i) => {
          const angle = (i * 40) * Math.PI / 180;
          const x = 32 + Math.sin(angle) * 25;
          const y = 32 - Math.cos(angle) * 25;
          
          return (
            <div key={num} 
              className={`absolute w-8 h-8 rounded-full flex items-center justify-center 
                font-bold text-white transform -translate-x-1/2 -translate-y-1/2
                ${num === 1 ? "bg-red-500" : 
                  num === 2 ? "bg-blue-500" : 
                  num === 3 ? "bg-amber-500" : 
                  num === 4 ? "bg-green-500" : 
                  num === 5 ? "bg-indigo-500" : 
                  num === 6 ? "bg-pink-500" : 
                  num === 7 ? "bg-purple-500" : 
                  num === 8 ? "bg-rose-500" : 
                  "bg-teal-500"}`}
              style={{
                left: `${x}%`,
                top: `${y}%`
              }}
            >
              {num}
            </div>
          );
        })}
        
        {/* Master numbers */}
        {[11, 22].map((num, i) => {
          const angle = ((i + 9) * 40) * Math.PI / 180;
          const x = 32 + Math.sin(angle) * 25;
          const y = 32 - Math.cos(angle) * 25;
          
          return (
            <div key={num} 
              className="absolute w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center 
                font-bold text-white transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${x}%`,
                top: `${y}%`
              }}
            >
              {num}
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-700">
        <p>The Numerology Clock shows the cyclical nature of numbers and how they relate to each other in a continuous pattern.</p>
      </div>
    </div>
  );
};

// Number Personality Type Indicator
const PersonalityTypeIndicator = ({ number }) => {
  const personalityData = {
    1: { type: "The Pioneer", element: "Fire", direction: "Forward", energy: "Yang" },
    2: { type: "The Diplomat", element: "Water", direction: "Receptive", energy: "Yin" },
    3: { type: "The Creator", element: "Fire", direction: "Outward", energy: "Yang" },
    4: { type: "The Builder", element: "Earth", direction: "Inward", energy: "Yin" },
    5: { type: "The Freedom Seeker", element: "Air", direction: "All directions", energy: "Yang" },
    6: { type: "The Nurturer", element: "Earth", direction: "Surrounding", energy: "Yin" },
    7: { type: "The Seeker", element: "Water", direction: "Inward", energy: "Yin" },
    8: { type: "The Achiever", element: "Earth", direction: "Upward", energy: "Yang" },
    9: { type: "The Humanitarian", element: "Fire", direction: "Outward", energy: "Yang" },
    11: { type: "The Illuminator", element: "Air", direction: "Ascending", energy: "Yang" },
    22: { type: "The Master Builder", element: "Earth", direction: "Expanding", energy: "Yang" }
  };
  
  const data = personalityData[number] || { type: "", element: "", direction: "", energy: "" };
  
  const getElementIcon = (element) => {
    switch(element) {
      case "Fire": return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11.985C10.5 10.5 8 13 8 15c0 .686.253 1.3.657 1.757" />
        </svg>
      );
      case "Water": return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      );
      case "Earth": return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      case "Air": return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      );
      default: return null;
    }
  };
  
  return (
    <div className="mt-6 p-4 bg-white/30 backdrop-blur-sm rounded-lg">
      <h4 className="font-bold mb-3 text-lg text-indigo-700">Number {number} Personality Type</h4>
      
      <div className="p-4 bg-white/50 rounded-lg border border-indigo-100 mb-4">
        <div className="flex items-center">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white
            ${number === 1 ? "bg-red-500" : 
              number === 2 ? "bg-blue-500" : 
              number === 3 ? "bg-amber-500" : 
              number === 4 ? "bg-green-500" : 
              number === 5 ? "bg-indigo-500" : 
              number === 6 ? "bg-pink-500" : 
              number === 7 ? "bg-purple-500" : 
              number === 8 ? "bg-rose-500" : 
              number === 9 ? "bg-teal-500" : 
              number === 11 ? "bg-violet-500" : 
              "bg-fuchsia-500"}`}
          >
            {number}
          </div>
          <div className="ml-4">
            <h5 className="text-xl font-bold text-gray-800">{data.type}</h5>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="p-3 bg-white/40 rounded-lg border border-indigo-100 text-center">
          <div className="flex justify-center mb-2">
            {getElementIcon(data.element)}
          </div>
          <h5 className="font-semibold text-indigo-700">Element</h5>
          <p className="text-gray-700">{data.element}</p>
        </div>
        
        <div className="p-3 bg-white/40 rounded-lg border border-indigo-100 text-center">
          <div className="flex justify-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" />
            </svg>
          </div>
          <h5 className="font-semibold text-indigo-700">Direction</h5>
          <p className="text-gray-700">{data.direction}</p>
        </div>
        
        <div className="p-3 bg-white/40 rounded-lg border border-indigo-100 text-center">
          <div className="flex justify-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h5 className="font-semibold text-indigo-700">Energy</h5>
          <p className="text-gray-700">{data.energy}</p>
        </div>
      </div>
    </div>
  );
};

// Interactive Numerology Calculator
const NumerologyCalculator = () => {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [results, setResults] = useState(null);
  
  const calculateNumerology = () => {
    // This is a simplified calculation for demonstration
    const calculateNameNumber = (name) => {
      const letterValues = {
        'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
        'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
        'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
      };
      
      let sum = 0;
      for (let i = 0; i < name.length; i++) {
        const char = name[i].toUpperCase();
        if (letterValues[char]) {
          sum += letterValues[char];
        }
      }
      
      // Reduce to single digit or master number
      while (sum > 9 && sum !== 11 && sum !== 22) {
        let newSum = 0;
        sum.toString().split('').forEach(digit => {
          newSum += parseInt(digit);
        });
        sum = newSum;
      }
      
      return sum;
    };
    
    const calculateLifePath = (birthdate) => {
      if (!birthdate) return 0;
      
      // Format: YYYY-MM-DD
      const parts = birthdate.split('-');
      if (parts.length !== 3) return 0;
      
      const year = parts[0];
      const month = parts[1];
      const day = parts[2];
      
      // Sum all digits
      let sum = 0;
      
      // Add year
      year.split('').forEach(digit => {
        sum += parseInt(digit);
      });
      
      // Add month
      month.split('').forEach(digit => {
        sum += parseInt(digit);
      });
      
      // Add day
      day.split('').forEach(digit => {
        sum += parseInt(digit);
      });
      
      // Reduce to single digit or master number
      while (sum > 9 && sum !== 11 && sum !== 22) {
        let newSum = 0;
        sum.toString().split('').forEach(digit => {
          newSum += parseInt(digit);
        });
        sum = newSum;
      }
      
      return sum;
    };
    
    if (name || birthdate) {
      const expressionNumber = calculateNameNumber(name);
      const lifePathNumber = calculateLifePath(birthdate);
      
      setResults({
        expression: expressionNumber,
        lifePath: lifePathNumber
      });
    }
  };
  
  return (
    <div className="mt-6 p-4 bg-white/30 backdrop-blur-md rounded-lg shadow-lg">
      <h4 className="font-bold mb-3 text-lg text-indigo-700">Quick Numerology Calculator</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your full name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Birthdate</label>
          <input 
            type="date" 
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="w-full px-3 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
      
      <button 
        onClick={calculateNumerology}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
      >
        Calculate
      </button>
      
      {results && (
        <div className="mt-4 p-4 bg-white/50 rounded-lg border border-indigo-200">
          <h5 className="font-semibold text-indigo-700 mb-2">Your Numbers</h5>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-indigo-50 rounded-lg text-center">
              <h6 className="text-sm text-indigo-600 mb-1">Expression Number</h6>
              <div className="text-2xl font-bold text-indigo-700">{results.expression}</div>
            </div>
            
            <div className="p-3 bg-purple-50 rounded-lg text-center">
              <h6 className="text-sm text-purple-600 mb-1">Life Path Number</h6>
              <div className="text-2xl font-bold text-purple-700">{results.lifePath}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Water background component (reusing from your existing UI)
const WaterBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 opacity-80" />
    
    {/* Animated water bubbles */}
    {[...Array(15)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-cyan-200/30 blur-md"
        style={{
          width: `${Math.random() * 100 + 50}px`,
          height: `${Math.random() * 100 + 50}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
          animationDelay: `${Math.random() * 5}s`,
        }}
      />
    ))}
    
    <style jsx>{`
      @keyframes float {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(${Math.random() * 50}px, ${Math.random() * 50}px) rotate(5deg); }
        50% { transform: translate(${Math.random() * -50}px, ${Math.random() * 50}px) rotate(-5deg); }
        75% { transform: translate(${Math.random() * 50}px, ${Math.random() * -50}px) rotate(5deg); }
      }
    `}</style>
  </div>
);

// Animated Title Component
const AnimatedTitle = ({ title }) => (
  <div className="relative mb-6">
    <h1 className="text-6xl md:text-7xl font-bold relative z-10 animate-pulse-slow" style={{ fontFamily: 'system-ui, sans-serif' }}>
      <span className="relative bg-gradient-to-r from-purple-700 via-indigo-600 to-cyan-500 
        bg-clip-text text-transparent bg-animate-fire drop-shadow-lg 
        hover:scale-105 transition-transform duration-300">
        {title}
      </span>

      {/* Water drips */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${15 + i * 20}%`,
            animation: `waterDrip ${3 + i * 0.5}s infinite`,
            animationDelay: `${i * 0.3}s`,
            opacity: 0
          }}
        >
          <div className="relative">
            <div className="absolute w-1.5 rounded-full bg-gradient-to-b from-cyan-200/60 to-cyan-400/60 
              blur-[2px] animate-pulse"
              style={{
                height: '20px',
                transform: 'translateY(-100%)'
              }}
            />
            <div className="w-3 h-3 rounded-full bg-gradient-to-b from-cyan-200/60 to-cyan-400/60 
              blur-[2px] animate-pulse"
            />
          </div>
        </div>
      ))}
    </h1>

    <style jsx>{`
      @keyframes waterDrip {
        0% {
          transform: translateY(-50%);
          opacity: 0;
        }
        20% {
          opacity: 0.7;
        }
        80% {
          opacity: 0.7;
        }
        100% {
          transform: translateY(100px);
          opacity: 0;
        }
      }

      .bg-animate-fire {
        background-size: 200% 200%;
        animation: fireGradient 8s ease infinite;
      }

      @keyframes fireGradient {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }

      .animate-pulse-slow {
        animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }

      @keyframes pulse-slow {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.8;
        }
      }
    `}</style>
  </div>
);

// Category Card Component for selecting reference charts
const CategoryCard = ({ title, description, icon, onClick, isActive }) => (
  <div 
    className={`relative group cursor-pointer transition-all duration-300 ${isActive ? 'scale-[1.03]' : 'hover:scale-105'}`}
    onClick={onClick}
  >
    {/* Glowing background effect */}
    <div className={`absolute -inset-1 bg-gradient-to-r ${isActive ? 'from-purple-400/70 via-indigo-500/70 to-purple-400/70' : 'from-indigo-200/50 via-purple-300/50 to-indigo-200/50'} 
      rounded-lg blur-sm opacity-40 group-hover:opacity-80 transition duration-1000 
      animate-gradient-shift group-hover:animate-gradient-shift-fast`}>
    </div>
    
    {/* Card content */}
    <div 
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15))',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.15)'
      }}
      className={`relative rounded-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl p-5 border ${isActive ? 'border-purple-400' : 'border-transparent'}`}
    >
      <div className="flex items-center">
        <span className="text-3xl mr-4">{icon}</span>
        <div>
          <h3 className={`text-lg font-semibold ${isActive ? 'text-purple-900' : 'text-gray-800'}`}>{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>

    <style>{`
      .animate-gradient-shift {
        animation: gradient-shift 8s ease infinite;
        background-size: 200% 200%;
      }
      .animate-gradient-shift-fast {
        animation: gradient-shift 4s ease infinite;
        background-size: 200% 200%;
      }
      @keyframes gradient-shift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `}</style>
  </div>
);

// Tabs Component for displaying number-specific charts
const ChartTabs = ({ selectedNumber, onSelectNumber }) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22];
  
  return (
    <div className="mb-6 overflow-x-auto scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-indigo-100/30">
      <div className="flex space-x-1 min-w-max">
        {numbers.map(number => (
          <button
            key={number}
            onClick={() => onSelectNumber(number)}
            className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
              selectedNumber === number 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white/20 hover:bg-white/40 text-gray-700'
            }`}
          >
            {number}
            {(number === 11 || number === 22) && (
              <span className="text-xs ml-1 opacity-80">
                (Master)
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// Number Basics Chart Component (CHART 1)
const NumberBasicsChart = ({ number }) => {
  const numberData = {
    1: {
      title: "Individuation, Independence, Attainment",
      type: "Odd",
      basics: [
        "A person must distinguish himself from other people and acknowledge his own INDIVIDUATION.",
        "The individual has to develop the capability of standing on his own and going from dependence to INDEPENDENCE.",
        "Once independent, the person becomes aware of his potential for ATTAINMENT as an individual-for creating and pioneering when working alone-to leading and managing as an individual working with others."
      ]
    },
    2: {
      title: "Relation, Cooperation",
      type: "Even",
      basics: [
        "Independence is important but has its limitations. There are other people all about, and another lesson involves being a meaningful part of a group-a small group like family or friends, a larger group like a business or community.",
        "The person must learn adaptability, service, consideration for others, i.e, the meaning of a RELATION with others, the idea of COOPERATION."
      ]
    },
    3: {
      title: "Expression, Joy of Living",
      type: "Odd",
      basics: [
        "A person must discover, both as an individual and as a group member, his capability of EXPRESSION: (1) artistic expression-writing, painting, sculpting, singing or any of the many other means of expressing inner thoughts and emotions, and (2) expression of feelings toward others-friendship, affection, love.",
        "The JOY OF LIVING can be expressed with optimism and enthusiasm. There can be a purity, even a naivete here. (This is, perhaps, the most enjoyable lesson of all the numbers.)"
      ]
    },
    4: {
      title: "Limitation, Order, Service",
      type: "Even",
      basics: [
        "Life doesn't always present opportunities for singing and laughing. Life doesn't always appear expansive or yours for the taking. Often, it feels just the opposite.",
        "The individual must learn the difficult law of LIMITATION. Everyone has limitations-limitations presented by the environment, by the physical body, by the restrictions of the individual's viewpoints.",
        "Rather than struggle against these limits, it is necessary to learn to live with them, to accept them and to make a meaningful existence, not in spite of the limitations, but because of the limitations.",
        "It is a difficult lesson. The individual embarking on this course must learn system and organization, ORDER on a practical level. He must be prepared to be of SERVICE to others."
      ]
    },
    5: {
      title: "Constructive Freedom",
      type: "Odd",
      basics: [
        "There is a time for expansion, for dealing with change, unexpected happenings, adventure.",
        "This lesson usually gives a person an abundance of talents in every direction, the capability of accomplishing almost anything for which an opportunity is presented-and many opportunities are presented.",
        "With the freedom that this abundance of talent and opportunity brings, life can be exciting. But the lesson is more difficult: the individual must learn the CONSTRUCTIVE use of FREEDOM.",
        "The individual must not waste his many talents or misuse his ongoing opportunities; he must not get lost in solely physical desires-food, sex, alcohol, drugs. He must not scatter his potential and end up with frustration. He must make a meaningful existence by using freedom productively."
      ]
    },
    6: {
      title: "Balance, Responsibility, Love",
      type: "Even",
      basics: [
        "A person must learn to give the beauty of love and harmony, sympathy and understanding, protection and BALANCE.",
        "Along with the balancing, the lesson of RESPONSIBILITY can be a meaningful one. The individual may find himself responsible for more than what rightly seems his share.",
        "Others will recognize his strength, and he may be expected to help them if they are in need and cannot help themselves.",
        "He will probably be the one who holds the family together, who harmonizes and adjusts difficult situations. He may choose to limit himself to his family, his friends, possibly the close community.",
        "The friendship and LOVE the individual expresses to others will come back to him from those he helps. He can bask in the glory of a job well done and the quiet reward of friendship and love returned.",
        "The individual's capability at harmony and balance may also be expressed creatively-there is the possibility of artistic achievement."
      ]
    },
    7: {
      title: "Analysis, Understanding",
      type: "Odd",
      basics: [
        "There's a time for introspection, a time to subject all an individual knows to mental ANALYSIS, so that eventually a person possesses much of knowledge and UNDERSTANDING.",
        "Spiritual awareness is employed and emphasis on material matters avoided. Desire for material accumulation will probably lead the individual off the track, for this is a time for study and meditation, a time to know oneself-in the deepest way.",
        "There will be much time spent alone-the person must learn to be alone and not feel isolated. Often, the individual will appear different to others. His way of thinking or doing may be very much his own and may seem inexplicable to his fellow man.",
        "He must accept that he is on a different wavelength and find satisfaction in that. In a world where materialism rates so highly, the road for the counselor, the professor, the pure researcher may be a difficult one."
      ]
    },
    8: {
      title: "Material Satisfaction",
      type: "Even",
      basics: [
        "The individual must learn to deal with the material things of life, the practical matters. He will find himself at home in the business world-with much capability as an efficient administrator or executive.",
        "He will learn how to handle money-how to accumulate it, how to spend it wisely. The individual will work for MATERIAL SATISFACTION.",
        "This may mean emphasis on money to buy the best in houses, cars, furnishings, trips. (Perhaps, if he can reach the highest level of this lesson, he will see that material freedom can mean relying very little on money or material matters. Few ever gain this insight.)",
        "The individual will be very conscious of status in relation to material things and will work to satisfy his need for status to prove his superiority. He may appear single-minded, rigid or stubborn to others.",
        "Striving for power and high material goals may make him aware of the limitations of his ability or the restrictions of his circumstances."
      ]
    },
    9: {
      title: "Selflessness, Humanitarianism",
      type: "Odd",
      basics: [
        "There's a time to learn the satisfaction of giving to his fellow man. This is a difficult lesson. The satisfaction comes from the giving. There is little reward-the love and friendship are sometimes returned, the obligation often not repaid.",
        "The person must place all others before himself, must give for the sheer pleasure of giving, because he has learned the ultimate satisfaction of SELFLESSNESS and HUMANITARIANISM.",
        "The individual gives (1) by helping others or (2) by giving of himself in some form of creative expression."
      ]
    },
    11: {
      title: "Illumination",
      type: "Master",
      basics: [
        "The master numbers exist on a higher spiritual plane than the single digits. The first master number, the 11, must work to develop intuition, to tune into psychic forces not available to those with lower numbers.",
        "He must stand ready to be a channel with a message from above. In his life, he must inspire by his own example, living in the way revealed to him, spreading his ILLUMINATION for others to absorb and benefit. This number is as difficult as it is rewarding.",
        "Often, particularly at an early age, the individual is aware of his special powers, yet unable to synthesize them for his own use or for the good of his fellow man. He is often a relatively impractical idealist, far more a dreamer than a doer.",
        "There is an undercurrent of nervous tension always present from the high power sources to which the individual is attuned. He has to learn to live with his special powers, to set himself aside from the world of material accumulation in order to better understand the powerful forces which can reveal a higher guidance."
      ]
    },
    22: {
      title: "Master Builder",
      type: "Master",
      basics: [
        "The second master number, the 22, is potentially capable of combining the idealism of the first master number, the 11, with the ability to put these ideals into a concrete form.",
        "Enormous power is available to him to produce on a significant scale, for the benefit of humanity. When this potential can be realized, the individual becomes a MASTER BUILDER, capable of feats well beyond all others.",
        "Few with this number can marshal their forces to reach anywhere near the ultimate potential. The individual is aware of the forces within him, aware also of the nervous tension that accompanies these forces.",
        "He spends his time grappling with powers that are difficult to comprehend and use. Often, he is seen by his fellow men as a person with enormous potential who has not, for some unexplained reason, been able to fully use his capabilities. The highest potential is also the most difficult to reach."
      ]
    }
  };

  if (!numberData[number]) {
    return <p>Select a number to view its basic information.</p>;
  }

  const data = numberData[number];
  // Add visualizations
const energyWheel = <NumberEnergyWheel number={number} />;
const balanceMeter = <PositiveNegativeBalance number={number} />;

  return (
    <div className="bg-white/30 backdrop-blur-md rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-bold text-indigo-900">{number}: {data.title}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${data.type === "Odd" ? "bg-blue-100 text-blue-800" : data.type === "Even" ? "bg-green-100 text-green-800" : "bg-purple-100 text-purple-800"}`}>
          {data.type} Number
        </span>
      </div>
      
      <div className="mt-4">
        <h4 className="font-bold mb-2 text-lg text-indigo-700">Basic Concept</h4>
        <div className="space-y-3">
          {data.basics.map((paragraph, index) => (
            <p key={index} className="text-gray-700">{paragraph}</p>
          ))}
        </div>
      </div>
      
      <div className="mt-6 p-3 bg-indigo-50/50 rounded-md">
        <p className="text-sm text-gray-600">
          {data.type === "Odd" ? 
            "Odd numbers are concerned with the individual alone, related to relatively abstract concepts, and involved with more idealistic endeavors." : 
            data.type === "Even" ? 
            "Even numbers are concerned with the relation of the individual to the group, related to relatively practical concepts, and involved with more mundane endeavors." :
            "Master numbers exist on a higher spiritual plane than single digits, representing elevated potentials and challenges."
          }
        </p>
      </div>
      {energyWheel}
{balanceMeter}
    </div>
  );
};

// Life Path Chart Component (CHART 2)
const LifePathChart = ({ number }) => {
  const lifePathData = {
    1: {
      title: "Individuation, Independence, Attainment",
      centralFocus: "The subject must learn the benefits of independence—a two-part learning process. First, the individual must learn to stand on his own two feet, learn not to lean on or depend on others. After the subject is indeed free of dependence, he can proceed to be a leader or creator. Once others sense the individual's independent capabilities, once he can accept and use his talents, there are likely to be substantial meaningful opportunities. Attainment of significant ends—material or otherwise—can follow.",
      characteristics: [
        "Much inner strength.",
        "Leadership capability.",
        "Executive and administrative capability—always obvious although sometimes latent in application.",
        "Potential for accomplishment and financial reward—again obvious, although sometimes latent in application.",
        "Strong personal needs and desires. Feels it necessary to follow own convictions. Often surprised at others' resistance or the consequences of following own convictions.",
        "Self-centered. This may be extremely obvious, or may be hidden by a social veneer. The 1 will be very aware of the self-centeredness even if it's not outwardly apparent.",
        "The material needs may be large or small—but the 1 will spend the time necessary to satisfy these needs."
      ],
      negativeExpression: "A 1 still struggling with dependence may appear to be available at everyone's beck and call, with few needs of his own. No matter how giving the 1 appears, underneath the giving there will be much dissatisfaction with the dependent side. Often, though, the dissatisfaction may be well hidden.\n\nSome 1's confuse independence and self-centeredness. They may be concerned with their own needs to the virtual exclusion of all else. This type of 1 may very well not know what is meant by self-centeredness or may even justify his self-centered position with a rational argument. In giving a reading to a 1 on whom there is no information, it is probably useful to clarify the difference between self-centeredness and independence.\n\nSome 1's, lacking a sense of balance, may be so dominating and egotistical as to be their own worst enemies. Sometimes they burst with overconfidence, making them impatient with others' advice, unable to listen and benefit from others' opinions.",
      commentary: "Some 1's spend most of their lives shaking off their dependent side. If this happens, they have little time left to reap the reward of being independent. 1's, particularly in the first stages of their life, often find themselves in situations where it is easy to be dependent and difficult to be independent. It is up to each 1 to struggle through to the second part of the lesson, where attainment can be achieved.\n\nAn aware 1 operating positively within the basic channel can be growing and experiencing much satisfaction throughout the life. There is much potential for accomplishment, achievement, creativity, and the potential is possible to reach (as compared, for instance, to the difficult-to-attain potential of the 11 or 22). The growing 1 can have a continuing feeling of satisfaction in his progress—and praise from others for his achievements. Often, he can receive good financial compensation, can satisfy his material needs, can reach a satisfying position of status."
    },
    2: {
      title: "Relation, Cooperation",
      centralFocus: "The subject must learn the satisfaction of contributing his capability as an organizer and facilitator in group situations. Here, although his contribution is seen, it will rarely receive full acknowledgement. He must learn that his use of quiet persuasion can accomplish as much as another's use of force. He must accept that his good ideas will often be better spread by others with more dynamism—that he can be the power behind the throne. If the subject can be comfortable with others getting credit for his ideas—that's part of the lesson, too.\n\nThe individual should develop his sensitivity and his skill at working with others to a high level. The world will be a better place because of his presence. He can glow quietly with the inner satisfaction of a job well done.",
      characteristics: [
        "Sensitive to feelings of others.",
        "Cooperative. Capable of working patiently and carefully, doing much detail work if necessary. Rarely dominates a situation.",
        "Shows a great deal of consideration for others.",
        "A good friend. Expresses and receives friendship and love.",
        "Little concern with material needs or status. Usually can deny himself if others can thereby benefit."
      ],
      negativeExpression: "A 2 sometimes refuses to accept the role he is asked to play. He feels it's better to be an acknowledged leader than part of a group. His leading may be adequate, but is rarely dynamic. Sometimes, in a lead role, he will add confusion rather than harmony to a situation. He'll never understand why it happens that way, either. He's likely to blame others rather than himself.\n\nSometimes the 2, because of too much sensitivity, becomes shy and uncertain and contributes little as a group participant. He may protect his delicate ego by appearing apathetic or indifferent.",
      commentary: "The key to growth and development for a 2 involves the control and balance of his sensitivity. He must find the path where he is not so sensitive that his feelings are constantly being hurt. His sensitivity to others must be so finely attuned that he can be a friend, lover or diplomat in the highest sense of these concepts.\n\nIt is too easy for the 2, trying his wings, to retreat with pain from situations where others are insensitive to him. He must learn how to deal with others' insensitivities without being overwhelmed.\n\nA 2 operating in the right channel experiences a great deal of pleasure in life. He is the recipient of much love and affection from others."
    },
    3: {
      title: "Expression, Joy of Living",
      centralFocus: "The subject must learn the joy of expressing himself. If he can be open, warm and full of delight, he is likely to be admired by others and desired as a pleasant companion. An easy lesson? In many ways the easiest and most delightful lesson: the experience of pure joy and the expression of that joy for others to share. It is the beginning of an appreciation of the beauty that can be in the world.\n\nThe individual should become aware of his special talents. He probably has a good imagination and artistic abilities to be developed. He can excel in creative work—painting, sculpting, music, perhaps. Most likely his creativity will be seen where verbal ability is important—in writing, acting or similar endeavors. He can express the beauty he experiences in his artistic work. His capability at creative self-expression is the highest level of attainment in this lesson.",
      characteristics: [
        "Warm and friendly.",
        "Very social. A welcome addition to any social situation. Knows how to make others' feel at home.",
        "Good conversationalist. A delight to listen to, and the ability to listen to others, too.",
        "Talent with words—speaking, writing, singing or acting as possible vocations or avocations.",
        "Creative imagination, often latent. The 3 recognizes the possibilities but may not be moved to develop the creativity."
      ],
      negativeExpression: "A 3 may be so delighted with the joy of living that his life becomes frivolous and superficial. He may scatter his abilities and express little sense of purpose.\n\nWhen, on the other hand, he has difficulty developing his given capabilities, he may retreat into himself. He may feel uncomfortable in social situations, may prefer to hide his feelings rather than express them. He may appear moody or taciturn. If he is hurt by others, he may be critical or demeaning.",
      commentary: "When a 3 is operating within the basic path, his approach to life is likely to be exceedingly positive, his disposition sunny. He seems to deal with problems with more ease than others. The 3's open disposition accepts the existence of problems, yet deals with them without being dragged to the depths of despair. Even while working through difficulties, the 3 will usually express warmth and friendliness. When he expresses his problems openly, he can often deal with them seriously but without rancor.\n\nThe 3 may mature later than others. His frivolity or moodiness may be difficult to shake. The frivolous 3 is often a delight, but is seen as a dilettante and treated as such. The moody 3 appears as an enigma because the cause of the moodiness is often not clear. The 3 is on a special lighter track, quite different from the other numbers. He may be able to get little help from others in learning to express his positive potential."
    },
    4: {
      title: "Limitation, Order, Service",
      centralFocus: "The subject must learn the advantage of order and system in accomplishing his work. He must also learn the rewards of service. He'll probably be involved in practical, down-to-earth work. Having determined where his duty lies, he must proceed with the hard work at hand, patiently and dependably. The subject must learn to live with the law of limitation. He will be aware of limitations in his life—limitations of the environment, of his own physical body, of his individual viewpoint. Often, the subject may feel that circumstances limit him more than they limit others. He must learn how to live not in spite of the limitations, but in harmony with the limitations. He must learn to accept the restrictions rather than struggle with them. His life can then develop on a deep and beautiful path.",
      characteristics: [
        "Practical.",
        "Capable of systematizing and managing. Can produce order where little existed.",
        "Willingness to work long and hard. Much patience with detail. Very conscientious. Often seems to do better with difficult problems than with simpler work. Often seems to make the work harder by his peculiar approach but, nevertheless, is capable of completing the work.",
        "Serious approach. Honest and sincere. Responsible.",
        "Strong likes and dislikes. Strong expression of what is right and wrong.",
        "Fixity of approach. This can range from the positive expression of great courage to the negative expression of extreme stubbornness. Others see the 4 as somewhat rigid, but the 4 can rarely see that quality in himself."
      ],
      negativeExpression: "The negative 4 can be overwhelmed by his feeling of limitation. He will feel tied down and frustrated. Often the limitations stem from his own stubborn, obstinate manner and his rigid approach, but he will be hard-pressed to see that he is causing his own problems. Sometimes, his concentration on details to the exclusion of the bigger picture limits his potential. His frustration sometimes expresses in bossiness and dominance.\n\nOccasionally, the 4 will express his dissatisfaction with his Life Path by going in the opposite direction. He will be disorganized and irresponsible, with little sense of time and virtually no accountability to others. The chaos he creates around him will further upset him, but he will not be able to see himself as the cause.",
      commentary: "This is a difficult lesson for many people. Few individuals want to learn to live with limitations. The usual reaction is to fight the restrictions rather than to accept them. All 4's feel the sense of limitation. Only when they recognize the positive values inherent in limitation will their lives become growing and vital. The acceptance of limitation is the beginning of overcoming limitation as a negative part of the life. Limitation is also often in the eye of the beholder. What feels limiting to a 4 may not look limiting to an outside observer."
    },
    5: {
      title: "Constructive Freedom",
      centralFocus: "The subject must learn the exhilaration of the constructive use of freedom. Life is full of exciting opportunities for this individual—there can be much variety, change, unusual happenings, unusual people, unforeseen adventure. The 5 will find that he's capable at almost any task, that he's talented in a number of directions. The world is his oyster—there are exciting things to do at every turn—and that, undoubtedly, is the difficulty. He must learn how to pick and choose; how to seek experiences which will be of benefit: how to discard those activities that aren't working: how to profit from every experience. He must learn not to waste his time or scatter his forces, not to get lost in solely physical delights—food, sex, drink, drugs. It can be sheer delight to be a rolling stone, but the frustration of moving from place to place, from person to person, from opportunity to opportunity may eventually overwhelm the delight."
    },
    6: {
      title: "Balance, Responsibility, Love",
      type: "Even",
      basics: [
        "A person must learn to give the beauty of love and harmony, sympathy and understanding, protection and BALANCE.",
        "Along with the balancing, the lesson of RESPONSIBILITY can be a meaningful one. The individual may find himself responsible for more than what rightly seems his share.",
        "Others will recognize his strength, and he may be expected to help them if they are in need and cannot help themselves.",
        "He will probably be the one who holds the family together, who harmonizes and adjusts difficult situations. He may choose to limit himself to his family, his friends, possibly the close community.",
        "The friendship and LOVE the individual expresses to others will come back to him from those he helps. He can bask in the glory of a job well done and the quiet reward of friendship and love returned.",
        "The individual's capability at harmony and balance may also be expressed creatively-there is the possibility of artistic achievement."
      ]
    },
    7: {
      title: "Analysis, Understanding",
      type: "Odd",
      basics: [
        "There's a time for introspection, a time to subject all an individual knows to mental ANALYSIS, so that eventually a person possesses much of knowledge and UNDERSTANDING.",
        "Spiritual awareness is employed and emphasis on material matters avoided. Desire for material accumulation will probably lead the individual off the track, for this is a time for study and meditation, a time to know oneself-in the deepest way.",
        "There will be much time spent alone-the person must learn to be alone and not feel isolated. Often, the individual will appear different to others. His way of thinking or doing may be very much his own and may seem inexplicable to his fellow man.",
        "He must accept that he is on a different wavelength and find satisfaction in that. In a world where materialism rates so highly, the road for the counselor, the professor, the pure researcher may be a difficult one."
      ]
    },
    8: {
      title: "Material Satisfaction",
      type: "Even",
      basics: [
        "The individual must learn to deal with the material things of life, the practical matters. He will find himself at home in the business world-with much capability as an efficient administrator or executive.",
        "He will learn how to handle money-how to accumulate it, how to spend it wisely. The individual will work for MATERIAL SATISFACTION.",
        "This may mean emphasis on money to buy the best in houses, cars, furnishings, trips. (Perhaps, if he can reach the highest level of this lesson, he will see that material freedom can mean relying very little on money or material matters. Few ever gain this insight.)",
        "The individual will be very conscious of status in relation to material things and will work to satisfy his need for status to prove his superiority. He may appear single-minded, rigid or stubborn to others.",
        "Striving for power and high material goals may make him aware of the limitations of his ability or the restrictions of his circumstances."
      ]
    },
    9: {
      title: "Selflessness, Humanitarianism",
      type: "Odd",
      basics: [
        "There's a time to learn the satisfaction of giving to his fellow man. This is a difficult lesson. The satisfaction comes from the giving. There is little reward-the love and friendship are sometimes returned, the obligation often not repaid.",
        "The person must place all others before himself, must give for the sheer pleasure of giving, because he has learned the ultimate satisfaction of SELFLESSNESS and HUMANITARIANISM.",
        "The individual gives (1) by helping others or (2) by giving of himself in some form of creative expression."
      ]
    },
    11: {
      title: "Illumination",
      type: "Master",
      basics: [
        "The master numbers exist on a higher spiritual plane than the single digits. The first master number, the 11, must work to develop intuition, to tune into psychic forces not available to those with lower numbers.",
        "He must stand ready to be a channel with a message from above. In his life, he must inspire by his own example, living in the way revealed to him, spreading his ILLUMINATION for others to absorb and benefit. This number is as difficult as it is rewarding.",
        "Often, particularly at an early age, the individual is aware of his special powers, yet unable to synthesize them for his own use or for the good of his fellow man. He is often a relatively impractical idealist, far more a dreamer than a doer.",
        "There is an undercurrent of nervous tension always present from the high power sources to which the individual is attuned. He has to learn to live with his special powers, to set himself aside from the world of material accumulation in order to better understand the powerful forces which can reveal a higher guidance."
      ]
    },
    22: {
      title: "Master Builder",
      type: "Master",
      basics: [
        "The second master number, the 22, is potentially capable of combining the idealism of the first master number, the 11, with the ability to put these ideals into a concrete form.",
        "Enormous power is available to him to produce on a significant scale, for the benefit of humanity. When this potential can be realized, the individual becomes a MASTER BUILDER, capable of feats well beyond all others.",
        "Few with this number can marshal their forces to reach anywhere near the ultimate potential. The individual is aware of the forces within him, aware also of the nervous tension that accompanies these forces.",
        "He spends his time grappling with powers that are difficult to comprehend and use. Often, he is seen by his fellow men as a person with enormous potential who has not, for some unexplained reason, been able to fully use his capabilities. The highest potential is also the most difficult to reach."
      ]
    }
  };
  if (!lifePathData[number]) {
    return <p>Select a number to view its Life Path information.</p>;
  }

  const data = lifePathData[number];
  // Add visualization
const journeyVisual = <LifePathJourney number={number} />;

  return (
    <div className="bg-white/30 backdrop-blur-md rounded-lg p-6 shadow-lg">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-indigo-900">{number}: {data.title}</h3>
      </div>
      
      {data.centralFocus && (
        <div className="mt-4">
          <h4 className="font-bold mb-2 text-lg text-indigo-700">Central Focus</h4>
          <p className="text-gray-700 whitespace-pre-line">{data.centralFocus}</p>
        </div>
      )}
      
      {data.characteristics && (
        <div className="mt-6">
          <h4 className="font-bold mb-2 text-lg text-indigo-700">Characteristics</h4>
          <ul className="list-disc pl-5 space-y-1.5">
            {data.characteristics.map((characteristic, index) => (
              <li key={index} className="text-gray-700">{characteristic}</li>
            ))}
          </ul>
        </div>
      )}
      
      {data.negativeExpression && (
        <div className="mt-6">
          <h4 className="font-bold mb-2 text-lg text-indigo-700">Negative Expression</h4>
          <p className="text-gray-700 whitespace-pre-line">{data.negativeExpression}</p>
        </div>
      )}
      
      {data.commentary && (
        <div className="mt-6">
          <h4 className="font-bold mb-2 text-lg text-indigo-700">Commentary</h4>
          <p className="text-gray-700 whitespace-pre-line">{data.commentary}</p>
        </div>
      )}
      
      {data.basics && (
        <div className="mt-6">
          <h4 className="font-bold mb-2 text-lg text-indigo-700">Basic Concept</h4>
          <div className="space-y-3">
            {data.basics.map((paragraph, index) => (
              <p key={index} className="text-gray-700">{paragraph}</p>
            ))}
          </div>
        </div>
      )}
      
      {data.type && (
        <div className="mt-6 p-3 bg-indigo-50/50 rounded-md">
          <p className="text-sm text-gray-600">
            {data.type === "Odd" ? 
              "Odd numbers are concerned with the individual alone, related to relatively abstract concepts, and involved with more idealistic endeavors." : 
              data.type === "Even" ? 
              "Even numbers are concerned with the relation of the individual to the group, related to relatively practical concepts, and involved with more mundane endeavors." :
              "Master numbers exist on a higher spiritual plane than single digits, representing elevated potentials and challenges."
            }
          </p>
        </div>
      )}
      {journeyVisual}
    </div>
  )};

// Expression Chart Component (CHART 3)
const ExpressionChart = ({ number }) => {
  const expressionData = {
    1: {
      title: "Individuation, Independence, Attainment",
      abilities: [
        "Executive and administrative capabilities. Fine leader or promoter.",
        "Original and creative approach. (The creativity is not necessarily related to artistic endeavors; often, it's related to business matters.) Others will usually be needed to follow through and take care of the details after the direction has been initiated.",
        "Good mind and the ability to use it for advancement.",
        "Potential for achievement and financial reward. Can establish and/or run own business or have significant position in another's business."
      ],
      positiveAttitudes: [
        "Prefers to proceed on own course. Usually prefers little input from others.",
        "Ambitious, determined.",
        "Positive, progressive.",
        "Self-confident.",
        "Self-reliant.",
        "Much will power, courage of the convictions."
      ],
      negativeAttitudes: [
        "Egotistical.",
        "Stubborn.",
        "Dominant, bossy.",
        "Too aggressive.",
        "Selfish, self-centered.",
        "Lazy, dependent."
      ]
    },
    2: {
      title: "Relation, Cooperation",
      abilities: [
        "Works well with others. Probably prefers partnerships to individual enterprises. (May have to learn that others may get credit for some of his ideas or accomplishments.)",
        "Sensitive to others' feelings. Diplomatic in handling complicated situations.",
        "Skillful at organizing and handling groups.",
        "Good facilitator. Contributes to group situations by use of persuasion rather than force.",
        "Capable of handling details well.",
        "Psychic abilities (often latent)."
      ],
      positiveAttitudes: [
        "Considerate, courteous.",
        "Cooperative.",
        "Adaptable.",
        "Modest. Can work comfortably without necessarily receiving full acknowledgement for contributions.",
        "Tactful, diplomatic. Innate desire for harmony.",
        "Friendly."
      ],
      negativeAttitudes: [
        "Over-sensitive. Too delicate ego is easily hurt.",
        "Shy, uncertain.",
        "Timid, fearful.",
        "Apathetic, indifferent.",
        "Lost in detail or careless with details."
      ]
    },
    3: {
      title: "Expression, Joy of Living",
      abilities: [
        "Talent with words—writing, speaking, singing, acting, teaching are possible vocations or avocations.",
        "Can sell or entertain—knows how to present material with imagination.",
        "Artistic talents (often latent).",
        "Creative imagination (often latent)."
      ],
      positiveAttitudes: [
        "Expresses joy of living with optimism and enthusiasm.",
        "Friendly, affectionate, loving.",
        "Gracious, charming.",
        "Very social, good conversationalist.",
        "Cheerful, happy, merry.",
        "Loves a good time.",
        "Capable of providing inspiration for others."
      ],
      negativeAttitudes: [
        "Dilettante, scatters forces.",
        "Too easy going.",
        "Trivial, superficial.",
        "Critical, moody, too sensitive.",
        "Gossipy."
      ]
    },
    4: {
      title: "Limitation, Order, Service",
      abilities: [
        "Good organizer, manager. Can establish order and routine or maintain existing order or routine.",
        "Practical, down-to-earth approach.",
        "Strong capability to bring plans to a practical form.",
        "Can work long and hard. Conscientious and dependable.",
        "Patient with details, insists on accuracy.",
        "Works well in material mediums: as builder, engineer, craftsman, etc.",
        "Capable of writing or teaching, often on technical matters."
      ],
      positiveAttitudes: [
        "Responsible. Fulfills obligations.",
        "Proceeds with job at hand despite seeming limitations or restrictions.",
        "Systematic, orderly.",
        "Serious, sincere.",
        "Honest, faithful.",
        "Helpful.",
        "Patient, persevering, determined."
      ],
      negativeAttitudes: [
        "Frustrated by feelings of limitation or restriction—often of own making or existing only in the imagination.",
        "Rigid, stubborn, dogmatic, fixed approach.",
        "Strong likes and dislikes.",
        "Bossy, dominant.",
        "Excessively disciplinarian.",
        "May concentrate on details to the exclusion of the larger picture."
      ]
    },
    5: {
      title: "Constructive Freedom",
      abilities: [
        "Talented and versatile. Capable of doing almost anything attempted, often extremely well.",
        "Good at presenting ideas. Understands how to approach others to get what is wanted.",
        "Good at selling. Innate ability to determine best way to succeed at particular sales situation.",
        "Enjoys and is successful working with people.",
        "Entertaining and amusing.",
        "Clever, analytical ability, often a quick thinker."
      ],
      positiveAttitudes: [
        "Enthusiastic.",
        "Adaptable.",
        "Progressive.",
        "Loves change, likes to travel, see unusual places and people, investigate unusual ideas.",
        "Delightful companion."
      ],
      negativeAttitudes: [
        "Restless and impatient, may not stay with any project too long. Sometimes erratic.",
        "Scatters self and energy.",
        "Chafes at routine tasks or situations. Has difficulty with anything standard or rigid, such as regular office hours.",
        "Reacts strongly if he feels freedom of speech or action is being impaired.",
        "Often difficult to profit readily from experience.",
        "Often difficult to discard easily.",
        "May overindulge in eating, sensuality, drinking, drugs.",
        "Sometimes misses big picture because of excitement generated by new interest."
      ]
    },
    6: {
      title: "Balance, Responsibility, Love",
      abilities: [
        "Responsible.",
        "Helpful and conscientious. Capable of rectifying and balancing inharmonious situations.",
        "Gives help and comfort to those in need.",
        "Works well where care of old, young or sick is involved.",
        "Shows concern for betterment of community.",
        "Creative and artistic talents."
      ],
      positiveAttitudes: [
        "Loving, friendly, appreciative of others.",
        "Sympathetic, kind.",
        "Generous, understanding.",
        "Often involved in domestic activities, usually good spouse and parent.",
        "Usually is open and honest with others."
      ],
      negativeAttitudes: [
        "Too exacting of self. Occasionally will sacrifice self (or family) for the welfare of others.",
        "Occasionally has difficulty distinguishing helping from interfering.",
        "May express worry and anxiety.",
        "May have difficulty expressing own individuality because of involvement with responsibilities. May, unknowingly, become a drudge."
      ]
    },
    7: {
      title: "Analysis, Understanding",
      abilities: [
        "Good mind, good intuition.",
        "Capable of analyzing, judging, discriminating.",
        "Searches for wisdom or hidden truths. Often becomes authority on subjects that interest him—technical, scientific, religious or occult.",
        "Potential to be educator, philosopher, researcher.",
        "Spiritual awareness (often latent). May be involved in psychic explorations.",
        "Operates on 'different' wavelength which may give unique approaches and solutions to problems. (It also may make it difficult for others to know the person well.)"
      ],
      positiveAttitudes: [
        "Perfectionist. When carried to extremes, as it may well be, this tendency may interfere with work at hand.",
        "Very logical, rational approach. Approach shows little emotion. Too much emotion, if noted in other numbers, may cause difficulties.",
        "Willing to work to understand deep, difficult subjects, to search for hidden fundamentals.",
        "Potential to be peaceful and poised. Usually achieved only at maturity."
      ],
      negativeAttitudes: [
        "Little trust in others.",
        "Not very adaptable.",
        "Usually introspective, tends to be self-centered.",
        "Critical, unsympathetic, intolerant.",
        "Usually prefers to work alone. Must learn to be by himself and not feel isolated—may rebel at the idea of learning this.",
        "Difficulty with emotions—usually shows little of own emotions and may have difficulty understanding others' emotions."
      ]
    },
    8: {
      title: "Material Satisfaction",
      abilities: [
        "Organizational, managerial and administrative capabilities.",
        "Potential for achievement and financial reward. Can establish and/or run own business or have significant position in another's business.",
        "Efficient.",
        "Good judgment with money. Understands how to accumulate, handle and spend money.",
        "Good judgment of character.",
        "Uses a realistic, practical approach.",
        "Capable of handling large projects or interests. This capability may be latent or may be in the background because of characteristics of other numbers."
      ],
      positiveAttitudes: [
        "Ambitious, usually in healthy way (unless overdone). Goal-oriented.",
        "Energetic.",
        "Self-confident.",
        "Dependable.",
        "Seeks material comfort. If overdone, this becomes a negative trait."
      ],
      negativeAttitudes: [
        "Rigid, stubborn.",
        "Overambitious, impatient with progress.",
        "Very exacting, both of self and others. Often intolerant.",
        "May strain after money, status or power to own detriment. May misuse power. May strain for material freedom so that even accomplishment of the freedom does not bring pleasure.",
        "Materialistic, to exclusion of other values."
      ]
    },
    9: {
      title: "Selflessness, Humanitarianism",
      abilities: [
        "Humanistic interest and approach.",
        "Philanthropic, likes to help others.",
        "Sensitive to others' needs, much feeling and compassion.",
        "Works well with people.",
        "Potential for inspiring others—may be teacher, religious leader, counselor.",
        "Creative ability, imagination and artistic talent of the highest order (often latent)."
      ],
      positiveAttitudes: [
        "Much human understanding.",
        "Gives a lot to others, extreme of selflessness occasionally achieved.",
        "Personal ambition is usually in positive perspective.",
        "Interest in others—sympathetic, tolerant, broad-minded, compassionate, generous.",
        "Idealistic, disappointed at lack of perfection in the world.",
        "Romantic. Gives much friendship, affection, love. Can sometimes (in its highest expression) be content with minimal return.",
        "Aware of own feelings as well as others."
      ],
      negativeAttitudes: [
        "Selfish, self-centered.",
        "Unaware of real feelings.",
        "Insensitive to others' needs and feelings.",
        "Wants much friendship, affection, love. Sometimes has difficult (often aloof) attitude which makes it difficult for others to respond.",
        "Lack of involvement."
      ]
    },
    11: {
      title: "Illumination",
      abilities: [
        "Inspirational, often inspires by his own example. Others usually can see his inner strength and awareness. Would be good spiritual adviser, philosopher, teacher, welfare worker.",
        "Very aware and sensitive with good intuition. Tie to spiritual world gives added depth to point of view.",
        "Often operating on psychic levels—may do well in psychic, mystic or occult studies.",
        "Good mind and analytical ability.",
        "Very capable at whatever work is chosen, but often has difficulty focusing ability to achieve ends.",
        "Usually works better outside the business world. If in the business world, his approach is often unusual."
      ],
      positiveAttitudes: [
        "Idealistic approach. Often disappointed by own and others' imperfections. (Expresses ideals, even though they may prove impractical.)",
        "Deeply concerned with art, music, beauty."
      ],
      negativeAttitudes: [
        "Nervous tension almost always present.",
        "Often more dreamer than doer. Sometimes quite aimless.",
        "Too sensitive.",
        "Temperamental, temper.",
        "Impractical, sometimes has difficulty separating fantasy from reality.",
        "May impose ideas or standards on others in unfeeling way.",
        "Self-centered, inconsiderate.",
        "Wants to spread his illumination to others irrespective of others' desire or need."
      ]
    },
    22: {
      title: "Master Builder",
      abilities: [
        "Extremely capable at whatever work is chosen.",
        "Capable of handling large scale undertakings. May accomplish significant undertakings in the material world.",
        "Capable of leading in new directions.",
        "Unorthodox approach to problems.",
        "Much unusual perception and awareness."
      ],
      positiveAttitudes: [
        "Practical approach tempered by awareness of non-material forces.",
        "Idealistic.",
        "Inner strength visible to all. If developed, will attract others with charisma.",
        "May work for the good of all."
      ],
      negativeAttitudes: [
        "Nervous tension brought on by high level awareness.",
        "May accentuate unorthodoxy to the point of eccentricity.",
        "Selfish and dominating. Uses power for own good rather than universal benefit.",
        "Inability to harness power may cause feelings of inferiority."
      ]
    }
  };

  if (!expressionData[number]) {
    return <p>Select a number to view its Expression information.</p>;
  }

  const data = expressionData[number];
  // Add visualization
const expressionVisual = <ExpressionRadialChart number={number} />;

  return (
    <div className="bg-white/30 backdrop-blur-md rounded-lg p-6 shadow-lg">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-indigo-900">{number}: {data.title}</h3>
      </div>
      
      <div className="mt-4">
        <h4 className="font-bold mb-2 text-lg text-indigo-700">Abilities</h4>
        <ul className="list-disc pl-5 space-y-1.5">
          {data.abilities.map((ability, index) => (
            <li key={index} className="text-gray-700">{ability}</li>
          ))}
        </ul>
      </div>
      
      <div className="mt-6">
        <h4 className="font-bold mb-2 text-lg text-indigo-700">Positive Attitudes</h4>
        <ul className="list-disc pl-5 space-y-1.5">
          {data.positiveAttitudes.map((attitude, index) => (
            <li key={index} className="text-gray-700">{attitude}</li>
          ))}
        </ul>
      </div>
      
      <div className="mt-6">
        <h4 className="font-bold mb-2 text-lg text-indigo-700">Negative Attitudes</h4>
        <ul className="list-disc pl-5 space-y-1.5">
          {data.negativeAttitudes.map((attitude, index) => (
            <li key={index} className="text-gray-700">{attitude}</li>
          ))}
        </ul>
      </div>
      {expressionVisual}
    </div>
  );
};
// Soul Urge Chart Component (CHART 4)
const SoulUrgeChart = ({ number }) => {
    const soulUrgeData = {
      1: {
        title: "Individuation, Independence, Attainment",
        motives: "The subject would like to be as independent as possible, ideally completely free to act on his own. He wants to be the leader or organizer, free to initiate or pioneer in any venture that strikes his fancy. He prefers to take a strong individualistic stand, dominating any situation in which he's involved. He wants to be a success in large, progressive enterprises. He's concerned primarily with the broad strokes, prefers to leave the details to others. He keeps his own counsel, works with a few hand-picked employees.",
        positiveAttitudes: [
          "Ambitious, determined.",
          "Honest, loyal.",
          "Instigates action.",
          "Seeks opportunities to use his abilities."
        ],
        negativeAttitudes: [
          "Egotistical.",
          "Impatient, disapproving.",
          "Dominant, bossy.",
          "Headstrong, impulsive.",
          "Conceited."
        ]
      },
      2: {
        title: "Relation, Cooperation",
        motives: "The subject would like friendship, affection, love, companionship. He usually prefers marriage to being single. He wants to work with others as part of a cooperative team, only rarely wants to lead. He will work hard to achieve a harmonious environment with sensitive, genial people.",
        positiveAttitudes: [
          "Sympathetic, concerned, devoted.",
          "Sensitive, diplomatic, tactful. Emotional.",
          "Quietly persuasive rather than forceful.",
          "Friendly.",
          "Gives love and affection."
        ],
        negativeAttitudes: [
          "Over-sensitive. Too delicate ego is easily hurt. May be timid or fearful.",
          "Not given to disciplining himself or others.",
          "Too easy going—may become a doormat."
        ]
      },
      3: {
        title: "Expression, Joy of Living",
        motives: "The subject would like to express his delight in life, his sense of joie de vivre. He wants to participate in an active social life with many close friends and diverse activities. He would like to express his artistic talents, particularly his talent with words: speaking, writing, acting, singing. He wants his home and work environment to reflect the beauty he enjoys creating.",
        positiveAttitudes: [
          "Friendly, outgoing, social.",
          "Rarely discouraged.",
          "Good mental/emotional balance.",
          "Intuitive. Often inspirational.",
          "Capable of self-expression, either in social situations or in artistic fields."
        ],
        negativeAttitudes: [
          "Tendency to scatter forces.",
          "Too easygoing and optimistic.",
          "Too sensitive when criticized.",
          "Compulsive talker, may be critical."
        ]
      },
      4: {
        title: "Limitation, Order, Service",
        motives: "The subject would like to lead a stable life. He prefers orderliness and a systematic approach in his endeavors. He wants to serve others methodically and diligently. He wants to be involved in solid, conventional, well-regulated activities. He's likely to be disturbed by innovation and erratic or sudden changes.",
        positiveAttitudes: [
          "Good at organizing, systematizing, managing. Good at establishing routine and order. Logical, thorough, exacting with details.",
          "Responsible, reliable.",
          "Honest, sincere, conscientious. Hates pretension.",
          "Practical and analytical.",
          "Self-disciplined, determined, tenacious."
        ],
        negativeAttitudes: [
          "Rigid, stubborn, narrow-minded.",
          "Hides feelings. Often, is not aware of real feelings.",
          "Bossy, dominant.",
          "May neglect large affairs because of blind involvement in details.",
          "Afraid to take chances."
        ]
      },
      5: {
        title: "Constructive Freedom",
        motives: "The subject would like a life of freedom, excitement, unexpected happenings, unusual adventures, travel. He doesn't want to be governed by standard values or traditions. He wants to be the one to set the pace.",
        positiveAttitudes: [
          "Very adaptable and versatile.",
          "Natural resourcefulness, enthusiasm.",
          "Capable of bringing new excitement into his interests.",
          "Progressive approach, strong feelings.",
          "Good mind and imagination."
        ],
        negativeAttitudes: [
          "Restless and impatient. Dislikes routine and detail work.",
          "Jumps from interest to interest, activity to activity.",
          "Discards quickly to go on to the new. Rarely holds to anything.",
          "May have difficulty with responsibility."
        ]
      },
      6: {
        title: "Balance, Responsibility, Love",
        motives: "The subject would like to be appreciated for his ability to handle responsibility. His home and family are likely to be a strong focus in his life, one of the areas where he gives and receives friendship, love, affection. He wants to rectify and balance situations in which he is involved, to help and serve others. The subject prefers to work with others rather than by himself. He is concerned with beauty in his surroundings and often expresses himself in creative or artistic activities.",
        positiveAttitudes: [
          "Responsible.",
          "Openminded, sympathetic, understanding, generous.",
          "Gives much friendship, affection, love. Expresses deep emotional life.",
          "Idealistic.",
          "Natural ability to serve, help and teach—capable of sacrifice if necessary.",
          "Artistic and creative expression."
        ],
        negativeAttitudes: [
          "Too emotional.",
          "Interfering or too protective rather than helpful.",
          "Often represses own needs in order to serve others—may become resentful."
        ]
      },
      7: {
        title: "Analysis, Understanding",
        motives: "The subject would like much time alone, much quiet and retirement from the outer world in order to develop his inner resources. He likes to dream and develop his idealistic understandings, to study and analyze to gain knowledge and wisdom, to learn the deeper truths. He prefers contemplation to activity and adventure. He prefers avoiding the business world.",
        positiveAttitudes: [
          "Good mind. Analytical approach.",
          "Studious, theoretical approach.",
          "Technical, scientific, religious or occult interests.",
          "Reserved.",
          "Seeks perfection."
        ],
        negativeAttitudes: [
          "Timid and withdrawn, innately shy, difficulty with casual conversation.",
          "Lives in dreams and fantasies.",
          "Difficult for others to understand. Others have difficulty showing affection.",
          "Represses most emotions although the emotions are often very strong.",
          "Secretive, selective.",
          "Not too adaptable."
        ]
      },
      8: {
        title: "Material Satisfaction",
        motives: "The subject wants wealth, success, status and power. He wants to excel in the business or political world, to organize, supervise or lead. He probably has substantial material needs to satisfy.",
        positiveAttitudes: [
          "Executive abilities, proceeds in businesslike manner.",
          "Confidence, energy and ambition.",
          "Analytical mind.",
          "Possesses good judgment. Has good sense of material values and is good judge of character.",
          "Capable of the imagination required for commercial success.",
          "Functions well in emergencies. Inspired by crises or large odds.",
          "Self-controlled. Emotions rarely cloud judgments."
        ],
        negativeAttitudes: [
          "Dominating. Too exacting.",
          "Thinking, straining, striving for material values, financial success—sometimes to exclusion of all else.",
          "Tendency to be very self-centered.",
          "Tendency to rigidity, stubbornness.",
          "Represses feelings."
        ]
      },
      9: {
        title: "Selflessness, Humanitarianism",
        motives: "The subject would like to give to others, usually in a humanitarian or philanthropic manner. Sometimes, he wants to give friendship, affection and love; sometimes, he gives of his knowledge and experience. He also would like to share his artistic or creative talents with others. These are often talents of considerable magnitude.",
        positiveAttitudes: [
          "Sympathetic, generous, kind.",
          "Sensitive nature. Expresses love, compassion, tolerance.",
          "Possesses deep, intuitive understanding of life.",
          "Possesses innate wisdom, good intuition, broad point of view.",
          "Often high ideals and an inspirational approach.",
          "Often self-sacrificing.",
          "Gives freely without being concerned about any return or reward."
        ],
        negativeAttitudes: [
          "May be too sensitive; very emotional with emotions being expressed strongly.",
          "Conflict between higher spiritual aims and personal ambitions may cause difficulties.",
          "May resent necessity of giving so much of the time.",
          "May be disappointed in lack of perfection in himself and others.",
          "Moody, critical."
        ]
      },
      11: {
        title: "Illumination",
        motives: "The subject would like to manifest his view on spiritual matters, to share his ideas of idealism, beauty and perfection. He wants to give of himself to humanity. He is often more concerned with the abstraction of giving to the world rather than specifically giving to individuals.",
        positiveAttitudes: [
          "Utopian dreamer.",
          "Idealistic, intuitive and inspirational.",
          "Religious and spiritual, possibly psychic ability.",
          "Much inner strength and devotion to a chosen cause, sticks to his ideals.",
          "Good mind."
        ],
        negativeAttitudes: [
          "Nervous tension brought on by high level awareness.",
          "Too sensitive. May be very emotional or may repress feelings altogether. In either case, the sensitivity is poorly handled.",
          "Strong ideas of right and wrong, often inflexible.",
          "Day dreams and deceives self. Impractical approach. (Often can't see these qualities in himself.)",
          "Often extremely selective in associations. Others may be bothered by his air of exclusivity."
        ]
      },
      22: {
        title: "Master Builder",
        motives: "The subject would like to use his abilities in an important humanitarian undertaking. He wants to express the significant power he feels in a concrete manner, as a builder, engineer, diplomat, etc. In some way, he wants to make a considerable contribution to the world.",
        positiveAttitudes: [
          "Universal outlook with a practical approach.",
          "High intelligence.",
          "Unusual perceptions and awarenesses.",
          "Diplomatic ability.",
          "High ideals.",
          "Strong capability and leadership ability.",
          "Commands respect with his superior vision."
        ],
        negativeAttitudes: [
          "Nervous tension brought on by high level awareness.",
          "Too dominating."
        ]
      }
    };
  
    if (!soulUrgeData[number]) {
      return <p>Select a number to view its Soul Urge information.</p>;
    }
  
    const data = soulUrgeData[number];
    // Add visualization
const soulUrgeVisual = <SoulUrgeVisualization number={number} />;
  
    return (
      <div className="bg-white/30 backdrop-blur-md rounded-lg p-6 shadow-lg">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-indigo-900">{number}: {data.title}</h3>
        </div>
        
        <div className="mt-4">
          <h4 className="font-bold mb-2 text-lg text-indigo-700">Motives</h4>
          <p className="text-gray-700 whitespace-pre-line">{data.motives}</p>
        </div>
        
        <div className="mt-6">
          <h4 className="font-bold mb-2 text-lg text-indigo-700">Positive Attitudes</h4>
          <ul className="list-disc pl-5 space-y-1.5">
            {data.positiveAttitudes.map((attitude, index) => (
              <li key={index} className="text-gray-700">{attitude}</li>
            ))}
          </ul>
        </div>
        
        <div className="mt-6">
          <h4 className="font-bold mb-2 text-lg text-indigo-700">Negative Attitudes</h4>
          <ul className="list-disc pl-5 space-y-1.5">
            {data.negativeAttitudes.map((attitude, index) => (
              <li key={index} className="text-gray-700">{attitude}</li>
            ))}
          </ul>
        </div>
        {soulUrgeVisual}
      </div>
    );
  };
  
  // Birthday Chart Component (CHART 5)
  const BirthdayChart = ({ number }) => {
    const birthdayData = {
      1: {
        title: "Individuation, Independence, Attainment",
        content: [
          {
            birthday: "1",
            traits: [
              "Independent attitude.",
              "Executive ability, good leader.",
              "Ambitious, positive, progressive.",
              "Self-confident.",
              "Much will power.",
              "Potential for achievement and financial reward.",
              "Good mind.",
              "Practical, rational.",
              "Often original approach.",
              "Sensitive, rarely shows feelings.",
              "Better at starting than continuing.",
              "Better at broad strokes than details.",
              "(Emphasis on 1 energy only. No sub-emphasis on other energies.)"
            ]
          },
          {
            birthday: "10",
            traits: [
              "Independent attitude.",
              "Much energy.",
              "Executive ability, excellent leader.",
              "Ambitious, positive, progressive.",
              "Self-confident.",
              "Much will-power.",
              "Strong potential for achievement and financial reward.",
              "Compelling manner, can dominate a situation.",
              "Excellent mind.",
              "Practical, rational.",
              "Creative ideas, strongly marked originality.",
              "Sensitive, feelings usually repressed.",
              "Better at starting than continuing.",
              "Better at broad strokes than details.",
              "(Emphasis on 1 energy only is similar to the 1 Birthday above, but the energy is more strongly expressed here. No sub-emphasis on other energies.)"
            ]
          },
          {
            birthday: "19",
            traits: [
              "Independence strongly desired, usually obstacles to overcome before dependence is overcome.",
              "Executive ability.",
              "Ambitious.",
              "Much will power.",
              "Creative, imaginative.",
              "Tendency to be self-centered, inability to see self in relation to others.",
              "Good mind.",
              "Practical, rational.",
              "Often original or unconventional approach.",
              "Strong sensitivity may involve individual in dramatic situations.",
              "Feelings usually repressed.",
              "Better at starting than continuing.",
              "Better at broad strokes than details.",
              "(Emphasis on 1 and 19/1 energy. Sub-emphasis on 9 energy.)"
            ]
          },
          {
            birthday: "28",
            traits: [
              "Independent attitude, but can work well with others.",
              "Executive ability, good leader.",
              "Organizing, managing, administrative capabilities.",
              "Ambitious.",
              "Diplomatic, uses persuasion rather than force.",
              "Creative, imaginative.",
              "Potential for achievement and financial reward.",
              "Good mind.",
              "Practical, rational.",
              "Often original approach.",
              "Sensitive, represses a good deal of feelings.",
              "Affectionate.",
              "Good at starting, capable of continuing.",
              "Good at broad strokes, capable of taking care of details.",
              "(Emphasis on 1 energy. Sub-emphasis on 2 and 8 energy.)"
            ]
          }
        ]
      },
      2: {
        title: "Relation, Cooperation",
        content: [
          {
            birthday: "2",
            traits: [
              "Works well with others.",
              "Prefers partnerships to individual enterprises.",
              "Affectionate.",
              "Sociable, friendly.",
              "Diplomatic, uses persuasion rather than force.",
              "Considerate, courteous, modest.",
              "Cooperative, adaptable.",
              "Much sensitivity to others' feelings, much feeling expressed.",
              "Occasional moods of depression.",
              "Better at continuing than starting.",
              "Good with details.",
              "(Emphasis on 2 energy only. No sub-emphasis on other energies.)"
            ]
          },
          {
            birthday: "11",
            traits: [
              "11 is a master number. For this Birthday, see the description on the 11 page of this chart."
            ]
          },
          {
            birthday: "20",
            traits: [
              "Works very well with others.",
              "Prefers partnerships to individual enterprises.",
              "Very affectionate.",
              "Very sociable, friendly.",
              "Much attention to family, close friends.",
              "Diplomatic, uses persuasion rather than force.",
              "Considerate, courteous, modest.",
              "Cooperative, adaptable.",
              "Extreme sensitivity to others' feelings, much feeling expressed.",
              "Some moods of depression.",
              "Better at continuing than starting.",
              "Good with details.",
              "(Emphasis on 2 energy only is similar to the 2 Birthday above, but energy is more strongly expressed here. No sub-emphasis on other energies.)"
            ]
          },
          {
            birthday: "29",
            traits: [
              "29 reduces to the master number 11. For this Birthday, see the description on the 11 page of this chart."
            ]
          }
        ]
      },
      3: {
        title: "Expression, Joy of Living",
        content: [
          {
            birthday: "3",
            traits: [
              "Good with words—writing, speaking, singing.",
              "Can sell or entertain.",
              "Artistic, creative, good imagination.",
              "Expresses joy of living.",
              "Enthusiastic, optimistic, cheerful.",
              "Friendly, sociable.",
              "Good conversationalist.",
              "Energetic.",
              "Affectionate, loving.",
              "Much feeling may cause occasional rapid ups and downs.",
              "Scatters energy.",
              "Involved with trivial or superficial matters.",
              "Many interests, but may be bored easily.",
              "(Emphasis on 3 energy only. No sub-emphasis on other energies.)"
            ]
          },
          {
            birthday: "12",
            traits: [
              "Good with words—writing, speaking, singing.",
              "Works well alone or with others.",
              "Original approach.",
              "Artistic, creative, good imagination.",
              "Expresses joy of living.",
              "Enthusiastic, optimistic, cheerful.",
              "Friendly, sociable.",
              "Good conversationalist.",
              "Energetic.",
              "Good mind.",
              "Practical, rational.",
              "Very affectionate and loving. Very sensitive.",
              "Much feeling may cause occasional rapid ups and downs.",
              "May repress feelings in business.",
              "Sometimes scatters energy.",
              "Sometimes involved with trivial or superficial matters.",
              "Many interests.",
              "Good at broad strokes or with details.",
              "(Emphasis on 3 energy. Sub-emphasis on 1 and 2 energy.)"
            ]
          },
          {
            birthday: "21",
            traits: [
              "Good with words—writing, speaking, singing.",
              "Works well alone or with others.",
              "Often uses original approach.",
              "Artistic, creative, good imagination.",
              "Expresses joy of living.",
              "Enthusiastic, optimistic, cheerful.",
              "Friendly, sociable.",
              "Good conversationalist.",
              "Energetic.",
              "Good mind.",
              "Practical, rational.",
              "Very affectionate and loving. Very sensitive.",
              "Much feeling may cause occasional rapid ups and downs.",
              "May repress feelings in business.",
              "Sometimes scatters energy.",
              "Sometimes involved with trivial or superficial matters.",
              "Many interests.",
              "Good at broad strokes or with details.",
              "(Emphasis on 3 energy. Sub-emphasis on 2 and 1 energy.)"
            ]
          },
          {
            birthday: "30",
            traits: [
              "Talent with words—writing, speaking, singing.",
              "Can sell or entertain.",
              "Very artistic, very creative, fine imagination.",
              "Expresses joy of living.",
              "Enthusiastic, optimistic, cheerful.",
              "Very friendly and sociable.",
              "Excellent conversationalist.",
              "Very energetic.",
              "Very affectionate and loving.",
              "Strong feeling may cause upsets.",
              "Scatters energy.",
              "Involved with trivial or superficial matters.",
              "Many interests, but may be bored easily.",
              "May not take care of work or responsibility.",
              "(Emphasis on 3 energy only is similar to the 3 Birthday above, but the energy is more strongly expressed here. No sub-emphasis on other energies.)"
            ]
          }
        ]
      },
      4: {
        title: "Limitation, Order, Service",
        content: [
          {
            birthday: "4",
            traits: [
              "Good organizer, manager.",
              "Works long and hard, conscientious, dependable.",
              "Responsible, self-disciplined.",
              "Serious, sincere, honest.",
              "Patient, persevering, determined.",
              "Proceeds despite seeming limitations.",
              "Very practical, rational.",
              "Some rigidity or stubbornness,",
              "Feeling generally repressed.",
              "Shows little affection. Has difficulty attracting affection,",
              "Patient with details, insists on accuracy.",
              "May concentrate on details and miss the big picture.",
              "(Emphasis on 4 energy only. No sub-emphasis on other energies.)"
            ]
          },
          {
            birthday: "13",
            traits: [
              "Good organizer, manager, but may dominate and irritate others.",
              "Executive ability.",
              "Works long, hard, energetically, dependably.",
              "Responsible, self-disciplined, enthusiastic.",
              "Serious, sincere, persevering.",
              "Feels limited or restricted a good deal of the time, causing frustration or depression.",
              "Good mind.",
              "Very practical.",
              "Tends to be very rigid, obstinate, dogmatic.",
              "Others may see him as unreasonable.",
              "Feelings usually repressed.",
              "Shows some affection. Has difficulty attracting affection.",
              "Insists on accuracy.",
              "Concentrates on details, often misses the big picture.",
              "(Emphasis on 4 and 13/4 energy. Sub-emphasis on 1 and 3 energy.)"
            ]
          },
          {
            birthday: "22",
            traits: [
              "22 is a master number. For this Birthday, see the description on the 22 page of this chart."
            ]
          },
          {
            birthday: "31",
            traits: [
              "Good organizer, manager.",
              "Works hard, energetic, dependable, enthusiastic.",
              "Good in the business world.",
              "Good conversationalist.",
              "Responsible, helpful.",
              "Serious, sincere.",
              "Patient, persevering, determined.",
              "Good mind.",
              "Very practical, rational, but some imagination shown.",
              "Often original approach.",
              "Some rigidity or stubbornness.",
              "Sensitive, but feelings usually repressed.",
              "Good with details, insists on accuracy.",
              "Sometimes scatters energy.",
              "(Emphasis on 4 energy. Sub-emphasis on 3 and 1 energy.)"
            ]
          }
        ]
      },
      5: {
        title: "Constructive Freedom",
        content: [
          {
            birthday: "5",
            traits: [
              "Enjoys and works well with others.",
              "Talented and versatile, good at presenting ideas.",
              "Likes new experience, change, travel.",
              "Entertaining, amusing, enthusiastic, progressive.",
              "Adaptable.",
              "Sociable, delightful companion.",
              "Imaginative.",
              "Quick mind, clever, analytical.",
              "Restless, impatient, chafes at routine.",
              "May shirk responsibility.",
              "(Emphasis on 5 energy only. No sub-emphasis on other energies.)"
            ]
          },
          {
            birthday: "14",
            traits: [
              "Enjoys working with others.",
              "Talented and versatile, can organize and systematize.",
              "Capable of hard work at times, usually not consistently.",
              "Desires new experience, change, travel, often with little sense of proportion.",
              "May overindulge in eating, sensuality, liquor, drugs.",
              "Entertaining, amusing, enthusiastic, progressive.",
              "Usually adaptable.",
              "Sociable.",
              "Quick mind, clever, analytical.",
              "Practical.",
              "Often original approach.",
              "Restless, impatient, somewhat erratic—tends to jump from activity to activity with little sense of accomplishment or accountability.",
              "Often shirks responsibility.",
              "(Emphasis on 5 and 14/5 energy. Sub-emphasis on 1 and 4 energy.)"
            ]
          },
          {
            birthday: "23",
            traits: [
              "Enjoys and works extremely well with others.",
              "Sometimes spokesman or peacemaker.",
              "Talented and versatile, good at presenting ideas.",
              "Likes new experience, change, travel.",
              "Entertaining, amusing, very enthusiastic, progressive.",
              "Adaptable.",
              "Very sociable, delightful companion.",
              "Very imaginative, artistic, creative.",
              "Energetic.",
              "Quick mind, clever, analytical.",
              "Sensitivity to others' feelings with most feelings expressed.",
              "Affectionate.",
              "Restless, impatient, chafes at routine.",
              "Shirks responsibility at times.",
              "(Emphasis on 5 energy. Sub-emphasis on 2 and 3 energy.)"
            ]
          }
        ]
      },
      6: {
        title: "Balance, Responsibility, Love",
        content: [
          {
            birthday: "6",
            traits: [
              "Responsible, helpful, conscientious.",
              "Can facilitate changes in inharmonious situations.",
              "Gives and receives much affection.",
              "Devoted spouse and parent, much interest in home, family.",
              "Creative, artistic.",
              "Good mind.",
              "Much emotion and sensitivity.",
              "Loving, friendly, appreciative of others.",
              "Better at continuing than starting.",
              "Will pick up responsibilities if others falter.",
              "(Emphasis on 6 energy only. No sub-emphasis on other energies.)"
            ]
          },
          {
            birthday: "15",
            traits: [
              "Usually responsible, but independent at the same time.",
              "Helpful, conscientious.",
              "Can facilitate changes in inharmonious situations.",
              "Much will-power.",
              "Sympathetic, understanding.",
              "Adaptable, enthusiastic.",
              "Devoted spouse and parent, interest in home, family.",
              "Creative, artistic, imaginative.",
              "Potential for achievement and financial reward.",
              "Good mind.",
              "Practical, rational.",
              "Emotion and sensitivity, sometimes represses feelings.",
              "Loving, friendly, appreciative of others.",
              "Gives and receives affection.",
              "(Emphasis on 6 energy. Sub-emphasis on 1 and 5 energy.)"
            ]
          },
          {
            birthday: "24",
            traits: [
              "Responsible, helpful, conscientious.",
              "Sometimes spokesman or peacemaker.",
              "Can facilitate changes in inharmonious situations.",
              "Works well with others.",
              "Sympathetic, kind, generous, understanding.",
              "Devoted spouse and parent, interest in home, family.",
              "Creative, artistic.",
              "Good organizer, manager.",
              "Can work long and hard, self-disciplined.",
              "Good mind.",
              "Practical, rational.",
              "Much emotion and sensitivity, represses some feelings.",
              "Loving, friendly, appreciative of others.",
              "Gives and receives much affection.",
              "Better at continuing than starting.",
              "Will pick up responsibilities if others falter.",
              "Good with details.",
              "(Emphasis on 6 energy. Sub-emphasis on 2 and 4 energy.)"
            ]
          }
        ]
      },
      7: {
        title: "Analysis, Understanding",
        content: [
          {
            birthday: "7",
            traits: [
              "Not too adaptable, prefers to work alone but often feels isolated.",
              "Needs time to rest or meditate.",
              "Introspective, stubborn, self-centered.",
              "Usually interested in technical, scientific, religious or occult subjects.",
              "Likely to enjoy spiritual or psychic explorations.",
              "Given to unique or unusual approaches or solutions.",
              "Fine mind, good intuition.",
              "Logical, rational approach.",
              "Feels deeply, usually represses emotions.",
              "Extremely sensitive, but relatively uncommunicative.",
              "Difficulty giving or receiving affection.",
              "Can carry work from start to finish using own approach at own pace.",
              "Perfectionist, stickler for details.",
              "(Emphasis on 7 energy only. No sub-emphasis on other energies.)"
            ]
          },
          {
            birthday: "16",
            traits: [
              "Relatively inflexible, insists on independence.",
              "Prefers to work alone but usually feels lonely.",
              "Needs time to rest or meditate.",
              "Introspective, stubborn, self-centered.",
              "Difficult to maintain permanent relations.",
              "Interest in home, family, but strong personal needs at the same time.",
              "Usually interested in technical, scientific, religious or occult subjects.",
              "Likely to enjoy spiritual explorations.",
              "'Different' wavelength may confuse others.",
              "Potential for achievement and financial reward.",
              "Fine mind, good intuition.",
              "Logical, rational approach. Responsible.",
              "Feels deeply, usually represses emotions.",
              "Extremely sensitive, but usually uncommunicative.",
              "Much difficulty giving or receiving affection.",
              "Can carry work from start to finish using own approach at own pace.",
              "Perfectionist, stickler for details.",
              "Given to unique or unusual approaches.",
              "(Emphasis on 7 and 16/7 energy. Sub-emphasis on 1 and 6 energy.)"
            ]
          },
          {
            birthday: "25",
            traits: [
              "Often not too adaptable.",
              "Needs time to rest or meditate.",
              "Introspective, sometimes stubborn, sometimes self-centered.",
              "Cautiously friendly, quiet enthusiasm, sometimes peacemaker.",
              "Cautiously enjoys new experience.",
              "Usually interested in technical, scientific, religious or occult subjects.",
              "Likely to enjoy spiritual or psychic explorations.",
              "Given to unique or unusual approaches or solutions.",
              "Fine mind, good intuition.",
              "Logical, rational approach.",
              "Feels deeply, often represses emotions.",
              "Extremely sensitive, but often uncommunicative.",
              "Some difficulty giving or receiving affection.",
              "Better at continuing than starting, occasional restlessness.",
              "Stickler for details.",
              "(Emphasis on 7 energy. Sub-emphasis on 2 and 5 energy.)"
            ]
          }
        ]
      },
      8: {
        title: "Material Satisfaction",
        content: [
          {
            birthday: "8",
            traits: [
              "Very capable in business world, prefers to be in charge.",
              "Organizational, managerial, administrative capabilities.",
              "Can handle large projects.",
              "Efficient, can handle money well.",
              "Ambitious, energetic, goal-oriented.",
              "Self-confident.",
              "Dependable.",
              "Seeks material satisfactions.",
              "Practical, realistic.",
              "Expresses little feeling.",
              "Better at starting than continuing.",
              "Better at broad strokes than details.",
              "(Emphasis on 8 energy only. No sub-emphasis on other energies.)"
            ]
          },
          {
            birthday: "17",
            traits: [
              "Very capable in business world, prefers to be in charge.",
              "Independent attitude, executive ability.",
              "Organizational, managerial, administrative capabilities.",
              "Can handle large projects.",
              "Efficient, can handle money well.",
              "Ambitious, energetic, goal-oriented.",
              "Stubborn or self-centered.",
              "Self-confident.",
              "Dependable.",
              "Seeks material satisfactions.",
              "Good mind, good intuition.",
              "Practical, realistic.",
              "Often original approach, unique or unusual solutions.",
           "Sensitive, but usually represses feelings.",
           "Difficulty giving or receiving affection.",
           "Better at starting than continuing.",
           "Better at broad strokes than details.",
           "(Emphasis on 8 energy. Sub-emphasis on 1 and 7 energy.)"
         ]
       },
       {
         birthday: "26",
         traits: [
           "Capable in business world, works well with others.",
           "Organizational, managerial, administrative capabilities.",
           "Efficient, can handle money well.",
           "Ambitious, energetic.",
           "Adaptable, cooperative, responsible, conscientious.",
           "Self-confident.",
           "Dependable.",
           "Sociable, diplomatic. Uses persuasion rather than force.",
           "Seeks material satisfactions.",
           "Creative, artistic.",
           "Good mind.",
           "Practical, realistic.",
           "Sensitive, expresses some of the feelings.",
           "Affectionate, but reserved.",
           "Good at starting and continuing.",
           "Good at broad strokes and details.",
           "(Emphasis on 8 energy. Sub-emphasis on 2 and 6 energy.)"
         ]
       }
     ]
   },
   9: {
     title: "Selflessness, Humanitarianism",
     content: [
       {
         birthday: "9",
         traits: [
           "Works well with others.",
           "Humanistic, philanthropic approach.",
           "Broadminded, tolerant, generous.",
           "Sympathetic, compassionate.",
           "Idealistic, can inspire others.",
           "Creative, imaginative.",
           "Sensitive to others' needs and feelings.",
           "Much feeling expressed, may be involved in many dramatic situations.",
           "Gives much in the way of friendship, affection, love. Can sometimes be content with minimal return.",
           "(Emphasis on 9 energy only. No sub-emphasis on other energies.)"
         ]
       },
       {
         birthday: "18",
         traits: [
           "Works well with others but must preserve independence.",
           "Humanistic, philanthropic approach, often in business situations.",
           "Executive ability.",
           "Organizational, managerial, administrative capabilities.",
           "Broadminded, tolerant, generous.",
           "Sympathetic, compassionate.",
           "Much will-power.",
           "Idealistic, can inspire others.",
           "Creative, imaginative.",
           "Potential for achievement and financial reward.",
           "Good mind.",
           "Practical, rational.",
           "Sensitive.",
           "Some feelings expressed but much repressed, may be involved in many dramatic situations.",
           "Gives some friendship, affection, love. Can sometimes be content with minimal return.",
           "(Emphasis on 9 energy. Sub-emphasis on 1 and 8 energy.)"
         ]
       },
       {
         birthday: "27",
         traits: [
           "Works well with others.",
           "Needs some time to rest and meditate.",
           "Humanistic, philanthropic approach.",
           "Broadminded, tolerant, generous, cooperative.",
           "Sympathetic, compassionate.",
           "Occasional introspective or self-centered needs.",
           "Sociable, uses persuasion rather than force.",
           "Idealistic, can inspire others.",
           "Creative, imaginative, unique or unusual approaches or solutions.",
           "Good mind, logical approach.",
           "Extremely sensitive to others' needs and feelings.",
           "Much feeling expressed, may be involved in many dramatic situations.",
           "Gives much in the way of friendship, affection, love. Can sometimes be content with minimal return.",
           "(Emphasis on 9 energy. Sub-emphasis on 2 and 7 energy.)"
         ]
       }
     ]
   },
   11: {
     title: "Illumination",
     content: [
       {
         birthday: "11",
         traits: [
           "Works well with others.",
           "Often inspires by example.",
           "Uses persuasion rather than force.",
           "Spiritual, occult or psychic explorations.",
           "Idealistic.",
           "Creative.",
           "Uncomfortable in business world.",
           "Good mind, analytical ability.",
           "Good intuition.",
           "Very aware and sensitive, often high emotions, temperamental.",
           "Nervous tension.",
           "(Emphasis on 11 and 2 energy. No sub-emphasis on other energies.)"
         ]
       },
       {
         birthday: "29",
         traits: [
           "Works well with others.",
           "Often inspires by example.",
           "Uses persuasion rather than force.",
           "Spiritual, occult or psychic explorations.",
           "Idealistic.",
           "Much creativity, imagination.",
           "Nervous tension.",
           "More dreamer than doer.",
           "Uncomfortable in business world.",
           "Good mind, analytical ability.",
           "Good intuition.",
           "Very aware and sensitive, often high emotions, temperamental.",
           "May be involved in dramatic situations.",
           "Gives much in the way of friendship, affection, love. Can sometimes be content with minimal return.",
           "(Emphasis on 11 and 2 energy. Sub-emphasis on 9 energy.)"
         ]
       }
     ]
   },
   22: {
     title: "Master Builder",
     content: [
       {
         birthday: "22",
         traits: [
           "Capable of handling large scale undertakings.",
           "Capable of leading in new directions.",
           "Extremely capable organizer.",
           "Unorthodox approach.",
           "Responsible, serious, sincere, works long and hard.",
           "Idealistic, desire to work for the good of all.",
           "Inner strength, often charisma.",
           "Nervous tension.",
           "Much unusual perception and awareness.",
           "Good intuition.",
           "Better at starting than continuing.",
           "Better at broad strokes than details.",
           "(Emphasis on 22 and 4 energy. No sub-emphasis on other energies.)"
         ]
       }
     ]
   }
 };

 const findBirthdayData = (number) => {
   if (!birthdayData[number]) {
     return null;
   }

   return birthdayData[number];
 };

 const data = findBirthdayData(number);
 if (!data) {
   return <p>Select a number to view its Birthday information.</p>;
 }
 // Add visualization
const birthdayVisual = <BirthdayVisualization number={number} />;

 return (
   <div className="bg-white/30 backdrop-blur-md rounded-lg p-6 shadow-lg">
     <div className="mb-4">
       <h3 className="text-2xl font-bold text-indigo-900">{number}: {data.title}</h3>
     </div>
     
     <div className="mt-4">
       <div className="space-y-6">
         {data.content.map((item, index) => (
           <div key={index} className="bg-white/30 backdrop-blur-md rounded-lg p-4">
             <h4 className="font-bold mb-2 text-lg text-indigo-700">Birthday: {item.birthday}</h4>
             <ul className="list-disc pl-5 space-y-1.5">
               {item.traits.map((trait, traitIndex) => (
                 <li key={traitIndex} className="text-gray-700">{trait}</li>
               ))}
             </ul>
           </div>
         ))}
       </div>
     </div>
     {birthdayVisual}
   </div>
 );
};

// The Aspects Chart Component (CHART 6)
const AspectsChart = ({ number }) => {
    const aspectsData = {
      1: {
        title: "Individuation, Independence, Attainment",
        summary: "3 harmonious aspects, 1 harmonious or discordant aspect, 6 discordant aspects, 1 very discordant aspect",
        aspects: [
          {
            number: "1·1",
            description: "Usually VERY DISCORDANT",
            details: "Overemphasis on self and own needs. Little concern for others.",
            additionalInfo: "or Timid, afraid to stand on own two feet. Possible approach to alleviate difficulties: The individual must work to be accepted and feel comfortable in group situations."
          },
          {
            number: "1·2",
            description: "Usually DISCORDANT",
            details: "The potential of the 1 to lead and manage conflicts with the potential of the 2 to work along with others."
          },
          {
            number: "1·3",
            description: "Usually HARMONIOUS",
            details: "The self-centeredness of the 1 is toned down by the social awareness of the 3. The leadership potential of the 1 is enhanced by the gift of verbal expression of the 3.",
            additionalInfo: "(Sometimes, the 3 expresses as a happy-go-lucky individual, conflicting with the 1's driving desire for attainment.)"
          },
          {
            number: "1·4",
            description: "Usually HARMONIOUS",
            details: "The potential of the 1 to lead and manage is enhanced by the potential of the 4 for system and order.",
            additionalInfo: "(Sometimes, the self-centered potential of the 1 is emphasized by the 4's potential for rigidity, causing a negative approach.)"
          },
          {
            number: "1·5",
            description: "Sometimes HARMONIOUS; sometimes DISCORDANT",
            details: "The attainment potential of the 1 may be enhanced by the constructive use of freedom of the 5. This combination may be extremely powerful or may produce a combination so overpowering as to work against individual's best interests.",
            additionalInfo: "or The self-centered, goal-oriented potential of the 1 may conflict with the constant flux often seen in the 5, producing a pull in different directions."
          },
          {
            number: "1·6",
            description: "Usually DISCORDANT",
            details: "The self-centered potential of the 1 conflicts with the potential of the 6 for responsibility and concern for others."
          },
          {
            number: "1·7",
            description: "Usually DISCORDANT",
            details: "The desire for attainment of the 1 conflicts with the introspective potential of the 7.",
            additionalInfo: "(Sometimes, the unique point of view of the 7 enhances the attainment potential of the 1.)"
          },
          {
            number: "1·8",
            description: "Usually HARMONIOUS",
            details: "The attainment potential of the 1 is enhanced by the executive potential of the 8 for material achievement.",
            additionalInfo: "(Sometimes, the self-centered potential of the 1 may be emphasized by the potential of the 8 for stubbornness and rigidity, causing a negative approach.)"
          },
          {
            number: "1·9",
            description: "Usually DISCORDANT",
            details: "The self-centered potential of the 1 conflicts with the potential of the 9 for giving to others.",
            additionalInfo: "(Sometimes, the 9's potential of giving to others may be expressed as creative activity. In this situation, the attainment potential of the 1 may be enhanced by the creative potential of the 9.)"
          },
          {
            number: "1·11",
            description: "Usually DISCORDANT",
            details: "The potential of the 1 for independence and self-centered attainment conflicts with the potential of the 11 for idealistic or spiritual achievement."
          },
          {
            number: "1·22",
            description: "Usually DISCORDANT",
            details: "The potential of the 1 for independence and self-centered attainment conflicts with the potential of the 22 for substantial material achievement."
          }
        ]
      },
      2: {
        title: "Relation, Cooperation",
        summary: "5 harmonious aspects, 5 discordant aspects, 1 very discordant aspect",
        aspects: [
          {
            number: "2·1",
            description: "Usually DISCORDANT",
            details: "The potential of the 2 to work along with others conflicts with the potential of the 1 to lead and manage."
          },
          {
            number: "2·2",
            description: "Usually VERY DISCORDANT",
            details: "Meddling busybody, adding confusion rather than harmony to a situation.",
            additionalInfo: "or Difficulty in finding fulfilling place in a group. Little patience with details or with people. Possibly withdrawn, shy and retiring. Possible approach to alleviate difficulties: the individual must work to learn system and organization."
          },
          {
            number: "2·3",
            description: "Usually HARMONIOUS",
            details: "The potential of the 2 for cooperating and harmonizing is enhanced by the social awareness of the 3.",
            additionalInfo: "(Sometimes, the 3 expresses through frivolous activity and a dilettante's approach which may conflict with the potential of the 2 for cooperation.)"
          },
          {
            number: "2·4",
            description: "Usually HARMONIOUS",
            details: "The potential of the 2 for cooperation and harmonizing is enhanced by the potential of the 4 for system and order.",
            additionalInfo: "(Sometimes the potential for harmonizing of the 2 is stifled by the comparative fixity of approach of the 4.)"
          },
          {
            number: "2·5",
            description: "Usually DISCORDANT",
            details: "The potential of the 2 for cooperating and harmonizing conflicts with the strong personal desire for freedom and the state of flux of the 5."
          },
          {
            number: "2·6",
            description: "Usually HARMONIOUS",
            details: "The potential of the 2 for cooperating is considerably enhanced by the potential of the 6 for responsibility. The 6's ability to show friendship, affection and love provides a very positive side to this combination.",
            additionalInfo: "(The 2·6 individual must take responsibility for himself as well as others. He should not be reduced to a doormat because of his desire to help others fulfill themselves.)"
          },
          {
            number: "2·7",
            description: "Usually DISCORDANT",
            details: "The potential of the 2 for cooperating and harmonizing conflicts with the introspective potential of the 7. The 7's appearance of being 'different' makes it difficult for the 7 to work well in groups most of the time.",
            additionalInfo: "(Sometimes, the introspective potential of the 7 is suppressed and the potential to share wisdom and knowledge is expressed instead. This enhances the potential of the 2 for working together with others.)"
          },
          {
            number: "2·8",
            description: "Usually DISCORDANT",
            details: "The potential of the 2 for cooperating and harmonizing conflicts with the executive potential of the 8 for material achievement.",
            additionalInfo: "The 8 usually expresses a potential to lead rather than to be a cooperating member of a group."
          },
          {
            number: "2·9",
            description: "Usually HARMONIOUS",
            details: "The potential of the 2 for cooperating and harmonizing is enhanced by the potential of the 9 for giving to others.",
            additionalInfo: "(The 2·9 individual must stay aware of his own needs so that he is not completely submerged by his desire to help others.)",
            additionalInfo2: "(The 9 often has trouble expressing its positive potential and may prefer to receive rather than give. In this case, the potential of the negative 9 would conflict with the potential of the 2.)"
          },
          {
            number: "2·11",
            description: "Usually HARMONIOUS",
            details: "The potential of the 2 for cooperating and harmonizing may be enhanced by the potential of the 11 for idealistic or spiritual achievement. The nervous tension of the 11 will be a partial detriment to the 2 approach.",
            additionalInfo: "(Sometimes, the potential of the 2 is expressing on a relatively mundane level, while the potential of the 11 is expressing on a high spiritual level, thereby causing a conflict.)"
          },
          {
            number: "2·22",
            description: "Usually DISCORDANT",
            details: "The potential of the 2 for being a cooperating and harmonizing member of a group conflicts with the potential of the 22 for leading the way to substantial material achievement. The nervous tension of the 22 will act as a further detriment to the 2 approach."
          }
        ]
      },
      3: {
        title: "Expression, Joy of Living",
        summary: "6 harmonious aspects, 4 discordant aspects, 1 very discordant aspect",
        aspects: [
          {
            number: "3·1",
            description: "Usually HARMONIOUS",
            details: "The social awareness of the 3 tones down the self-centeredness of the 1. The gift of verbal expression of the 3 enhances the leadership potential of the 1.",
            additionalInfo: "(Sometimes, the 3's expression as a happy-go-lucky individual conflicts with the 1's driving desire for attainment.)"
          },
          {
            number: "3·2",
            description: "Usually HARMONIOUS",
            details: "The social awareness of the 3 enhances the potential of the 2 for cooperating and harmonizing.",
            additionalInfo: "(Sometimes, the 3 expresses through frivolous activity and a dilettante's approach which may conflict with the potential of the 2 for cooperation.)"
          },
          {
            number: "3·3",
            description: "Usually VERY DISCORDANT",
            details: "Frivolous. Little sense of purpose. Scattering of forces.",
            additionalInfo: "or Difficulty with self-expression. May hide feelings and emotions from self and others. Seems uncomfortable in even light social situation. Often shy and withdrawn. Possible approach to alleviate the difficulties: The individual must work to learn to accept responsibility. He has to learn what is involved in being a friend."
          },
          {
            number: "3·4",
            description: "Usually DISCORDANT",
            details: "The potential of the 3 for creative self-expression and sociability conflicts with the potential of the 4 for system and order.",
            additionalInfo: "(Sometimes, the self-expression of the 3 is enhanced by the constructive, systematic approach of the 4. The harmony or discord depends on whether the 4 is strong and purposeful or just rigidly set in his ways.)"
          },
          {
            number: "3·5",
            description: "Usually HARMONIOUS",
            details: "The potential of the 3 for creative self-expression and sociability is enhanced by the potential of the 5 for the constructive use of freedom.",
            additionalInfo: "(Sometimes, the restlessness, versatility and love of change of the 5 combines with the light and joy of the 3 to produce frivolity, or in extremes, purposelessness and erratic behavior.)"
          },
          {
            number: "3·6",
            description: "Usually HARMONIOUS",
            details: "The potential of the 3 for social awareness enhances the potential of the 6 for friendship and love. The potential for creative self-expression of both the 3 and 6 enhances the expressive capabilities."
          },
          {
            number: "3·7",
            description: "Usually DISCORDANT",
            details: "The extrovert potential of the 3 conflicts with the introvert potential of the 7. The sociability of the 3 conflicts with the 'different', less adaptable approach of the 7."
          },
          {
            number: "3·8",
            description: "Usually DISCORDANT",
            details: "The potential of the 3 for creative self-expression and sociability conflicts with the executive potential of the 8 for material achievement. The adaptability of the 3 conflicts with the fixity of the 8."
          },
          {
            number: "3·9",
            description: "Usually HARMONIOUS",
            details: "The potential of the 3 for social awareness enhances the potential of the 9 for giving to others. The potential for creative self-expression of both the 3 and the 9 enhances the expressive capabilities.",
            additionalInfo: "(The 9 often has trouble expressing its positive potential and may prefer to receive rather than give. In this case, the potential of the negative 9 would conflict with the potential of the 3.)"
          },
          {
            number: "3·11",
            description: "Usually HARMONIOUS",
            details: "The potential of the 3 for creative self-expression and social awareness enhances the potential of the 11 for idealistic or spiritual achievement. The lighter tone of the 3 may be a good foil for the seriousness of the 11."
          },
          {
            number: "3·22",
            description: "Usually DISCORDANT",
            details: "The potential of the 3 for a light, less serious tone conflicts with the serious tone of the 22 and its potential for substantial material achievement."
          }
        ]
      },
      4: {
        title: "Limitation, Order, Service",
        summary: "4 harmonious aspects, 5 discordant aspects, 1 harmonious or discordant aspect, 1 very discordant aspect",
        aspects: [
          {
            number: "4·1",
            description: "Usually HARMONIOUS",
            details: "The potential of the 4 for system and order enhances the potential of the 1 to lead and manage.",
            additionalInfo: "(Sometimes the self-centered potential of the 1 is emphasized by the 4's potential for rigidity, causing a negative approach.)"
          },
          {
            number: "4·2",
            description: "Usually HARMONIOUS",
            details: "The potential of the 4 for system and order enhances the potential of the 2 for cooperation and harmonizing.",
            additionalInfo: "(Sometimes the potential for harmonizing of the 2 is stifled by the comparative fixity of approach of the 4.)"
          },
          {
            number: "4·3",
            description: "Usually DISCORDANT",
            details: "The potential of the 4 for system and order conflicts with the potential of the 3 for creative self-expression and sociability.",
            additionalInfo: "(Sometimes, the self-expression of the 3 is enhanced by the constructive, systematic approach of the 4. The harmony or discord depends on whether the 4 is strong and purposeful or just rigidly set in his ways.)"
          },
          {
            number: "4·4",
            description: "Usually VERY DISCORDANT",
            details: "Feels limited, tied down, frustrated. Very rigid attitudes—stubborn, obstinate. Obsessed with system and order; loses sight of the forest because of his interest in the trees.",
            additionalInfo: "or Very disorganized. Rarely feels accountable. Often has no sense of time or committment. Actions are often irresponsible. Possible approach to alleviate difficulties: The individual must work to develop executive ability. He has to develop the capability of seeing things realistically, with a practical approach."
          },
          {
            number: "4·5",
            description: "Usually DISCORDANT",
            details: "The potential of the 4 for system and order conflicts with the strong desire of the 5 for freedom."
          },
          {
            number: "4·6",
            description: "Usually HARMONIOUS",
            details: "The potential of the 4 for system and order enhances the potential of the 6 for responsibility and concern.",
            additionalInfo: "(Sometimes, the fixity of the 4, expressed as either strength or rigidity, conflicts with the potential of the 6 for concern.)"
          },
          {
            number: "4·7",
            description: "Usually HARMONIOUS",
            details: "The potential of the 4 for system and order enhances the potential of the 7 for study and research.",
            additionalInfo: "(Sometimes, the fixity of the 4, expressed as either strength or rigidity, combined with the introspective potential of the 7 produces a very self-centered approach and difficulty in relating to others.)"
          },
          {
            number: "4·8",
            description: "Usually DISCORDANT",
            details: "The potential of the 4 for system and order combined with the executive potential of the 8 for achievement produces a self-centered person whose executive capabilities are apparent, but whose fixity stifles the potential for the use of these capabilities. This aspect tends toward a very rigid attitude—often an extremely obstinate person."
          },
          {
            number: "4·9",
            description: "Usually DISCORDANT",
            details: "The potential of the 4 for fixity of approach conflicts with the potential of the 9 for giving to others.",
            additionalInfo: "(Sometimes, the potential of the 4 for system and order may enhance the potential of the 9 for expression.)"
          },
          {
            number: "4·11",
            description: "Usually DISCORDANT",
            details: "The potential of the 4 for system and order conflicts with the potential of the 11 for idealistic or spiritual achievement."
          },
          {
            number: "4·22",
            description: "Sometimes HARMONIOUS; sometimes DISCORDANT",
            details: "The potential of the 4 for system and order may be enhanced by the potential of the 22 for leading the way to substantial material achievement. The fixity of the 4 is apt to conflict with the ability of the 22 to take advantage of situations with developing potential. In any case, the nervous tension of the 22 will be a partial detriment to the 4 approach."
          }
        ]
      },
      5: {
        title: "Constructive Freedom",
        summary: "1 harmonious aspect, 1 harmonious or discordant aspect, 8 discordant aspects, 1 very discordant aspect",
        aspects: [
          {
            number: "5·1",
            description: "Sometimes HARMONIOUS; sometimes DISCORDANT",
            details: "The constructive use of freedom of the 5 may enhance the attainment potential of the 1. This combination may be extremely powerful or may produce a combination so overpowering as to work against individual's best interests.",
            additionalInfo: "or The constant flux often seen in the 5 may conflict with the self-centered, goal-oriented potential of the 1, producing a pull in different directions."
          },
          {
            number: "5·2",
            description: "Usually DISCORDANT",
            details: "The strong personal desire of the 5 for freedom and the state of flux of the 5 conflicts with the potential of the 2 for cooperating and harmonizing."
          },
          {
            number: "5·3",
            description: "Usually HARMONIOUS",
            details: "The potential of the 5 for the constructive use of freedom enhances the potential of the 3 for creative self-expression and sociability.",
            additionalInfo: "(Sometimes, the restlessness, versatility and love of change of the 5 combines with the light and joy of the 3 to produce frivolity, or in extremes, purposelessness and erratic behavior.)"
          },
          {
            number: "5·4",
            description: "Usually DISCORDANT",
            details: "The strong desire of the 5 for freedom conflicts with the potential of the 4 for system and order."
          },
          {
            number: "5·5",
            description: "Usually VERY DISCORDANT",
            details: "Too much freedom used carelessly. Emphasis on freedom rather than the constructive use of freedom. Excessive pull toward food, drink, drugs, sex—physical satisfaction with little thought of other pleasures or other potentials. Forces are often scattered bringing little concrete result and much frustration.",
            additionalInfo: "or Fear of freedom and fear of taking risks produce a stagnant situation with attendant frustration. Inability to take advantage of talents and opportunities. Possible approach to alleviate difficulties: The individual must work to be aware of individuality, to achieve independence and to attain some specific goals."
          },
          {
            number: "5·6",
            description: "Usually DISCORDANT",
            details: "The strong personal desire of the 5 for freedom conflicts with the potential of the 6 for responsibility and concern for others."
          },
          {
            number: "5·7",
            description: "Usually DISCORDANT",
            details: "The strong personal desire of the 5 for freedom conflicts with the introspective approach and potential of the 7 for study and research.",
            additionalInfo: "(The free-wheeling potential of the 5 for freedom may conflict with the 'different', relatively inflexible potential of the 7, causing an even more discordant aspect.)"
          },
          {
            number: "5·8",
            description: "Usually DISCORDANT",
            details: "The free-wheeling potential of the 5 for freedom conflicts with the fixity of approach and the executive potential of the 8 for material achievement."
          },
          {
            number: "5·9",
            description: "Usually DISCORDANT",
            details: "The strong personal desire of the 5 for freedom conflicts with the potential of the 9 for giving to others.",
            additionalInfo: "(Sometimes, the potential of the 5 for freedom may enhance the potential of the 9 for self-expression.)"
          },
          {
            number: "5·11",
            description: "Usually DISCORDANT",
            details: "The strong personal desire of the 5 for freedom conflicts with the potential of the 11 for idealistic or spiritual achievements for all."
          },
          {
            number: "5·22",
            description: "Usually DISCORDANT",
            details: "The strong personal desire of the 5 for freedom conflicts with the potential of the 22 for substantial material achievement."
          }
        ]
      },
      6: {
        title: "Balance, Responsibility, Love",
        summary: "6 harmonious aspects, 4 discordant aspects, 1 very discordant aspect",
        aspects: [
          {
            number: "6·1",
            description: "Usually DISCORDANT",
            details: "The potential of the 6 for responsibility and concern for others conflicts with the self-centered potential of the 1."
          },
          {
            number: "6·2",
            description: "Usually HARMONIOUS",
            details: "The potential of the 6 for responsibility considerably enhances the potential of the 2 for cooperating. The 6's ability to show friendship, affection and love provides a very positive side to this combination.",
            additionalInfo: "(The 2·6 individual must take responsibility for himself as well as others. He should not be reduced to a doormat because of his desire to help others fulfill themselves.)"
          },
          {
            number: "6·3",
            description: "Usually HARMONIOUS",
            details: "The potential of the 6 for friendship and love is enhanced by the potential of the 3 for social awareness. The potential for creative self-expression of both the 6 and 3 enhances the expressive capabilities."
          },
          {
            number: "6·4",
            description: "Usually HARMONIOUS",
            details: "The potential of the 6 for responsibility and concern is enhanced by the potential of the 4 for system and order.",
            additionalInfo: "(Sometimes, the fixity of the 4, expressed as either strength or rigidity, conflicts with the potential of the 6 for concern.)"
          },
          {
            number: "6·5",
            description: "Usually DISCORDANT",
            details: "The potential of the 6 for responsibility and concern for others conflicts with the strong personal desire of the 5 for freedom."
          },
          {
            number: "6·6",
            description: "Usually VERY DISCORDANT",
            details: "Overwhelmed with responsibility. Person finds it difficult to recognize and care for own needs because of the extreme and constant needs of others (parents, children, spouse particularly). Person is often reduced to a near-slave because of acceptance of so much responsibility.",
            additionalInfo: "or (Rare) Inability to accept responsibility and to express friendship and love makes it difficult to have any close relation. Difficulty handling even the simplest everyday responsibilities produces a frightened individual. Possible approach to alleviate difficulties: The individual must work on self-expression. He has to learn to see the lighter side of things, and learn to express the joy of living."
          },
          {
            number: "6·7",
            description: "Usually DISCORDANT",
            details: "The potential of the 6 for responsibility and concern for others conflicts with the introspective potential of the 7."
          },
          {
            number: "6·8",
            description: "Usually DISCORDANT",
            details: "The potential of the 6 for responsibility and concern for others conflicts with the executive potential of the 8 for material achievement. The 8 is usually concerned with responsibility only as far as its own self-centered goals are concerned. The adaptable attitude of the 6 conflicts with the fixity of approach of the 8."
          },
          {
            number: "6·9",
            description: "Usually HARMONIOUS",
            details: "The potential of the 6 for responsibility and concern for others is enhanced by the potential of the 9 for giving to others.",
            additionalInfo: "(The 6 gives because of his responsibility, affection and love. The 9 gives because of the humanitarian concern. This can be an extremely strong combination, but the 6·9 individual must stay aware of his own needs so that he is not completely submerged by his desire to help others.",
            additionalInfo2: "(The 9 often has trouble expressing its positive potential and may prefer to receive rather than give. In this case, the potential of the negative 9 would conflict with the potential of the 6.) The potential for creative self-expression of both the 6 and 9 enhances the expressive capabilities."
          },
          {
            number: "6·11",
            description: "Usually HARMONIOUS",
            details: "The potential of the 6 for responsibility and concern for others is enhanced by the potential of the 11 for idealistic or spiritual achievements. The nervous tension of the 11 will be a partial detriment to the 6 approach.",
            additionalInfo: "(The 6 is usually concerned with home, family, friends in specific situations, while the 11 is often concerned with broader, more abstract dealings, producing the potential for conflict.)"
          },
          {
            number: "6·22",
            description: "Usually HARMONIOUS",
            details: "The potential of the 6 for responsibility and concern for others is enhanced by the potential of the 22 for substantial material achievement. The nervous tension of the 22 will be a partial detriment to the 6 approach.",
            additionalInfo: "(The 6 is usually concerned with home, family, friends, while the 22 is usually concerned with a larger scale of enterprise, producing the potential for conflict.)"
          }
        ]
      },
      7: {
        title: "Analysis, Understanding",
        summary: "2 harmonious aspects, 8 discordant aspects, 1 very discordant aspect",
        aspects: [
          {
            number: "7·1",
            description: "Usually DISCORDANT",
            details: "The introspective potential of the 7 conflicts with the desire for attainment of the 1.",
            additionalInfo: "(Sometimes, the unique point of view of the 7 enhances the attainment potential of the 1.)"
          },
          {
            number: "7·2",
            description: "Usually DISCORDANT",
            details: "The introspective potential of the 7 and the 7's appearance of being 'different' (which makes it difficult for the 7 to work well in groups most of the time) conflicts with the potential of the 2 for cooperating and harmonizing.",
            additionalInfo: "(Sometimes, the introspective potential of the 7 is suppressed and the potential to share wisdom and knowledge is expressed instead. This enhances the potential of the 2 for working together with others.)"
          },
          {
            number: "7·3",
            description: "Usually DISCORDANT",
            details: "The introvert potential of the 7 conflicts with the extrovert potential of the 3. The 'different', less adaptable approach of the 7 conflicts with the sociability of the 3."
          },
          {
            number: "7·4",
            description: "Usually HARMONIOUS",
            details: "The potential of the 7 for study and research is enhanced by the potential of the 4 for system and order.",
            additionalInfo: "(Sometimes, the fixity of the 4, expressed as either strength or rigidity, combined with the introspective potential of the 7 produces a very self-centered approach and difficulty in relating to others.)"
          },
          {
            number: "7·5",
            description: "Usually DISCORDANT",
            details: "The introspective approach and potential of the 7 for study and research conflicts with the strong personal desire of the 5 for freedom.",
            additionalInfo: "(The 'different', relatively inflexible potential of the 7 may conflict with the free-wheeling potential of the 5 for freedom, causing an even more discordant aspect.)"
          },
          {
            number: "7·6",
            description: "Usually DISCORDANT",
            details: "The introspective potential of the 7 conflicts with the potential of the 6 for responsibility and concern for others."
          },
          {
            number: "7·7",
            description: "Usually VERY DISCORDANT",
            details: "Extremely self-contained and inflexible. A 'different' point of view that may appear to others as considerably eccentric. Difficult to get to know—purposely put others off because more comfortable keeping distance from others.",
            additionalInfo: "or Timid, shy, retiring. Very dependent on others and most resentful of that dependency. Efforts to stand alone often thwarted. Possible approach to alleviate difficulties: The individual must work to express more freely. He has to learn to take advantage of opportunities by being more adaptable. He must also learn to express feelings honestly, rather than hiding them."
          },
          {
            number: "7·8",
            description: "Usually DISCORDANT",
            details: "The introspective potential of the 7 conflicts with the executive potential of the 8 for achievement. The inner nature of the 7 combined with the fixity of the 8 may produce a very self-centered approach and difficulty in relating to others.",
            additionalInfo: "(Sometimes, the potential of the 7 for study and research enhances the executive potential of the 8 for achievement.)"
          },
          {
            number: "7·9",
            description: "Usually DISCORDANT",
            details: "The introspective potential of the 7 conflicts with the potential of the 9 for giving.",
            additionalInfo: "(Sometimes, the 'different' approach of the 7 enhances the 9's potential for self-expression.)"
          },
          {
            number: "7·11",
            description: "Usually HARMONIOUS",
            details: "The potential of the 7 for study and research enhances the potential of the 11 for idealistic or spiritual achievement. The nervous tension of the 11 will be a partial detriment to the 7 approach.",
            additionalInfo: "(Sometimes, the introspective potential and the 'different' approach of the 7 combine with the dreamy side of the 11 to produce a person somewhat removed from the realities of the world.)"
          },
          {
            number: "7·22",
            description: "Usually DISCORDANT",
            details: "The introspective potential of the 7 conflicts with the potential of the 22 for substantial material achievement."
          }
        ]
      },
      8: {
        title: "Material Satisfaction",
        summary: "2 harmonious aspects, 8 discordant aspects, 1 very discordant aspect",
        aspects: [
          {
            number: "8·1",
            description: "Usually HARMONIOUS",
            details: "The executive potential of the 8 for material achievement enhances the attainment potential of the 1.",
            additionalInfo: "(Sometimes, the self-centered potential of the 1 may be emphasized by the potential of the 8 for stubbornness and rigidity, causing a negative approach.)"
       },
       {
         number: "8·2",
         description: "Usually DISCORDANT",
         details: "The executive potential of the 8 for material achievement conflicts with the potential of the 2 for cooperating and harmonizing.",
         additionalInfo: "The 8 usually expresses a potential to lead rather than to be a cooperating member of a group."
       },
       {
         number: "8·3",
         description: "Usually DISCORDANT",
         details: "The executive potential of the 8 for material achievement and the fixity of the 8 conflicts with the potential of the 3 for creative self-expression and sociability and the adaptability of the 3."
       },
       {
         number: "8·4",
         description: "Usually DISCORDANT",
         details: "The executive potential of the 8 for achievement combined with the potential of the 4 for system and order produces a self-centered person whose executive capabilities are apparent, but whose fixity stifles the potential for the use of these capabilities. This aspect tends toward a very rigid attitude—often an extremely obstinate person."
       },
       {
         number: "8·5",
         description: "Usually DISCORDANT",
         details: "The fixity of approach and the executive potential of the 8 for material achievement conflicts with the free-wheeling potential of the 5 for freedom."
       },
       {
         number: "8·6",
         description: "Usually DISCORDANT",
         details: "The executive potential of the 8 for material achievement and the fixity of approach of the 8 conflicts with the potential of the 6 for responsibility and concern for others and the adaptable attitude of the 6.",
         additionalInfo: "The 8 is usually concerned with responsibility only as far as its own self-centered goals are concerned."
       },
       {
         number: "8·7",
         description: "Usually DISCORDANT",
         details: "The executive potential of the 8 for achievement conflicts with the introspective potential of the 7. The inner nature of the 7 combined with the fixity of the 8 may produce a very self-centered approach and difficulty in relating to others.",
         additionalInfo: "(Sometimes, the potential of the 7 for study and research enhances the executive potential of the 8 for achievement.)"
       },
       {
         number: "8·8",
         description: "Usually VERY DISCORDANT",
         details: "Very materialistic—obsessed with goals and achievements. Extremely rigid attitudes—stubborn and obstinate. Cold and aloof. No matter the attainment, he feels limited, tied down, frustrated.",
         additionalInfo: "or Lack of concern with material things produces an unrealistic, impractical, unworkable way of approaching matters. Problems because of lack of material needs. Stubborn attitude, fixity of approach stifles potential for growth. Possible approach to alleviate difficulties: The individual must work to see and appreciate the inherent values—including but not limited to the material values. He has to learn to study and meditate on the inner satisfactions as well as the material satisfactions."
       },
       {
         number: "8·9",
         description: "Usually DISCORDANT",
         details: "The executive potential of the 8 for material achievement conflicts with the potential of the 9 for giving.",
         additionalInfo: "(Sometimes, the executive potential of the 8 for material achievement may be broad enough to enhance the potential of the 9 for giving. In this instance, the 9's giving would be on a more material plane than is usually the case.)"
       },
       {
         number: "8·11",
         description: "Usually DISCORDANT",
         details: "The executive potential of the 8 for material achievement conflicts with the potential of the 11 for idealistic or spiritual achievement."
       },
       {
         number: "8·22",
         description: "Usually HARMONIOUS",
         details: "The executive potential of the 8 for material achievement enhances the potential of the 22 for leading the way to substantial material achievement. The tension of the 22 will be a partial detriment. This can be an extremely powerful aspect, as long as the 8 can be flexible enough to take advantage of the opportunities.",
         additionalInfo: "(Sometimes, the fixity of the approach of the 8 conflicts with the 22's broad, adaptable approach.)"
       }
     ]
   },
   9: {
     title: "Selflessness, Humanitarianism",
     summary: "5 harmonious aspects, 5 discordant aspects, 1 very discordant aspect",
     aspects: [
       {
         number: "9·1",
         description: "Usually DISCORDANT",
         details: "The potential of the 9 for giving to others conflicts with the self-centered potential of the 1.",
         additionalInfo: "(Sometimes, the 9's potential of giving to others may be expressed as creative activity. In this situation, the attainment potential of the 1 may be enhanced by the creative potential of the 9.)"
       },
       {
         number: "9·2",
         description: "Usually HARMONIOUS",
         details: "The potential of the 9 for giving to others enhances the potential of the 2 for cooperating and harmonizing.",
         additionalInfo: "(The 2·9 individual must stay aware of his own needs so that he is not completely submerged by his desire to help others.)",
         additionalInfo2: "(The 9 often has trouble expressing its positive potential and may prefer to receive rather than give. In this case, the potential of the negative 9 would conflict with the potential of the 2.)"
       },
       {
         number: "9·3",
         description: "Usually HARMONIOUS",
         details: "The potential of the 9 for giving to others is enhanced by the potential of the 3 for social awareness. The potential for creative self-expression of both the 9 and the 3 enhances the expressive capabilities.",
         additionalInfo: "(The 9 often has trouble expressing its positive potential and may prefer to receive rather than give. In this case, the potential of the negative 9 would conflict with the potential of the 3.)"
       },
       {
         number: "9·4",
         description: "Usually DISCORDANT",
         details: "The potential of the 9 for giving to others conflicts with the potential of the 4 for fixity of approach.",
         additionalInfo: "(Sometimes, the potential of the 9 for expression may be enhanced by the potential of the 4 for system and order.)"
       },
       {
         number: "9·5",
         description: "Usually DISCORDANT",
         details: "The potential of the 9 for giving to others conflicts with the strong personal desire of the 5 for freedom.",
         additionalInfo: "(Sometimes, the potential of the 9 for self-expression may be enhanced by the potential of the 5 for freedom.)"
       },
       {
         number: "9·6",
         description: "Usually HARMONIOUS",
         details: "The potential of the 9 for giving to others is enhanced by the potential of the 6 for responsibility and concern for others.",
         additionalInfo: "(The 9 gives because of the humanitarian concern. The 6 gives because of his responsibility, affection and love. This can be an extremely strong combination, but the 6·9 individual must stay aware of his own needs so that he is not completely submerged by his desire to help others.",
         additionalInfo2: "(The 9 often has trouble expressing its positive potential and may prefer to receive rather than give. In this case, the potential of the negative 9 would conflict with the potential of the 6.) The potential for creative self-expression of both the 9 and 6 enhances the expressive capabilities."
       },
       {
         number: "9·7",
         description: "Usually DISCORDANT",
         details: "The potential of the 9 for giving conflicts with the introspective potential of the 7.",
         additionalInfo: "(Sometimes, the 9's potential for self-expression is enhanced by the 'different' approach of the 7.)"
       },
       {
         number: "9·8",
         description: "Usually DISCORDANT",
         details: "The potential of the 9 for giving conflicts with the executive potential of the 8 for material achievement.",
         additionalInfo: "(Sometimes, the 9's giving would be on a more material plane than is usually the case and the executive potential of the 8 for material achievement may be broad enough to enhance the potential of the 9 for giving. In this instance, the aspect may be harmonious.)"
       },
       {
         number: "9·9",
         description: "Usually VERY DISCORDANT",
         details: "Overwhelmed with giving. Finds it difficult to recognize personal needs because all efforts are directed toward others. Feels discontent, trapped. Others are tired of hearing of constant sacrifice.",
         additionalInfo: "or Very selfish. Concerned primarily with getting rather than giving. Insensitive to others' needs. Self-centered, usually inflexible. Possible approach to alleviate difficulties: The individual must work to win and preserve independence. He has to learn to strive for material freedom at the same time that the humanitarian qualities are expressed."
       },
       {
         number: "9·11",
         description: "Usually HARMONIOUS",
         details: "The potential of the 9 for giving is enhanced by the potential of the 11 for idealistic or spiritual achievement."
       },
       {
         number: "9·22",
         description: "Usually HARMONIOUS",
         details: "The potential of the 9 for giving is enhanced by the potential of the 22 for significant material achievement."
       }
     ]
   },
   11: {
     title: "Illumination",
     summary: "5 harmonious aspects, 5 discordant aspects, 1 very discordant aspect",
     aspects: [
       {
         number: "11·1",
         description: "Usually DISCORDANT",
         details: "The potential of the 11 for idealistic or spiritual achievement conflicts with the potential of the 1 for independence and self-centered attainment."
       },
       {
         number: "11·2",
         description: "Usually HARMONIOUS",
         details: "The potential of the 11 for idealistic or spiritual achievement may be enhanced by the potential of the 2 for cooperating and harmonizing. The nervous tension of the 11 will be a partial detriment to the 2 approach.",
         additionalInfo: "(Sometimes, the potential of the 2 is expressing on a relatively mundane level, while the potential of the 11 is expressing on a high spiritual level, thereby causing a conflict.)"
       },
       {
         number: "11·3",
         description: "Usually HARMONIOUS",
         details: "The potential of the 11 for idealistic or spiritual achievement is enhanced by the potential of the 3 for creative self-expression and social awareness. The seriousness of the 11 may be a good foil for the lighter tone of the 3."
       },
       {
         number: "11·4",
         description: "Usually DISCORDANT",
         details: "The potential of the 11 for idealistic or spiritual achievement conflicts with the potential of the 4 for system and order."
       },
       {
         number: "11·5",
         description: "Usually DISCORDANT",
         details: "The potential of the 11 for idealistic or spiritual achievements for all conflicts with the strong personal desire of the 5 for freedom."
       },
       {
         number: "11·6",
         description: "Usually HARMONIOUS",
         details: "The potential of the 11 for idealistic or spiritual achievements is enhanced by the potential of the 6 for responsibility and concern for others. The nervous tension of the 11 will be a partial detriment to the 6 approach.",
         additionalInfo: "(The 11 is often concerned with broader, more abstract dealings, while the 6 is usually concerned with home, family, friends in specific situations, producing the potential for conflict.)"
       },
       {
         number: "11·7",
         description: "Usually HARMONIOUS",
         details: "The potential of the 11 for idealistic or spiritual achievement is enhanced by the potential of the 7 for study and research. The nervous tension of the 11 will be a partial detriment to the 7 approach.",
         additionalInfo: "(Sometimes, the dreamy side of the 11 combines with the introspective potential and the 'different' approach of the 7 to produce a person somewhat removed from the realities of the world.)"
       },
       {
         number: "11·8",
         description: "Usually DISCORDANT",
         details: "The potential of the 11 for idealistic or spiritual achievement conflicts with the executive potential of the 8 for material achievement."
       },
       {
         number: "11·9",
         description: "Usually HARMONIOUS",
         details: "The potential of the 11 for idealistic or spiritual achievement is enhanced by the potential of the 9 for giving."
       },
       {
         number: "11·11",
         description: "Usually VERY DISCORDANT",
         details: "A lost dreamer. Idealistic motivations overwhelmed by impractical schemes. Aiming toward spirituality with no grasp of mundane realities. Much nervous tension.",
         additionalInfo: "or Potential for accomplishment is masked in idealistic, even inspirational words, but the hidden motivation—personal power, material accomplishment, satisfaction of selfish needs—includes little perception of spiritual satisfactions. Possible approach to alleviate difficulties: The individual must lower his sights, work to achieve a more practical, realistic view. He can try to use the enormous potential to help others."
       },
       {
         number: "11·22",
         description: "Usually DISCORDANT",
         details: "The potential of the 11 for idealistic or spiritual achievement conflicts with the potential of the 22 for leading the way to substantial material achievement. The nervous tension of both the 11 and 22 act as an additional detriment.",
         additionalInfo: "(Sometimes, the potential of the 11 is practical enough to enhance the potential of the 22, leading to material progress. The nervous tension is still a detriment.)"
       }
     ]
   },
   22: {
     title: "Master Builder",
     summary: "3 harmonious aspects, 1 harmonious or discordant aspect, 6 discordant aspects, 1 very discordant aspect",
     aspects: [
       {
         number: "22·1",
         description: "Usually DISCORDANT",
         details: "The potential of the 22 for substantial material achievement conflicts with the potential of the 1 for independence and self-centered attainment."
       },
       {
         number: "22·2",
         description: "Usually DISCORDANT",
         details: "The potential of the 22 for leading the way to substantial material achievement and the nervous tension of the 22 conflicts with the potential of the 2 for being a cooperating and harmonizing member of a group."
       },
       {
         number: "22·3",
         description: "Usually DISCORDANT",
         details: "The serious tone of the 22 and its potential for substantial material achievement conflicts with the potential of the 3 for a light, less serious tone."
       },
       {
         number: "22·4",
         description: "Sometimes HARMONIOUS; sometimes DISCORDANT",
         details: "The potential of the 22 for leading the way to substantial material achievement may be enhanced by the potential of the 4 for system and order. The ability of the 22 to take advantage of situations with developing potential is apt to conflict with the fixity of the 4. In any case, the nervous tension of the 22 will be a partial detriment to the 4 approach."
       },
       {
         number: "22·5",
         description: "Usually DISCORDANT",
         details: "The potential of the 22 for substantial material achievement conflicts with the strong personal desire of the 5 for freedom."
       },
       {
         number: "22·6",
         description: "Usually HARMONIOUS",
         details: "The potential of the 22 for substantial material achievement is enhanced by the potential of the 6 for responsibility and concern for others. The nervous tension of the 22 will be a partial detriment to the 6 approach.",
         additionalInfo: "(The 22 is usually concerned with a larger scale of enterprise, while the 6 is usually concerned with home, family, friends, producing the potential for conflict.)"
       },
       {
         number: "22·7",
         description: "Usually DISCORDANT",
         details: "The potential of the 22 for substantial material achievement conflicts with the introspective potential of the 7."
       },
       {
         number: "22·8",
         description: "Usually HARMONIOUS",
         details: "The potential of the 22 for leading the way to substantial material achievement is enhanced by the executive potential of the 8 for material achievement. This can be an extremely powerful aspect, as long as the 8 can be flexible enough to take advantage of the opportunities. The tension of the 22 will be a partial detriment.",
         additionalInfo: "(Sometimes, the 22's broad, adaptable approach conflicts with the fixity of the approach of the 8.)"
       },
       {
         number: "22·9",
         description: "Usually HARMONIOUS",
         details: "The potential of the 22 for significant material achievement is enhanced by the potential of the 9 for giving."
       },
       {
         number: "22·11",
         description: "Usually DISCORDANT",
         details: "The potential of the 22 for leading the way to substantial material achievement conflicts with the potential of the 11 for idealistic or spiritual achievement. The nervous tension of both the 11 and 22 act as an additional detriment.",
         additionalInfo: "(Sometimes, the material progress is enhanced by the practical potential of the 11. The nervous tension is still a detriment.)"
       },
       {
         number: "22·22",
         description: "Usually VERY DISCORDANT",
         details: "Overwhelmed by extreme potential of awareness and capability plus intensified nervous tension. Difficult to amalgamate and assimilate the enormity of the potential involved in order to use talents at the desired high level. Usually, much confusion of intentions and much difficulty in organizing oneself to move in a positive direction.",
         additionalInfo: "or Potential for substantial material achievement confused with personal attainment, use of personal power and self-centered material accomplishment. The achievement, though substantial, tends to overwhelm the individual who has achieved for selfish ends. He finds little of the pleasure or satisfaction he expected. The heightened nervous tension makes the path to achievement more difficult, the ultimate attainment unsatisfactory. Possible approach to alleviate difficulties: The individual must lower his sights. He should work to achieve material freedom and the power which accompanies it, then learn to achieve the satisfaction which may be related to the material freedom at first, but is ultimately above the necessity for material attainment."
       }
     ]
   }
 };

 if (!aspectsData[number]) {
   return <p>Select a number to view its Aspects information.</p>;
 }

 const data = aspectsData[number];
 // Add visualization
const compatibilityChart = <NumberCompatibilityChart number={number} />;

 return (
   <div className="bg-white/30 backdrop-blur-md rounded-lg p-6 shadow-lg">
     <div className="mb-4">
       <h3 className="text-2xl font-bold text-indigo-900">{number}: {data.title}</h3>
       <p className="text-gray-600 italic mt-1">{data.summary}</p>
     </div>
     
     <div className="space-y-6">
       {data.aspects.map((aspect, index) => (
         <div key={index} className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
           <div className="flex justify-between mb-2">
             <h4 className="font-bold text-lg text-indigo-700">{aspect.number}</h4>
             <span className={`px-3 py-1 rounded-full text-sm font-medium ${
               aspect.description.includes("HARMONIOUS") && !aspect.description.includes("DISCORDANT") 
                 ? "bg-green-100 text-green-800" 
                 : aspect.description.includes("VERY DISCORDANT")
                   ? "bg-red-100 text-red-800"
                   : aspect.description.includes("DISCORDANT")
                     ? "bg-orange-100 text-orange-800"
                     : "bg-blue-100 text-blue-800"
             }`}>
               {aspect.description}
             </span>
           </div>
           <p className="text-gray-700">{aspect.details}</p>
           {aspect.additionalInfo && (
             <p className="text-gray-700 mt-2 italic">{aspect.additionalInfo}</p>
           )}
           {aspect.additionalInfo2 && (
             <p className="text-gray-700 mt-2 italic">{aspect.additionalInfo2}</p>
           )}
         </div>
       ))}
     </div>
     {compatibilityChart}
   </div>
 );
};
// The Karmic Debt Chart Component (CHART 7)
const KarmicDebtChart = ({ number }) => {
    const karmicDebtData = {
      1: {
        title: "Individuation, Independence, Attainment",
        description: "The 19/1 Karmic Debt developed from the abuse of power in a past life—acting in a completely self-centered manner, blind to everything except a selfish fulfillment of one's own desires. The 1 and 9 behind the 1 indicate the self-centered (negative 1) misused ambitions (negative 9) manifested in a previous life.\n\nThe 19/1 energy tends to exhibit the traits of the negative 1 in one of two extreme directions. (1) The subject may be completely immersed in his own concerns and may have great difficulty becoming aware of others' needs. He often undoes himself because of his inability to realistically see himself in relation to others. He is constantly surprised by others' negative reactions to his endeavors. OR (2) The subject displays an inability to act on his own. He is unhappy with his dependent nature, but finds solace by blaming the environment or other people for his inability to stand on his own two feet.\n\nIn this life, the subject will continue to meet with substantial difficulties unless (1) he can look past his own needs to the needs of others, OR (2) he can work toward independence no matter what forces are tending to keep him weak and dependent. Awareness of the Karmic Debt will produce clarity about one's own needs, others' needs and the relation between them. If, instead, the subject continues to be (1) egotistical, dominating and aggressive, OR (2) lazy, fearful and servile, the problems will be magnified.",
        inLifePath: "Although the subject can see the opportunities, the path is beset with obstacles, many of his own making.\n\nIf the subject confuses independence and self-centeredness, he will find that his egotistical approach limits his awareness of the environment. His actions, commenced with positive ends in sight, will often undo the very things he hoped to accomplish, leaving him further behind than when he started. He will find himself trapped by his own misapplied energies, often exposed as the dominating, selfish person he is.\n\nIf, instead, the subject is struggling with dependence, he will find himself constantly saddled with strong pressures keeping him from breaking free. He will probably waste much time and energy because of his inability to read the realities of the environment and use them to his advantage.",
        inExpression: "The subject will probably have difficulty expressing his talents to his advantage. His dominating, self-centered approach may turn others off so that his capabilities are downgraded, OR, his weak, dependent ways will make it difficult for others to view and appreciate his abilities.",
        inSoulUrge: "The strong motivational force of the subject's inner desires will be difficult to fulfill. Others will read his self-centered ways or his dependent weaknesses, no matter how he attempts to hide them. His innermost secrets may be exposed to his disadvantage."
      },
      4: {
        title: "Limitation, Order, Service",
        description: "The 13/4 Karmic Debt developed from a lack of application to work requiring accomplishment in a past life—dawdling in frivolous activity, sidestepping work, burdening others with his rightful share of work. The 1 and 3 behind the 4 indicate the self-centered (negative 1), frivolous and superficial ways (negative 3) manifested in a previous life.\n\nThe 13/4 tends to exhibit the traits of the negative 4. His approach is rigid, obstinate, dogmatic. Although the subject feels limited, restricted, boxed in on all sides, he usually rationalizes his situation. He finds it extremely difficult to change his course to a more productive direction. When he complains about the limitations he feels, he accepts little of the responsibility for the predicaments in which he feels trapped.\n\nIn this life, the subject will continue to meet with substantial difficulties unless he works hard, far harder than his share, a good part of the time. He must apply himself to the work at hand, be aware of the larger picture while still completing all the details. He has to accept the stringent limitations produced by his inordinate work load. Awareness of the Karmic Debt will stay the subject from looking for easier directions. This awareness can aid in finding constructive paths for development, though these paths, too, will demand much in the way of work. If, instead, the subject chooses to be lazy, indifferent, negative or involved with trivia, the problems will be magnified.",
        inLifePath: "The subject will find his opportunities considerably limiting. No matter his abilities or motivation, he will seem to keep running into stone walls, boxed in with few acceptable options. The opportunities may be as restrictive as they appear to the subject. More likely, the limitations are produced or reinforced by the subject's unbending views coupled with his lack of constructive adaptability.",
        inExpression: "The subject pursues his abilities doggedly in a rigid, one-track direction. The intensity of his drive may work to his advantage, but the effect of this drive is likely to be negated by the limitations of his vision.",
        inSoulUrge: "The subject is discontent with the limitations imposed by his significant work load. He often accomplishes the work at hand but receives little satisfaction from his achievement. He is constantly looking for easier directions to follow, and though few easier paths appear, he continues a frustrating search for them."
      },
      5: {
        title: "Constructive Freedom",
        description: "The 14/5 Karmic Debt developed from a misuse of freedom in a past life. The subject may have found freedom for himself at others' expense or in a manner destructive to his interests. He may have become overly involved in physical pleasures to the detriment of his development. The 1 and 4 behind the 5 indicate the self-centered (negative 1) irresponsibility and lack of accountability (negative 4) manifested in a previous life.\n\nThe 14/5 tends to exhibit the traits of the negative 5. He is apt to be somewhat erratic, jumping from activity to activity—a rolling stone with little sense of accomplishment. He tends to pleasures related to physical sensations—may overindulge in eating, sensuality, liquor, drugs. He craves the new and exciting with little sense of proportion.\n\nIn this life, the subject will continue to meet with substantial difficulties unless (1) he learns to profit from his experiences instead of repeating mistakes, and (2) he curbs his excessive appetite for physical stimulation. The difficulties encountered may take the form of delay or loss. Awareness of the Karmic Debt will allow a more constructive use of personal freedom. If, instead, the subject continues to be restless, impatient and scattering, the problems will be magnified.",
        inLifePath: "The subject must learn the lesson of change—to begin and nurture an interest or relation, to experience it in full bloom, to detach from it when it is completed. This will tend to be a difficult lesson. Instead of appreciating the beauties which enter and leave the life, the subject may be beset with disappointment at losses which are either beyond his control or caused by his lack of awareness.",
        inExpression: "The subject has an unrealistic or unclear view of the use and limitations of his talents. He is apt to meet disappointment in his work, must constantly regroup his energies to move ahead. The vague, dreamy or impractical nature of his vocational commitment adds to the difficulties.",
        inSoulUrge: "The subject's important personal relationships may be marked by unexpected delays and interruptions. His impatience and light view of responsibility add to the problems."
      },
      7: {
        title: "Analysis, Understanding",
        description: "The 16/7 Karmic Debt developed from involvement in unusual or illicit love affairs in a past life, affairs which caused suffering to others. The 1 and 6 behind the 7 indicate the self-centered (negative 1) lack of responsibility and distortion of loving feelings (negative 6) manifested in a previous life.\n\nThe 16/7 tends to exhibit the traits of the negative 7. The subject's 'differentness' is often apparent. His manner may make him difficult to approach. He is apt to be most concerned with himself—possibly self-centered but, at the least, considerably introspective. His growth will follow his own leanings—his outward actions may often not be what others expect. He may easily disconcert or confuse others, even those who feel they know him well. Permanent relations—marriage, business partnerships, etc.—tend to be difficult to maintain.\n\nIn this life, the subject will continue to meet with substantial difficulties unless he devotes himself to selfless, loving ways, subordinating his own personal needs. He is apt to meet with strangely manifesting deceptions or losses which often appear to be quirks of fate. Awareness of the Karmic Debt will provide an optimistic understanding and the ability to keep faith in himself and the universe despite adversity. If, instead, the subject expresses pride and vanity, the difficulties will be magnified.",
        inLifePath: "Life is likely to provide the subject with many examples of the transient nature of reality. This impermanence is apt to be expressed in the meaningful areas in which he would like to exhibit positive growth. His status, wealth or power may change for the worse. His loving relations may shift abruptly. Other matters may end in sudden or unusual ways. The subject may be the cause of his own undoing, or may be the seeming recipient of some curious quirk of fate. Acceptance of impermanence will ease the burden.",
        inExpression: "The subject is apt to undo himself in some unexpected way in vocational matters, or may lose what he has gained due to some sudden or unusual circumstances. He should not lean too heavily on his material attributes—his wealth, status and power may prove ephemeral.",
        inSoulUrge: "The subject's faith in his selection of friends and associates is apt to be severely tested. People on whom he relies may prove unreliable. People he trusts may act against his interests in a manner difficult for him to comprehend. Close friends may cease being close because of some sudden or unusual circumstances."
      }
    };
  
    if (!karmicDebtData[number]) {
      return <p>Select a number to view its Karmic Debt information.</p>;
    }
  
    const data = karmicDebtData[number];
    // Add visualization
const karmicVisual = <KarmicDebtVisual number={number} />;
  
    return (
      <div className="bg-white/30 backdrop-blur-md rounded-lg p-6 shadow-lg">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-indigo-900">{number}: {data.title}</h3>
        </div>
        
        <div className="mt-4">
          <h4 className="font-bold mb-2 text-lg text-indigo-700">Description</h4>
          <p className="text-gray-700 whitespace-pre-line">{data.description}</p>
        </div>
        
        <div className="mt-6">
          <h4 className="font-bold mb-2 text-lg text-indigo-700">In The Life Path</h4>
          <p className="text-gray-700 whitespace-pre-line">{data.inLifePath}</p>
        </div>
        
        <div className="mt-6">
          <h4 className="font-bold mb-2 text-lg text-indigo-700">In The Expression</h4>
          <p className="text-gray-700 whitespace-pre-line">{data.inExpression}</p>
        </div>
        
        <div className="mt-6">
          <h4 className="font-bold mb-2 text-lg text-indigo-700">In The Soul Urge</h4>
          <p className="text-gray-700 whitespace-pre-line">{data.inSoulUrge}</p>
        </div>
        {karmicVisual}
      </div>
    );
  };
  
  // The Intensity Table Chart Component (CHART 8)
  const IntensityTableChart = ({ number }) => {
    const intensityData = {
      1: {
        title: "Individuation, Independence, Attainment",
        primeIntensifier: "Important to follow own bent and get needs met. If individual has difficulty getting needs met, possibly because of conflict of core numbers, the resultant frustration is likely to be among the most obvious strong traits.",
        moreThanAverage: [
          {
            count: "Five or more",
            traits: [
              "Self centeredness and/or domination likely to be very strong and block possibilities for growth."
            ]
          },
          {
            count: "Four",
            traits: [
              "Self-centered. Own interests are strong and must be satisfied.",
              "Lack of flexibility and adaptability. Must do things own way.",
              "Tends to control and dominate, but the domination usually offends others and works against the individual's best interests. Sometimes, if other numbers indicate, domination is accomplished by being weak and helpless and needing aid from others.",
              "Exhibits much courage, often in face of great difficulties.",
              "Potential to use original ideas and leadership abilities for positive ends likely to be stifled by self-centered lack of awareness."
            ]
          }
        ],
        average: "THREE 1'S",
        lessThanAverage: [
          {
            count: "One or two",
            traits: [
              "Lack of confidence in own abilities makes it difficult to promote self. Has difficulty standing up for own rights against others' wills; often feels put down by authority.",
              "Still learning to be independent. Lacks consistent motivation to follow ambitions. Often makes excuses for lower position or lack of direction, or rationalizes the difficulties encountered."
            ]
          }
        ],
        modifiedKarmicLesson: "Lack of confidence in own abilities makes it difficult to promote self. Has difficulty standing up for own rights against others' wills, often feels put down by authority. Still learning to be independent. Lacks consistent motivation to follow ambitions. Often makes excuses for lower position or lack of direction, or rationalizes the difficulties encountered.",
        karmicLesson: "In past lives, the subject showed a lack of independence, confidence and ambition. These qualities will play an important part in the subject's life. He will find himself in situations where he must be able to express his independence or be overwhelmed by others' dominating ways. He must learn to make decisions for himself or fall victim to others' decisions. He must develop his own ambition as a positive force for his development. This Karmic Lesson is extremely rare and, when found, indicates a significant coloration of the core. Those people with this lesson usually have little faith in their own powers, look to others for direction, are pressured by others' decisions because of their own difficulty and/or fear in making decisions. They have great difficulty promoting their own capabilities. Life is apt to be trying until they accept the necessity of standing on their own feet."
      },
      2: {
        title: "Relation, Cooperation",
        primeIntensifier: "Extremely considerate, helpful, friendly. These are likely to be among most obvious strong traits. Very sensitive to others' needs.",
        moreThanAverage: [
          {
            count: "Four or more",
            traits: [
              "Feels considerate, helpful and friendly. Although manifesting, these traits tend to be negated by difficulties in distinguishing the best way to help. Good efforts often go to waste.",
              "Extremely sensitive. Often hurt by what they perceive to be others' insensitivity. The sensitivity may be emotionally and/or mentally draining on family and friends.",
              "Feelings of subservience, inferiority or fear of others may strongly mark lives.",
              "Very fine with detail work. May get so involved with detail that sight of the larger picture is lost.",
              "Appreciation of the arts.",
              "Emotional."
            ]
          },
          {
            count: "Two or three",
            traits: [
              "Most considerate of others. Helpful, cooperative and friendly. Expresses a tactful, diplomatic manner in most situations.",
              "Very sensitive. As a child and young adult, apt to be shy and retiring.",
              "Must work to resolve: Feelings of subservience, OR Feelings of inferiority, OR Inner fear of others.",
              "Good with details.",
              "Appreciation of the arts.",
              "Emotional."
            ]
          }
        ],
        average: "ONE 2",
        lessThanAverage: [
          {
            count: "Zero",
            traits: [
              "See Karmic Lesson or Modified Karmic Lesson below."
            ]
          }
        ],
        modifiedKarmicLesson: "The subject will find himself in situations where sensitivity, consideration, diplomacy and concern with detail are necessary for positive development. He is likely to have these traits developed so that they stand him in good stead.",
        karmicLesson: "In past lives, the subject showed a lack of sensitivity and consideration for others, a lack of awareness of details. Sensitivity, consideration and detail work will play an important part in the life. The subject will find himself in situations where a sensitive nature and a diplomatic manner are imperative for positive development. His environment will include substantial work involved with detail, often presented so that the details tend to obscure the larger picture. Most people with this Karmic Lesson are born with a great deal of sensitivity and consideration as well as a sense of the importance of detail. Those lacking the 2 who are insensitive, inconsiderate and unwilling to be bothered with detail work are likely to meet with difficulties until they choose to learn the lesson."
      },
      3: {
        title: "Expression, Joy of Living",
        primeIntensifier: "Artistic bent, imaginative approach and/or verbal ability are likely to be among most obvious strong traits.",
        moreThanAverage: [
          {
            count: "Four or more",
            traits: [
              "Strong indication of artistic talent—music, art, writing, etc.",
              "Excellent imagination.",
              "Strong capability with words—excellent verbal and/or written self-expression.",
              "Strong self-interest, possibly self-centered, even selfish.",
              "May scatter energies or act immoderately against own best interests."
            ]
          },
          {
            count: "Three",
            traits: [
              "Artistic talent—music, art, writing, etc.",
              "Imaginative.",
              "Good verbal and/or written capabilities.",
              "Many interests may make it difficult to concentrate to support own best interests."
            ]
          }
        ],
        average: "ONE or TWO 3's",
        lessThanAverage: [
          {
            count: "Zero",
            traits: [
              "See Karmic Lesson or Modified Karmic Lesson below."
            ]
          }
        ],
        modifiedKarmicLesson: "Problems with expression and social encounters are likely to occur. He will have to work to express his feelings and will tend to be somewhat uncomfortable in social situations. He probably isn't too good at selling himself. It's important for this subject to work to build his confidence so that he can express himself with greater facility.",
        karmicLesson: "In past lives, the subject showed little concern with expressing himself, little joie de vivre. Difficulties with expression and problems in social encounters will play an important part in the life. Usually, the subject will lack confidence. He will rarely feel comfortable enough to express his feelings, will tend to be withdrawn or uncomfortable in social situations, will have difficulty promoting himself. His feelings of inferiority may project to others as a defeatist attitude. Unless he gains confidence in himself and improves his expressive abilities, he will find these negative traits blocking his growth. An occasional subject will not lack in confidence or verbal ability, but the manner of expression—aggressive, over-dramatic or insensitive—will prove a stumbling block. This subject may well express his delight in the joy of living in a manner that is offensive—sometimes in a manner that puts pressure on others."
      },
      4: {
        title: "Limitation, Order, Service",
        primeIntensifier: "Practical, organized approach, ability to concentrate and work hard, capability at detail and routine are likely to be among most obvious strong traits.",
        moreThanAverage: [
          {
            count: "Four or more",
            traits: [
              "Practical, organized approach, ability to concentrate and work hard, capability at detail and routine—these traits are likely to be the basis for a significant portion of the work accomplished. The work may appear to be menial or below the individual's apparent ability, but the subject is likely to be content or comfortably rationalize the work."
            ]
          },
          {
            count: "Two or three",
            traits: [
              "Practical approach.",
              "Very capable at organizing, systematizing.",
              "Ability to concentrate on work to be done, even if not particularly interested in the work.",
              "Good at detail and routine work.",
              "Hard worker when necessary.",
              "Tendency to be stubborn (if confirmed by other numbers)."
            ]
          }
        ],
        average: "ONE 4",
        lessThanAverage: [
          {
            count: "Zero",
            traits: [
              "See Karmic Lesson or Modified Karmic Lesson below."
            ]
          }
        ],
        modifiedKarmicLesson: "Practicality, organization, hard work and concern with detail will play an important part in the subject's life. He will find that he can accomplish only by starting at the beginning of a task and working hard with great care and concern for detail to its completion. He is likely to innately understand this lesson because of the 4 in the core. He can probably concentrate his efforts no matter what the seeming limitations.",
        karmicLesson: "In past lives, the subject showed a lack of awareness of practicality, organization, hard work and concern with detail. These qualities will play an important part in a subject's life. If the individual's core is strong in 2, 6 or 8 energy, he is likely to innately understand this lesson. He'll be willing and able to work long, hard and patiently, concentrating his efforts and continuing no matter what the seeming limitations. If the individual's core is strong in 1, 3 or 5 energy, he is likely to think of hard work as a limitation. He's likely to look for easy ways out to avoid putting forth the required effort. He is apt to be severely limited in his growth until he is willing to accept the need for working hard and patiently."
      },
      5: {
        title: "Constructive Freedom",
        primeIntensifier: "Versatility, resourcefulness, unusual or unconventional approach, many interests are likely to be among most obvious traits. If core numbers emphasize 2,4,6, these characteristics are likely to be considerably reduced.",
        moreThanAverage: [
          {
            count: "Seven or more",
            traits: [
              "Extremely versatile and resourceful.",
              "Calls attention to self because of unusual or unconventional approach.",
              "Interested in everything. Tends to scatter energies.",
              "Must be free to do things own way. Will not allow any interference with personal freedom.",
              "Nervous temperament. Often acts impulsively.",
              "Tendency to abandon old ways for new, exciting avenues."
            ]
          },
          {
            count: "Six",
            traits: [
              "Many interests, possibly lack of application due to restless nature.",
              "Versatile and resourceful.",
              "Unusual or unconventional approach.",
              "Strong interest in being free may emphasize own self-centered needs.",
              "Actions may stem from impulsive nature."
            ]
          }
        ],
        average: "THREE, FOUR or FIVE 5's",
        lessThanAverage: [
          {
            count: "One, two",
            traits: [
              "Lack of adaptability.",
              "Limited understanding of others due to inability to benefit from experience. Probably approaches situations with mind made up and doesn't appreciate lessons to be learned from situations encountered.",
              "Limits experience available because of fears, insecurities or rigid approach.",
              "Stays with situations or people long after productiveness has been exhausted."
            ]
          }
        ],
        modifiedKarmicLesson: "Lack of adaptability. Limited understanding of others due to inability to benefit from experience. Probably approaches situations with mind made up and doesn't appreciate lessons to be learned from situations encountered. Limits experience available because of fears, insecurities or rigid approach. Stays with situations or people long after productiveness has been exhausted.",
        karmicLesson: "In past lives, the subject showed a lack of awareness of the uses of freedom and change. These qualities play an important part in the subject's life. His life is likely to have significant change and uncertainty and he must learn to adapt and deal with situations with versatility. He probably has little understanding or tolerance of others' reactions because he has shown little deep interest in others, has kept himself from profiting from experience and has tended to keep away from new experiences which might prove beneficial. This Karmic Lesson is extremely rare and, when found, indicates a significant coloration of the core."
      },
      6: {
        title: "Balance, Responsibility, Love",
        primeIntensifier: "Strong sense of responsibility, ability to balance situations and help others are likely to be among most obvious strong traits.",
        moreThanAverage: [
          {
            count: "Four or more",
            traits: [
              "Very strong sense of responsibility. May accept responsibilities even to own detriment.",
              "Helps others by balancing situations to produce harmony or by helping with others' responsibilities. May accept far more than own share of responsibility with little complaint.",
              "Rigid standards, not easily changed.",
              "Very strong opinions, not easily changed.",
              "Significant artistic ability."
            ]
          },
          {
            count: "Three",
            traits: [
              "Willing to assume much responsibility.",
              "Helps others by balancing situations to produce harmony or by helping with others' responsibilities.",
              "Strong ideals.",
              "Strong opinions."
            ]
          }
        ],
        average: "ONE or TWO 6's",
        lessThanAverage: [
          {
            count: "Zero",
            traits: [
              "See Karmic Lesson or Modified Karmic Lesson below."
            ]
          }
        ],
        modifiedKarmicLesson: "Responsibility will play an important part in the life. Subject is likely to have much responsibility to carry but be willing and able to accept. He is likely to understand that family and friends will depend on him for support, and will be there when needed. He will be capable of balancing situations and serving others, and will show these traits strongly in marriage and parenting situations where these abilities are likely to be necessary to keep affairs running smoothly.",
        karmicLesson: "In past lives, the subject showed a lack of awareness of duties and responsibilities. Responsibility will play an important part in the life. The subject is likely to have much responsibility to carry. He is likely to feel the pressure of caring for others who cannot or will not care for themselves. People will sense that he can support a heavier load than others and will lean on him or depend on him much more than he might prefer. Family and friends, instead of helping with responsibility are apt, rather, to be the primary burden. The subject must learn, all on his own, how to comfortably deal with the responsibility that is his. The subject will find much work is required to succeed in marriage (and parenthood). Much effort in balancing and serving others is necessary. Unless the individual is willing and able to learn this, marriage is likely to falter."
      },
      7: {
        title: "Analysis, Understanding",
        primeIntensifier: "Rare. Excellent mind, scientific or mathematical abilities and unusual viewpoint likely to be among most obvious strong traits.",
        moreThanAverage: [
          {
            count: "Two or more",
            traits: [
              "Fine mind, capable of analysis, research.",
              "Suppresses feelings to a large extent.",
              "Technical ability, scientific or mathematical talents.",
              "May want to search for and understand fundamentals, possibly in metaphysical studies.",
              "Unusual viewpoint or out-of-the-ordinary ideas."
            ]
          }
        ],
        average: "ZERO or ONE 7",
        lessThanAverage: [
          {
            count: "Zero",
            traits: [
              "See Karmic Lesson or Modified Karmic Lesson below."
            ]
          }
        ],
        modifiedKarmicLesson: "An appreciation of the non-material world will play an important part in the subject's life. He's likely to understand that increasing faith in spiritual values may bring him deep and lasting peace.",
        karmicLesson: "In past lives, the subject showed a lack of awareness of the inner life, refusal to study or understand the deeper spiritual values. Since we live in an age in which little regard is placed on spiritual values, this lesson is very common. The subject will have to learn an appreciation of the non-material world. Although faith in spiritual values may be a key to growth, it's likely to be of little interest to the individual."
      },
      8: {
        title: "Material Satisfaction",
        primeIntensifier: "Rare. Interest in money, status, power are likely to be among most obvious traits. These interests may lead to an unbalanced emphasis on material matters.",
        moreThanAverage: [
          {
            count: "Two or more",
            traits: [
              "Innate business ability may lead to success in commercial fields.",
              "Innate understanding of how to take an idea and make it into a profitable business.",
              "Balanced practical judgement, particularly in business matters. Can approach business affairs without being carried away with feelings.",
              "Probably suppresses a good deal of feelings in areas other than business.",
              "May place too much stress on personal achievement, may lead to exclusion of other interests or lack of concern for others' needs.",
              "May make difficulties for self because of need to achieve money, status, power. No matter how much is achieved, may still feel frustrated in not achieving more."
            ]
          }
        ],
        average: "ONE 8",
        lessThanAverage: [
          {
            count: "Zero",
            traits: [
              "See Karmic Lesson or Modified Karmic Lesson below."
            ]
          }
        ],
        modifiedKarmicLesson: "A slightly disbalanced perspective on the relation of money to his life is likely to cause difficulties in money matters which may well affect other areas of the individual's life. Until the subject understands how to deal with money and material matters with ease, he may feel uncomfortable pressures related to financial dependence or overbalanced striving for attainment.",
        karmicLesson: "In past lives, the subject showed a lack of awareness of the practical necessities of life including the need to earn and use money. In this life, his attitude toward money is likely to play an important part. He must learn to use and understand money so that a lack of understanding or misuse does not cause unnecessary problems. Often, a lack of awareness about the value of money may severely affect the ability to be independent (as, for instance, a long-time wife with no earning capability desiring a divorce.) In this life, the individual must learn to handle his own material affairs and make reasonable and practical judgements. Until the subject learns how to do this with ease, he will feel significantly limited in his ability to find anything approaching complete satisfaction with himself."
      },
      9: {
        title: "Selflessness, Humanitarianism",
        primeIntensifier: "Strong creative capability or humanitarian concerns are likely to be among most obvious strong traits.",
        moreThanAverage: [
          {
            count: "Five or more",
            traits: [
              "High level creative ability may be expressed in artistic or literary endeavors. May have sudden flashes of intuition.",
              "Very emotional feelings are likely to be suppressed or expressed in poorly balanced ways.",
              "Overly sensitive.",
              "Own strong point of view held rigidly, little affected by others' position, feeling or arguments."
            ]
          },
          {
            count: "Four",
            traits: [
              "High level creative ability may be expressed in artistic or literary endeavors.",
              "Humanitarian approach.",
              "Very emotional."
            ]
          }
        ],
        average: "TWO or THREE 9's",
        lessThanAverage: [
          {
            count: "One",
            traits: [
              "Little awareness of others' feelings.",
              "Little sympathy or compassion shown.",
              "Somewhat restricted point of view."
            ]
          }
        ],
        modifiedKarmicLesson: "Although a feeling and aware person, the subject is likely to have own strong needs which tend to make him self-centered and somewhat unconcerned with others' needs. Until subject becomes more selfless than self-centered, he is likely to be subject to emotional upsets.",
        karmicLesson: "In past lives, the subject showed little concern for others. In this life, the subject is likely to be self-centered and unaware of or repressing his own feelings. He will probably be subjected to much in the way of emotional upsets, disappointments, and separations until he learns to be concerned with others—to show compassion and love, to clearly express his feelings and respond to others' feelings. This rare lesson indicates a significant coloration of the core."
      },
      11: {
        title: "Illumination",
        primeIntensifier: "Not applicable",
        moreThanAverage: [
          {
            count: "Not applicable",
            traits: []
          }
        ],
        average: "Not applicable",
        lessThanAverage: [
          {
            count: "Not applicable",
            traits: []
          }
        ],
        modifiedKarmicLesson: "Not applicable",
        karmicLesson: "Not applicable"
      },
      22: {
        title: "Master Builder",
        primeIntensifier: "Not applicable",
        moreThanAverage: [
          {
            count: "Not applicable",
            traits: []
          }
        ],
        average: "Not applicable",
        lessThanAverage: [
          {
            count: "Not applicable",
            traits: []
          }
        ],
        modifiedKarmicLesson: "Not applicable",
     karmicLesson: "Not applicable"
   }
 };

 if (!intensityData[number]) {
   return <p>Select a number to view its Intensity Table information.</p>;
 }

 const data = intensityData[number];
 // Add visualization
const intensityVisual = <IntensityTableVisualization number={number} />;

 return (
   <div className="bg-white/30 backdrop-blur-md rounded-lg p-6 shadow-lg">
     <div className="mb-4">
       <h3 className="text-2xl font-bold text-indigo-900">{number}: {data.title}</h3>
     </div>
     
     <div className="mt-4">
       <h4 className="font-bold mb-2 text-lg text-indigo-700">Prime Intensifier</h4>
       <p className="text-gray-700">{data.primeIntensifier}</p>
     </div>
     
     <div className="mt-6">
       <h4 className="font-bold mb-2 text-lg text-indigo-700">Intensity Point More Than Average</h4>
       {data.moreThanAverage.map((item, index) => (
         <div key={index} className="mb-4">
           <h5 className="font-semibold text-indigo-600">{item.count}:</h5>
           <ul className="list-disc pl-5 space-y-1.5">
             {item.traits.map((trait, traitIndex) => (
               <li key={traitIndex} className="text-gray-700">{trait}</li>
             ))}
           </ul>
         </div>
       ))}
     </div>
     
     <div className="mt-6">
       <h4 className="font-bold mb-2 text-lg text-indigo-700">Average Quantity of Number</h4>
       <p className="text-gray-700">{data.average}</p>
     </div>
     
     <div className="mt-6">
       <h4 className="font-bold mb-2 text-lg text-indigo-700">Intensity Point Less Than Average</h4>
       {data.lessThanAverage.map((item, index) => (
         <div key={index} className="mb-4">
           <h5 className="font-semibold text-indigo-600">{item.count}:</h5>
           <ul className="list-disc pl-5 space-y-1.5">
             {item.traits.map((trait, traitIndex) => (
               <li key={traitIndex} className="text-gray-700">{trait}</li>
             ))}
           </ul>
         </div>
       ))}
     </div>
     
     <div className="mt-6">
       <h4 className="font-bold mb-2 text-lg text-indigo-700">Modified Karmic Lesson</h4>
       <p className="text-gray-700">{data.modifiedKarmicLesson}</p>
     </div>
     
     <div className="mt-6">
       <h4 className="font-bold mb-2 text-lg text-indigo-700">Karmic Lesson</h4>
       <p className="text-gray-700 whitespace-pre-line">{data.karmicLesson}</p>
     </div>
     {intensityVisual}
   </div>
 );
};

// The Challenge/Growth Number Chart Component (CHART 9)
const ChallengeGrowthChart = ({ number }) => {
 const challengeGrowthData = {
   0: {
     title: "N/A",
     challenge: "In the early years, the individual is likely to have difficulty acting on his preferences. He is perfectly capable of analyzing a situation, realistically comparing possible solutions. Having sorted out alternatives, the individual has difficulty taking the requisite action. He's likely to have all sorts of excuses or rationalizations, but he effectively hinders his own development.\n\nThe individual must simply learn to have faith in himself—having indicated a preference, he must act. With a little practice, he's likely to find that taking action on his preference will prove as beneficial as he had hoped. Eventually, given enough practice, he can analyze, make a choice, then act with ease and comfort.",
     growth: "Not applicable"
   },
   1: {
     title: "Individuation, Independence, Attainment",
     challenge: "In the early years, the individual is likely to feel dominated by others with strong influence, probably parents or others on whom he is dependent. He's apt to feel that his desires are not being met, that his needs are being opposed. To feel less restricted, he may try to please everyone, but he'll find little satisfaction in that endeavor. He'll probably end up displeased himself, as well as confused and resentful.\n\nThe individual must learn to take stock of a situation (taking others' needs into account as well as his own), then, using the courage of his convictions, move forward in the direction of his choice. He must be careful not to end up dominating others, but he must remain watchful not to be dominated himself.",
     growth: "The individual must act in an independent manner, but must not confuse independence with dominance. He has to remember that others' needs must be taken into account. He shouldn't give in to restrictive or limiting forces tending to keep him dependent, particularly in the younger years.\n\nThe individual should express his original ideas in appropriate circumstances. Shyness, fear of rejection or intimidation, especially in youth and young adulthood may make the expression of these ideas difficult. Vital opportunities may be lost because of the individual's reticence.\n\nHe should fill a leadership role when it is offered, although his leadership style may not be in the expected or commonly accepted mode."
   },
   2: {
     title: "Relation, Cooperation",
     challenge: "In the early years, the individual is likely to be extremely sensitive—he's likely to be fearful, timid, lacking self-confidence, brimming with feeling. It may be difficult for him to work with others because he's so afraid of being hurt by an unkind word or action or, worse yet, by being ignored. He's apt to be constantly worried about others opinions of him.\n\nHe's using his sensitivity with negative emphasis. His positive sensitivity can be an important strength, allowing him to be acutely aware of so much of which others have little inkling, to make significant connections between awarenesses which others can barely fathom. He must learn that his extreme powers of discrimination do not make him weak and inferior—but rather strong and superior.",
     growth: "The individual must promote harmony, even if the effort tends to make his own contribution less visible. He shouldn't be so shy or self-effacing that his efforts go unnoticed. There's a very fine balance here that, particularly in the younger years, may be difficult to achieve.\n\nThe individual should practice cooperation and adaptability. He should try to take care of others' needs at the same time he is meeting his own. He should try to be as sensitive as possible to the subtle, even unspoken, nuances of those around him.\n\nHe should express friendship and affection openly and directly. Fear of rejection may, especially at first, make this expression difficult, but the acknowledgement of his feelings by others may prove to be a vital link in his personal development."
   },
   3: {
     title: "Expression, Joy of Living",
     challenge: "In the early years, the individual is likely to be hiding his creativity as well as his social abilities. He's apt to feel shy, have difficulty expressing himself well, be fearful of criticism. He's likely to find it easier to hide in the background at social affairs—he may feel uncomfortable making conversation or being himself. He probably does little to develop his potential gift with words.\n\nHe's expressing himself with negative emphasis. The positive expression he can develop can be an important strength. He must develop his capability to get on well with others—to be a good conversationalist, to express his optimism and enthusiasm, to grace any social affair. His creative abilities—possibly with words; writing, singing, acting—can be developed to bring pleasure to others as well as personal satisfaction.",
     growth: "The individual must approach his experiences with optimism and enthusiasm. His input may vitalize an endeavor with productive excitement.\n\nHe should express his creativity. Fear of rejection may make this expression difficult, particularly when he's expressing in unique or daring ways. He has to learn to offer his creative input and then let others learn to deal with it. He should express his delight in people and social activities openly and warmly."
   },
   4: {
     title: "Limitation, Order, Service",
     challenge: "In the early years, the individual is likely to have difficulty accomplishing his work effectively. He may dislike work, avoid it if possible, or approach it in careless fashion, with little concentration or sense of practicality. Or he may approach work in a rigid manner, working hard but with little awareness of the implications of the job at hand, possibly unable or unwilling to see the forest for the trees.\n\nHe's expressing himself with negative emphasis. His positive potential, his ability to work and produce can be an important strength. He must develop his capacity to work hard and well, to accomplish his tasks with patience, understanding, practicality, to be aware of the details involved and to work within the parameters of a given schedule.",
     growth: "The individual must work within the limitations he finds, in a positive manner. He must not succumb to frustration. He has to be careful not to be trapped because of a plodding manner or a narrow path. Learning to accept limitations is far different than falling victim to limitations, but the difference may be difficult to see at times. He must learn when the limitations can be changed rather than accepted.\n\nHe should try to be systematic and orderly, to organize with a strong awareness of the practical. The individual should be of service to others, though much hard work and patience may be required. He should concentrate on the satisfaction of the service rather than the difficulty of the work."
   },
   5: {
     title: "Constructive Freedom",
     challenge: "In the early years, the individual is likely to have difficulty taking full advantage of his opportunities. He's apt to be restless, impatient, impulsive, even erratic. He's likely to tire quickly of one opportunity, move on to the next as soon as it appears. In matters involving physical pleasures such as eating, sex, drink or drugs, he may limit his potential with a poor sense of proportion or timing. His need for security is likely to be poorly fulfilled by continuing to cling to some situations long after the promise has been developed.\n\nHe's using his freedom, his opportunities to expand, with negative emphasis. He must learn to pick and choose among these opportunities, develop the best of these in a responsible manner, move on only after he's accomplished what he set out to do. He must learn to curb his restlessness in the interest of achieving the lasting satisfactions he needs.",
     growth: "The individual must expand his opportunities with his versatility and adaptability without running himself ragged and accomplishing little. He shouldn't jump erratically from exciting experience to exciting experience—he should use these opportunities for excitement along with learning. He should use his time and energy wisely—he shouldn't start unless he intends to proceed, shouldn't stick to something after the experience is completed, shouldn't jump to the new only because it's the new.\n\nThe individual should explore physical pleasures—eating, sex, drinking, drugs—as part of a balanced life, not as ends in themselves."
   },
   6: {
     title: "Balance, Responsibility, Love",
     challenge: "In the early years, the individual is likely to have difficulty because of his insistence on his high standards. He's apt to appear authoritarian, intolerant, self-righteous. He's probably unhappy because he feels that no one measures up to his superior principles or shows any appreciation of his struggles to uplift others.\n\nHe's using his potential for balancing affairs with negative emphasis. He must, instead, develop his potentially superior skill at harmonizing situations. He must learn that his diplomatic approach will only be appreciated if others feel that their needs are met, their desires understood, their points of view respected. He must learn to allow others to set their own pace, make their own rules. He must learn to express his unconditional love and acceptance.",
     growth: "The individual must help where help is needed. He should learn to accept the responsibilities he finds and carry through with understanding and poise. He should learn to adjust and balance the forces he finds.\n\nHe should contribute his efforts to make his home a beautiful, protected, stable and helping environment.\n\nHe must learn to give out friendship, affection and love and gracefully accept others' friendship, affection and love in return."
   },
   7: {
     title: "Analysis, Understanding",
     challenge: "In the early years, the individual is likely to have difficulty because of his discomfort with the situations he finds, situations aggravated by his reserved attitude and unexpressed feelings. He's likely to feel hopeless about bettering his situation, unable to act to relieve or change matters. He's probably a complainer, often extremely critical, with little or nothing to offer in the way of help.\n\nHe's using his potential for discrimination with negative emphasis. He must study to find the nature of wisdom. He must learn to share his knowledge and sense of discrimination with open feelings, to have faith in his abilities (rather than being afraid to use them), to respond helpfully when difficulties arise. He must learn to approach others without reserve or aloofness.",
     growth: "The individual should retire into his very depths to find faith and peace. Peace will come from within—it will have little to do with money or material matters.\n\nHe must learn to trust his intuition to lead in directions of growth. He must wait, when necessary, with patience. He should learn the pleasure of spending time alone—studying, meditating, searching for wisdom and hidden truths."
   },
   8: {
     title: "Material Satisfaction",
     challenge: "In the early years, the individual is likely to assume that satisfaction can only be gained and safeguarded by adequate material accumulation. There's likely to be considerable effort exerted to attain money, status and power, sometimes to the exclusion of almost all else.\n\nHe's using his concern with material matters with negative emphasis. He must learn to use his ability to gain money, status and power with a sense of proportion and an awareness of the relation of material affairs to other matters. He must learn to deal with the material world in a comfortable manner.",
     growth: "The individual should aim for success with balance in the material world. He should treat the achievement of money, status and power as a means to the end of achieving understanding and pleasure. He should recognize that money, status and power are only one means of achieving this end, but they are significant means and should not be ignored.\n\nThe individual must learn how to accumulate money, how to handle money, how to spend money. He should learn to avoid the pressure of needing more money than is comfortably available."
   },
   9: {
     title: "Selflessness, Humanitarianism",
     challenge: "Not applicable",
     growth: "The individual must learn to give of himself for the pleasure of giving. He may give money, time, friendship, affection, love, understanding or sympathy. He should give with little expectation of return or reward and should allow the needs of others to take precedence over his personal ambitions. This seemingly difficult direction can produce the deepest of satisfactions."
   },
   11: {
     title: "Illumination",
     challenge: "Not applicable",
     growth: "The individual must learn to develop his intuition to pick up added awarenesses of the spiritual (non-material) world. He should visualize himself as a channel of special awareness.\n\nHe should spread his understandings with humility and inspire others by his example, based on the purity of his learning of the deepest spiritual truths. He should learn to communicate about these spiritual matters in a world primarily interested in material affairs, and should proceed despite the seeming discouragements."
   },
   22: {
     title: "Master Builder",
     challenge: "Not applicable",
     growth: "The individual must learn to focus his high-level insights to develop significant material projects. The power to achieve important goals may grow from his practical yet idealistic philosophy along with his sincere desire to benefit others."
   }
 };

 if (!challengeGrowthData[number]) {
   return <p>Select a number to view its Challenge/Growth information.</p>;
 }

 const data = challengeGrowthData[number];
 // Add visualization
const challengeVisual = <ChallengeGrowthVisualization number={number} />;

 return (
   <div className="bg-white/30 backdrop-blur-md rounded-lg p-6 shadow-lg">
     <div className="mb-4">
       <h3 className="text-2xl font-bold text-indigo-900">{number}: {data.title}</h3>
     </div>
     
     <div className="mt-4">
       <h4 className="font-bold mb-2 text-lg text-indigo-700">Challenge</h4>
       <p className="text-gray-700 whitespace-pre-line">{data.challenge}</p>
     </div>
     
     <div className="mt-6">
       <h4 className="font-bold mb-2 text-lg text-indigo-700">Growth Number</h4>
       <p className="text-gray-700 whitespace-pre-line">{data.growth}</p>
     </div>
     {challengeVisual}
   </div>
 );
};

// The Maturity Number Chart Component (CHART 10)
const MaturityNumberChart = ({ number }) => {
 const maturityData = {
   1: {
     title: "Individuation, Independence, Attainment",
     strongSimilarEnergy: "At maturity, there's likely to be a reevaluation of the meaning of independence in the subject's life. This mid-life appraisal is apt to focus on whether the individual's ability to stand on his own two feet\n• has been satisfactorily achieved or whether he still feels dependent, OR\n• has been achieved by taking care of his own needs, causing a lack of closeness with others, OR\n• has been achieved by domination of others.\nHe'll also probably assess whether the independence he sought and, at least to some extent, achieved has enabled him to move on to leadership roles along with a sense of attainment of meaningful ends.\nAt this time in the life, the individual is likely to revise at least some attitudes and actions in regard to independence, in order to achieve a more comfortable relation with others.",
     noStrongSimilarEnergy: "At maturity, a new sub-lesson is introduced: learning the meaning of independence. Since the 1 energy hasn't been a factor in the life up to this time, it's likely that there have been few problems relating to independence. The individual was probably satisfied or disinterested in his relation with others relative to dependence/independence. At maturity, there's apt to be a shift in the life, bringing problems of independence to center stage. This shift may be due to one of the following:\n• a financial arrangement which allowed him to be independent may end or change, OR\n• a spouse who supported him/her (financially or emotionally) may move out of the life through separation or death, or may not be able to continue the support because of sickness or financial reversal, OR\n• an awareness of women's increased freedom (or children growing up) may change a woman's view of herself as well as her role in relation to her husband, OR\n• a parent (or child) who previously led his/her own life may, because of illness, death or financial reversal become dependent on him.\nAt this time in the life, the individual is likely to face some decisions about attitudes and actions in regard to dependence/independence in order to gain more control of his own life.",
     karmicMaturity: "The subject is likely to find obstacles in his path due to:\n• his confusion of independence with self-centeredness, OR\n• strong pressures keeping him from breaking out of a dependent situation in which he is involved."
   },
   2: {
     title: "Relation, Cooperation",
     strongSimilarEnergy: "At maturity, there's likely to be a reevaluation of the satisfactions derived from the subject's sensitivity. This mid-life appraisal is apt to focus on\n• whether the individual has developed so that his strong sensitivity can be comfortably used, OR\n• whether the individual has learned how to say and do what he needs without feeling his sensitivity compromised, OR\n• whether shyness or uncertainty block him from a full expression of his sensitivity.\nAt this time in the life, the individual is likely to revise some attitudes and actions in order to better express his sensitivity and to better receive others' friendship and affection as a reward for that expression.",
     noStrongSimilarEnergy: "At maturity, a new sub-lesson is introduced: learning the satisfaction of using sensitivity. Since the 2 energy hasn't been a factor in the life up to this time, it's likely that there have been few problems relating to sensitivity. The individual probably had little concern about his sensitivity or its expression. At maturity, there's apt to be a shift in the life bringing problems of sensitivity to center stage. This shift may be due to one of the following:\n• sensitive treatment by others—family or close friends in particular—may make individual aware of the beauty of sensitivity and bring on a desire to develop personal sensitivity, OR\n• insensitive treatment of individual by others (or of others by individual) may cause significant pain and spark an appraisal leading to a desire to better express sensitivity, OR\n• difficulty in receiving any satisfying acknowledgement of sensitivity or contributions based on this sensitivity may trigger a desire for more contentment here.\nAt this time in the life, the individual is likely to face some decisions about his attitudes and actions in order to feel increased fulfillment in the expression and acknowledgment of his sensitivity.",
     karmicMaturity: "Not applicable"
   },
   3: {
     title: "Expression, Joy of Living",
     strongSimilarEnergy: "At maturity, there's likely to be a reevaluation of how well the subject has learned the joy of expression. This mid-life appraisal is apt to focus on\n• whether the individual is comfortable giving of himself openly, warmly, spontaneously, OR\n• whether the individual enjoys himself and is enjoyed by others at social gatherings, OR\n• whether the individual enjoys expressing himself artistically and creatively.\nAt this time in the life, the individual is likely to revise at least some attitudes and actions in order to express himself more fully and freely.",
     noStrongSimilarEnergy: "At maturity, a new sub-lesson is introduced: learning the joy of expression. Since the 3 energy hasn't been a factor in the life up to this time, it's likely that the joy of self-expression has barely been approached. Shyness, too much sensitivity, heavy responsibilities may be some of the rationalizations used to explain the lack of development in this area.\nAt maturity, there's apt to be a shift in the life, bringing the awareness of the lack of self-expression to center stage. This shift may be due to one of the following:\n• the individual may become aware of how little he plays, how little fun he has, how rarely he can act and enjoy as he did as a child, OR\n• the individual may become aware of how delightful it can be to associate with others expressing optimism, enthusiasm and fun. Comparing his own austere ways, he may seek to brighten his life, OR\n• with time on his hands due to illness or loneliness, the individual may turn to creative and artistic pursuits which previously frightened or bored him.\nAt this time in the life, the individual is likely to face some decisions about his attitudes and actions in regard to his own self-expression in order to receive more satisfaction out of life.",
     karmicMaturity: "Not applicable"
   },
   4: {
     title: "Limitation, Order, Service",
     strongSimilarEnergy: "At maturity, there's likely to be a reevaluation of the ability to live with the law of limitation. (See CHART 2: LIFE PATH, under 4 Life Path Central Focus) This mid-life appraisal is apt to focus on\n• whether the individual has felt restricted and frustrated by the limitations he's encountered, OR\n• whether the individual has accepted the limitations he's encountered as part of the fabric of his life, at least to some extent.\nAt this time in the life, the individual is likely to revise at least some attitudes and actions in regard to restrictions. He may want to become more aware of restrictions which are unknowingly self-imposed, restrictions which cannot be changed along with restrictions which can be removed or adjusted for the better.",
     noStrongSimilarEnergy: "At maturity, a new sub-lesson is introduced: learning to live with the law of limitations. (See CHART 2: LIFE PATH, under 4 Life Path Central Focus) Since the 4 energy hasn't been a factor in the life up to this time, it's likely that little attention has been paid to restrictions. At maturity, there's apt to be a shift in the life, bringing the awareness of limitations to center stage. This shift may be due to one of the following:\n• a free and loose approach to life has met with poor results: a broken marriage, alienated children, ruined business, lost friends, OR\n• a serious, responsible approach to life, with a consistent struggle to overcome the obstacles, has met with poor results: a broken marriage, alienated children, ruined business, lost friends.\nAt this time in the life, the individual is likely to face some decisions about attitudes and actions toward restrictions. An awareness of the law of limitation and its practical applications may make an astonishing difference in the approach to many situations and give the subject the ability to better control his own life.",
     karmicMaturity: "The subject is likely to find obstacles in his path due to:\n• his rigid, obstinate or dogmatic ways, OR\n• his lack of application to work. He may have more work to do than others, but unless he proceeds with it, it becomes an obstacle, OR\n• his inability to satisfactorily take care of the details."
   },
   5: {
     title: "Constructive Freedom",
     strongSimilarEnergy: "At maturity, there's likely to be a reevaluation of the subject's constructive use of freedom. This mid-life appraisal is apt to focus on\n• whether the individual has been exhilarated (or exhausted or frustrated) by the variety, change, unexpected in the life, OR\n• whether the individual has been able to focus his energies so that he's been able to grow and develop by adapting to the changes which he so often finds.\nAt this time in the life, the individual is likely to revise at least some attitudes and actions in regard to the constructive use of freedom, so that he can make the best use of opportunities as they present themselves without being overwhelmed by them.",
     noStrongSimilarEnergy: "At maturity, a new sub-lesson is introduced: learning the exhilaration of the constructive use of freedom. Since the 5 energy hasn't been a factor in the life up to this time, it's likely that there has been little attention paid to the possibilities for growth and development presented by the variety of opportunities opened to the individual. At maturity, there's apt to be a shift in the life, bringing an awareness of freedom to center stage. This shift may be due to one of the following:\n• a breakup of one of the major stabilizing factors in the individual's life—end of marriage or business, move to another locale, death of parent(s), children leaving home, OR\n• generation of freedom by significant money from business, inheritance or unexpected source, OR\n• generation of freedom by abandonment of self-imposed heavy responsibilities such as high-level job pressures, OR\n• developing awareness of discomfort of serious, responsible approach previously regarded as only sensible avenue.\nAt this time in the life, the individual is likely to face some decisions about attitudes and actions in regard to freedom in order to give himself more control of his own life as well as a sense of deeper satisfaction.",
     karmicMaturity: "The subject is likely to find obstacles in his path due to:\n• his inability to profit from his experiences instead of repeating mistakes, OR\n• his excessive appetite for physical stimulation: eating, sensuality, liquor, drugs."
   },
   6: {
     title: "Balance, Responsibility, Love",
     strongSimilarEnergy: "At maturity, there's likely to be a reevaluation of the pleasure received in handling responsibility and exchanging affection. This mid-life appraisal is apt to focus on:\n• whether responsibility has been handled to produce satisfaction for the individual, OR\n• whether friendship, affection and love have been given and received to meet the individual's needs.\nAt this time in the life, the individual is likely to revise at least some attitudes and actions in regard to responsibility and affection, in order to achieve more satisfaction out of life.",
     noStrongSimilarEnergy: "At maturity, new sub-lessons are introduced: (1) learning the deep pleasure in handling responsibility and (2) learning to give and receive friendship, affection and love. Since the 6 energy hasn't been a factor in the life up to this time, it's likely that there have been few problems in relation to responsibility or affection. At maturity, there's apt to be a shift in the life, bringing problems of responsibility or affection to center stage. This shift may be due to one of the following:\n• economic changes which may increase personal responsibilities, OR\n• marriage, separation, divorce or illness which may increase personal responsibilities for children, OR\n• change of circumstances which may require assistance with aging parent(s).\nAlong with the change in responsibility, there's likely to be a desire for friendship, affection and love, a desire which may not have been particularly strong in the years before maturity. At this time in the life, the individual is likely to face some decisions about attitudes and actions in these areas in order to achieve more satisfaction out of life.",
     karmicMaturity: "Not applicable"
   },
   7: {
     title: "Analysis, Understanding",
     strongSimilarEnergy: "At maturity, there's likely to be a reevaluation of the peace of mind that comes with knowing oneself. This mid-life appraisal is apt to focus on whether the subject has used his fine mind and good intuition to study and contemplate the deeper truths, and whether he's found, in the process, a deepening peace and faith as a mainstay of his existence.\nAt this time in the life, the individual is likely to revise at least some attitudes and actions in order to more fully experience the possibilities of peace and faith.",
     noStrongSimilarEnergy: "At maturity, a new sub-lesson is introduced: learning the peace of mind that comes with knowing oneself. Since the 7 energy hasn't been a factor in the life up to this time, there's probably been little attention paid to this introspective aspect of the life. At maturity, there's apt to be a shift in the life, bringing a new awareness of spiritual matters to center stage. This shift may be due to one of the following:\n• the experience of another person (or group) who has achieved peace of mind may lead the individual to search in a similar direction, OR\n• a personal crisis of extraordinary magnitude may propel the individual toward spiritual explorations which haven't previously been of any concern, OR\n• an awareness of the emptiness or dissatisfactions of the life or a need for more fulfillment may lead the individual to spiritual explorations.\nAt this time in the life, the individual is likely to face some decisions about attitudes and actions in regard to his search for peace of mind and spiritual fulfillment.",
     karmicMaturity: "The subject is likely to find obstacles in his path due to:\n• his apparent 'differentness,' making it difficult for others to approach, OR\n• his outward actions, often not what others expect, which may be disconcerting or confusing to others, OR\n• his strong introspective needs, possibly turning to or interpreted as self-centeredness."
   },
   8: {
     title: "Material Satisfaction",
     strongSimilarEnergy: "At maturity, there's likely to be a reevaluation of the satisfactions obtained with the material freedom and power that has been achieved. This mid-life appraisal is apt to focus on whether the current vocation (or the position in the current vocation) meets the individual's needs for money, power and status.\nFor some individuals, maturity may involve a new relation to the material world because of the growth of children, divorce, separation or new feelings about themselves and their earning power. Previous material satisfactions may no longer be available because of a decreased income, or, additional material satisfactions may become available due to their own business acumen.\nAt this time in the life, the individual is likely to revise at least some attitudes and actions in regard to material freedom in order to achieve deeper satisfaction along with a better control of the life.",
     noStrongSimilarEnergy: "At maturity, a new sub-lesson is introduced: learning the satisfactions of the material world, and the power which comes with its mastery. Since the 8 energy hasn't been a factor in the life up to this time, it's likely that the problems (and lessons) of the material world have been of little consequence. The individual was probably well-provided for (possibly by others), or at least adequately provided for so that he had no need to struggle with material problems. At maturity, there's apt to be a shift in the life, bringing the problems of the material world to center stage. This shift may be due to one of the following:\n• reevaluation of the vocation, possibly in comparison to others' achievements in the same or similar vocations, OR\n• desire to shift to a completely different vocation, possibly due to higher money, status, power possible in the new vocation, or desire for satisfaction above prestige, OR\n• awareness of approaching retirement and need to provide adequately, OR\n• economic changes which may affect financial responsibilities.\nAt this time in the life, the individual is likely to face some decisions about his attitudes and actions in regard to the material world in order to achieve deeper satisfaction.",
     karmicMaturity: "Not applicable"
   },
   9: {
     title: "Selflessness, Humanitarianism",
     strongSimilarEnergy: "At maturity, there's likely to be a reevaluation of the beauty of giving of oneself for the deep satisfaction of giving, without thought of reward or return. This mid-life appraisal is apt to focus on:\n• whether the individual has indeed found beauty in giving selflessly, OR\n• whether the individual has even been able to approach giving selflessly, or has only operated on this high level sporadically.\nAt this time in the life, the individual is likely to revise at least some attitudes and actions in regard to selfless giving in order to achieve deeper satisfactions. He may prefer to give up on this lesson altogether because of its difficulty and its seeming lack of satisfaction. The numerologist can only indicate the potential satisfaction. The individual travels his own path.",
     noStrongSimilarEnergy: "At maturity, a new (and difficult) sub-lesson is introduced: learning the beauty of giving of oneself solely for the deep satisfaction of giving, without thought of reward or return. Since the 9 energy hasn't been a factor in the life up to this time, it's likely that little attention has been paid to this high-level lesson. At maturity, there's apt to be a shift in the life, bringing a new awareness of selfless giving to center stage. This shift may be due to one of the following:\n• a new spiritual awareness, OR\n• the realization that selfishness and the resultant lack of giving has not given the individual a sense of satisfaction, OR\n• an experience of selfless giving by the individual (or to the individual) that brings deep satisfaction, OR\n• an experience with a humanitarian person or group which opens the eyes to a perception of the satisfaction.\nAt this time in the life, the individual is likely to face some decisions about attitudes and actions in regard to selfless giving in order to feel a sense of deeper satisfaction.",
     karmicMaturity: "Not applicable"
   },
   11: {
     title: "Illumination",
     strongSimilarEnergy: "At maturity, there's likely to be a reevaluation of the importance of learning an awareness of the spiritual world and the relation of that world to the material world. This mid-life appraisal is apt to focus on:\n• whether the spiritual world has even been approached, OR\n• whether the awareness of the spiritual world has proved a positive influence, OR\n• whether the awareness of the relation between the material and spiritual world has proved a positive influence.\nAt this time in the life, the individual is likely to revise at least some attitudes and actions in order to achieve deeper satisfactions. He may prefer to give up on this lesson altogether because of its difficulty and its seeming lack of satisfaction. The numerologist can only indicate the potential satisfaction. The individual travels his own path.",
     noStrongSimilarEnergy: "At maturity, a new (and difficult) sub-lesson is introduced: learning the glory of the awareness of the spiritual world and the relation of that world to the material world. Since the 11 energy hasn't been a factor in the life up to this time, it's likely that little attention has been paid to this high level lesson. At maturity, there's apt to be a shift in the life, bringing a new awareness of the relation of the spiritual and material worlds to center stage. This shift may be due to one of the following:\n• an enlightening experience that allows him to glimpse the beauty of the spiritual world, OR\n• an experience in the material world that provides the realization that other forces may be necessary for ultimate satisfaction.\nAt this time in the life, the individual is likely to face some decisions about attitudes and actions in regard to his awareness of the spiritual/material worlds in order to feel a sense of deeper satisfaction. This difficult new sub-lesson may not be approached at all. The individual may prefer to ignore this sub-lesson and concentrate on the alternative 2 sub-lesson.",
     karmicMaturity: "Not applicable"
   },
   22: {
     title: "Master Builder",
     strongSimilarEnergy: "At maturity, there's likely to be a reevaluation of the importance of the mastery achieved by combining the highest ideals with the power to achieve significant material goals. This mid-life appraisal is apt to focus on:\n• whether this high-level lesson has even been approached, OR\n• whether this high-level lesson seems at all attainable, OR\n• whether the approach to date has been productive of at least some of its goals.\nAt this time in the life, the individual is likely to revise at least some attitudes and actions in order to achieve deeper satisfactions. He may prefer to give up on this lesson altogether because of its difficulty and its seeming lack of satisfaction. The numerologist can only indicate the potential satisfaction. The individual travels his own path.",
     noStrongSimilarEnergy: "At maturity, a new (and difficult) sub-lesson is introduced: learning the mastery to be achieved by combining the highest ideals with the power to achieve significant material goals. Since the 22 energy hasn't been a factor in the life up to this time, it's likely that little attention has been paid to this high-level lesson. At maturity, there's a shift in the life, bringing a new awareness of the potential use of this power to center stage. This shift may be due to one of the following:\n• substantial mastery of the core energies prior to maturity may spark the feeling that even more may be achieved, OR\n• a desire to benefit mankind may produce the need to explore the outer limits of personal powers.\nAt this time in the life, the individual is likely to face some decisions about attitudes and actions in regard to his potential powers in order to feel a sense of deeper satisfaction. This difficult new sub-lesson may not be approached at all. The individual may prefer to ignore this sub-lesson and concentrate on the alternative 4 sub-lesson.",
     karmicMaturity: "Not applicable"
   }
 };

 if (!maturityData[number]) {
   return <p>Select a number to view its Maturity Number information.</p>;
 }

 const data = maturityData[number];
 // Add visualization
const maturityVisual = <MaturityVisualization number={number} />;

 return (
   <div className="bg-white/30 backdrop-blur-md rounded-lg p-6 shadow-lg">
     <div className="mb-4">
       <h3 className="text-2xl font-bold text-indigo-900">{number}: {data.title}</h3>
     </div>
     
     <div className="mt-4">
       <h4 className="font-bold mb-2 text-lg text-indigo-700">Maturity Number with Strong Similar Energy</h4>
       <p className="text-gray-700 whitespace-pre-line">{data.strongSimilarEnergy}</p>
     </div>
     
     <div className="mt-6">
       <h4 className="font-bold mb-2 text-lg text-indigo-700">Maturity Number with No Strong Similar Energy</h4>
       <p className="text-gray-700 whitespace-pre-line">{data.noStrongSimilarEnergy}</p>
     </div>
     
     {data.karmicMaturity && (
       <div className="mt-6">
         <h4 className="font-bold mb-2 text-lg text-indigo-700">Karmic Maturity Number</h4>
         <p className="text-gray-700 whitespace-pre-line">{data.karmicMaturity}</p>
       </div>
     )}
     {maturityVisual}
   </div>
 );
};

// The First Letter Chart Component (CHART 11)
const FirstLetterChart = ({ letter }) => {
 const firstLetterData = {
   'A': {
     number: 1,
     title: "Dynamic Leader",
     description: "See Chart No. 12: The First Vowel."
   },
   'J': {
     number: 1,
     title: "Indecisive Leader",
     description: "• Leader.\n• Ambitious, usually in a quiet way.\n• Assertive at times, only occasionally aggressive.\n• Optimistic, recovers well from difficulties.\n• Good mind.\n• Excellent ideas.\n• Original or innovative approach.\n• Broad perspective may make it difficult to get started. Once started, leadership is likely to come to the fore, but progress may be plagued by indecision."
   },
   'S': {
     number: 1,
     title: "Emotional Leader",
     description: "• Leader.\n• Very creative. Dramatic flashes of insight.\n• Ambitious. Concerned with impressions made by achievements.\n• Independent. Courageous.\n• Expresses individuality, often dramatically.\n• Very emotional. Clear thinking may be affected by the depth of feelings.\n• Erratic course of action with the possibility of setbacks because of difficulty in analyzing clearly."
   },
   'B': {
     number: 2,
     title: "Sensitive Helper",
     description: "• Shy and retiring. Self-contained. Often indecisive.\n• Usually more comfortable in subservient role. Prefers being a follower rather than a leader. Works better with others than alone. Very cooperative.\n• Fosters and helps develop harmony in groups in which he's involved.\n• Good at taking care of all the details.\n• May, at times, be critical of self and others.\n• Extremely sensitive and emotional. May be hurt by others' lack of sensitivity.\n• Needs affection. Seeks it in own quiet way.\n• May have difficulty working with others in a hurry or those who want to cut corners."
   },
   'K': {
     number: 2,
     title: "Intuitive Inspirer",
     description: "See 11 page of this chart."
   },
   'T': {
     number: 2,
     title: "Emotional Helper",
     description: "• Usually more comfortable in subservient role. Prefers being a follower rather than a leader.\n• Expects much from others, but is usually patient in helping others develop to expectations.\n• Generally works well with others, although likely to become anxious when problems develop. May, at times, be critical of self and others.\n• Seeks higher level enlightenment.\n• Extremely emotional and high strung.\n• Enjoys closeness of marriage, family.\n• Often self-sacrificing."
   },
   'C': {
     number: 3,
     title: "Spontaneous Creator",
     description: "• Spontaneity of creative inspiration.\n• Very verbal. Often much originality with words and ideas.\n• Sensitive. Sometimes easily hurt.\n• Friendly and sociable. Enjoys social activities, the lighter side of life.\n• Expresses joy of living with exhilaration.\n• Psychic, though often latent."
   },
   'L': {
     number: 3,
     title: "Reasoning Creator",
     description: "• Creative abilities express slowly, surely, in a measured manner.\n• Verbal. Often much originality with words and ideas.\n• Sensitive.\n• Friendly and sociable. Enjoys social activities, the lighter side of life.\n• Expresses joy of living.\n• Fine reasoning ability and powers of analysis."
   },
   'U': {
     number: 3,
     title: "Sensitive Receptor",
     description: "See Chart No. 12: The First Vowel."
   },
   'D': {
     number: 4,
     title: "Steady Builder",
     description: "• Hard worker. Self-disciplined.\n• Serious. Steady. Thorough.\n• Conservative, sometimes narrow approach. Rigid attitudes may cause problems.\n• Tends to show little emotion.\n• Self-contained. Operates well with little deep contact with others.\n• Follows instructions precisely and completely.\n• Extremely well-developed approach to material, practical affairs.\n• Does mundane work efficiently.\n• Works steadily, efficiently to complete a project."
   },
   'M': {
     number: 4,
     title: "Controlled Builder",
     description: "• Hard worker. Self-disciplined.\n• Serious. Steady. Thorough.\n• Controlled approach. Often limited viewpoint. Usually accepts the given limits instead of expanding the potential.\n• Repressed feelings may make him difficult to deal with and hard to get to know.\n• May be relatively inarticulate, have difficulty explaining his approach.\n• Organizational ability.\n• Well-developed approach to material, practical affairs.\n• Does mundane work efficiently.\n• Works steadily, efficiently to complete a project."
   },
   'V': {
     number: 4,
     title: "Inspirational Master",
     description: "See 22 page of this chart."
   },
   'E': {
     number: 5,
     title: "Adventurous Encounterer",
     description: "See Chart No. 12: The First Vowel."
   },
   'N': {
     number: 5,
     title: "Mental Encounterer",
     description: "• Adventurous.\n• Restless. Need for change, excitement, variety.\n• Adaptable.\n• Imaginative.\n• Seeks and enjoys confronting any and all experience.\n• Generally uses strong mental approach. Good at analysis.\n• Personal philosophy, based on rational approach to experience, is usually changing constantly.\n• Works extremely well with people. Knows how to use others to carry through ideas.\n• Restlessness shows in making decisions—often vacillates between several points of view."
   },
   'W': {
     number: 5,
     title: "Limiting Encounterer",
     description: "This chart describes W as consonant. See Chart No. 12: The First Vowel for W as a vowel.\n\n• Adventurous. Restless. Need for change, excitement, variety.\n• Excellent verbal abilities. Good at selling.\n• Tends to accept the given limits instead of expanding the potential.\n• Seeks and enjoys confronting any and all experience.\n• Often wants to express, but expression is usually limited because of more desire to experience than express.\n• Works extremely well with people. Others help carry through ideas.\n• Restlessness shows in making decisions—often vacillates between several points of view."
   },
   'F': {
     number: 6,
     title: "Struggling Harmonizer",
     description: "• Accepts much responsibility—his own and others. Responsibility is often related to home and family. Responsibility weighs heavily.\n• Can protect and care for others.\n• Innate desire to right wrongs.\n• Attracts situations requiring much in the way of adjustment.\n• Capable of much sacrifice.\n• Emotional. May withdraw when upset.\n• Sensitive and receptive.\n• Gives affection easily. Responds to affection. Is hurt by lack of affection."
   },
   'O': {
     number: 6,
     title: "Poised Harmonizer",
     description: "See Chart No. 12: The First Vowel."
   },
   'X': {
     number: 6,
     title: "Emotional Harmonizer",
     description: "• Accepts much responsibility—his own and others'. Responsibility is often related to home and family. Responsibility weighs heavily.\n• Can protect and care for others.\n• Capable of much sacrifice, but suffers from pressures created by sacrifice.\n• Extremely emotional. Must learn how to deal with his and others' feelings without being overwhelmed.\n• Life often full of crises, emotional upheavals.\n• Sometimes wallows in self-pity."
   },
   'G': {
     number: 7,
     title: "Reserved Thinker",
     description: "• Reserved, introspective. Manner causes misunderstanding.\n• Secretive.\n• May get lost in dreams. Needs firmer grounding in and understanding of reality.\n• Works best alone. Often lonely.\n• Doesn't respond readily to affection. Gives little affection.\n• Often anxious and lacking confidence.\n• Much willpower. Keen mind. Given to thought and meditation.\n• Enjoys analysis of fundamentals, philosophical speculation."
   },
   'P': {
     number: 7,
     title: "Inexpressive Thinker",
     description: "• Reserved, introspective. Manner causes misunderstandings.\n• Secretive.\n• Works best alone. Often lonely.\n• Feels deeply, but not always sure of or comfortable with his feelings. Expresses and shares little of his thoughts and feelings.\n• Keen mind. Given to thought and meditation.\n• Enjoys analysis of fundamentals, philosophical speculation.\n• Usually lacks determination and willpower."
   },
   'Y': {
     number: 7,
     title: "Uncertain Thinker",
     description: "This chart describes Y as a consonant. See Chart No. 12: The First Vowel for Y as a vowel.\n\n• Reserved, introspective. Manner causes misunderstandings.\n• Secretive.\n• Works best alone. Often lonely. Often uncertain and vacillating.\n• Feels deeply. Expresses and shares little of these feelings.\n• Extremely keen mind. Given to thought and meditation.\n• Enjoys analysis of fundamentals, philosophical speculation.\n• Extremely perceptive. Fine intuition.\n• Deep insights into higher matters.\n• Strong psychic power. Must learn to trust it."
   },
   'H': {
     number: 8,
     title: "Aware Achiever",
     description: "• High level consciousness helps bring extreme awareness of the material world.\n• Executive and leadership ability.\n• Works well with others.\n• Operates well in material world with strong mental capability. Uses good mind to achieve material success—money, power, status.\n• Keen perceptions of people, events.\n• Strong desire for advance may be blunted by changing ideas."
   },
   'Q': {
     number: 8,
     title: "Non-conformist Achiever",
     description: "• Large potential power, not always used in a balanced productive manner.\n• Inputs dramatic energy levels into projects with which he associates.\n• Capable of superior material achievement—money, power, status—if he can proceed without being self-centered or greedy.\n• Superior leadership ability. Good at directing efforts to achieve desired ends.\n• Often espouses an independent, unusual (sometimes eccentric) position, no matter what opposition is created."
   },
   'Z': {
     number: 8,
     title: "Inspirational Achiever",
     description: "• Extremely dynamic energy.\n• Self-confidence and will-power.\n• Capable of leadership and attendant material achievements—money, power, status. Greed or lack of responsibility may hamper his achievements.\n• Capable of inspiring others.\n• Deep awareness of emotions—his own and others.\n• Can work through emotional crises with understanding.\n• Suffers through his own deep feelings and awarenesses."
   },
   'I': {
     number: 9,
     title: "Emotional Humanitarian",
     description: "See Chart No. 12: The First Vowel."
   },
   'R': {
     number: 9,
     title: "Selfless Humanitarian",
     description: "• Humanitarian. Selfless.\n• Great understanding and tolerance. Strong potential to help others. May be taken advantage of by others.\n• Significant power potential.\n• Idealistic. Sometimes led in impractical directions by idealistic views.\n• Much emotion. Often, considerable emotional upset.\n• Self-starter.\n• Inspirational approach."
   },
   'K': {
     number: 11,
     title: "Intuitive Inspirer",
     description: "• High potential for achievement.\n• High nervous tension.\n• Very open to spiritual awareness.\n• Can inspire others.\n• Receptive to others' feelings.\n• Helpful. Promotes harmony. Good at detail work.\n• Appreciates affection. Expresses much affection.\n• Much intuitive awareness on the highest level. Can translate these awarenesses so that others can use the understanding.\n• Very creative.\n• Power to achieve desired ends. Best results develop when care is taken not to dominate others.\n• Charisma aids in use of power."
   },
   'V': {
     number: 22,
     title: "Inspirational Master",
     description: "• Inspired leader.\n• Extremely receptive to spiritual revelation.\n• Builder, on the highest level.\n• Can envision ideas, convert ideas into practical form, organize people and resources, inspire confidence and loyalty.\n• Can convert spiritual awareness to material form.\n• High nervous tension.\n• Hard worker. Self-disciplined.\n• Serious. Steady. Thorough.\n• Practical.\n• Intuitive awareness is potential strong source of power."
   }
 };

 if (!firstLetterData[letter]) {
   return <p>Select a letter to view its First Letter information.</p>;
 }

 const data = firstLetterData[letter];
 // Add visualization
const letterVisual = <FirstLetterVisualization letter={letter} />;

 return (
   <div className="bg-white/30 backdrop-blur-md rounded-lg p-6 shadow-lg">
     <div className="mb-4">
       <h3 className="text-2xl font-bold text-indigo-900">{letter} ({data.number}): {data.title}</h3>
     </div>
     
     <div className="mt-4">
       <p className="text-gray-700 whitespace-pre-line">{data.description}</p>
     </div>
     {letterVisual}
   </div>
 );
};

// The First Vowel Chart Component (CHART 12)
const FirstVowelChart = ({ vowel }) => {
 const firstVowelData = {
   'A': {
     number: 1,
     longVowel: {
       title: "Dynamic Leader",
       description: "• Leader. Ambitious. Adventurous. Progressive.\n• Assertive, at the very least; often aggressive. Independent. Self-reliant.\n• Strong willpower and strong opinions. Accepts advice readily only if it's in same vein as own ideas.\n• Expresses individuality strongly.\n• Great deal of energy. Good mind. Creative mental approach.\n• Excellent ideas. Interested in new ideas but usually prefers to use own ideas.\n• Original or innovative approach. Will defend his approach no matter how much opposition he faces.\n• Pushes ahead with pioneering spirit. Loves to forge ahead in unknown territory.\n• Interest may lag after the start. May have difficulty completing projects."
     },
     shortVowel: {
       title: "Sensitive Leader",
       description: "• Leader, but doesn't always care to exert power.\n• Moderately adventurous. Progressive. Sometimes assertive.\n• With practice, develops independence, self-reliance.\n• Has own ideas, but willing to listen to others' ideas and incorporate all.\n• Individuality is expressed in a subdued manner.\n• Good mind. Creative mental approach. Excellent ideas.\n• Original or innovative approach. Will explain his approach and is willing to struggle with the opposition, but too much opposition may wear him down.\n• Pushes ahead with measured forward spirit. Enjoys moving cautiously into unknown territory."
     },
     combinedVowel: {
       title: "Sensitive Leader",
       description: "• Leader.\n• Some ambitions.\n• Moderate independence, self-reliance.\n• Individuality expressed in a subdued manner.\n• Good mind. Creative mental approach. Excellent ideas.\n• Original or innovative approach."
     }
   },
   'E': {
     number: 5,
     longVowel: {
       title: "Adventurous Encounterer",
       description: "• Adventurous. Often turns life situations into adventures.\n• Restless. Need for change, excitement, variety.\n• Impulsive. Aggressive.\n• Adaptable. Versatile.\n• Needs freedom in order to develop.\n• Often difficulties with marriage because of need for change, excitement. Marriage, on occasion, can provide stabilizing influence.\n• Much energy.\n• Much mental activity. Much stimulation.\n• Keep perceptions and judgements of people, motivations, events.\n• Helpful. Practical.\n• Much is started, often abandoned or set aside for later time."
     },
     shortVowel: {
       title: "Restless Encounterer",
       description: "• Enjoys adventure. Prefers freedom in order to develop.\n• Somewhat restless. Likes change, excitement, variety.\n• Adaptable. Versatile. Helpful. Practical.\n• Marriage needs much work, spouse with considerable understanding in order to succeed.\n• A good deal of energy, but often less energy than necessary to carry out the stimulating demands of his life.\n• Mental activity. Good perceptions and judgements.\n• A good deal is started, sometimes abandoned or set aside for later time, or given to others to continue and complete."
     },
     combinedVowel: {
       title: "Restless Encounterer",
       description: "• Adventurous.\n• Adaptable. Versatile.\n• Mental activity.\n• A good deal is started, but continuity may be lacking, sometimes causing discord."
     }
   },
   'I': {
     number: 9,
     longVowel: {
       title: "Emotional Humanitarian",
       description: "• Humanitarian. Giving. Serves others with love.\n• Sympathetic. Deep emotional understanding of others' needs.\n• Sensitive. Often too sensitive for good balance.\n• Willing to sacrifice for others. At times, may be disappointed with others' response or lack of appreciation.\n• Idealistic.\n• Artistic, creative.\n• Very intense. Much energy.\n• Conservative. Prefers to work in familiar territory.\n• Extremely deep feelings. The emotions rule (sometimes overwhelm) the mental faculties. Wild fluctuations in temperament possible—from joy to depression."
     },
     shortVowel: {
       title: "Restrained Humanitarian",
       description: "• Humanitarian. Giving.\n• Quietly sympathetic.\n• Sensitive.\n• Often willing to sacrifice for others.\n• Idealistic.\n• Artistic, creative.\n• Conservative. Works in familiar territory.\n• Some intensity at times. A good deal of energy.\n• Deep feelings, usually expressed with moderation. The emotions rule the mental faculties."
     },
     combinedVowel: {
       title: "Restrained Humanitarian",
       description: "• Humanitarian.\n• Sensitive.\n• Idealistic.\n• Artistic, creative.\n• Conservative.\n• Some intensity at times. A good deal of energy.\n• Feelings expressed with moderation."
     }
   },
   'O': {
     number: 6,
     longVowel: {
       title: "Poised Harmonizer",
       description: "• Takes on many responsibilities—often more than he can comfortably handle. Because he is so responsible, he may well be used by others.\n• Views role in life as giving service to others: family, friends, close community.\n• Attracts situations requiring much in the way of adjustment.\n• Concentrates well.\n• Conservative traits. Gives out little openly. Often content to follow traditional modes. Prefers a settled life with minimum change.\n• Innately knows how to protect self from life's storms. Self-contained. Secretive.\n• Deep emotions, but controlled so often not visible.\n• Creative, artistic. Enjoys beautiful domestic surroundings."
     },
     shortVowel: {
       title: "Protected Harmonizer",
       description: "• Responsible.\n• Gives service to others; family, friends, close community.\n• Attracts situations requiring much in the way of adjustment.\n• Sometimes, can create balance; at other times, contributes to imbalance.\n• Conservative. Traditional.\n• Extremely protected. Extremely self-contained. Secretive.\n• Extremely emotional, but only some of the feelings are displayed."
     },
     combinedVowel: {
       title: "Protected Harmonizer",
       description: "• Responsible.\n• Gives service.\n• Attracts situations requiring much in the way of adjustment.\n• Conservative. Traditional.\n• Protected. Self-contained.\n• Emotional. Some feelings displayed."
     }
   },
   'U': {
     number: 3,
     longVowel: {
       title: "Sensitive Receptor",
       description: "• Artistic, creative with measured approach. Although the creativity potential can be seen, there is often very little expressed.\n• Usually good with words.\n• Sensitive. Aware of others' feelings.\n• Strong emotions.\n• Friendly and sociable. Enjoys social activities, the lighter side of life.\n• Idealistic, but rarely attains idealistic ends.\n• Conservative approach. Rarely seeks initiative.\n• Extremely intuitive.\n• Indecisive approach.\n• May scatter energies."
     },
     shortVowel: {
       title: "Conservative Receptor",
       description: "• Artistic, creative potential. If expressed at all, expressed in slow, very conservative approach.\n• Capable of good communication, but often prefers not to express thoughts.\n• Sensitive. Aware of others' feelings.\n• Strong emotions, sometimes not expressed.\n• Idealistic desires, rarely communicated or developed.\n• Extremely conservative approach. Prefers not to take initiative.\n• Intuitive.\n• Indecisive approach.\n• May scatter energies."
     },
     combinedVowel: {
       title: "Conservative Receptor",
       description: "• Artistic, creative potential, often latent.\n• Either inexpressive or over-talkative. Either way, communicates little of deep thoughts.\n• Sensitive.\n• Deep feelings.\n• Idealistic.\n• Extremely conservative.\n• Intuitive.\n• Indecisive approach.\n• May scatter energies."
     }
   },
   'Y': {
     number: 7,
     longVowel: {
       title: "Uncertain Thinker",
       description: "• Reserved, introspective. Very secretive.\n• Works best alone. Often feels isolated.\n• Feels deeply. Expresses and shares little of these feelings.\n• Often not understood by others.\n• Extremely keen mind. Given to thought and meditation.\n• Enjoys analysis of fundamentals, pursuit of wisdom, philosophical or metaphysical speculation. Extremely perceptive. Fine intuition.\n• Deep insights into higher matters. Not always certain how to use these insights.\n• Strong psychic power. Must learn to trust it.\n• Difficulty in choosing directions, solutions. Often uncertain, vacillating. Must constantly choose path of growth or the easy way."
     },
     shortVowel: {
       title: "Dependent Thinker",
       description: "• Reserved, introspective. Very secretive.\n• Works best alone. Often feels isolated.\n• Feels deeply. Expresses and shares little of these feelings.\n• Often not understood by others.\n• Extremely keen mind. Given to thought and meditation. Enjoys analysis of fundamentals, pursuit of wisdom, philosophical or metaphysical speculation.\n• Good perceptions. Good intuition.\n• Insight into higher matters. Some psychic power. Must learn to trust it.\n• Extreme difficulty in choosing directions, solutions. Usually uncertain, vacillating. Must constantly choose path of growth or the easy way."
     },
     combinedVowel: {
       title: "Vacillator",
       description: "• Adds indecision and restlessness to the coloration of the connected vowel.\n• Extreme difficulty in choosing directions, solutions. Usually uncertain. Must constantly choose path of growth or the easy way."
     }
   },
   'W': {
     number: 5,
     combinedVowel: {
       title: "Vacillating Energizer",
       description: "Can only be COMBINED VOWEL and follow another letter as in Howard, Seward\n• Restless.\n• Strong energy can be used in positive or negative direction, particularly in material affairs. With great effort, energy can be used for superior achievement; with much less effort, energy can be used to promote negative ends:\n-If core stresses egotism, domination, self-centeredness, (1,4,8 particularly), W energy tends to emphasize these negative traits.\n-If core stresses awareness or helpfulness to others (2,6,7,9,11), W energy tends to emphasize these positive traits.\n-If core stresses freedom (5 particularly), W energy stresses freedom. Rest of core and free will determine whether direction is positive or negative.\n• Often vacillates between several different points of view."
     }
   }
 };

 if (!firstVowelData[vowel]) {
   return <p>Select a vowel to view its First Vowel information.</p>;
 }

 const data = firstVowelData[vowel];
 // Add visualization
const vowelVisual = <FirstVowelVisualization vowel={vowel} />;

 return (
   <div className="bg-white/30 backdrop-blur-md rounded-lg p-6 shadow-lg">
     <div className="mb-4">
       <h3 className="text-2xl font-bold text-indigo-900">{vowel} ({data.number})</h3>
     </div>
     
     {data.longVowel && (
       <div className="mt-4">
         <h4 className="font-bold mb-2 text-lg text-indigo-700">Long Vowel as in Amy, Dale, Jane</h4>
         <h5 className="font-semibold text-indigo-600 mb-1">{data.longVowel.title}</h5>
         <p className="text-gray-700 whitespace-pre-line">{data.longVowel.description}</p>
       </div>
     )}
     
     {data.shortVowel && (
  <div className="mt-6">
    <h4 className="font-bold mb-2 text-lg text-indigo-700">Short Vowel as in Arlene, Matthew, Pamela</h4>
    <h5 className="font-semibold text-indigo-600 mb-1">{data.shortVowel.title}</h5>
    <p className="text-gray-700 whitespace-pre-line">{data.shortVowel.description}</p>
  </div>
)}

{data.combinedVowel && (
  <div className="mt-6">
    <h4 className="font-bold mb-2 text-lg text-indigo-700">Combined Vowel as in Mary, Theda</h4>
    <h5 className="font-semibold text-indigo-600 mb-1">{data.combinedVowel.title}</h5>
    <p className="text-gray-700 whitespace-pre-line">{data.combinedVowel.description}</p>
  </div>
)}
{vowelVisual}
</div>
);
};

// Main App Component
const NumerologyReferenceApp = () => {
  // State for selected category and number
  const [selectedCategory, setSelectedCategory] = useState('basics');
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [selectedLetter, setSelectedLetter] = useState('A');
  const [selectedVowel, setSelectedVowel] = useState('A');

  // Render chart component based on selected category
  const renderChart = () => {
    switch (selectedCategory) {
      case 'basics':
        return <NumberBasicsChart number={selectedNumber} />;
      case 'lifepath':
        return <LifePathChart number={selectedNumber} />;
      case 'expression':
        return <ExpressionChart number={selectedNumber} />;
      case 'soulurge':
        return <SoulUrgeChart number={selectedNumber} />;
      case 'birthday':
        return <BirthdayChart number={selectedNumber} />;
      case 'aspects':
        return <AspectsChart number={selectedNumber} />;
      case 'karmicdebt':
        return <KarmicDebtChart number={selectedNumber} />;
      case 'intensity':
        return <IntensityTableChart number={selectedNumber} />;
      case 'challenge':
        return <ChallengeGrowthChart number={selectedNumber} />;
      case 'maturity':
        return <MaturityNumberChart number={selectedNumber} />;
      case 'firstletter':
        return <FirstLetterChart letter={selectedLetter} />;
      case 'firstvowel':
        return <FirstVowelChart vowel={selectedVowel} />;
      default:
        return <NumberBasicsChart number={selectedNumber} />;
    }
  };

  // Alphabet arrays for letter selection
  const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
  const vowels = ['A', 'E', 'I', 'O', 'U', 'Y', 'W'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 md:p-8 relative font-sans">
      {/* Water Background */}
      <WaterBackground />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Animated Title */}
        <AnimatedTitle title="Numerology Reference Charts" />
        
        {/* Content Container */}
        <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 md:p-6 shadow-xl border border-white/30">
          {/* Chart Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            <CategoryCard
              title="Number Basics"
              description="Learn the core meanings of each number"
              icon="📊"
              onClick={() => setSelectedCategory('basics')}
              isActive={selectedCategory === 'basics'}
            />
            <CategoryCard
              title="Life Path"
              description="What you're here to learn in this lifetime"
              icon="🛤️"
              onClick={() => setSelectedCategory('lifepath')}
              isActive={selectedCategory === 'lifepath'}
            />
            <CategoryCard
              title="Expression"
              description="Your abilities and how you express yourself"
              icon="🎭"
              onClick={() => setSelectedCategory('expression')}
              isActive={selectedCategory === 'expression'}
            />
            <CategoryCard
              title="Soul Urge"
              description="Your inner desires and motivations"
              icon="💫"
              onClick={() => setSelectedCategory('soulurge')}
              isActive={selectedCategory === 'soulurge'}
            />
            <CategoryCard
              title="Birthday"
              description="Specific traits based on your birth day"
              icon="🎂"
              onClick={() => setSelectedCategory('birthday')}
              isActive={selectedCategory === 'birthday'}
            />
            <CategoryCard
              title="Aspects"
              description="How numbers interact with each other"
              icon="🔄"
              onClick={() => setSelectedCategory('aspects')}
              isActive={selectedCategory === 'aspects'}
            />
            <CategoryCard
              title="Karmic Debt"
              description="Challenges carried over from past lives"
              icon="⚖️"
              onClick={() => setSelectedCategory('karmicdebt')}
              isActive={selectedCategory === 'karmicdebt'}
            />
            <CategoryCard
              title="Intensity Table"
              description="Impact of number frequencies in your chart"
              icon="📈"
              onClick={() => setSelectedCategory('intensity')}
              isActive={selectedCategory === 'intensity'}
            />
            <CategoryCard
              title="Challenge/Growth"
              description="Obstacles and opportunities for development"
              icon="🧗"
              onClick={() => setSelectedCategory('challenge')}
              isActive={selectedCategory === 'challenge'}
            />
            <CategoryCard
              title="Maturity Number"
              description="What you learn in the second half of life"
              icon="🧠"
              onClick={() => setSelectedCategory('maturity')}
              isActive={selectedCategory === 'maturity'}
            />
            <CategoryCard
              title="First Letter"
              description="Influence of your name's first letter"
              icon="🔤"
              onClick={() => setSelectedCategory('firstletter')}
              isActive={selectedCategory === 'firstletter'}
            />
            <CategoryCard
              title="First Vowel"
              description="Your emotional reactions and inner self"
              icon="🔠"
              onClick={() => setSelectedCategory('firstvowel')}
              isActive={selectedCategory === 'firstvowel'}
            />
          </div>
          
          {/* Selection Controls */}
          <div className="mb-6">
            {(selectedCategory === 'firstletter') ? (
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2 text-indigo-800">Select a letter:</h3>
                <div className="grid grid-cols-7 sm:grid-cols-11 gap-2">
                  {consonants.map(letter => (
                    <button
                      key={letter}
                      onClick={() => setSelectedLetter(letter)}
                      className={`px-3 py-2 rounded font-medium transition-colors ${
                        selectedLetter === letter 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-white/50 hover:bg-white/70 text-gray-700'
                      }`}
                    >
                      {letter}
                    </button>
                  ))}
                </div>
              </div>
            ) : selectedCategory === 'firstvowel' ? (
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2 text-indigo-800">Select a vowel:</h3>
                <div className="grid grid-cols-7 gap-2">
                  {vowels.map(vowel => (
                    <button
                      key={vowel}
                      onClick={() => setSelectedVowel(vowel)}
                      className={`px-3 py-2 rounded font-medium transition-colors ${
                        selectedVowel === vowel 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-white/50 hover:bg-white/70 text-gray-700'
                      }`}
                    >
                      {vowel}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <ChartTabs selectedNumber={selectedNumber} onSelectNumber={setSelectedNumber} />
            )}
          </div>
          
          {/* Chart Display */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/30 shadow-lg">
            {renderChart()}
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-8 text-indigo-700 opacity-80">
          <p className="text-sm">
            © 2025 Numerology Reference Charts - Based on the work of Matthew Oliver Goodwin
          </p>
        </div>
      </div>
    </div>
  );
};

export default NumerologyReferenceApp;
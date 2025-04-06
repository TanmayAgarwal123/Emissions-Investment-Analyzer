import React, { useState } from 'react';
import { ChartData } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import { AlertCircle, BarChart3, Building2 } from 'lucide-react';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

// Dataset from your original code
const companiesData = {
  "Oil & Gas": [
    { name: "ExxonMobil", valuation: 450, scope1: 110.5, scope2: 15.2 },
    { name: "Shell", valuation: 220, scope1: 68.0, scope2: 10.5 },
    { name: "BP", valuation: 110, scope1: 55.0, scope2: 8.3 },
    { name: "Chevron", valuation: 290, scope1: 62.4, scope2: 7.9 },
    { name: "TotalEnergies", valuation: 160, scope1: 45.0, scope2: 9.0 },
    { name: "Saudi Aramco", valuation: 2100, scope1: 105.0, scope2: 20.0 },
    { name: "ConocoPhillips", valuation: 130, scope1: 50.2, scope2: 6.8 },
    { name: "Gazprom", valuation: 80, scope1: 85.0, scope2: 12.0 },
    { name: "PetroChina", valuation: 150, scope1: 95.0, scope2: 18.0 },
    { name: "Equinor", valuation: 90, scope1: 40.0, scope2: 7.5 }
  ],
  "Automotive": [
    { name: "Toyota", valuation: 250, scope1: 7.5, scope2: 3.2 },
    { name: "Volkswagen", valuation: 75, scope1: 9.8, scope2: 4.5 },
    { name: "General Motors", valuation: 50, scope1: 8.5, scope2: 3.7 },
    { name: "Ford", valuation: 48, scope1: 9.2, scope2: 4.0 },
    { name: "Daimler (Mercedes)", valuation: 80, scope1: 7.8, scope2: 3.5 },
    { name: "BMW", valuation: 60, scope1: 6.5, scope2: 3.0 },
    { name: "Honda", valuation: 55, scope1: 7.0, scope2: 3.1 },
    { name: "Tesla", valuation: 600, scope1: 0.3, scope2: 0.5 },
    { name: "Hyundai", valuation: 45, scope1: 8.0, scope2: 3.8 },
    { name: "Stellantis", valuation: 65, scope1: 7.2, scope2: 3.4 }
  ],
  "Technology": [
    { name: "Apple", valuation: 2900, scope1: 0.5, scope2: 5.2 },
    { name: "Microsoft", valuation: 3000, scope1: 0.4, scope2: 4.1 },
    { name: "Alphabet (Google)", valuation: 2200, scope1: 0.8, scope2: 2.9 },
    { name: "Amazon", valuation: 1800, scope1: 12.6, scope2: 5.8 },
    { name: "Meta (Facebook)", valuation: 1200, scope1: 0.6, scope2: 2.3 },
    { name: "NVIDIA", valuation: 2200, scope1: 0.2, scope2: 1.1 },
    { name: "Samsung Electronics", valuation: 350, scope1: 8.1, scope2: 6.7 },
    { name: "Intel", valuation: 180, scope1: 1.2, scope2: 3.5 },
    { name: "IBM", valuation: 160, scope1: 0.7, scope2: 1.8 },
    { name: "Sony", valuation: 120, scope1: 1.5, scope2: 2.0 }
  ],
  "Banking": [
    { name: "JPMorgan Chase", valuation: 500, scope1: 0.6, scope2: 1.0 },
    { name: "Bank of America", valuation: 280, scope1: 0.4, scope2: 0.9 },
    { name: "HSBC", valuation: 140, scope1: 0.5, scope2: 0.8 },
    { name: "Citigroup", valuation: 100, scope1: 0.5, scope2: 0.7 },
    { name: "Wells Fargo", valuation: 180, scope1: 0.4, scope2: 0.8 },
    { name: "Goldman Sachs", valuation: 120, scope1: 0.3, scope2: 0.6 },
    { name: "Morgan Stanley", valuation: 150, scope1: 0.3, scope2: 0.7 },
    { name: "UBS", valuation: 70, scope1: 0.4, scope2: 0.5 },
    { name: "Barclays", valuation: 40, scope1: 0.5, scope2: 0.6 },
    { name: "Deutsche Bank", valuation: 30, scope1: 0.6, scope2: 0.7 }
  ],
  "Retail": [
    { name: "Walmart", valuation: 430, scope1: 5.2, scope2: 9.4 },
    { name: "Amazon", valuation: 1800, scope1: 12.6, scope2: 5.8 },
    { name: "Alibaba", valuation: 250, scope1: 3.5, scope2: 4.2 },
    { name: "Costco", valuation: 220, scope1: 2.8, scope2: 3.5 },
    { name: "Home Depot", valuation: 300, scope1: 3.2, scope2: 4.0 },
    { name: "Target", valuation: 80, scope1: 2.5, scope2: 3.0 },
    { name: "Lowe's", valuation: 120, scope1: 2.7, scope2: 3.2 },
    { name: "Walgreens Boots Alliance", valuation: 35, scope1: 1.8, scope2: 2.5 },
    { name: "CVS Health", valuation: 90, scope1: 2.0, scope2: 2.8 },
    { name: "IKEA", valuation: 45, scope1: 3.0, scope2: 3.5 }
  ],
  "Power": [
    { name: "NextEra Energy", valuation: 150, scope1: 35.0, scope2: 5.0 },
    { name: "Duke Energy", valuation: 80, scope1: 45.0, scope2: 6.0 },
    { name: "Southern Company", valuation: 70, scope1: 50.0, scope2: 7.0 },
    { name: "National Grid", valuation: 50, scope1: 30.0, scope2: 4.5 },
    { name: "E.ON", valuation: 35, scope1: 40.0, scope2: 5.5 },
    { name: "Engie", valuation: 40, scope1: 38.0, scope2: 5.0 },
    { name: "EDF", valuation: 55, scope1: 42.0, scope2: 6.5 },
    { name: "Exelon", valuation: 45, scope1: 36.0, scope2: 5.2 },
    { name: "Dominion Energy", valuation: 60, scope1: 39.0, scope2: 5.8 },
    { name: "PG&E", valuation: 30, scope1: 32.0, scope2: 4.8 }
  ]
};

interface Company {
  name: string;
  valuation: number;
  scope1: number;
  scope2: number;
  scope3?: number;
  stakePercentage?: number;
}

interface FormData {
  companyName: string;
  industry: string;
  investmentAmount: number;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    industry: '',
    investmentAmount: 0
  });
  const [analyzedCompanies, setAnalyzedCompanies] = useState<Company[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const companies = companiesData[formData.industry as keyof typeof companiesData];
    
    if (!companies) return;

    const analyzed = companies.map(company => {
      const valuationInDollars = company.valuation * 1000000000;
      const stakePercentage = (formData.investmentAmount / valuationInDollars) * 100;
      const scope3 = ((company.scope1 + company.scope2) * stakePercentage) / 100;
      
      return {
        ...company,
        stakePercentage,
        scope3
      };
    }).sort((a, b) => (a.scope3 || 0) - (b.scope3 || 0));

    setAnalyzedCompanies(analyzed);
    setShowResults(true);
    setShowModal(true);
  };

  const chartData: ChartData<'pie'> = {
    labels: analyzedCompanies.slice(0, 3).map(c => c.name),
    datasets: [{
      data: analyzedCompanies.slice(0, 3).map(c => c.scope3 || 0),
      backgroundColor: [
        'rgba(75, 192, 192, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)'
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      borderWidth: 1
    }]
  };

  const barChartData: ChartData<'bar'> = {
    labels: analyzedCompanies.map(c => c.name),
    datasets: [
      {
        label: 'Scope 1',
        data: analyzedCompanies.map(c => c.scope1),
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      },
      {
        label: 'Scope 2',
        data: analyzedCompanies.map(c => c.scope2),
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: 'Scope 3',
        data: analyzedCompanies.map(c => c.scope3),
        backgroundColor: 'rgba(255, 206, 86, 0.7)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Emissions Investment Analyzer
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Company Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry to Invest In
                </label>
                <select
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  value={formData.industry}
                  onChange={(e) => setFormData({...formData, industry: e.target.value})}
                  required
                >
                  <option value="">Select Industry</option>
                  {Object.keys(companiesData).map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Amount ($)
                </label>
                <input
                  type="number"
                  min="1000"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  value={formData.investmentAmount || ''}
                  onChange={(e) => setFormData({...formData, investmentAmount: parseFloat(e.target.value)})}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 w-full md:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Analyze
            </button>
          </form>
        </div>

        {showResults && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-lg shadow-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Investment Stake Analysis</h2>
                </div>
                <div className="p-6 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-3 py-2 text-left text-sm font-medium text-gray-500">Company</th>
                        <th className="px-3 py-2 text-left text-sm font-medium text-gray-500">Valuation ($B)</th>
                        <th className="px-3 py-2 text-left text-sm font-medium text-gray-500">Your Stake</th>
                        <th className="px-3 py-2 text-left text-sm font-medium text-gray-500">Scope 1</th>
                        <th className="px-3 py-2 text-left text-sm font-medium text-gray-500">Scope 2</th>
                        <th className="px-3 py-2 text-left text-sm font-medium text-gray-500">Scope 3*</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {analyzedCompanies.map((company, index) => (
                        <tr key={index}>
                          <td className="px-3 py-2 text-sm text-gray-900">{company.name}</td>
                          <td className="px-3 py-2 text-sm text-gray-900">{company.valuation}</td>
                          <td className="px-3 py-2 text-sm text-gray-900">{company.stakePercentage?.toFixed(6)}%</td>
                          <td className="px-3 py-2 text-sm text-gray-900">{company.scope1.toFixed(1)}</td>
                          <td className="px-3 py-2 text-sm text-gray-900">{company.scope2.toFixed(1)}</td>
                          <td className="px-3 py-2 text-sm text-gray-900">{company.scope3?.toFixed(6)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="mt-4 text-sm text-gray-500">*Scope 3 = ((Scope 1 + Scope 2) × Stake Percentage) / 100</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Top 3 Companies with Lowest Scope 3 Emissions</h2>
                </div>
                <div className="p-6">
                  <Pie data={chartData} options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'bottom'
                      }
                    }
                  }} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Emissions Comparison</h2>
              </div>
              <div className="p-6">
                <Bar
                  data={barChartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top'
                      },
                      title: {
                        display: true,
                        text: 'Scope 1, 2, and 3 Emissions Comparison'
                      }
                    },
                    scales: {
                      x: {
                        ticks: {
                          maxRotation: 45,
                          minRotation: 45
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </>
        )}

        {showModal && analyzedCompanies.length > 0 && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold mb-4">Best Investment Choice</h3>
              <div className="mb-6">
                <p className="mb-4">Based on your investment criteria, the company with the lowest Scope 3 emissions is:</p>
                <h4 className="text-xl font-semibold text-center my-4">{analyzedCompanies[0].name}</h4>
                <p className="mb-2"><strong>Industry:</strong> {formData.industry}</p>
                <p className="mb-2"><strong>Scope 3 Emissions:</strong> {analyzedCompanies[0].scope3?.toFixed(6)} MtCO₂e</p>
                <p><strong>Your Stake:</strong> {analyzedCompanies[0].stakePercentage?.toFixed(6)}%</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
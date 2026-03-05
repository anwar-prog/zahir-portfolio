function HeatDemand() {
  return (
    <div className="bg-slate-950 text-white min-h-screen px-6 py-24">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-6">
          AI-Based Heat Demand Forecasting
        </h1>

        <p className="text-gray-400 mb-8">
          This project focuses on predicting district heating demand using
          machine learning and reinforcement learning models trained on
          real-world operational data.
        </p>


        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Architecture
        </h2>

        <p className="text-gray-400">
          The system integrates machine learning regression models with
          reinforcement learning strategies to improve demand prediction
          accuracy and enable better operational decision support.
        </p>


        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Technology Stack
        </h2>

        <ul className="list-disc list-inside text-gray-400">
          <li>Python</li>
          <li>Machine Learning</li>
          <li>Reinforcement Learning</li>
          <li>Time Series Forecasting</li>
        </ul>


        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Results
        </h2>

        <p className="text-gray-400">
          The models demonstrated strong predictive capability for forecasting
          heating demand under real-world system constraints.
        </p>

      </div>

    </div>
  );
}

export default HeatDemand;
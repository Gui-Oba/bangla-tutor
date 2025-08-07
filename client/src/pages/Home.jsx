import '../App.css'; // Ensure styles are applied
import Header from '../components/Header';
import Footer from '../components/Footer';
import QuestionBox from '../components/QuestionBox';
import { useState } from 'react'; // Import useState

export default function Home() {
  const [teachingPlan, setTeachingPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0); // New state for current step

  const handleQuestionSubmit = async (question) => {
    setLoading(true);
    setError(null);
    setTeachingPlan(null); // Clear previous plan
    setCurrentStepIndex(0); // Reset to first step

    try {
      const response = await fetch('http://35.203.123.45:3000/api/teach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: question })
      });


      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch teaching plan');
      }

      const data = await response.json();
      if (data.success) {
        setTeachingPlan(data.plan);
      } else {
        throw new Error(data.message || 'API returned an error');
      }
    } catch (err) {
      console.error('Error submitting question:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNextStep = () => {
    if (teachingPlan && currentStepIndex < teachingPlan.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">
        <section
          id="about"
          className="relative flex items-center justify-center min-h-screen py-12 bg-white text-black"
        >
          <div className="px-6 text-center max-w-4xl w-full">
            <h1 className="flex items-center text-5xl mb-6 justify-center">
              Your Personal AI Tutor
            </h1>
            <QuestionBox onSubmit={handleQuestionSubmit} /> {/* Pass the handler */}

            {loading && <p className="mt-4 text-lg">Generating teaching plan...</p>}
            {error && <p className="mt-4 text-lg text-red-500">Error: {error}</p>}

            {teachingPlan && (
              <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-md text-left max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">{teachingPlan.title}</h2>
                {teachingPlan.summary && <p className="mb-4 italic">{teachingPlan.summary}</p>}

                {teachingPlan.steps && teachingPlan.steps.length > 0 && (
                  <>
                    <div className="text-lg">
                      <strong className="text-xl">
                        Step {teachingPlan.steps[currentStepIndex].stepNumber}: {teachingPlan.steps[currentStepIndex].description}
                      </strong>
                      <p className="ml-4 text-gray-700">{teachingPlan.steps[currentStepIndex].details}</p>
                      {teachingPlan.steps[currentStepIndex].example && (
                        <div className="ml-4 mt-2 p-3 bg-gray-100 border border-gray-200 rounded-md text-sm font-mono whitespace-pre-wrap">
                          Example: {teachingPlan.steps[currentStepIndex].example}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between mt-6">
                      <button
                        onClick={handlePreviousStep}
                        disabled={currentStepIndex === 0}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleNextStep}
                        disabled={currentStepIndex === teachingPlan.steps.length - 1}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}

                {teachingPlan.subject && teachingPlan.grade && (
                  <p className="mt-4 text-sm text-gray-600">
                    Subject: {teachingPlan.subject}, Grade: {teachingPlan.grade}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
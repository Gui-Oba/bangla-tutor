import '../App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QuestionBox from '../components/QuestionBox';
import { useState, useMemo } from 'react';

export default function Home() {
  const [teachingPlan, setTeachingPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const totalSteps = teachingPlan?.steps?.length ?? 0;
  const progress = useMemo(() => {
    if (!totalSteps) return 0;
    return Math.round(((currentStepIndex + 1) / totalSteps) * 100);
  }, [currentStepIndex, totalSteps]);

  const handleQuestionSubmit = async (question) => {
    setLoading(true);
    setError(null);
    setTeachingPlan(null);
    setCurrentStepIndex(0);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/teach`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: question })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
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
      setCurrentStepIndex((i) => i + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((i) => i - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col  text-slate-800">
      <Header />

      <main className="flex-grow">
        <section
          id="about"
          className="relative flex items-center justify-center min-h-[80vh] py-16"
        >
          <div className="w-full max-w-5xl px-6">
            <h1 className="text-center text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Your Personal AI Tutor
            </h1>
            <p className="mt-3 text-center text-slate-600">
              Ask a question and get a guided, step-by-step learning plan.
            </p>

            <div className="mt-8">
              <div className="mx-auto max-w-2xl">
                <QuestionBox onSubmit={handleQuestionSubmit} />
              </div>

              {loading && (
                <p className="mt-6 text-center text-base text-slate-600 animate-pulse">
                  Generating teaching plan…
                </p>
              )}
              {error && (
                <p className="mt-6 text-center text-base text-red-600">
                  Error: {error}
                </p>
              )}
            </div>

            {teachingPlan && (
              <div
                className="mt-10 mx-auto max-w-3xl rounded-2xl bg-white/90 shadow-sm ring-1 ring-black/5 backdrop-blur-sm transition-colors"
              >
                {/* Header */}
                <div className="px-6 pt-6 pb-4">
                  <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
                    {teachingPlan.title}
                  </h2>
                  {teachingPlan.summary && (
                    <p className="mt-2 text-slate-600">
                      {teachingPlan.summary}
                    </p>
                  )}
                  {(teachingPlan.subject || teachingPlan.grade) && (
                    <p className="mt-3 text-sm text-slate-500">
                      {teachingPlan.subject && <>Subject: {teachingPlan.subject}</>}
                      {teachingPlan.subject && teachingPlan.grade && <span className="mx-2">•</span>}
                      {teachingPlan.grade && <>Grade: {teachingPlan.grade}</>}
                    </p>
                  )}
                </div>

                {/* Progress */}
                {totalSteps > 0 && (
                  <div className="px-6">
                    <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-300 via-indigo-400 to-indigo-500 transition-all"
                        style={{ width: `${progress}%` }}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={progress}
                        role="progressbar"
                      />
                    </div>
                    <div className="mt-2 text-xs text-slate-500">
                      Step {currentStepIndex + 1} of {totalSteps}
                    </div>
                  </div>
                )}

                {/* Current Step */}
                {teachingPlan.steps && teachingPlan.steps.length > 0 && (
                  <div className="px-6 py-6">
                    <div className="text-lg leading-relaxed">
                      <div className="text-slate-900 font-medium">
                        Step {teachingPlan.steps[currentStepIndex].stepNumber}:{' '}
                        {teachingPlan.steps[currentStepIndex].description}
                      </div>
                      <p className="mt-2 text-slate-700">
                        {teachingPlan.steps[currentStepIndex].details}
                      </p>

                      {teachingPlan.steps[currentStepIndex].example && (
                        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-mono text-slate-700">
                          <span className="font-semibold not-italic">Example:</span>{' '}
                          {teachingPlan.steps[currentStepIndex].example}
                        </div>
                      )}
                    </div>

                    {/* Controls */}
                    <div className="mt-6 flex items-center justify-between gap-3">
                      <button
                        onClick={handlePreviousStep}
                        disabled={currentStepIndex === 0}
                        className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleNextStep}
                        disabled={currentStepIndex === totalSteps - 1}
                        className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
                      >
                        Next
                      </button>
                    </div>
                  </div>
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
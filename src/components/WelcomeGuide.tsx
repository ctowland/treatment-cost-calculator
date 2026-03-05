'use client';

interface WelcomeGuideProps {
  onClose: () => void;
  onAddTreatment: () => void;
}

export function WelcomeGuide({ onClose, onAddTreatment }: WelcomeGuideProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-4 rounded-t-xl">
          <h2 className="text-2xl font-bold text-white">Welcome to Your Treatment Cost Calculator</h2>
          <p className="text-primary-100 mt-1">Stop guessing. Start profiting.</p>
        </div>

        <div className="p-6">
          {/* What This Tool Does */}
          <section className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">💰</span> What This Tool Does
            </h3>
            <p className="text-gray-600 mb-3">
              This calculator helps you understand the TRUE cost of each treatment you offer. 
              Many salon owners are shocked to discover they're actually losing money on some services!
            </p>
          </section>

          {/* How It Works */}
          <section className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">⚙️</span> How It Works
            </h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-semibold text-sm">1</div>
                <div>
                  <p className="font-medium text-gray-900">Add Your Treatments</p>
                  <p className="text-sm text-gray-600">Enter each service you offer (facials, massages, hair treatments, etc.)</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-semibold text-sm">2</div>
                <div>
                  <p className="font-medium text-gray-900">Enter Real Costs</p>
                  <p className="text-sm text-gray-600">Include products used, staff time, and your salon overheads</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-semibold text-sm">3</div>
                <div>
                  <p className="font-medium text-gray-900">See Your Profit Margins</p>
                  <p className="text-sm text-gray-600">Get instant feedback: 🟢 Profitable | 🟡 Warning | 🔴 Losing Money</p>
                </div>
              </div>
            </div>
          </section>

          {/* What You'll Need */}
          <section className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">📝</span> What You'll Need
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-primary-500">✓</span>
                <span>List of treatments you offer</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500">✓</span>
                <span>Current prices for each treatment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500">✓</span>
                <span>Approximate time each treatment takes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500">✓</span>
                <span>Staff hourly rates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500">✓</span>
                <span>Product costs (optional but recommended)</span>
              </li>
            </ul>
          </section>

          {/* Colour Coding */}
          <section className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">🚦</span> Understanding the Colours
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <div>
                  <span className="font-medium text-green-800">Green - Profitable</span>
                  <span className="text-green-700 text-sm ml-2">This treatment is making good money!</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <div>
                  <span className="font-medium text-yellow-800">Yellow - Warning</span>
                  <span className="text-yellow-700 text-sm ml-2">Profitable but could be better</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <div>
                  <span className="font-medium text-red-800">Red - Danger</span>
                  <span className="text-red-700 text-sm ml-2">You're losing money on this treatment!</span>
                </div>
              </div>
            </div>
          </section>

          {/* Tips */}
          <section className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">💡</span> Pro Tips
            </h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Be honest with your times - if a facial usually takes 75 minutes, enter 75 minutes!</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Include ALL product costs - even the small amounts of cleanser or toner used</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Update your salon settings (rent, utilities) in the Settings button at the top</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Review your prices regularly - product and staff costs change over time</span>
              </li>
            </ul>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={onAddTreatment}
              className="flex-1 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-semibold"
            >
              Start Adding Treatments →
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              I'll Explore First
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

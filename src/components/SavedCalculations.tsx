import React from 'react';
import { Trash2, Clock, Calculator, Download } from 'lucide-react';
import { useSavedCalculations } from '../contexts/SavedCalculationsContext';
import { toPng } from 'html-to-image';

export function SavedCalculations() {
  const { savedCalculations, deleteCalculation, clearAllCalculations } = useSavedCalculations();
  const resultRef = React.useRef<HTMLDivElement>(null);

  if (savedCalculations.length === 0) {
    return null;
  }

  const handleDownload = async () => {
    if (!resultRef.current) return;

    try {
      // Create a temporary container
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '-9999px';
      document.body.appendChild(container);

      // Create the content wrapper
      const wrapper = document.createElement('div');
      wrapper.style.backgroundColor = 'white';
      wrapper.style.padding = '32px';
      wrapper.style.width = '800px';
      wrapper.style.borderRadius = '8px';
      wrapper.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';

      // Clone the results content
      const content = resultRef.current.cloneNode(true) as HTMLElement;
      wrapper.appendChild(content);

      // Add footer with branding
      const footer = document.createElement('div');
      footer.style.marginTop = '24px';
      footer.style.paddingTop = '16px';
      footer.style.borderTop = '1px solid #E5E7EB';
      footer.style.textAlign = 'center';
      footer.style.color = '#4F46E5';
      footer.style.fontFamily = 'system-ui, -apple-system, sans-serif';

      const websiteName = document.createElement('div');
      websiteName.textContent = 'Future Value Calculator';
      websiteName.style.fontSize = '16px';
      websiteName.style.fontWeight = '600';
      websiteName.style.marginBottom = '4px';

      const websiteAddress = document.createElement('div');
      websiteAddress.textContent = 'www.future-value-calculator.com';
      websiteAddress.style.fontSize = '14px';

      footer.appendChild(websiteName);
      footer.appendChild(websiteAddress);
      wrapper.appendChild(footer);

      // Add the wrapper to the temporary container
      container.appendChild(wrapper);

      // Generate the image
      const dataUrl = await toPng(wrapper, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: 'white'
      });

      // Clean up the temporary container
      document.body.removeChild(container);

      // Download the image
      const link = document.createElement('a');
      const fileName = `saved-calculations-${new Date().toISOString().split('T')[0]}.png`;
      link.download = fileName;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generating image:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-900">Saved Calculations</h2>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleDownload}
              className="flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-700"
              title="Download as Image"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </button>
            <button
              onClick={clearAllCalculations}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Clear All
            </button>
          </div>
        </div>
        <div ref={resultRef} className="space-y-4">
          {savedCalculations.map((calc) => (
            <div
              key={calc.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <div className="flex items-center space-x-2">
                  <Calculator className="w-4 h-4 text-indigo-600" />
                  <h3 className="font-medium text-gray-900">{calc.name}</h3>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(calc.date).toLocaleDateString()} - {calc.type}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-lg font-semibold text-indigo-600">
                  ${calc.result.futureValue.toLocaleString()}
                </p>
                <button
                  onClick={() => deleteCalculation(calc.id)}
                  className="text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
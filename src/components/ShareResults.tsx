import React from 'react';
import { Download } from 'lucide-react';
import { toPng } from 'html-to-image';

interface ShareResultsProps {
  resultRef: React.RefObject<HTMLDivElement>;
  title: string;
}

export function ShareResults({ resultRef, title }: ShareResultsProps) {
  const websiteUrl = 'www.future-value-calculator.com';

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
      websiteAddress.textContent = websiteUrl;
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
      const fileName = `${title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.png`;
      link.download = fileName;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generating image:', err);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-700"
      title="Download as Image"
    >
      <Download className="w-4 h-4" />
      <span className="hidden sm:inline">Download</span>
    </button>
  );
}
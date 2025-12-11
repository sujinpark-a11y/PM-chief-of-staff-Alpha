import React, { useState, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { X, Upload, FileText, CheckCircle, AlertTriangle, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils/cn';

const DocReviewModal = () => {
  const { closeDocModal, analyzeDoc, docAnalysisResult } = useApp();
  const [isDragging, setIsDragging] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      startScanning();
    }
  }, []);

  const startScanning = () => {
    setIsScanning(true);
    analyzeDoc(); // Trigger context action which has a timeout
    
    // Local timeout to match the context simulation
    setTimeout(() => {
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <FileText size={18} className="text-indigo-600" />
            Strategic Document Review
          </h3>
          <button 
            onClick={closeDocModal}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {!docAnalysisResult && !isScanning ? (
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={cn(
                "border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center text-center transition-all cursor-pointer",
                isDragging ? "border-indigo-500 bg-indigo-50" : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"
              )}
            >
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                <Upload size={32} />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                Drag & Drop your PRD or Strategy Doc
              </h4>
              <p className="text-gray-500 text-sm mb-6">
                Supports PDF, DOCX, TXT
              </p>
              <button className="bg-white border border-gray-300 text-gray-700 font-medium py-2 px-6 rounded-lg hover:bg-gray-50 transition-colors">
                Browse Files
              </button>
            </div>
          ) : isScanning ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="relative w-24 h-24 mb-6">
                <motion.div 
                  className="absolute inset-0 border-4 border-indigo-100 rounded-full"
                />
                <motion.div 
                  className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-indigo-600">
                  <Search size={32} />
                </div>
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Analyzing Document...</h4>
              <p className="text-gray-500 text-sm">Checking alignment with Q3 OKRs...</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-100 rounded-xl">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <div className="text-sm text-green-800 font-medium uppercase tracking-wide">Strategic Alignment</div>
                  <div className="text-2xl font-bold text-green-900">{docAnalysisResult?.alignmentScore}% Aligned</div>
                  <div className="text-sm text-green-700">The roadmap matches the Q3 OKR.</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <AlertTriangle size={18} className="text-amber-500" />
                  Analysis Report
                </h4>
                
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-gray-100 bg-gray-50 font-medium text-gray-700">
                    Red Flags & Conflicts
                  </div>
                  <ul className="p-4 space-y-3">
                    {docAnalysisResult?.issues.map((issue, i) => (
                      <li key={i} className="flex gap-3 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 shrink-0" />
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-gray-100 bg-gray-50 font-medium text-gray-700">
                    Missing Data
                  </div>
                  <ul className="p-4 space-y-3">
                    {docAnalysisResult?.missingData.map((data, i) => (
                      <li key={i} className="flex gap-3 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 shrink-0" />
                        {data}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default DocReviewModal;

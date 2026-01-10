'use client';

import React, { useState, useEffect } from 'react';

export default function TupacShare() {
  const [files, setFiles] = useState<Record<string, any>>({});
  const [uploadedFile, setUploadedFile] = useState<any>(null);
  const [shareCode, setShareCode] = useState('');
  const [downloadCode, setDownloadCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = () => {
    try {
      const stored = localStorage.getItem('tupac_files');
      if (stored) {
        setFiles(JSON.parse(stored));
      }
    } catch (err) {
      console.log('No existing files');
    }
  };

  const saveFiles = (newFiles: Record<string, any>) => {
    localStorage.setItem('tupac_files', JSON.stringify(newFiles));
    setFiles(newFiles);
  };

  const generateCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    
    if (file.size > 4.5 * 1024 * 1024) {
      setError('File too large. Max 4.5MB');
      setTimeout(() => setError(''), 3000);
      return;
    }

    const code = generateCode();
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const fileData = {
        name: file.name,
        type: file.type,
        size: file.size,
        data: e.target?.result,
        uploadDate: new Date().toISOString()
      };

      const newFiles = { ...files, [code]: fileData };
      saveFiles(newFiles);
      setUploadedFile({ ...fileData, code });
      setShareCode(code);
      setError('');
    };

    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    const code = downloadCode.toUpperCase().trim();
    if (!code) {
      setError('Enter a code');
      setTimeout(() => setError(''), 3000);
      return;
    }

    const fileData = files[code];
    if (!fileData) {
      setError('Code not found');
      setTimeout(() => setError(''), 3000);
      return;
    }

    const link = document.createElement('a');
    link.href = fileData.data;
    link.download = fileData.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setError('');
    setDownloadCode('');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900 to-black border-b-4 border-red-600 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-red-500 tracking-wider mb-2" style={{textShadow: '3px 3px 0px rgba(0,0,0,0.8)'}}>
            2PAC-SHARE
          </h1>
          <p className="text-red-300 text-sm tracking-wide">ALL EYEZ ON YOUR FILES</p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-red-600 text-white px-6 py-3 rounded border-2 border-red-400 flex items-center gap-2 shadow-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span className="font-bold">{error}</span>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Upload Section */}
          <div className="bg-gradient-to-br from-red-950 to-black border-2 border-red-600 rounded-lg p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <h2 className="text-2xl font-bold text-red-500 tracking-wide">UPLOAD</h2>
            </div>

            <div
              className={`border-4 border-dashed rounded-lg p-8 text-center transition-all ${
                dragActive ? 'border-red-400 bg-red-950' : 'border-red-700 bg-black'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <svg className="mx-auto mb-4 w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-red-300 mb-2 font-bold">DROP YOUR FILE HERE</p>
              <p className="text-red-500 text-sm mb-4">or click to browse</p>
              <input
                type="file"
                onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
                className="hidden"
                id="fileInput"
              />
              <label
                htmlFor="fileInput"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded cursor-pointer transition-all border-2 border-red-400"
              >
                SELECT FILE
              </label>
              <p className="text-red-400 text-xs mt-3">MAX 4.5MB</p>
            </div>

            {/* Upload Result */}
            {uploadedFile && (
              <div className="mt-6 bg-black border-2 border-red-600 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-red-400 text-xs mb-1">UPLOADED FILE</p>
                    <p className="text-white font-bold break-all">{uploadedFile.name}</p>
                    <p className="text-red-500 text-sm">{formatFileSize(uploadedFile.size)}</p>
                  </div>
                </div>
                
                <div className="bg-red-950 border border-red-600 rounded p-3 mb-3">
                  <p className="text-red-400 text-xs mb-1">SHARE CODE</p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-2xl font-bold text-red-500 tracking-widest">{shareCode}</span>
                    <button
                      onClick={() => copyToClipboard(shareCode)}
                      className="bg-red-600 hover:bg-red-700 p-2 rounded transition-all"
                      title="Copy code"
                    >
                      {copied ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="bg-red-950 border border-red-600 rounded p-3">
                  <p className="text-red-400 text-xs mb-1">SHARE LINK</p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-red-300 break-all flex-1">
                      {typeof window !== 'undefined' && `${window.location.origin}?code=${shareCode}`}
                    </span>
                    <button
                      onClick={() => copyToClipboard(`${window.location.origin}?code=${shareCode}`)}
                      className="bg-red-600 hover:bg-red-700 p-2 rounded transition-all flex-shrink-0"
                      title="Copy link"
                    >
                      {copied ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Download Section */}
          <div className="bg-gradient-to-br from-red-950 to-black border-2 border-red-600 rounded-lg p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <h2 className="text-2xl font-bold text-red-500 tracking-wide">DOWNLOAD</h2>
            </div>

            <div className="bg-black border-2 border-red-700 rounded-lg p-6">
              <p className="text-red-300 mb-4 font-bold">ENTER SHARE CODE</p>
              <input
                type="text"
                value={downloadCode}
                onChange={(e) => setDownloadCode(e.target.value.toUpperCase())}
                placeholder="XXXXXX"
                maxLength={6}
                className="w-full bg-red-950 border-2 border-red-600 rounded px-4 py-3 text-white text-2xl font-bold tracking-widest text-center uppercase focus:outline-none focus:border-red-400 mb-4"
                onKeyPress={(e) => e.key === 'Enter' && handleDownload()}
              />
              <button
                onClick={handleDownload}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded transition-all border-2 border-red-400 flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                DOWNLOAD FILE
              </button>
            </div>

            {/* Instructions */}
            <div className="mt-6 bg-black border-2 border-red-900 rounded-lg p-4">
              <p className="text-red-400 text-xs font-bold mb-2">HOW IT WORKS</p>
              <ul className="text-red-300 text-sm space-y-1">
                <li>• Upload file to get a code</li>
                <li>• Share code with others</li>
                <li>• They enter code to download</li>
                <li>• Files stored in browser</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t-4 border-red-600 bg-gradient-to-r from-black to-red-900 py-4 px-4 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-500 text-sm font-bold tracking-wide">
            THUG LIFE • KEEP YOUR FILES GANGSTA
          </p>
        </div>
      </div>
    </div>
  );
}
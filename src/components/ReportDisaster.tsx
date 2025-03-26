
import React, { useState } from 'react';
import { Upload, Map, AlertTriangle, CheckCircle, X, Camera, Loader } from 'lucide-react';

const ReportDisaster = () => {
  const [formState, setFormState] = useState({
    disasterType: '',
    description: '',
    location: '',
    severity: '',
  });
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setIsSuccess(false);
        setFormState({
          disasterType: '',
          description: '',
          location: '',
          severity: '',
        });
        setImagePreview(null);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="w-full bg-card rounded-2xl border overflow-hidden">
      {isSuccess ? (
        <div className="p-8 flex flex-col items-center justify-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Report Submitted Successfully</h3>
          <p className="text-muted-foreground text-center max-w-md mb-6">
            Thank you for your report. Our team will analyze the information and take appropriate action.
          </p>
          <button 
            onClick={() => setIsSuccess(false)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium"
          >
            Submit Another Report
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <AlertTriangle className="h-5 w-5 text-disaster-red" />
            <h2 className="text-xl font-semibold">Report a Disaster</h2>
          </div>
          
          <div className="space-y-5">
            {/* Disaster Type */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="disasterType" className="block text-sm font-medium mb-1">
                  Disaster Type <span className="text-disaster-red">*</span>
                </label>
                <select
                  id="disasterType"
                  name="disasterType"
                  value={formState.disasterType}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="" disabled>Select disaster type</option>
                  <option value="wildfire">Wildfire</option>
                  <option value="flood">Flood</option>
                  <option value="earthquake">Earthquake</option>
                  <option value="hurricane">Hurricane</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              {/* Severity */}
              <div>
                <label htmlFor="severity" className="block text-sm font-medium mb-1">
                  Severity Level <span className="text-disaster-red">*</span>
                </label>
                <select
                  id="severity"
                  name="severity"
                  value={formState.severity}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="" disabled>Select severity</option>
                  <option value="low">Low - Minor impact</option>
                  <option value="medium">Medium - Moderate impact</option>
                  <option value="high">High - Significant impact</option>
                  <option value="critical">Critical - Severe impact</option>
                </select>
              </div>
            </div>
            
            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium mb-1">
                Location <span className="text-disaster-red">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formState.location}
                  onChange={handleInputChange}
                  placeholder="Enter address or coordinates"
                  className="w-full rounded-lg border bg-background pl-10 pr-3 py-2 text-sm"
                  required
                />
                <Map className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-1.5 flex justify-end">
                <button 
                  type="button"
                  className="text-xs text-primary flex items-center"
                >
                  <Map className="h-3 w-3 mr-1" />
                  Use my current location
                </button>
              </div>
            </div>
            
            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description <span className="text-disaster-red">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formState.description}
                onChange={handleInputChange}
                placeholder="Describe the disaster situation, any casualties, damage, etc."
                className="w-full min-h-[100px] rounded-lg border bg-background px-3 py-2 text-sm"
                required
              />
            </div>
            
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Upload Images (Optional)
              </label>
              
              <div className="relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center bg-muted/20">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                {imagePreview ? (
                  <div className="relative w-full">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-48 object-cover rounded-lg" 
                    />
                    <button
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="absolute top-2 right-2 p-1 rounded-full bg-foreground/80 text-background"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="p-3 rounded-full bg-muted mb-3">
                      <Camera className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-center text-muted-foreground mb-1">
                      Drag and drop your images here or click to browse
                    </p>
                    <p className="text-xs text-center text-muted-foreground">
                      Supports: JPG, PNG, GIF (Max 5MB)
                    </p>
                  </>
                )}
              </div>
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center py-2.5 px-4 bg-primary text-primary-foreground rounded-lg font-medium disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Submit Report
                </>
              )}
            </button>
            
            <p className="text-xs text-muted-foreground text-center">
              All reports are verified by our AI system and cross-referenced with official data sources to ensure accuracy.
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default ReportDisaster;

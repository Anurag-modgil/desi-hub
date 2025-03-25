
import { useState, useRef } from "react";
import { Upload, X, Check, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DocumentInfo } from "@/services/documentService";

interface FileUploadProps {
  label: string;
  description?: string;
  acceptedFileTypes?: string;
  maxSize?: number; // in MB
  maxFiles?: number;
  onUpload: (file: File) => Promise<any>;
  uploadedFiles?: DocumentInfo[];
  onRemove?: (fileId: string) => void;
}

const FileUpload = ({
  label,
  description,
  acceptedFileTypes = ".pdf,.jpg,.jpeg,.png",
  maxSize = 5, // Default 5MB
  maxFiles = 1,
  onUpload,
  uploadedFiles = [],
  onRemove,
}: FileUploadProps) => {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = async (fileList: FileList) => {
    // Reset error state
    setError(null);
    
    // Check if max files limit reached
    if (uploadedFiles.length + fileList.length > maxFiles) {
      setError(`You can only upload a maximum of ${maxFiles} file${maxFiles > 1 ? 's' : ''}`);
      return;
    }
    
    // Process files
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      
      // Check file type
      const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
      const isValidType = acceptedFileTypes.includes(fileExtension) || acceptedFileTypes.includes(".*");
      
      if (!isValidType) {
        setError(`Only ${acceptedFileTypes} files are accepted`);
        return;
      }
      
      // Check file size
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > maxSize) {
        setError(`File size must be less than ${maxSize}MB`);
        return;
      }
      
      // Upload file
      try {
        setUploading(true);
        await onUpload(file);
        setUploading(false);
      } catch (err) {
        setUploading(false);
        setError("Failed to upload file. Please try again.");
        console.error("File upload error:", err);
      }
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium">{label}</div>
      
      {description && (
        <p className="text-xs text-gray-500 mb-2">{description}</p>
      )}
      
      <div
        className={`border-2 border-dashed rounded-lg p-4 transition-colors ${
          dragging ? "border-indian-gold bg-amber-50" : "border-gray-300"
        } ${uploading ? "opacity-70 pointer-events-none" : ""} ${
          error ? "border-red-300" : ""
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleFileDrop}
      >
        <div className="text-center">
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={acceptedFileTypes}
            onChange={handleFileChange}
            multiple={maxFiles > 1}
          />
          
          {uploading ? (
            <div className="py-4 flex flex-col items-center">
              <Loader2 className="h-10 w-10 text-indian-gold animate-spin mb-2" />
              <p className="text-sm text-gray-600">Uploading file...</p>
            </div>
          ) : (
            <>
              <Upload className="mx-auto h-10 w-10 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Drag and drop file here, or click to browse
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {`(${acceptedFileTypes} format, max ${maxSize}MB${maxFiles > 1 ? `, up to ${maxFiles} files` : ""})`}
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-3"
                onClick={() => fileInputRef.current?.click()}
              >
                Browse Files
              </Button>
            </>
          )}
        </div>
      </div>
      
      {error && (
        <div className="text-red-500 text-xs flex items-center mt-1">
          <AlertCircle className="h-3 w-3 mr-1" />
          {error}
        </div>
      )}
      
      {uploadedFiles.length > 0 && (
        <div className="mt-2">
          <p className="text-xs font-medium text-gray-700 mb-1">Uploaded Files</p>
          <div className="space-y-2">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="flex items-center justify-between bg-gray-50 p-2 rounded border text-sm">
                <div className="flex items-center overflow-hidden">
                  <div className="flex-shrink-0 mr-2">
                    {file.status === "pending" && <AlertCircle className="h-4 w-4 text-amber-500" />}
                    {file.status === "verified" && <Check className="h-4 w-4 text-green-500" />}
                    {file.status === "rejected" && <X className="h-4 w-4 text-red-500" />}
                  </div>
                  <div className="truncate">
                    <p className="truncate text-sm">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)} ・ 
                      {file.status === "pending" && "Pending verification"}
                      {file.status === "verified" && "Verified"}
                      {file.status === "rejected" && "Rejected"}
                    </p>
                  </div>
                </div>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost" 
                        size="sm"
                        className="h-8 w-8 p-0 text-gray-500"
                        onClick={() => onRemove && onRemove(file.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Remove file</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;

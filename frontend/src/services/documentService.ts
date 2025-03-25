
// This is a simulated document service for handling uploads

export type DocumentType = 
  | "business-registration" 
  | "id-proof" 
  | "gst-certificate" 
  | "product-images" 
  | "bank-statement"
  | "artisan-card"
  | "quality-certificate";

export interface DocumentInfo {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: Date;
  status: "pending" | "verified" | "rejected";
  url: string;
}

// Store uploaded documents in memory (in a real app, this would be saved to a database)
const documentStore: Record<string, DocumentInfo[]> = {};

// Simulate document upload process
const uploadDocument = (
  userId: string,
  documentType: DocumentType,
  file: File
): Promise<DocumentInfo> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      const documentInfo: DocumentInfo = {
        id: `doc_${Math.random().toString(36).slice(2, 11)}`,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date(),
        status: "pending",
        url: URL.createObjectURL(file), // In a real app, this would be a server URL
      };

      // Add to document store
      if (!documentStore[userId]) {
        documentStore[userId] = [];
      }
      documentStore[userId].push(documentInfo);

      resolve(documentInfo);
    }, 1000);
  });
};

// Get documents for a specific user
const getUserDocuments = (userId: string): DocumentInfo[] => {
  return documentStore[userId] || [];
};

// Simulate document verification
const verifyDocument = (userId: string, documentId: string): Promise<DocumentInfo> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userDocs = documentStore[userId] || [];
      const docIndex = userDocs.findIndex(doc => doc.id === documentId);
      
      if (docIndex >= 0) {
        userDocs[docIndex].status = "verified";
        resolve(userDocs[docIndex]);
      } else {
        throw new Error("Document not found");
      }
    }, 1500);
  });
};

export const documentService = {
  uploadDocument,
  getUserDocuments,
  verifyDocument,
};

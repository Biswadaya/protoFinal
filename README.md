# AUTENTICA

## Overview
AUTENTICA is a secure document verification system that enables an authority (admin) to upload files, add details, and generate documents using predefined templates. The project ensures authenticity and integrity by leveraging cryptographic hashing, digital signatures, and blockchain storage. Additionally, a chatbot powered by Gemini assists both admins and users.

## Project Components
### 1. **Backend (Verify-Main - Go)**
- Allows admin to upload files and input details.
- Generates a document template.
- Computes SHA-256 hash of the document.
- Uses RSA for digital signatures (private & public key encryption).
- Stores the file hash in IPFS and saves the CID (Content Identifier) on the blockchain.
- Verifies digital signatures using RSA.
- Provides an email service to send documents.

### 2. **Frontend (React)**
- User-friendly interface for admins and users.
- Admin panel for file upload, document generation, and sending emails.
- User panel for verifying digital signatures.
- Chatbot integration for assistance.

### 3. **Python Script**
- Assists in email automation.

### 4. **Chatbot (Gemini AI)**
- Helps admins with file management and verification queries.
- Assists users in verifying digital signatures and document authenticity.

## Technologies Used
- **Backend**: Go (Verify-Main)
- **Frontend**: React
- **Blockchain & IPFS**: Storing and verifying document hashes
- **Cryptography**: SHA-256, RSA (for digital signatures)
- **Email Service**: To send documents
- **Python**: For cryptographic operations and IPFS interaction
- **Gemini AI**: Chatbot assistance

## How It Works
1. **Admin Actions:**
   - Uploads file or adds details.
   - Generates document and computes SHA-256 hash.
   - Signs the hash using RSA private key.
   - Stores the document hash in IPFS and saves the CID in blockchain.
   - Sends the document via email.

2. **User Actions:**
   - Receives the document and verifies the digital signature.
   - Compares the stored hash from the blockchain.
   - Uses the chatbot for guidance if needed.

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd Verify-Main
   ```
2. Set up the backend (Go):
   ```sh
   go run ./cmd/main.go
   ```
3. Install frontend dependencies and run:
   ```sh
   cd admin
   npm install
   npm run dev
   ```
4. Run the Python script:
   ```sh
   python certificate.py
   ```

## Future Enhancements
- Support for additional blockchain networks.
- Enhanced chatbot capabilities.
- Multi-factor authentication for admin access.


## License
This project is licensed under the MIT License.

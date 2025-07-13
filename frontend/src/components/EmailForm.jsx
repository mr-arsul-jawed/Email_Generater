import { useState } from 'react';
import '../styles/popup.css';
import axios from 'axios';


const EmailForm = () => {
  const [sector, setSector] = useState('corporate');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [output, setOutput] = useState('');
  const [name, setName] = useState('');
  const [enhancedOutput, setEnhancedOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const generateEmail = () => {
    let intro = '';
    switch (sector) {
      case 'corporate':
        intro = 'Dear Sir/Madam,\n\nI hope this message finds you well.';
        break;
      case 'education':
        intro = 'Respected Professor,\n\nI hope you are doing well.';
        break;
      case 'government':
        intro = 'To Whom It May Concern,\n\nGreetings.';
        break;
      default:
        intro = 'Hello,\n\n';
    }

    const email = `${intro}\n\n${message}\n\nThank you for your time and consideration.\n\nSincerely,\n${name}`;
    setOutput(email);
  };

  const fixGrammar = async () => {
    if (!output.trim()) {
      alert("Please generate an email first.");
      return;
    }

    setLoading(true);

    
      try {
        const response = await axios.post("/api/email/fix-grammar", {
          sector,
          subject,
          message,
          name
        });

    const data = response.data;

   
    if (data.enhancedEmail) {
      setEnhancedOutput(data.enhancedEmail.trim());
    } else {
      setEnhancedOutput("Error: No enhanced email received.");
    }
  } catch (err) {
    console.error("Grammar fix failed:", err);
    setEnhancedOutput("Grammar correction failed. Please try again.");
  }
  setLoading(false);
  };

 return (
  <div className="email-wrapper">
    <div className="email-form">
      <h2>Email Generater</h2>

      <label>Sector</label>
      <select value={sector} onChange={(e) => setSector(e.target.value)}>
        <option value="corporate">Corporate</option>
        <option value="education">Education</option>
        <option value="government">Government</option>
      </select>

      <label>Subject</label>
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Enter subject"
      />

      <label>Your Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />

      <label>Message Intent</label>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="What do you want to say?"
      ></textarea>

      <button onClick={generateEmail}>Generate Email</button>
      <button onClick={fixGrammar} disabled={loading}>
        {loading ? "Fixing..." : "Fix Grammar"}
      </button>

      <textarea
        value={output}
        readOnly
        placeholder="Generated email here..."
        style={{ marginBottom: '10px' }}
      />
    </div>

    {enhancedOutput && (
      <div className="enhanced-output">
        <label>Enhanced Email (Corrected & Expanded)</label>
        <textarea
          value={enhancedOutput}
          readOnly
          placeholder="Enhanced email after subject-based improvements"
        />
      </div>
    )}
  </div>
 );

};

export default EmailForm;

import { useEffect, useState } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [SavedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('savedCandidates');
    if (stored) {
      setSavedCandidates(JSON.parse(stored));
    }
  }, []);

  if (SavedCandidates.length === 0) {
    return <p>No saved candidates found.</p>;
  }

  return (
    <div>
      <h1>Potential Candidates</h1>
      {SavedCandidates.map((candidate, index) => (
        <div key={index} style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '1rem' }}>
          <img src={candidate.avatar_url} alt={candidate.name || candidate.login} width={100} />
          <p><strong>Name:</strong> {candidate.name || 'N/A'}</p>
          <p><strong>Username:</strong> {candidate.login}</p>
          <p><strong>Location:</strong> {candidate.location || 'N/A'}</p>
          <p><strong>Email:</strong> {candidate.email || 'N/A'}</p>
          <p><strong>GitHub:</strong> <a href={candidate.html_url} target="_blank">{candidate.html_url}</a></p>
          <p><strong>Company:</strong> {candidate.company || 'N/A'}</p>
        </div>
      ))}
    </div>
  );
};

export default SavedCandidates;

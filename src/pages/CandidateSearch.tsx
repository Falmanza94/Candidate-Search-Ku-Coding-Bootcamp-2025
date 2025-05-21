import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';


const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<string[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const loadCandidates = async () => {
      const data = await searchGithub();
      const usernames = data.map((user: any) => user.login);
      setCandidates(usernames);
    };

    loadCandidates();
  }, []);

  useEffect(() => {
    const loadCandidateDetails = async () => {
      if (candidates[index]) {
        const data = await searchGithubUser(candidates[index]);
        setCurrentCandidate(data);
      }
    };

    loadCandidateDetails();
  }, [candidates, index]);

  const handleAccept = () => {
    if (currentCandidate) {
      const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      saved.push(currentCandidate);
      localStorage.setItem('savedCandidates', JSON.stringify(saved));
    }
    setIndex(index + 1);
  };

  const handleReject = () => {
    setIndex(index + 1);
  };

  if (!currentCandidate) {
    return <p>Loading candidate...</p>;
  }
  
  return (
    <div>
      <h1>CandidateSearch</h1>
      <img src={currentCandidate.avatar_url} alt={currentCandidate.name || currentCandidate.login} width={100} />
      <p><strong>Name:</strong> {currentCandidate.name || 'N/A'}</p>
      <p><strong>Username:</strong> {currentCandidate.login}</p>
      <p><strong>Location:</strong> {currentCandidate.location || 'N/A'}</p>
      <p><strong>Email:</strong> {currentCandidate.email || 'N/A'}</p>
      <p><strong>GitHub:</strong> <a href={currentCandidate.html_url} target='_blank'> {currentCandidate.html_url}</a></p>
      <p><strong>Company:</strong> {currentCandidate.company || 'N/A'}</p>
      <button onClick={handleAccept}>+</button>
      <button onClick={handleReject}>-</button>
    </div>
  );
};

export default CandidateSearch;

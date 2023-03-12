import { useQuery } from 'react-query';
import { fetchIssues } from './api';
import './App.css';
import Header from './Header';

function App() {
  const { data, isLoading } = useQuery(["info"], () =>
  fetchIssues());

return (
    <>
      <Header />
    </>
  );
}

export default App;

export const getPerformance = async (projectId: string, token: string) => {
  const res = await fetch(`http://localhost:5000/performance/${projectId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

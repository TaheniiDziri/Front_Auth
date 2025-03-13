import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [user, setUser] = useState<any>(null);  // Stocke les données de l'utilisateur
  const [loading, setLoading] = useState<boolean>(true);  // Indicateur de chargement
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier si l'utilisateur est authentifié (par exemple, vérifier le token dans localStorage ou via session)
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      navigate('/login');  // Si le token n'est pas présent, redirige vers la page de login
      return;
    }

    const fetchUserData = async () => {
      try {
        // Récupérer les données de l'utilisateur depuis le backend
        const res = await fetch('http://localhost:3000/auth/validate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Utilisez le token pour valider l'utilisateur
          },
        });

        const data = await res.json();

        if (data.success) {
          setUser(data.user);  // Si la validation est réussie, stocker les données de l'utilisateur
        } else {
          navigate('/login');  // Si l'utilisateur n'est pas validé, rediriger vers la page de login
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
        navigate('/login');  // Si erreur de requête, rediriger vers login
      } finally {
        setLoading(false);  // Désactiver l'indicateur de chargement
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return <div>Chargement...</div>;  // Affichage pendant le chargement des données
  }

  if (!user) {
    return <div>Aucun utilisateur trouvé.</div>;  // Si l'utilisateur est introuvable
  }

  return (
    <div>
      <h1>Bienvenue, {user.username}</h1>
      <p>Email : {user.email}</p>
      <p>Google ID : {user.googleId}</p>
      <button onClick={() => {
        localStorage.removeItem('access_token');  // Déconnexion
        navigate('/login');
      }}>
        Se déconnecter
      </button>
    </div>
  );
};

export default Home;

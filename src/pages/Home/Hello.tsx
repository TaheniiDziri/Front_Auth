import React from 'react';
import { useParams } from 'react-router-dom';

const Hello: React.FC = () => {
  const { username } = useParams<{ username: string }>();


  return (
    <div>
      <h1>Hello, {username!}</h1> {/* Afficher le username */}
    </div>
  );
};

export default Hello;

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const NotFoundPage: React.FC = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-4">
    <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
    <p className="text-lg text-muted-foreground">Сторінку не знайдено</p>
    <Link to="/">
      <Button>На головну</Button>
    </Link>
  </div>
);

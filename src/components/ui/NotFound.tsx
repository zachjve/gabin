// components/ui/NotFound.tsx
import React from 'react';
import Button from '@/components/ui/Button';

interface NotFoundProps {
  title?: string;
  message?: string;
  backUrl?: string;
  backText?: string;
}

const NotFound: React.FC<NotFoundProps> = ({
  title = 'Ressource non trouvée',
  message = 'La ressource que vous recherchez n\'existe pas ou a été supprimée.',
  backUrl = '/dashboard',
  backText = 'Retour au tableau de bord'
}) => {
  return (
    <div className="min-h-screen bg-[var(--background)] pt-24 md:pt-32">
      <div className="container mx-auto px-4 text-center py-16">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <p className="text-[var(--foreground-muted)] mb-8">
          {message}
        </p>
        <Button variant="primary" href={backUrl}>
          {backText}
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
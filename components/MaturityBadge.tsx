import React from 'react';

interface Props {
  maturity: 'idee' | 'pilot' | 'bewezen' | 'schaalbaar';
}

export default function MaturityBadge({ maturity }: Props) {
  const styles = {
    idee: 'bg-blue-50 text-blue-700 border border-blue-200',
    pilot: 'bg-gray-100 text-gray-600 border border-gray-300',
    bewezen: 'bg-orange-50 text-orange-700 border border-orange-200',
    schaalbaar: 'bg-green-50 text-green-700 border border-green-200',
  };

  const labels = {
    idee: 'Idee',
    pilot: 'Pilot',
    bewezen: 'Bewezen',
    schaalbaar: 'Schaalbaar',
  };

  return (
    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${styles[maturity]}`}>
      {labels[maturity]}
    </span>
  );
}

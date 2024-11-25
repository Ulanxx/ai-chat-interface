import React from 'react';
import { useTranslation } from 'react-i18next';
import { TherapistCard } from './TherapistCard';
import { useThemeStore } from '../stores/theme';

const therapists = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    title: 'Clinical Psychologist',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
    experience: 12,
    rating: 4.9,
    specialties: ['Anxiety', 'Depression', 'Relationships'],
    available: true,
  },
  {
    id: '2',
    name: 'Dr. Michael Wong',
    title: 'Psychiatrist',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300',
    experience: 15,
    rating: 4.8,
    specialties: ['Trauma', 'PTSD', 'Addiction'],
    available: true,
  },
  {
    id: '3',
    name: 'Dr. Emily Zhang',
    title: 'Family Therapist',
    image: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&q=80&w=300&h=300',
    experience: 8,
    rating: 4.7,
    specialties: ['Family Issues', 'Couples Therapy', 'Child Psychology'],
    available: true,
  },
];

export function TherapistList() {
  const { t } = useTranslation();
  const { isDark } = useThemeStore();

  return (
    <div className="p-4 animate-fade-in">
      <h2 className={`text-xl font-display font-semibold mb-6 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        {t('therapists.title')}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {therapists.map((therapist) => (
          <TherapistCard key={therapist.id} therapist={therapist} />
        ))}
      </div>
    </div>
  );
}
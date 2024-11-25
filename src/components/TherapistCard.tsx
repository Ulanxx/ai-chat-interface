import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '../stores/theme';
import { Star, Bookmark } from 'lucide-react';

interface Therapist {
  id: string;
  name: string;
  title: string;
  image: string;
  experience: number;
  rating: number;
  specialties: string[];
  available: boolean;
}

interface TherapistCardProps {
  therapist: Therapist;
}

export function TherapistCard({ therapist }: TherapistCardProps) {
  const { t } = useTranslation();
  const { isDark } = useThemeStore();
  const navigate = useNavigate();

  return (
    <div
      className={`rounded-2xl p-5 ${
        isDark ? 'bg-dark-800/50' : 'bg-white'
      } backdrop-blur-sm transition-all hover:scale-102 hover:shadow-xl cursor-pointer`}
      onClick={() => navigate(`/therapist/${therapist.id}`)}
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <img
            src={therapist.image}
            alt={therapist.name}
            className="w-16 h-16 rounded-xl object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`text-lg font-display font-semibold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {therapist.name}
              </h3>
            </div>
            <p className={`text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {therapist.title}
            </p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            // Handle bookmark
          }}
          className={`p-2 rounded-xl transition-colors ${
            isDark ? 'hover:bg-white/5' : 'hover:bg-gray-100'
          }`}
        >
          <Bookmark className={`w-5 h-5 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`} />
        </button>
      </div>

      <div className="flex items-center gap-6 mt-4">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className={`font-semibold ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {therapist.rating}
          </span>
        </div>
        <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {therapist.experience} {t('therapists.yearsExp')}
        </div>
      </div>

      <div className="mt-4">
        <p className={`text-sm mb-2 ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {t('therapists.specialties')}:
        </p>
        <div className="flex flex-wrap gap-2">
          {therapist.specialties.map((specialty, index) => (
            <span
              key={index}
              className={`text-sm px-3 py-1.5 rounded-lg ${
                isDark
                  ? 'bg-dark-700 text-gray-300'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>

      <button
        className={`w-full mt-4 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
          therapist.available
            ? 'bg-blue-500 hover:bg-blue-600 text-white'
            : isDark
            ? 'bg-dark-600 text-gray-400'
            : 'bg-gray-100 text-gray-500'
        }`}
        disabled={!therapist.available}
      >
        {t('therapists.viewProfile')}
      </button>
    </div>
  );
}
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '../stores/theme';
import { Star, MapPin, Phone, Mail, Clock, X, CreditCard } from 'lucide-react';

interface TherapistProfileProps {
  therapist: any;
  onClose: () => void;
}

export function TherapistProfile({ therapist, onClose }: TherapistProfileProps) {
  const { t } = useTranslation();
  const { isDark } = useThemeStore();
  const [showPayment, setShowPayment] = useState(false);

  const clinic = {
    name: "Mindful Health Center",
    address: "789 Healing Street, Suite 301",
    city: "San Francisco, CA 94105",
    coordinates: { lat: 37.7749, lng: -122.4194 },
    hours: "Mon-Fri: 9:00 AM - 6:00 PM",
    phone: "+1 (415) 555-0123",
    email: "contact@mindfulhealth.com"
  };

  const handleContactClick = () => {
    setShowPayment(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 flex items-center justify-center">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

        {/* Content */}
        <div className={`relative w-full max-w-4xl rounded-2xl shadow-2xl ${
          isDark ? 'bg-dark-800' : 'bg-white'
        } p-6 sm:p-8`}>
          {/* Close button */}
          <button
            onClick={onClose}
            className={`absolute right-4 top-4 p-2 rounded-xl ${
              isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Profile header */}
          <div className="flex flex-col sm:flex-row gap-6">
            <img
              src={therapist.image}
              alt={therapist.name}
              className="w-32 h-32 rounded-2xl object-cover"
            />
            <div className="flex-1">
              <h2 className={`text-2xl font-display font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {therapist.name}
              </h2>
              <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {therapist.title}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-semibold">{therapist.rating}</span>
                </div>
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  {therapist.experience} {t('therapists.yearsExp')}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {therapist.specialties.map((specialty: string, index: number) => (
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
          </div>

          {/* About section */}
          <div className="mt-8">
            <h3 className={`text-lg font-semibold mb-3 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t('therapistProfile.about')}
            </h3>
            <p className={`text-base leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {therapist.name} is a highly experienced {therapist.title.toLowerCase()} 
              specializing in {therapist.specialties.join(', ')}. With {therapist.experience} years 
              of clinical experience, they have helped numerous individuals overcome personal challenges 
              and achieve better mental health.
            </p>
          </div>

          {/* Clinic information */}
          <div className="mt-8 grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {t('therapistProfile.clinic')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className={`w-5 h-5 mt-1 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <div>
                    <p className={`font-medium ${
                      isDark ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      {clinic.name}
                    </p>
                    <p className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {clinic.address}<br />{clinic.city}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className={`w-5 h-5 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    {clinic.hours}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className={`w-5 h-5 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    {clinic.phone}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className={`w-5 h-5 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    {clinic.email}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {t('therapistProfile.location')}
              </h3>
              <div className="h-[200px] rounded-xl overflow-hidden">
                <img
                  src={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/pin-s+1d4ed8(${clinic.coordinates.lng},${clinic.coordinates.lat})/${clinic.coordinates.lng},${clinic.coordinates.lat},13,0/400x200@2x?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja2V5czEyMyJ9.ZXhhbXBsZV9rZXk`}
                  alt="Clinic location"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Contact button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleContactClick}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-medium transition-colors"
            >
              {t('therapistProfile.contact')} - $9.99
            </button>
          </div>

          {/* Payment modal */}
          {showPayment && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowPayment(false)} />
              <div className={`relative w-full max-w-md rounded-2xl shadow-2xl ${
                isDark ? 'bg-dark-800' : 'bg-white'
              } p-6`}>
                <button
                  onClick={() => setShowPayment(false)}
                  className={`absolute right-4 top-4 p-2 rounded-xl ${
                    isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
                <h3 className={`text-xl font-semibold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {t('therapistProfile.payment')}
                </h3>
                <div className={`p-4 rounded-xl mb-4 ${
                  isDark ? 'bg-dark-700' : 'bg-gray-100'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                      {t('therapistProfile.consultation')}
                    </span>
                    <span className="font-semibold">$9.99</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    <span className="text-sm text-gray-500">
                      {t('therapistProfile.securePayment')}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    // Handle payment processing
                    setShowPayment(false);
                  }}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-medium transition-colors"
                >
                  {t('therapistProfile.proceed')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
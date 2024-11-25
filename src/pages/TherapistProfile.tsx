import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '../stores/theme';
import { Star, MapPin, Phone, Mail, Clock, CreditCard, ArrowLeft, Calendar, Award, Heart, Users, MessageCircle, CheckCircle } from 'lucide-react';
import { ReviewCard } from '../components/ReviewCard';

interface TherapistProfilePageProps {
  therapist: any;
  onBack: () => void;
}

export function TherapistProfilePage({ therapist, onBack }: TherapistProfilePageProps) {
  const { t } = useTranslation();
  const { isDark } = useThemeStore();
  const [showPayment, setShowPayment] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'about' | 'reviews' | 'schedule'>('about');

  const clinic = {
    name: "Mindful Health Center",
    address: "789 Healing Street, Suite 301",
    city: "San Francisco, CA 94105",
    coordinates: { lat: 37.7749, lng: -122.4194 },
    hours: "Mon-Fri: 9:00 AM - 6:00 PM",
    phone: "+1 (415) 555-0123",
    email: "contact@mindfulhealth.com"
  };

  const stats = [
    { icon: Users, label: 'Patients', value: '500+' },
    { icon: MessageCircle, label: 'Consultations', value: '2,000+' },
    { icon: Award, label: 'Experience', value: `${therapist.experience} Years` },
    { icon: Heart, label: 'Success Rate', value: '95%' },
  ];

  const reviews = [
    {
      id: '1',
      name: 'Anonymous',
      rating: 5,
      date: '2024-02-15',
      content: 'Dr. Chen is an exceptional therapist. She helped me overcome my anxiety with practical techniques and genuine care.',
      tags: ['Anxiety', 'Professional', 'Caring']
    },
    {
      id: '2',
      name: 'Anonymous',
      rating: 5,
      date: '2024-02-10',
      content: 'I appreciate the safe and understanding environment. The therapy sessions have made a significant positive impact on my life.',
      tags: ['Understanding', 'Helpful', 'Safe Space']
    }
  ];

  const achievements = [
    'Board Certified Clinical Psychologist',
    'PhD in Clinical Psychology from Stanford University',
    'Published researcher in anxiety and depression treatment',
    'Member of the American Psychological Association',
  ];

  const availableSlots = [
    { date: '2024-03-01', slots: ['09:00', '11:00', '14:00'] },
    { date: '2024-03-02', slots: ['10:00', '13:00', '15:00'] },
    { date: '2024-03-03', slots: ['09:30', '11:30', '14:30'] },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className={`sticky top-0 z-30 ${isDark ? 'bg-dark-800' : 'bg-white'} border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={onBack}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-colors ${
                isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{t('common.back')}</span>
            </button>
            <button
              onClick={() => setShowPayment(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl font-medium transition-colors"
            >
              {t('therapistProfile.contact')} - $9.99
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <img
            src={therapist.image}
            alt={therapist.name}
            className="w-40 h-40 rounded-2xl object-cover"
          />
          <div className="flex-1">
            <h1 className={`text-3xl font-display font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {therapist.name}
            </h1>
            <p className={`text-xl mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {therapist.title}
            </p>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-6 h-6 text-yellow-500 fill-current" />
                <span className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {therapist.rating}
                </span>
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                ({reviews.length} {t('therapistProfile.reviews')})
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {therapist.specialties.map((specialty: string, index: number) => (
                <span
                  key={index}
                  className={`px-4 py-2 rounded-xl ${
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

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl ${
                isDark ? 'bg-dark-800' : 'bg-gray-50'
              }`}
            >
              <stat.icon className={`w-8 h-8 mb-2 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <div className={`text-2xl font-bold mb-1 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {stat.value}
              </div>
              <div className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-8 gap-8 overflow-x-auto">
          {(['about', 'reviews', 'schedule'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`pb-4 px-2 font-medium transition-colors ${
                selectedTab === tab
                  ? isDark
                    ? 'text-white border-b-2 border-blue-500'
                    : 'text-gray-900 border-b-2 border-blue-500'
                  : isDark
                  ? 'text-gray-400 hover:text-gray-300'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t(`therapistProfile.tabs.${tab}`)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {selectedTab === 'about' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className={`text-xl font-semibold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {t('therapistProfile.about')}
                </h2>
                <p className={`text-base leading-relaxed mb-6 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {therapist.name} is a highly experienced {therapist.title.toLowerCase()} 
                  specializing in {therapist.specialties.join(', ')}. With {therapist.experience} years 
                  of clinical experience, they have helped numerous individuals overcome personal challenges 
                  and achieve better mental health.
                </p>

                <h3 className={`text-lg font-semibold mb-3 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {t('therapistProfile.achievements')}
                </h3>
                <ul className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className={`w-5 h-5 mt-0.5 ${
                        isDark ? 'text-blue-400' : 'text-blue-500'
                      }`} />
                      <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                        {achievement}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className={`text-xl font-semibold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {t('therapistProfile.clinic')}
                </h2>
                <div className={`p-6 rounded-2xl ${
                  isDark ? 'bg-dark-800' : 'bg-gray-50'
                }`}>
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

                <div className="mt-6">
                  <img
                    src={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/pin-s+1d4ed8(${clinic.coordinates.lng},${clinic.coordinates.lat})/${clinic.coordinates.lng},${clinic.coordinates.lat},13,0/600x300@2x?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja2V5czEyMyJ9.ZXhhbXBsZV9rZXk`}
                    alt="Clinic location"
                    className="w-full h-[300px] rounded-2xl object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'reviews' && (
            <div className="space-y-6">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}

          {selectedTab === 'schedule' && (
            <div>
              <h2 className={`text-xl font-semibold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {t('therapistProfile.availableSlots')}
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {availableSlots.map((day, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl ${
                      isDark ? 'bg-dark-800' : 'bg-gray-50'
                    }`}
                  >
                    <div className={`text-lg font-medium mb-3 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {new Date(day.date).toLocaleDateString()}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {day.slots.map((time, timeIndex) => (
                        <button
                          key={timeIndex}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            isDark
                              ? 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                              : 'bg-white text-gray-700 hover:bg-gray-100'
                          }`}
                          onClick={() => setShowPayment(true)}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowPayment(false)} />
          <div className={`relative w-full max-w-md rounded-2xl shadow-2xl ${
            isDark ? 'bg-dark-800' : 'bg-white'
          } p-6 mx-4`}>
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
              onClick={() => setShowPayment(false)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-medium transition-colors"
            >
              {t('therapistProfile.proceed')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
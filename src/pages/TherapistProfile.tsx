import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '../stores/theme';
import { 
  Star, MapPin, Phone, Mail, Clock, CreditCard, ArrowLeft, 
  Award, Heart, Users, MessageCircle, CheckCircle 
} from 'lucide-react';

// Mock data - In a real app, this would come from an API
const THERAPISTS = {
  '1': {
    id: '1',
    name: 'Dr. Sarah Chen',
    title: 'Clinical Psychologist',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
    experience: 12,
    rating: 4.9,
    specialties: ['Anxiety', 'Depression', 'Relationships'],
    available: true,
    clinic: {
      name: "Mindful Health Center",
      address: "789 Healing Street, Suite 301",
      city: "San Francisco, CA 94105",
      coordinates: { lat: 37.7749, lng: -122.4194 },
      hours: "Mon-Fri: 9:00 AM - 6:00 PM",
      phone: "+1 (415) 555-0123",
      email: "contact@mindfulhealth.com"
    },
    achievements: [
      'Board Certified Clinical Psychologist',
      'PhD in Clinical Psychology from Stanford University',
      'Published researcher in anxiety and depression treatment',
      'Member of the American Psychological Association',
    ],
    reviews: [
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
    ],
    availableSlots: [
      { date: '2024-03-01', slots: ['09:00', '11:00', '14:00'] },
      { date: '2024-03-02', slots: ['10:00', '13:00', '15:00'] },
      { date: '2024-03-03', slots: ['09:30', '11:30', '14:30'] },
    ]
  },
  // Add other therapists here...
};

function PaymentModal({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();
  const { isDark } = useThemeStore();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
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
          onClick={onClose}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-medium transition-colors"
        >
          {t('therapistProfile.proceed')}
        </button>
      </div>
    </div>
  );
}

function ProfileHeader({ therapist }: { therapist: typeof THERAPISTS['1'] }) {
  const { t } = useTranslation();
  const { isDark } = useThemeStore();

  return (
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
            ({therapist.reviews.length} {t('therapistProfile.reviews')})
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {therapist.specialties.map((specialty, index) => (
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
  );
}

function StatsGrid({ therapist }: { therapist: typeof THERAPISTS['1'] }) {
  const { t } = useTranslation();
  const { isDark } = useThemeStore();

  const stats = [
    { icon: Users, label: t('therapistProfile.stats.patients'), value: '500+' },
    { icon: MessageCircle, label: t('therapistProfile.stats.consultations'), value: '2,000+' },
    { icon: Award, label: t('therapistProfile.stats.experience'), value: `${therapist.experience}` },
    { icon: Heart, label: t('therapistProfile.stats.successRate'), value: '95%' },
  ];

  return (
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
  );
}

function AboutTab({ therapist }: { therapist: typeof THERAPISTS['1'] }) {
  const { t } = useTranslation();
  const { isDark } = useThemeStore();

  const bio = t('therapistProfile.bio', {
    name: therapist.name,
    title: therapist.title.toLowerCase(),
    specialties: therapist.specialties.join(', '),
    experience: therapist.experience
  });

  return (
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
          {bio}
        </p>

        <h3 className={`text-lg font-semibold mb-3 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          {t('therapistProfile.achievements')}
        </h3>
        <ul className="space-y-3">
          {therapist.achievements.map((achievement, index) => (
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
                  {therapist.clinic.name}
                </p>
                <p className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {therapist.clinic.address}<br />{therapist.clinic.city}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className={`w-5 h-5 ${
                isDark ? 'text-gray-300' : 'text-gray-500'
              }`} />
              <span className={isDark ? 'text-gray-200' : 'text-gray-600'}>
                {therapist.clinic.hours}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className={`w-5 h-5 ${
                isDark ? 'text-gray-300' : 'text-gray-500'
              }`} />
              <span className={isDark ? 'text-gray-200' : 'text-gray-600'}>
                {therapist.clinic.phone}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className={`w-5 h-5 ${
                isDark ? 'text-gray-300' : 'text-gray-500'
              }`} />
              <span className={isDark ? 'text-gray-200' : 'text-gray-600'}>
                {therapist.clinic.email}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function ReviewsTab({ therapist }: { therapist: typeof THERAPISTS['1'] }) {
  const { isDark } = useThemeStore();

  return (
    <div className="space-y-6">
      {therapist.reviews.map((review) => (
        <div key={review.id} className={`p-6 rounded-2xl ${
          isDark ? 'bg-dark-800' : 'bg-gray-50'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`font-medium ${
                  isDark ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  {review.name}
                </span>
                <span className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  • {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-500 fill-current"
                  />
                ))}
              </div>
            </div>
          </div>
          <p className={`mb-4 ${isDark ? 'text-gray-200' : 'text-gray-600'}`}>
            {review.content}
          </p>
          <div className="flex flex-wrap gap-2">
            {review.tags.map((tag, index) => (
              <span
                key={index}
                className={`text-sm px-3 py-1.5 rounded-lg ${
                  isDark
                    ? 'bg-dark-600 text-gray-200'
                    : 'bg-white text-gray-700'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ScheduleTab({ therapist, onBookSlot }: { 
  therapist: typeof THERAPISTS['1'],
  onBookSlot: () => void 
}) {
  const { t } = useTranslation();
  const { isDark } = useThemeStore();

  return (
    <div>
      <h2 className={`text-xl font-semibold mb-6 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        {t('therapistProfile.availableSlots')}
      </h2>
      <div className="grid sm:grid-cols-3 gap-4">
        {therapist.availableSlots.map((day, index) => (
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
                  onClick={onBookSlot}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TherapistProfilePage() {
  const { t } = useTranslation();
  const { isDark } = useThemeStore();
  const [showPayment, setShowPayment] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'about' | 'reviews' | 'schedule'>('about');
  const navigate = useNavigate();
  const { id } = useParams();

  const therapist = id ? THERAPISTS[id as keyof typeof THERAPISTS] : null;

  if (!therapist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className={`text-xl font-semibold mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {t('therapistProfile.notFound')}
          </h2>
          <button
            onClick={() => navigate('/')}
            className="text-blue-500 hover:underline"
          >
            {t('common.returnHome')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-dark-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-30  ${isDark ? 'bg-dark-900' : 'bg-gray-50'} border-b ${isDark ? 'border-white/10' : 'border-gray-200'} backdrop-blur-lg`}>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 `}>
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-colors
                ${isDark ? 'text-gray-400' : 'text-gray-600'}
                ${
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

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${isDark ? 'bg-dark-900' : 'bg-gray-50'}`}>
        <ProfileHeader therapist={therapist} />
        <StatsGrid therapist={therapist} />

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
          {selectedTab === 'about' && <AboutTab therapist={therapist} />}
          {selectedTab === 'reviews' && <ReviewsTab therapist={therapist} />}
          {selectedTab === 'schedule' && (
            <ScheduleTab 
              therapist={therapist} 
              onBookSlot={() => setShowPayment(true)} 
            />
          )}
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && <PaymentModal onClose={() => setShowPayment(false)} />}
    </div>
  );
}
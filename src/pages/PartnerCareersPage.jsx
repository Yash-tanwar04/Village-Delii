import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Fuel, 
  TrendingUp, 
  Landmark, 
  Send, 
  CheckCircle2, 
  ArrowRight,
  Users,
  Briefcase,
  ChefHat,
  Truck,
  Sparkles,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

export function PartnerCareersPage({ initialTab = 'partner' }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Tab state: 'partner' or 'careers'
  const [activeTab, setActiveTab] = useState(() => {
    if (location.pathname.includes('career')) return 'careers';
    const params = new URLSearchParams(location.search);
    if (params.get('tab') === 'careers') return 'careers';
    return initialTab;
  });

  useEffect(() => {
    if (location.pathname.includes('career')) {
      setActiveTab('careers');
    } else if (location.pathname.includes('partner')) {
      setActiveTab('partner');
    }
  }, [location.pathname]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(tab === 'careers' ? '/careers' : '/partner', { replace: true });
  };

  // ── PARTNER DATA & FORM ──
  const partnerTracks = [
    {
      num: '01',
      title: 'Property Owners & Landlords',
      desc: 'Have a strategically located property? Let\'s explore the opportunity together.',
      icon: Building2,
      note: 'Prime highway frontages, township retail, and high-footfall plots.',
    },
    {
      num: '02',
      title: 'Fuel Station Operators',
      desc: 'Bring a complete convenience experience to your commuter customers.',
      icon: Fuel,
      note: 'High-volume petrol stations, highway expressways, and mobility hubs.',
    },
    {
      num: '03',
      title: 'Franchisees & Business Partners',
      desc: 'Build and grow with a future-ready, 24/7 round-the-clock retail format.',
      icon: TrendingUp,
      note: 'Experienced retail entrepreneurs seeking scalable modern store formats.',
    },
    {
      num: '04',
      title: 'Institutional & Corporate Alliances',
      desc: 'Explore state, institutional, and cooperative network-level opportunities.',
      icon: Landmark,
      note: 'State initiatives, cooperatives (e.g. HarHith & Vita), and commercial campuses.',
    },
  ];

  const [partnerForm, setPartnerForm] = useState({
    name: '',
    email: '',
    phone: '',
    partnerType: 'Property Owners & Landlords',
    propertyDetails: '',
    message: '',
  });
  const [partnerSubmitted, setPartnerSubmitted] = useState(false);

  const handlePartnerSubmit = (e) => {
    e.preventDefault();
    setPartnerSubmitted(true);
  };

  // ── CAREERS DATA & FORM ──
  const careerTracks = [
    {
      num: '01',
      title: 'Store Managers & Supervisors',
      desc: 'Lead daily store operations, mentor team members, and maintain the highest standards of customer care.',
      icon: Building2,
    },
    {
      num: '02',
      title: 'Retail Associates & Cashiers',
      desc: 'Create a warm, welcoming shopping atmosphere and ensure swift, friendly service for everyday and late-night guests.',
      icon: Users,
    },
    {
      num: '03',
      title: 'Bakers & Deli Chefs',
      desc: 'Bring fresh food to life through live baking, artisanal pastry preparation, and wholesome deli meals prepared fresh on-site.',
      icon: ChefHat,
    },
    {
      num: '04',
      title: 'Supply Chain & Logistics',
      desc: 'Coordinate farm-fresh produce transport, cold-chain dairy routing, and inventory flow across our regional hubs.',
      icon: Truck,
    },
    {
      num: '05',
      title: 'Corporate & Regional Operations',
      desc: 'Drive real estate acquisitions, regional store launches, commercial partnerships, and organizational growth.',
      icon: Briefcase,
    },
  ];

  const [careerForm, setCareerForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Store Managers & Supervisors',
    experience: '',
    message: '',
  });
  const [careerSubmitted, setCareerSubmitted] = useState(false);

  const handleCareerSubmit = (e) => {
    e.preventDefault();
    setCareerSubmitted(true);
  };

  return (
    <div className="bg-[#F7F4ED] text-[#202321] min-h-screen">
      
      {/* ── 01. EDITORIAL HERO ── */}
      <section
        style={{ paddingTop: 'calc(var(--navbar-height, 72px) + 2rem)' }}
        className="pb-12 px-6 bg-[#F7F4ED] text-[#202321] border-b border-[#E5D8C5] text-left"
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-semibold block">
              06 / COLLABORATION & TALENT
            </span>
            <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#172B3A] leading-tight">
              Build the Future With
              <span className="block italic text-[#C86B4A] font-medium mt-1">
                Village Deli.
              </span>
            </h1>
            <p className="text-sm sm:text-base text-[#202321]/80 font-light leading-relaxed pt-1">
              {activeTab === 'partner'
                ? "Village Deli is building a scalable retail network across high-potential locations. We are looking to connect with the right partners, property owners, and business stakeholders who share our vision."
                : "Village Deli is growing — and we are looking for people who want to grow with us. From store operations to food craft, supply chain, and corporate management, become an essential part of our journey."}
            </p>
          </div>

          {/* Clean Segmented Tab Switcher */}
          <div className="mt-8 pt-4 border-t border-[#E5D8C5] flex items-center gap-3">
            <div className="inline-flex p-1 rounded-full bg-white border border-[#E5D8C5] shadow-xs">
              <button
                onClick={() => handleTabChange('partner')}
                className={'px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer flex items-center gap-2 ' +
                  (activeTab === 'partner'
                    ? 'bg-[#172B3A] text-white shadow-xs'
                    : 'text-[#202321]/70 hover:text-[#172B3A]')}
              >
                <Building2 className="w-3.5 h-3.5 text-[#C86B4A]" />
                <span>Partner Opportunities</span>
              </button>

              <button
                onClick={() => handleTabChange('careers')}
                className={'px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer flex items-center gap-2 ' +
                  (activeTab === 'careers'
                    ? 'bg-[#172B3A] text-white shadow-xs'
                    : 'text-[#202321]/70 hover:text-[#172B3A]')}
              >
                <Briefcase className="w-3.5 h-3.5 text-[#C86B4A]" />
                <span>Career Opportunities</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02. DYNAMIC CONTENT SECTION ── */}
      {activeTab === 'partner' ? (
        /* ═══════════════════════════════════════
           PARTNER WITH US VIEW (PDF PAGE 17)
           ═══════════════════════════════════════ */
        <div className="space-y-16 py-12 lg:py-16">
          {/* 4 Tracks */}
          <section className="max-w-7xl mx-auto px-6 text-left space-y-8">
            <div className="max-w-2xl space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-bold block">
                FOUR STRATEGIC TRACKS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#172B3A]">
                Collaboration Models
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {partnerTracks.map((track) => {
                const Icon = track.icon;
                return (
                  <div
                    key={track.num}
                    className="p-6 rounded-2xl bg-white border border-[#E5D8C5] shadow-xs hover:border-[#C86B4A]/60 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[#C86B4A]">
                          {track.num}
                        </span>
                        <div className="w-9 h-9 rounded-full bg-[#172B3A]/5 flex items-center justify-center text-[#172B3A]">
                          <Icon className="w-4 h-4 text-[#C86B4A]" />
                        </div>
                      </div>

                      <h3 className="font-serif text-lg font-bold text-[#172B3A] leading-snug">
                        {track.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#202321]/75 font-light leading-relaxed">
                        {track.desc}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#E5D8C5] text-[11px] font-mono text-[#202321]/60">
                      {track.note}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Strategic Alliance Note */}
          <section className="max-w-7xl mx-auto px-6">
            <div className="p-7 sm:p-8 rounded-3xl bg-[#172B3A] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-left">
              <div className="space-y-2 max-w-xl">
                <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-semibold block">
                  GOVERNMENT & COOPERATIVE ALLIANCE
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold">
                  Cooperative Strength with Vita & HarHith
                </h3>
                <p className="text-xs sm:text-sm text-[#E5D8C5]/85 font-light leading-relaxed">
                  Our strategic partnership with Haryana's flagship cooperative networks ensures reliable dairy supply, community trust, and expansive regional footprint.
                </p>
              </div>

              <div className="flex items-center gap-3 bg-white p-2.5 rounded-2xl shrink-0">
                <img src="/assets/images/harhith-logo.jpg" alt="HarHith" className="h-8 w-auto object-contain rounded" />
                <div className="h-6 w-px bg-gray-200" />
                <img src="/assets/images/vita-logo.jpg" alt="Vita" className="h-8 w-auto object-contain rounded" />
              </div>
            </div>
          </section>

          {/* Partner Inquiry Form */}
          <section className="max-w-7xl mx-auto px-6 text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-bold block">
                  LET'S CONNECT
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#172B3A]">
                  Submit a Partnership Inquiry
                </h2>
                <p className="text-xs sm:text-sm text-[#202321]/75 font-light leading-relaxed">
                  Have a prime retail property, fuel station frontage, or franchise proposal? Share your details and our commercial development team will respond within 48 business hours.
                </p>

                <div className="p-5 rounded-2xl bg-white border border-[#E5D8C5] space-y-3 text-xs font-mono">
                  <div className="flex items-center gap-2.5 text-[#172B3A]">
                    <Mail className="w-4 h-4 text-[#C86B4A]" />
                    <span>partner@villagedeli.in</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[#172B3A]">
                    <Phone className="w-4 h-4 text-[#C86B4A]" />
                    <span>+91 (0124) 489-DELI</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[#172B3A]">
                    <MapPin className="w-4 h-4 text-[#C86B4A]" />
                    <span>Gurgaon, Haryana, India</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#E5D8C5] shadow-xs">
                {partnerSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-[#172B3A] text-[#C86B4A] flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#172B3A]">
                      Partnership Inquiry Received
                    </h3>
                    <p className="text-xs sm:text-sm text-[#202321]/75 max-w-md mx-auto">
                      Thank you for your interest in partnering with Village Deli. Our corporate development team will review your proposal and get in touch shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handlePartnerSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono uppercase tracking-wider text-[#172B3A] font-semibold block">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={partnerForm.name}
                          onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })}
                          placeholder="Rohit Sharma"
                          className="w-full px-4 py-2.5 rounded-xl border border-[#E5D8C5] text-xs focus:outline-hidden focus:border-[#C86B4A]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-mono uppercase tracking-wider text-[#172B3A] font-semibold block">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={partnerForm.email}
                          onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                          placeholder="rohit@company.com"
                          className="w-full px-4 py-2.5 rounded-xl border border-[#E5D8C5] text-xs focus:outline-hidden focus:border-[#C86B4A]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono uppercase tracking-wider text-[#172B3A] font-semibold block">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={partnerForm.phone}
                          onChange={(e) => setPartnerForm({ ...partnerForm, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-2.5 rounded-xl border border-[#E5D8C5] text-xs focus:outline-hidden focus:border-[#C86B4A]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-mono uppercase tracking-wider text-[#172B3A] font-semibold block">
                          Partnership Track *
                        </label>
                        <select
                          value={partnerForm.partnerType}
                          onChange={(e) => setPartnerForm({ ...partnerForm, partnerType: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-[#E5D8C5] text-xs focus:outline-hidden focus:border-[#C86B4A] bg-white"
                        >
                          <option>Property Owners & Landlords</option>
                          <option>Fuel Station Operators</option>
                          <option>Franchisees & Business Partners</option>
                          <option>Institutional & Corporate Alliances</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-[#172B3A] font-semibold block">
                        Property Details & Location (City / Highway / Sq. Ft)
                      </label>
                      <input
                        type="text"
                        value={partnerForm.propertyDetails}
                        onChange={(e) => setPartnerForm({ ...partnerForm, propertyDetails: e.target.value })}
                        placeholder="e.g. 2,500 sq ft, NH-48 Expressway frontage, Gurugram"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E5D8C5] text-xs focus:outline-hidden focus:border-[#C86B4A]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-[#172B3A] font-semibold block">
                        Message & Proposal Summary *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={partnerForm.message}
                        onChange={(e) => setPartnerForm({ ...partnerForm, message: e.target.value })}
                        placeholder="Tell us about your proposal, current operations, and timeline..."
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E5D8C5] text-xs focus:outline-hidden focus:border-[#C86B4A] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-[#172B3A] hover:bg-[#C86B4A] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Partnership Inquiry</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>
        </div>
      ) : (
        /* ═══════════════════════════════════════
           CAREER OPPORTUNITIES VIEW (PDF PAGE 18)
           ═══════════════════════════════════════ */
        <div className="space-y-16 py-12 lg:py-16">
          {/* 5 Opportunity Areas */}
          <section className="max-w-7xl mx-auto px-6 text-left space-y-8">
            <div className="max-w-2xl space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-bold block">
                OPPORTUNITY AREAS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#172B3A]">
                Where You Can Make an Impact
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {careerTracks.map((career) => {
                const Icon = career.icon;
                return (
                  <div
                    key={career.num}
                    className="p-6 rounded-2xl bg-white border border-[#E5D8C5] shadow-xs hover:border-[#C86B4A]/60 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[#C86B4A]">
                          {career.num}
                        </span>
                        <div className="w-9 h-9 rounded-full bg-[#172B3A]/5 flex items-center justify-center text-[#172B3A]">
                          <Icon className="w-4 h-4 text-[#C86B4A]" />
                        </div>
                      </div>

                      <h3 className="font-serif text-lg font-bold text-[#172B3A] leading-snug">
                        {career.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#202321]/75 font-light leading-relaxed">
                        {career.desc}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#E5D8C5] flex items-center justify-between text-[11px] font-mono text-[#C86B4A]">
                      <span>Full-Time · Shift Based</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Culture Banner */}
          <section className="max-w-7xl mx-auto px-6">
            <div className="p-7 sm:p-8 rounded-3xl bg-white border border-[#E5D8C5] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-left shadow-xs">
              <div className="space-y-2 max-w-xl">
                <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-semibold block">
                  OUR WORK ENVIRONMENT
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#172B3A]">
                  A Culture of Care, Craft & Professional Growth
                </h3>
                <p className="text-xs sm:text-sm text-[#202321]/75 font-light leading-relaxed">
                  We believe that great guest experiences begin with happy, empowered team members. Village Deli offers comprehensive training, safety, and upward mobility across all positions.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-xs font-mono text-[#172B3A]">
                <span className="px-3 py-1.5 rounded-full bg-[#F7F4ED] border border-[#E5D8C5]">Competitive Compensation</span>
                <span className="px-3 py-1.5 rounded-full bg-[#F7F4ED] border border-[#E5D8C5]">Skill Certification</span>
                <span className="px-3 py-1.5 rounded-full bg-[#F7F4ED] border border-[#E5D8C5]">Clear Career Paths</span>
              </div>
            </div>
          </section>

          {/* Career Application Form */}
          <section className="max-w-7xl mx-auto px-6 text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-bold block">
                  JOIN OUR TEAM
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#172B3A]">
                  Apply for a Role at Village Deli
                </h2>
                <p className="text-xs sm:text-sm text-[#202321]/75 font-light leading-relaxed">
                  Whether you are an experienced retail leader, a passionate baker, or seeking your first step in retail, send us your resume. Our HR team reviews every submission.
                </p>

                <div className="p-5 rounded-2xl bg-white border border-[#E5D8C5] space-y-3 text-xs font-mono">
                  <div className="flex items-center gap-2.5 text-[#172B3A]">
                    <Mail className="w-4 h-4 text-[#C86B4A]" />
                    <span>careers@villagedeli.in</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[#172B3A]">
                    <Phone className="w-4 h-4 text-[#C86B4A]" />
                    <span>+91 (0124) 489-JOBS</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#E5D8C5] shadow-xs">
                {careerSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-[#172B3A] text-[#C86B4A] flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#172B3A]">
                      Application Received
                    </h3>
                    <p className="text-xs sm:text-sm text-[#202321]/75 max-w-md mx-auto">
                      Thank you for your interest in joining Village Deli! Our talent acquisition team will review your profile and contact you if there is a match.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleCareerSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono uppercase tracking-wider text-[#172B3A] font-semibold block">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={careerForm.name}
                          onChange={(e) => setCareerForm({ ...careerForm, name: e.target.value })}
                          placeholder="Priya Sharma"
                          className="w-full px-4 py-2.5 rounded-xl border border-[#E5D8C5] text-xs focus:outline-hidden focus:border-[#C86B4A]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-mono uppercase tracking-wider text-[#172B3A] font-semibold block">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={careerForm.email}
                          onChange={(e) => setCareerForm({ ...careerForm, email: e.target.value })}
                          placeholder="priya@example.com"
                          className="w-full px-4 py-2.5 rounded-xl border border-[#E5D8C5] text-xs focus:outline-hidden focus:border-[#C86B4A]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono uppercase tracking-wider text-[#172B3A] font-semibold block">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={careerForm.phone}
                          onChange={(e) => setCareerForm({ ...careerForm, phone: e.target.value })}
                          placeholder="+91 98765 12345"
                          className="w-full px-4 py-2.5 rounded-xl border border-[#E5D8C5] text-xs focus:outline-hidden focus:border-[#C86B4A]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-mono uppercase tracking-wider text-[#172B3A] font-semibold block">
                          Preferred Role *
                        </label>
                        <select
                          value={careerForm.role}
                          onChange={(e) => setCareerForm({ ...careerForm, role: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-[#E5D8C5] text-xs focus:outline-hidden focus:border-[#C86B4A] bg-white"
                        >
                          <option>Store Managers & Supervisors</option>
                          <option>Retail Associates & Cashiers</option>
                          <option>Bakers & Deli Chefs</option>
                          <option>Supply Chain & Logistics</option>
                          <option>Corporate & Regional Operations</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-[#172B3A] font-semibold block">
                        Relevant Experience (Years / Past Employers)
                      </label>
                      <input
                        type="text"
                        value={careerForm.experience}
                        onChange={(e) => setCareerForm({ ...careerForm, experience: e.target.value })}
                        placeholder="e.g. 3 years as Retail Supervisor at modern grocery chain"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E5D8C5] text-xs focus:outline-hidden focus:border-[#C86B4A]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-[#172B3A] font-semibold block">
                        Cover Note / Summary *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={careerForm.message}
                        onChange={(e) => setCareerForm({ ...careerForm, message: e.target.value })}
                        placeholder="Briefly introduce yourself, your preferred location, and what excites you about Village Deli..."
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E5D8C5] text-xs focus:outline-hidden focus:border-[#C86B4A] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-[#172B3A] hover:bg-[#C86B4A] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Career Application</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>
        </div>
      )}

    </div>
  );
}

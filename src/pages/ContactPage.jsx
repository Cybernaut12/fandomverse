import { useState } from 'react';
import { Mail, MapPin, Phone, Send, Clock } from 'lucide-react';
import './ContactPage.css';
export function ContactPage() {
    const [sent, setSent] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const siteMapAddress = 'MODUPE HOUSE, Oyo Rd, 200211 Mokola Rd, adjacent Alafia Hospital, Ibadan, Oyo';
    const [mapQuery, setMapQuery] = useState(siteMapAddress);
    const [showingVisitorLocation, setShowingVisitorLocation] = useState(false);
    const [locationStatus, setLocationStatus] = useState('Map showing Aptech Ibadan 2, Ibadan, Oyo.');
    const locateVisitor = () => {
        if (!navigator.geolocation) {
            setLocationStatus('Your browser does not support location access.');
            return;
        }
        setLocationStatus('Requesting your location…');
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            const point = `${coords.latitude},${coords.longitude}`;
            setMapQuery(point);
            setShowingVisitorLocation(true);
            setLocationStatus(`Map centered on your location (${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}).`);
        }, (error) => {
            setLocationStatus(error.code === error.PERMISSION_DENIED
                ? 'Location permission was denied. You can allow it in your browser settings.'
                : 'Your location could not be determined. Please try again.');
        }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSent(false), 3000);
    };
    return (<div className="min-vh-100 fv-bg-ink-900 fv-pt-16">
      {/* Hero */}
      <section className="position-relative fv-h-30vh fv-min-h-250px d-flex align-items-end overflow-hidden">
        <img src="https://images.pexels.com/photos/7634861/pexels-photo-7634861.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2" alt="Globes and map with soft lighting" className="position-absolute fv-inset-0 w-100 h-100 object-fit-cover" fetchPriority="high"/>
        <div className="position-absolute fv-inset-0 fv-bg-gradient-to-t fv-from-ink-900 fv-via-ink-900-70 fv-to-ink-900-30"/>
        <div className="position-relative container-wide fv-pb-8 fv-z-10">
          <p className="fv-text-sm fv-heading-font fv-uppercase fv-tracking-widest fv-text-brand-400 fv-mb-2">Get in touch</p>
          <h1 className="fv-display-font fv-text-5xl fv-md-text-6xl fv-text-paper-50 fv-tracking-wide fv-leading-none fv-text-shadow-lg">
            Contact Us
          </h1>
        </div>
      </section>

      <section className="fv-py-12 fv-md-py-16">
        <div className="container-wide">
          <div className="fv-grid fv-grid-cols-1 fv-lg-grid-cols-2 fv-gap-10">
            {/* Contact info */}
            <div>
              <h2 className="fv-display-font fv-text-3xl fv-text-paper-50 fv-tracking-wide fv-mb-4">Say Hello</h2>
              <p className="fv-text-paper-200 fv-leading-relaxed fv-mb-8 fv-max-w-md">
                Got a question, a suggestion, or just want to talk about your favorite show?
                We're around. This is a demo project, but the form works — kind of.
              </p>

              <div className="fv-space-y-4">
                <div className="d-flex align-items-start fv-gap-3 fv-bg-ink-800 rounded-3 fv-p-4 border fv-border-ink-600">
                  <Mail className="fv-w-5 fv-h-5 fv-text-brand-400 flex-shrink-0 fv-mt-0-5"/>
                  <div>
                    <p className="fv-text-xs fv-heading-font fv-uppercase fv-tracking-wider fv-text-paper-300-60">Email</p>
                    <p className="fv-text-paper-100">hello@fandomverse.demo</p>
                  </div>
                </div>
                <div className="d-flex align-items-start fv-gap-3 fv-bg-ink-800 rounded-3 fv-p-4 border fv-border-ink-600">
                  <Phone className="fv-w-5 fv-h-5 fv-text-brand-400 flex-shrink-0 fv-mt-0-5"/>
                  <div>
                    <p className="fv-text-xs fv-heading-font fv-uppercase fv-tracking-wider fv-text-paper-300-60">Phone</p>
                    <p className="fv-text-paper-100">+1 (555) 012-3456</p>
                  </div>
                </div>
                <div className="d-flex align-items-start fv-gap-3 fv-bg-ink-800 rounded-3 fv-p-4 border fv-border-ink-600">
                  <MapPin className="fv-w-5 fv-h-5 fv-text-brand-400 flex-shrink-0 fv-mt-0-5"/>
                  <div>
                    <p className="fv-text-xs fv-heading-font fv-uppercase fv-tracking-wider fv-text-paper-300-60">Location</p>
                    <p className="fv-text-paper-100">Aptech Ibadan 2<br />MODUPE HOUSE, Oyo Rd, 200211 Mokola Rd, adjacent Alafia Hospital, Ibadan, Oyo</p>
                  </div>
                </div>
                <div className="d-flex align-items-start fv-gap-3 fv-bg-ink-800 rounded-3 fv-p-4 border fv-border-ink-600">
                  <Clock className="fv-w-5 fv-h-5 fv-text-brand-400 flex-shrink-0 fv-mt-0-5"/>
                  <div>
                    <p className="fv-text-xs fv-heading-font fv-uppercase fv-tracking-wider fv-text-paper-300-60">Hours</p>
                    <p className="fv-text-paper-100">Mon–Fri, 10am–6pm PT</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Form */}
            <div>
              <form onSubmit={handleSubmit} className="fv-bg-ink-800 rounded-4 fv-p-6 fv-md-p-8 border fv-border-ink-600 fv-space-y-4">
                <h2 className="fv-display-font fv-text-2xl fv-text-paper-50 fv-tracking-wide fv-mb-2">Send a Message</h2>

                {sent && (<div className="fv-bg-gaming-15 border fv-border-gaming-40 rounded-3 fv-p-3 fv-text-sm fv-text-gaming d-flex align-items-center gap-2 fv-animate-fade-in">
                    <Send className="fv-w-4 fv-h-4"/>
                    Message sent! We'll get back to you (not really, this is a demo).
                  </div>)}

                <div>
                  <label htmlFor="name" className="d-block fv-text-xs fv-heading-font fv-uppercase fv-tracking-wider fv-text-paper-300-60 fv-mb-1-5">
                    Your Name
                  </label>
                  <input id="name" type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-100 fv-bg-ink-700 fv-text-paper-100 rounded-3 fv-px-4 fv-py-2-5 border fv-border-ink-600 fv-outline-none fv-focus-border-brand-400 fv-transition-colors" placeholder="Jane Doe"/>
                </div>
                <div>
                  <label htmlFor="email" className="d-block fv-text-xs fv-heading-font fv-uppercase fv-tracking-wider fv-text-paper-300-60 fv-mb-1-5">
                    Email Address
                  </label>
                  <input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-100 fv-bg-ink-700 fv-text-paper-100 rounded-3 fv-px-4 fv-py-2-5 border fv-border-ink-600 fv-outline-none fv-focus-border-brand-400 fv-transition-colors" placeholder="jane@example.com"/>
                </div>
                <div>
                  <label htmlFor="subject" className="d-block fv-text-xs fv-heading-font fv-uppercase fv-tracking-wider fv-text-paper-300-60 fv-mb-1-5">
                    Subject
                  </label>
                  <input id="subject" type="text" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-100 fv-bg-ink-700 fv-text-paper-100 rounded-3 fv-px-4 fv-py-2-5 border fv-border-ink-600 fv-outline-none fv-focus-border-brand-400 fv-transition-colors" placeholder="What's this about?"/>
                </div>
                <div>
                  <label htmlFor="message" className="d-block fv-text-xs fv-heading-font fv-uppercase fv-tracking-wider fv-text-paper-300-60 fv-mb-1-5">
                    Message
                  </label>
                  <textarea id="message" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-100 fv-bg-ink-700 fv-text-paper-100 rounded-3 fv-px-4 fv-py-2-5 border fv-border-ink-600 fv-outline-none fv-focus-border-brand-400 fv-transition-colors fv-resize-none" placeholder="Tell us what's on your mind..."/>
                </div>
                <button type="submit" className="w-100 fv-py-3 fv-bg-brand-500 fv-hover-bg-brand-400 fv-text-ink-900 fv-heading-font fv-font-semibold rounded-3 fv-transition-colors d-flex align-items-center justify-content-center gap-2 fv-active-scale-95">
                  <Send className="fv-w-4 fv-h-4"/>
                  Send Message
                </button>
                <p className="fv-text-xs fv-text-paper-300-40 text-center">
                  This form doesn't actually send anything — it's a UI demonstration.
                </p>
              </form>
            </div>
              <div className="contact-map-full-width rounded-3 overflow-hidden border fv-border-ink-600 fv-bg-ink-800">
                <div className="contact-map-frame position-relative">
                  {mapQuery ? (
                    <>
                      <iframe title={showingVisitorLocation ? "Google Map centered on your location" : "Google Map showing Aptech Ibadan 2, Ibadan, Oyo"} src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=14&output=embed`} className="w-100 h-100 border-0" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
                      <div className="position-absolute fv-bottom-3 fv-left-3 fv-bg-ink-900-80 fv-backdrop-blur-sm rounded-2 fv-px-3 fv-py-2">
                        <p className="fv-text-xs fv-text-paper-200 fv-heading-font d-flex align-items-center fv-gap-1">
                          <MapPin className="fv-w-3-5 fv-h-3-5 fv-text-brand-400"/>
                          {showingVisitorLocation ? "Your location" : "Aptech Ibadan 2"}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center fv-p-4 fv-bg-ink-700">
                      <MapPin className="fv-w-8 fv-h-8 fv-text-brand-400 fv-mb-3" />
                      <p className="fv-heading-font fv-text-paper-100">Map location not selected</p>
                      <p className="fv-mt-1 fv-text-xs fv-text-paper-300-60">Choose “Use my location” to center Google Maps on your device.</p>
                    </div>
                  )}
                </div>
                <div className="fv-p-3">
                  <button type="button" onClick={locateVisitor} className="d-inline-flex align-items-center fv-gap-2 fv-px-3 fv-py-2 rounded-3 fv-bg-brand-500 fv-hover-bg-brand-400 fv-text-ink-900 fv-heading-font fv-text-sm fv-font-semibold">
                    <MapPin className="fv-w-4 fv-h-4" /> Use my location
                  </button>
                  <p className="fv-mt-2 fv-text-xs fv-text-paper-300-60" role="status" aria-live="polite">{locationStatus}</p>
                </div>
              </div>

          </div>
        </div>
      </section>
    </div>);
}

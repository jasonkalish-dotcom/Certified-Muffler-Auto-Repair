import { CalendarCheck, Loader2, Phone } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';
import { booking, business, services } from '../data';

type Status = 'idle' | 'sending' | 'sent' | 'emailed' | 'call' | 'error';

interface BookingRequest {
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  service: string;
  date: string;
  time: string;
  notes: string;
}

const timeSlots = ['Morning', 'Midday', 'Afternoon'];

const steps = [
  { title: 'Request a time', text: 'Tell us about your car and when you’d like to come in.' },
  { title: 'We confirm', text: 'We call or text you to confirm the appointment.' },
  { title: 'Drop it off', text: `Bring your car to ${business.address.split(',')[0]} and we’ll take it from there.` },
];

const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

const summaryLines = (r: BookingRequest) => [
  `Name: ${r.name}`,
  `Phone: ${r.phone}`,
  ...(r.email ? [`Email: ${r.email}`] : []),
  `Vehicle: ${r.vehicle}`,
  `Service: ${r.service}`,
  `Preferred time: ${formatDate(r.date)}, ${r.time}`,
  ...(r.notes ? [`Notes: ${r.notes}`] : []),
];

const fieldClass =
  'w-full rounded-2xl border-2 border-[#0C0C0C]/15 bg-white px-4 py-3 text-base font-light text-[#0C0C0C] outline-none transition-colors duration-200 placeholder:text-[#0C0C0C]/35 focus:border-[#7621B0]';
const labelClass = 'mb-2 block text-xs font-medium uppercase tracking-widest text-[#0C0C0C]/60';

export default function BookingSection() {
  const [status, setStatus] = useState<Status>('idle');
  const [request, setRequest] = useState<BookingRequest | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get('company')) return; // spam trap filled in by bots

    const r: BookingRequest = {
      name: String(data.get('name') ?? '').trim(),
      phone: String(data.get('phone') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      vehicle: String(data.get('vehicle') ?? '').trim(),
      service: String(data.get('service') ?? ''),
      date: String(data.get('date') ?? ''),
      time: String(data.get('time') ?? ''),
      notes: String(data.get('notes') ?? '').trim(),
    };
    setRequest(r);

    if (booking.formEndpoint) {
      setStatus('sending');
      try {
        const res = await fetch(booking.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            _subject: `Booking request: ${r.service} — ${r.name}`,
            ...r,
            date: formatDate(r.date),
            ...(r.email ? { _replyto: r.email } : {}),
          }),
        });
        setStatus(res.ok ? 'sent' : 'error');
      } catch {
        setStatus('error');
      }
      return;
    }

    if (booking.email) {
      const subject = `Booking request: ${r.service} — ${r.name}`;
      const body = `Hi, I'd like to book an appointment.\n\n${summaryLines(r).join('\n')}`;
      window.location.href = `mailto:${booking.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus('emailed');
      return;
    }

    setStatus('call');
  };

  const reset = () => {
    setStatus('idle');
    setRequest(null);
  };

  const done = status === 'sent' || status === 'emailed' || status === 'call' || status === 'error';

  return (
    <section
      id="book"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-white px-5 pb-28 pt-20 text-[#0C0C0C] sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pb-36 md:pt-32"
    >
      <FadeIn
        as="h2"
        y={40}
        className="mb-6 text-center font-black uppercase leading-none tracking-tight"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Book online
      </FadeIn>
      <FadeIn
        as="p"
        delay={0.1}
        className="mx-auto mb-14 max-w-xl text-center font-light leading-relaxed text-[#0C0C0C]/60 sm:mb-20"
        style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.25rem)' }}
      >
        Pick a service and a time that works for you. We&apos;ll get back to you to confirm.
      </FadeIn>

      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <FadeIn as="ol" className="flex flex-col">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="flex items-center gap-6 py-6"
              style={{
                borderTop: i === 0 ? '1px solid rgba(12, 12, 12, 0.15)' : undefined,
                borderBottom: '1px solid rgba(12, 12, 12, 0.15)',
              }}
            >
              <span className="w-[1.3em] shrink-0 font-black leading-none" style={{ fontSize: 'clamp(2.5rem, 5vw, 72px)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="flex flex-col gap-1">
                <span className="font-medium uppercase" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.5rem)' }}>
                  {step.title}
                </span>
                <span className="font-light leading-relaxed opacity-60">{step.text}</span>
              </span>
            </li>
          ))}
          <li className="pt-6">
            <a
              href={business.phoneHref}
              className="inline-flex items-center gap-2 font-light opacity-60 transition-opacity duration-200 hover:opacity-100"
            >
              <Phone className="h-4 w-4" />
              Need it sooner? Call {business.phoneDisplay}
            </a>
          </li>
        </FadeIn>

        <FadeIn delay={0.15} className="rounded-[40px] border-2 border-[#0C0C0C]/10 bg-[#F4F6F8] p-6 sm:p-8 md:rounded-[60px] md:p-12">
          {done && request ? (
            <div className="flex flex-col items-start gap-6" role="status">
              <CalendarCheck className="h-12 w-12 text-[#7621B0]" />
              <h3 className="font-medium uppercase" style={{ fontSize: 'clamp(1.3rem, 2.4vw, 2rem)' }}>
                {status === 'sent' && 'Request sent!'}
                {status === 'emailed' && 'Almost done: press send'}
                {status === 'call' && 'One last step: give us a call'}
                {status === 'error' && 'That didn’t go through'}
              </h3>
              <p className="font-light leading-relaxed opacity-70">
                {status === 'sent' &&
                  `Thanks, ${request.name.split(' ')[0]}. We received your request and will contact you at ${request.phone} to confirm your appointment.`}
                {status === 'emailed' &&
                  'Your email app opened with your booking request filled in. Press Send and we’ll contact you to confirm. If nothing opened, call us instead.'}
                {status === 'call' &&
                  `Call us at ${business.phoneDisplay} with the details below and we’ll lock in your appointment.`}
                {status === 'error' &&
                  `Something went wrong sending your request. Please call us at ${business.phoneDisplay} and we’ll book you in.`}
              </p>
              <ul className="w-full rounded-3xl bg-white p-5 text-sm font-light leading-relaxed sm:text-base">
                {summaryLines(request).map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-4">
                <ContactButton label={`Call ${business.phoneDisplay}`} />
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-full border-2 border-[#0C0C0C] px-8 py-3 text-xs font-medium uppercase tracking-widest transition-colors duration-200 hover:bg-[#0C0C0C]/5 sm:px-10 sm:py-3.5 sm:text-sm md:text-base"
                >
                  New request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="bk-name" className={labelClass}>Name *</label>
                <input id="bk-name" name="name" required autoComplete="name" placeholder="Your name" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="bk-phone" className={labelClass}>Phone *</label>
                <input id="bk-phone" name="phone" type="tel" required autoComplete="tel" placeholder="(914) 555-0123" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="bk-email" className={labelClass}>Email</label>
                <input id="bk-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="bk-vehicle" className={labelClass}>Vehicle *</label>
                <input id="bk-vehicle" name="vehicle" required placeholder="Year, make, model" className={fieldClass} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="bk-service" className={labelClass}>Service *</label>
                <select id="bk-service" name="service" required defaultValue="" className={fieldClass}>
                  <option value="" disabled>Choose a service</option>
                  {services.map((s) => (
                    <option key={s.name}>{s.name}</option>
                  ))}
                  <option>Not sure / other</option>
                </select>
              </div>
              <div>
                <label htmlFor="bk-date" className={labelClass}>Preferred day *</label>
                <input id="bk-date" name="date" type="date" required min={todayISO()} className={fieldClass} />
              </div>
              <div>
                <label htmlFor="bk-time" className={labelClass}>Preferred time *</label>
                <select id="bk-time" name="time" required defaultValue="" className={fieldClass}>
                  <option value="" disabled>Choose a time</option>
                  {timeSlots.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="bk-notes" className={labelClass}>What&apos;s going on?</label>
                <textarea
                  id="bk-notes"
                  name="notes"
                  rows={4}
                  placeholder="Noises, warning lights, or the exhaust sound you're after"
                  className={`${fieldClass} resize-none`}
                />
              </div>
              {/* Hidden from people; bots that fill it in are ignored. */}
              <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center gap-2 rounded-full px-10 py-3.5 text-sm font-medium uppercase tracking-widest text-white transition-transform duration-200 hover:scale-[1.03] disabled:opacity-70 md:px-12 md:py-4 md:text-base"
                  style={{
                    background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                    boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                    outline: '2px solid white',
                    outlineOffset: '-3px',
                  }}
                >
                  {status === 'sending' && <Loader2 className="h-4 w-4 animate-spin" />}
                  {status === 'sending' ? 'Sending…' : 'Request appointment'}
                </button>
                <span className="text-sm font-light opacity-50">* required</span>
              </div>
            </form>
          )}
        </FadeIn>
      </div>
    </section>
  );
}

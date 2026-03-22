import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Calendar, Clock, User, CheckCircle } from "lucide-react";

const STYLISTS = [
  { id: "priya", name: "Priya Sharma", specialty: "Bridal & Festive" },
  { id: "anita", name: "Anita Kapoor", specialty: "Casual & Workwear" },
  { id: "meera", name: "Meera Reddy", specialty: "Accessories & Styling" },
];

const TIME_SLOTS = [
  "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM",
];

const getNext14Days = () => {
  const days: Date[] = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() !== 0) days.push(d); // skip Sundays
  }
  return days;
};

const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedStylist, setSelectedStylist] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [booked, setBooked] = useState(false);

  const dates = getNext14Days();

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
  };

  if (booked) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-16 max-w-lg text-center section-reveal">
          <div className="bg-card border border-border rounded-sm p-10">
            <CheckCircle className="w-14 h-14 text-success mx-auto mb-4" />
            <h1 className="font-display text-3xl font-light mb-2">Appointment Booked</h1>
            <p className="text-sm text-muted-foreground mb-4">
              We look forward to seeing you, {name}!
            </p>
            <div className="bg-muted rounded-sm p-4 text-sm space-y-1.5 text-left">
              <p><span className="text-muted-foreground">Date:</span> {selectedDate?.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}</p>
              <p><span className="text-muted-foreground">Time:</span> {selectedTime}</p>
              <p><span className="text-muted-foreground">Stylist:</span> {STYLISTS.find(s => s.id === selectedStylist)?.name}</p>
            </div>
            <p className="text-xs text-muted-foreground mt-4">You'll receive a confirmation on your phone shortly.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16 max-w-2xl">
        <div className="section-reveal">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-1">Personal Styling</p>
          <h1 className="font-display text-3xl md:text-4xl font-light mb-2">Book a Consultation</h1>
          <p className="text-sm text-muted-foreground mb-8 max-w-md">
            Visit our Jaipur boutique for a personalised styling session. Our experts will help you find the perfect look.
          </p>
        </div>

        <form onSubmit={handleBook} className="space-y-6">
          {/* Stylist Selection */}
          <fieldset className="bg-card border border-border rounded-sm p-6 section-reveal stagger-1">
            <legend className="font-display text-lg font-medium px-1 flex items-center gap-2"><User className="w-4 h-4 text-accent" /> Choose Your Stylist</legend>
            <div className="grid sm:grid-cols-3 gap-3 mt-4">
              {STYLISTS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedStylist(s.id)}
                  className={`p-4 border rounded-sm text-left transition-colors active:scale-[0.97] ${
                    selectedStylist === s.id ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-foreground/30"
                  }`}
                >
                  <p className="text-sm font-medium">{s.name}</p>
                  <p className={`text-xs mt-0.5 ${selectedStylist === s.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{s.specialty}</p>
                </button>
              ))}
            </div>
          </fieldset>

          {/* Date Selection */}
          <fieldset className="bg-card border border-border rounded-sm p-6 section-reveal stagger-2">
            <legend className="font-display text-lg font-medium px-1 flex items-center gap-2"><Calendar className="w-4 h-4 text-accent" /> Select Date</legend>
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {dates.map((d) => {
                const isSelected = selectedDate?.toDateString() === d.toDateString();
                return (
                  <button
                    key={d.toISOString()}
                    type="button"
                    onClick={() => setSelectedDate(d)}
                    className={`flex-shrink-0 w-16 py-3 text-center border rounded-sm transition-colors active:scale-[0.97] ${
                      isSelected ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-foreground/30"
                    }`}
                  >
                    <p className={`text-[10px] uppercase ${isSelected ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                      {d.toLocaleDateString("en-IN", { weekday: "short" })}
                    </p>
                    <p className="text-lg font-semibold tabular-nums">{d.getDate()}</p>
                    <p className={`text-[10px] ${isSelected ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                      {d.toLocaleDateString("en-IN", { month: "short" })}
                    </p>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Time Slots */}
          <fieldset className="bg-card border border-border rounded-sm p-6 section-reveal stagger-3">
            <legend className="font-display text-lg font-medium px-1 flex items-center gap-2"><Clock className="w-4 h-4 text-accent" /> Pick a Time</legend>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-4">
              {TIME_SLOTS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedTime(t)}
                  className={`py-2 text-sm border rounded-sm transition-colors active:scale-[0.97] ${
                    selectedTime === t ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-foreground/30"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Contact */}
          <fieldset className="bg-card border border-border rounded-sm p-6 section-reveal stagger-4">
            <legend className="font-display text-lg font-medium px-1">Your Details</legend>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your Name" className="input-field" />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} required type="tel" placeholder="Phone Number" className="input-field" />
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any specific requirements? (optional)" rows={3} className="input-field sm:col-span-2 resize-none" />
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={!selectedDate || !selectedTime || !selectedStylist || !name || !phone}
            className="w-full bg-accent text-accent-foreground px-6 py-3 text-sm font-medium rounded-sm hover:bg-accent/90 transition-colors active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed section-reveal"
          >
            Confirm Booking
          </button>
        </form>
      </div>

      <style>{`
        .input-field {
          width: 100%;
          padding: 0.625rem 0.75rem;
          font-size: 0.875rem;
          border: 1px solid hsl(var(--border));
          border-radius: var(--radius);
          background: hsl(var(--background));
          color: hsl(var(--foreground));
          outline: none;
          transition: border-color 0.15s;
        }
        .input-field:focus {
          border-color: hsl(var(--ring));
          box-shadow: 0 0 0 1px hsl(var(--ring) / 0.3);
        }
        .input-field::placeholder {
          color: hsl(var(--muted-foreground));
        }
      `}</style>
    </div>
  );
};

export default Appointments;

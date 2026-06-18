import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  phone: string;
};

type DetailCardProps = {
  icon: string;
  label: string;
  value: string;
};

type OutcomeCardProps = {
  number: string;
  title: string;
  text: string;
};

type FAQItemProps = {
  question: string;
  answer: string;
};

const workshopDetails: DetailCardProps[] = [
  {
    icon: "👧",
    label: "Age Group",
    value: "8–14 Years",
  },
  {
    icon: "📅",
    label: "Duration",
    value: "4 Weeks",
  },
  {
    icon: "💻",
    label: "Mode",
    value: "Online",
  },
  {
    icon: "💳",
    label: "Fee",
    value: "₹2,999",
  },
  {
    icon: "🚀",
    label: "Start Date",
    value: "15 July 2026",
  },
];

const learningOutcomes: OutcomeCardProps[] = [
  {
    number: "01",
    title: "AI Foundations",
    text: "Understand what Artificial Intelligence is through simple, child-friendly examples.",
  },
  {
    number: "02",
    title: "Robotics Logic",
    text: "Learn how robots follow instructions, use sensors, and complete tasks.",
  },
  {
    number: "03",
    title: "Creative Coding",
    text: "Build beginner-friendly logic using visual and interactive coding activities.",
  },
  {
    number: "04",
    title: "Mini Projects",
    text: "Create small AI and robotics-based projects during the workshop.",
  },
  {
    number: "05",
    title: "Problem Solving",
    text: "Improve analytical thinking, creativity, and structured problem-solving skills.",
  },
  {
    number: "06",
    title: "Final Showcase",
    text: "Present a final project and gain confidence explaining technical ideas.",
  },
];

const faqs: FAQItemProps[] = [
  {
    question: "Does my child need prior coding experience?",
    answer:
      "No. The workshop is designed for beginners and explains concepts in a simple, activity-based manner.",
  },
  {
    question: "How will the online classes be conducted?",
    answer:
      "The workshop will be conducted online through interactive live sessions with guided activities.",
  },
  {
    question: "Will students receive a certificate?",
    answer:
      "Yes. Students who complete the workshop will receive a participation certificate.",
  },
  {
    question: "What device is required?",
    answer:
      "A laptop or desktop with a stable internet connection is recommended for the best learning experience.",
  },
];

function DetailCard({ icon, label, value }: DetailCardProps) {
  return (
    <div className="group rounded-3xl border border-white/70 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-card">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-3xl transition group-hover:scale-110">
        {icon}
      </div>
      <p className="text-sm font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-xl font-extrabold text-slate-900">{value}</p>
    </div>
  );
}

function OutcomeCard({ number, title, text }: OutcomeCardProps) {
  return (
    <div className="rounded-3xl border border-orange-100 bg-white p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-card">
      <div className="mb-5 inline-flex rounded-full bg-sky-100 px-4 py-2 text-sm font-extrabold text-sky-700">
        {number}
      </div>
      <h3 className="text-xl font-extrabold text-slate-900">{title}</h3>
      <p className="mt-3 leading-relaxed text-slate-600">{text}</p>
    </div>
  );
}

function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-soft">
      <h3 className="text-lg font-extrabold text-slate-900">{question}</h3>
      <p className="mt-3 leading-relaxed text-slate-600">{answer}</p>
    </div>
  );
}

function App() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = () => {
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      return "Please fill in all required fields.";
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      return "Please enter a valid email address.";
    }

    if (!/^[0-9+\-\s]{8,15}$/.test(form.phone)) {
      return "Please enter a valid phone number.";
    }

    return "";
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setIsSuccess(false);
      setMessage(validationError);
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch("http://localhost:5000/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit enquiry.");
      }

      setIsSuccess(true);
      setMessage("Registration submitted successfully! Our team will contact you soon.");
      setForm({
        name: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      setIsSuccess(false);
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-cream text-slate-900">
      <section className="relative px-6 pb-20 pt-8 md:px-12 lg:px-20">
        <div className="absolute left-[-80px] top-[-80px] h-64 w-64 rounded-full bg-orange-200 blur-3xl" />
        <div className="absolute right-[-90px] top-28 h-72 w-72 rounded-full bg-sky-200 blur-3xl" />
        <div className="absolute bottom-[-60px] left-1/2 h-60 w-60 rounded-full bg-yellow-200 blur-3xl" />

        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/70 bg-white/80 px-5 py-4 shadow-soft backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500 text-2xl">
              🤖
            </div>
            <div>
              <p className="text-lg font-black text-slate-900">Kidrove</p>
              <p className="text-xs font-semibold text-slate-500">
                Learn • Play • Build
              </p>
            </div>
          </div>

          <a
            href="#register"
            className="hidden rounded-full bg-slate-900 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-orange-500 sm:inline-block"
          >
            Enroll Now
          </a>
        </nav>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 pt-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-bold text-orange-600 shadow-soft">
              <span>☀️</span>
              Summer 2026 Online Workshop
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-tight text-slate-950 md:text-7xl">
              AI & Robotics Summer Workshop
            </h1>

            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-600 md:text-xl">
              A playful 4-week online program where children learn Artificial
              Intelligence, robotics logic, coding basics, and creative
              problem-solving through guided projects.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#register"
                className="rounded-full bg-orange-500 px-8 py-4 text-center text-base font-extrabold text-white shadow-orange transition hover:-translate-y-1 hover:bg-orange-600"
              >
                Enroll Now
              </a>

              <a
                href="#outcomes"
                className="rounded-full border-2 border-slate-900 bg-white px-8 py-4 text-center text-base font-extrabold text-slate-900 transition hover:-translate-y-1 hover:bg-slate-900 hover:text-white"
              >
                View Outcomes
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <span className="rounded-full bg-white px-5 py-3 font-bold text-slate-700 shadow-soft">
                👧 Ages 8–14
              </span>
              <span className="rounded-full bg-white px-5 py-3 font-bold text-slate-700 shadow-soft">
                💻 Online
              </span>
              <span className="rounded-full bg-white px-5 py-3 font-bold text-slate-700 shadow-soft">
                🚀 Starts 15 July
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-5 -top-5 h-24 w-24 rounded-[2rem] bg-yellow-300 rotate-12" />
            <div className="absolute -bottom-5 -right-5 h-28 w-28 rounded-full bg-sky-300" />

            <div className="relative rounded-[2.5rem] border-8 border-white bg-gradient-to-br from-sky-100 via-white to-orange-100 p-8 shadow-card">
              <div className="rounded-[2rem] bg-white p-6 shadow-soft">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wide text-slate-400">
                      Workshop Fee
                    </p>
                    <p className="text-4xl font-black text-orange-500">
                      ₹2,999
                    </p>
                  </div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-orange-100 text-4xl">
                    🧠
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-2xl bg-cream p-5">
                    <p className="font-extrabold text-slate-900">
                      Build smart ideas
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      Kids explore AI and robotics through practical activities.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-sky-50 p-5">
                    <p className="font-extrabold text-slate-900">
                      Beginner friendly
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      No prior coding or robotics experience required.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-orange-50 p-5">
                    <p className="font-extrabold text-slate-900">
                      Final project showcase
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      Students present what they build at the end.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-white p-4 shadow-soft">
                  <p className="text-2xl font-black text-slate-900">4</p>
                  <p className="text-xs font-bold text-slate-500">Weeks</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-soft">
                  <p className="text-2xl font-black text-slate-900">6+</p>
                  <p className="text-xs font-bold text-slate-500">Outcomes</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-soft">
                  <p className="text-2xl font-black text-slate-900">Live</p>
                  <p className="text-xs font-bold text-slate-500">Online</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="details" className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 font-extrabold uppercase tracking-wide text-orange-500">
              Workshop Details
            </p>
            <h2 className="text-4xl font-black tracking-tight md:text-5xl">
              Everything parents need to know
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {workshopDetails.map((detail) => (
              <DetailCard key={detail.label} {...detail} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="outcomes"
        className="relative bg-white px-6 py-20 md:px-12 lg:px-20"
      >
        <div className="absolute right-10 top-10 h-28 w-28 rounded-full bg-orange-100" />
        <div className="absolute bottom-10 left-10 h-20 w-20 rounded-[1.5rem] bg-sky-100 rotate-12" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 font-extrabold uppercase tracking-wide text-sky-600">
              Learning Outcomes
            </p>
            <h2 className="text-4xl font-black tracking-tight md:text-5xl">
              Skills children will build during the workshop
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              The program focuses on practical learning, creativity, technical
              curiosity, and confidence instead of rote theory.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {learningOutcomes.map((outcome) => (
              <OutcomeCard key={outcome.number} {...outcome} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-3 font-extrabold uppercase tracking-wide text-orange-500">
              FAQs
            </p>
            <h2 className="text-4xl font-black tracking-tight md:text-5xl">
              Common questions from parents
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Here are quick answers about the AI & Robotics Summer Workshop.
            </p>
          </div>

          <div className="grid gap-5">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} {...faq} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="register"
        className="relative bg-slate-950 px-6 py-20 text-white md:px-12 lg:px-20"
      >
        <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_top_left,_rgba(251,146,60,0.25),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(125,211,252,0.22),_transparent_35%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="mb-3 font-extrabold uppercase tracking-wide text-orange-300">
              Registration
            </p>
            <h2 className="text-4xl font-black tracking-tight md:text-5xl">
              Reserve a seat for your child
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Submit the enquiry form and the Kidrove team will contact you
              with the next steps for enrollment.
            </p>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
              <p className="text-lg font-extrabold">Workshop Summary</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-slate-400">Course</p>
                  <p className="font-bold">AI & Robotics</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Fee</p>
                  <p className="font-bold">₹2,999</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Age</p>
                  <p className="font-bold">8–14 Years</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Mode</p>
                  <p className="font-bold">Online</p>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] bg-white p-6 text-slate-900 shadow-card md:p-8"
          >
            <h3 className="text-3xl font-black">Registration Form</h3>
            <p className="mt-2 text-slate-600">
              Fill in your details to submit an enquiry.
            </p>

            <div className="mt-7 grid gap-5">
              <label className="block">
                <span className="mb-2 block text-sm font-extrabold text-slate-700">
                  Name
                </span>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter parent or student name"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 font-medium outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-extrabold text-slate-700">
                  Email
                </span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 font-medium outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-extrabold text-slate-700">
                  Phone Number
                </span>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 font-medium outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 rounded-2xl bg-orange-500 px-6 py-4 text-lg font-black text-white shadow-orange transition hover:-translate-y-1 hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300 disabled:hover:translate-y-0"
              >
                {loading ? "Submitting..." : "Submit Enquiry"}
              </button>

              {message && (
                <div
                  className={`rounded-2xl px-5 py-4 text-center font-bold ${
                    isSuccess
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {message}
                </div>
              )}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default App;
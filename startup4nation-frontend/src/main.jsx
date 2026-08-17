import React from "react";
import { loginUser, joinEvent, updateProfile as updateProfileAPI, registerUser } from "./api";
import { createRoot } from "react-dom/client";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  Mail,
  MapPin,
  Menu,
  Phone,
  UserRound,
  X,
} from "lucide-react";
import "./styles.css";

/* =========================
   EVENTS DATA
========================= */

const pastEvents = [
  {
    id: 1,
    title: "Founder Connect 2026",
    date: "Jul 24, 2026",
    time: "5:30 PM",
    location: "New Delhi",
    category: "Networking",
  },
  {
    id: 2,
    title: "Build & Scale Summit",
    date: "Jul 05, 2026",
    time: "10:00 AM",
    location: "Gurugram",
    category: "Conference",
  },
  {
    id: 3,
    title: "Startup Pitch Night",
    date: "Jun 18, 2026",
    time: "6:00 PM",
    location: "Noida",
    category: "Pitching",
  },
];

const upcomingEvents = [
  {
    id: 3,
    title: "Founder Connect Delhi",
    date: "Aug 24, 2026",
    time: "5:30 PM",
    location: "New Delhi",
    category: "Networking",
  },
  {
    id: 5,
    title: "Build & Scale Summit",
    date: "Sep 05, 2026",
    time: "10:00 AM",
    location: "Gurugram",
    category: "Conference",
  },
  {
    id: 6,
    title: "Startup Pitch Night",
    date: "Sep 18, 2026",
    time: "6:00 PM",
    location: "Noida",
    category: "Pitching",
  },
];

/* =========================
   NAVBAR
========================= */

function Navbar({ onProfile, onHome }) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const goHome = (sectionId = "home") => {
    setMenuOpen(false);
    onHome();
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const goProfile = () => {
    setMenuOpen(false);
    onProfile();
  };

  return (
    <header className="navbar">
      <button className="brand" onClick={() => goHome("home")}>
        <img src="/logo.jpeg" alt="Startup4Nation" className="logo" />
        <span>Startup4Nation</span>
      </button>

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <button onClick={() => goHome("past-events")}>Past Events</button>
        <button onClick={() => goHome("upcoming")}>Upcoming Events</button>
        <button onClick={goProfile}>Profile</button>
        <button onClick={() => goHome("sponsorship")}>Sponsorship</button>
        <button onClick={() => goHome("contact")}>Contact</button>
        <button className="mobile-community" onClick={() =>   window.open(
      "https://chat.whatsapp.com/E6JdSGTaYGL0I9zkAtI26A",
      "_blank"
    )}>Join Community</button>
      </nav>

      <button className="community-btn" onClick={() =>  window.open(
      "https://chat.whatsapp.com/E6JdSGTaYGL0I9zkAtI26A",
      "_blank")
      }>
        Join Community <ArrowRight size={17} />
      </button>

      <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        {menuOpen ? <X /> : <Menu />}
      </button>
    </header>
  );
}
/* =========================
   HOME
========================= */

function Home({ onProfile }) {
  const scrollTo = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* HERO */}

      <section className="hero section" id="home">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="dot" />
            INDIA'S STARTUP COMMUNITY
          </div>

          <h1>
            Where ideas
            <br />
            <span>meet opportunity.</span>
          </h1>

          <p>
            Discover startup events, meet ambitious founders,
            find partners, and become part of a community built
            to help ideas move forward.
          </p>

          <div className="hero-actions">
            <button
              className="primary-btn"
              onClick={() => scrollTo("past-events")}
            >
              Explore Events
              <ArrowRight size={18} />
            </button>

            <button
              className="text-btn"
              onClick={() => scrollTo("community")}
            >
              Join Startup4Nation
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-card-top">
            <span>UPCOMING EVENT</span>
            <CalendarDays size={20} />
          </div>

          <div className="event-number">01</div>

          <h3>{upcomingEvents[0].title}</h3>

          <p>
            Meet founders, builders, investors and the people
            shaping India's next generation of startups.
          </p>

          <div className="event-meta">
            <span>
              <CalendarDays size={16} />
              {upcomingEvents[0].date}
            </span>

            <span>
              <MapPin size={16} />
              {upcomingEvents[0].location}
            </span>
          </div>

<button
  className="outline-btn"
  onClick={() => onProfile(upcomingEvents[0].id)}
>
  Register
  <ArrowRight size={17} />
</button>
        </div>
      </section>

      {/* STATS */}

      <section className="stats">
        <div>
          <strong>100+</strong>
          <span>Community Members</span>
        </div>

        <div>
          <strong>25+</strong>
          <span>Events</span>
        </div>

        <div>
          <strong>15+</strong>
          <span>Startup Partners</span>
        </div>

        <div>
          <strong>10+</strong>
          <span>Industry Mentors</span>
        </div>
      </section>

      {/* PAST EVENTS */}

      <section
        className="section events-section"
        id="past-events"
      >
        <div className="section-heading">
          <div>
            <span className="section-label">
              PAST EVENTS
            </span>

            <h2>Past Events.</h2>
          </div>

          <button
            className="view-all"
            onClick={() => scrollTo("upcoming")}
          >
            Upcoming Events
            <ArrowRight size={17} />
          </button>
        </div>

        <div className="event-grid">
          {pastEvents.map((event, index) => (
            <article
              className="event-card"
              key={event.id}
            >
              <div className="event-card-image">
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="category">
                  {event.category}
                </span>
              </div>

              <div className="event-card-body">
                <div className="event-card-meta">
                  <span>
                    <CalendarDays size={15} />
                    {event.date}
                  </span>

                  <span>
                    <Clock3 size={15} />
                    {event.time}
                  </span>
                </div>

                <h3>{event.title}</h3>

                <p>
                  <MapPin size={15} />
                  {event.location}
                </p>

                <span className="past-label">
                  Event Completed
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* UPCOMING EVENTS */}

      <section
        className="dark-section"
        id="upcoming"
      >
        <div className="section-heading dark-heading">
          <div>
            <span className="section-label">
              UPCOMING
            </span>

            <h2>What's happening next.</h2>
          </div>

          <p>
            Stay close to the conversations, people and
            opportunities shaping the ecosystem.
          </p>
        </div>

        <div className="timeline">
          {upcomingEvents.map((event, index) => (
            <div
              className="timeline-row"
              key={event.id}
            >
              <div className="timeline-index">
                0{index + 1}
              </div>

              <div className="timeline-date">
                {event.date}
              </div>

              <div className="timeline-main">
                <h3>{event.title}</h3>

                <span>
                  {event.category} · {event.location}
                </span>
              </div>

              <button onClick={() => onProfile(event.id)}>
  <ArrowRight />
</button>
            </div>
          ))}
        </div>
      </section>

      {/* SPONSORSHIP */}

      <section
        className="sponsor-section"
        id="sponsorship"
      >
        <div>
          <span className="section-label">
            PARTNER WITH US
          </span>

          <h2>
            Put your brand where the ecosystem is.
          </h2>
        </div>
<div>
  <p>
    Partner with Startup4Nation to support founder
    communities, events and initiatives while
    connecting with the next wave of builders.
  </p>

  <a
    href="mailto:kshitizsharma83755@gmail.com?subject=Sponsorship%20Inquiry%20-%20Startup4Nation"
    className="outline-btn light"
  >
    Become a sponsor
    <ArrowRight size={17} />
  </a>
</div>
      </section>

      {/* COMMUNITY */}

      <section
        className="community-section"
        id="community"
      >
        <div className="community-inner">
          <span className="section-label">
            START HERE
          </span>

          <h2>Build. Connect. Grow.</h2>

          <p>
            Join Startup4Nation and become part of a
            community that believes in turning ideas into
            action.
          </p>

          <button
            className="primary-btn white-btn"
              onClick={() =>
    window.open(
      "https://chat.whatsapp.com/E6JdSGTaYGL0I9zkAtI26A",
      "_blank"
    )
  }
          >
            Join Startup4Nation Community
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* FOOTER */}

      <footer id="contact">
        <div className="footer-brand">
          <div className="brand footer-logo">
            <img
              src="/logo.jpeg"
              alt="Startup4Nation"
              className="logo"
            />

            <span>Startup4Nation</span>
          </div>

          <p>
            A community for founders, builders, creators
            and believers.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <span>EXPLORE</span>

            <button
              onClick={() => scrollTo("past-events")}
            >
              Past Events
            </button>

            <button
              onClick={() => scrollTo("upcoming")}
            >
              Upcoming Events
            </button>

            <button onClick={onProfile}>
              Profile
            </button>
          </div>

          <div>
            <span>CONNECT</span>

            <button
              onClick={() => scrollTo("sponsorship")}
            >
              Sponsorship
            </button>

            <button onClick={onProfile}>
              Join Community
            </button>

            <a href="mailto:kshitizsharma83755@gmail.com">
              <Mail size={14} />
              Contact
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © 2026 Startup4Nation. All rights reserved.
          </span>

          <span>
            Made for the startup ecosystem.
          </span>
        </div>
      </footer>
    </>
  );
}

/* =========================
   PROFILE
========================= */
function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = React.useState(true);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    if (isLogin) {
      const data = await loginUser(email, password);
      console.log("Login successful:", data);
      alert("Login successful!");
      onLogin();
    } else {
      await registerUser(name, email, password);
      alert("Registration successful! Please login.");
      setIsLogin(true);
      setPassword("");
    }
  } catch (error) {
    alert(error.message);
  } finally {
    setLoading(false);
  }
};
        

  return (
    <section className="profile-page">
      <div className="profile-page-inner">

        <button
          className="back-btn"
          onClick={onLogin}
        >
          <ArrowLeft size={17} />
          Back to Home
        </button>

        <div className="profile-heading">
          <div>
            <span className="section-label">
              {isLogin ? "WELCOME BACK" : "JOIN US"}
            </span>

            <h1>
              {isLogin
                ? "Login to Startup4Nation"
                : "Create your account"}
            </h1>

            <p>
              {isLogin
                ? "Login to register for events and manage your profile."
                : "Join the Startup4Nation community and discover upcoming events."}
            </p>
          </div>

          <div className="profile-icon">
            <UserRound size={35} />
          </div>
        </div>

        <form
          className="profile-form-card"
          onSubmit={handleSubmit}
        >
          <div className="form-grid">

            {!isLogin && (
              <label>
                Name

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  required
                />
              </label>
            )}

            <label>
              Email

              <div className="input-with-icon">
                <Mail size={16} />

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />
              </div>
            </label>

            <label>
              Password

              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />
            </label>

          </div>

          <div className="save-row">

            <button
              className="primary-btn"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : isLogin
                ? "Login"
                : "Create Account"}

              <ArrowRight size={17} />
            </button>

          </div>
        </form>

        <div style={{ marginTop: "20px" }}>
          <button
            className="text-btn"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Login"}

            <ArrowRight size={17} />
          </button>
        </div>

      </div>
    </section>
  );
}  


function Profile({ onHome, onLogin  }) {
  const [profile, setProfile] = React.useState(() => {
    const saved = localStorage.getItem(
      "startup4nation_profile"
    );

    return saved
      ? JSON.parse(saved)
      : {
          name: "",
          email: "",
          phone: "",
          city: "",
          bio: "",
        };
  });

  const [registered, setRegistered] =
    React.useState(() => {
      const saved = localStorage.getItem(
        "startup4nation_registered"
      );

      return saved ? JSON.parse(saved) : [];
    });

  const [savedMessage, setSavedMessage] =
    React.useState("");

  const updateProfile = (field, value) => {
    setProfile((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

const saveProfile = async (event) => {
  event.preventDefault();

  try {
    const updatedProfile = await updateProfileAPI(profile);

    setProfile(updatedProfile);

    setSavedMessage("Profile saved successfully.");

    setTimeout(() => {
      setSavedMessage("");
    }, 2500);

  } catch (error) {
    alert(error.message);
  }
};

  const registerEvent = async (eventId) => {
  try {
    const data = await joinEvent(eventId);

    console.log("Event joined:", data);

    const updated = [
      ...registered,
      eventId,
    ];

    setRegistered(updated);

    localStorage.setItem(
      "startup4nation_registered",
      JSON.stringify(updated)
    );

    alert("Event join request submitted!");
  } catch (error) {
    alert(error.message);
  }
  };

  return (
    <section className="profile-page">
      <div className="profile-page-inner">

        <button
          className="back-btn"
          onClick={onHome}
        >
          <ArrowLeft size={17} />
          Back to Home
        </button>

<div className="profile-heading">
  <div>
    <span className="section-label">
      MY PROFILE
    </span>

    <h1>Your Profile</h1>

    <p>
      Keep your personal details updated and manage
      your event registrations.
    </p>
  </div>

<button
  className="outline-btn"
  onClick={onLogin}
>
  Login
  <ArrowRight size={17} />
</button>

          <div className="profile-icon">
            <UserRound size={35} />
          </div>
        </div>

        {/* PERSONAL DETAILS */}

        <div className="profile-layout">

          <form
            className="profile-form-card"
            onSubmit={saveProfile}
          >
            <div className="card-heading">
              <div>
                <span className="section-label">
                  PERSONAL DETAILS
                </span>

                <h2>Your information</h2>
              </div>
            </div>

            <div className="form-grid">

              <label>
                Name

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={profile.name}
                  onChange={(e) =>
                    updateProfile(
                      "name",
                      e.target.value
                    )
                  }
                />
              </label>

              <label>
                Email

                <div className="input-with-icon">
                  <Mail size={16} />

                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={profile.email}
                    onChange={(e) =>
                      updateProfile(
                        "email",
                        e.target.value
                      )
                    }
                  />
                </div>
              </label>

              <label>
                Phone

                <div className="input-with-icon">
                  <Phone size={16} />

                  <input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={profile.phone}
                    onChange={(e) =>
                      updateProfile(
                        "phone",
                        e.target.value
                      )
                    }
                  />
                </div>
              </label>

              <label>
                City

                <div className="input-with-icon">
                  <MapPin size={16} />

                  <input
                    type="text"
                    placeholder="Delhi"
                    value={profile.city}
                    onChange={(e) =>
                      updateProfile(
                        "city",
                        e.target.value
                      )
                    }
                  />
                </div>
              </label>

              <label className="full-width">
                About you

                <textarea
                  placeholder="Tell the community a little about yourself..."
                  value={profile.bio}
                  onChange={(e) =>
                    updateProfile(
                      "bio",
                      e.target.value
                    )
                  }
                />
              </label>

            </div>

            <div className="save-row">

              <button
                className="primary-btn"
                type="submit"
              >
                Save Profile
                <ArrowRight size={17} />
              </button>

              {savedMessage && (
                <span className="success-message">
                  ✓ {savedMessage}
                </span>
              )}

            </div>
          </form>

          {/* REGISTRATION COUNT */}

          <div className="registration-card">

            <span className="section-label">
              EVENT ACTIVITY
            </span>

            <h2>
              Your registrations
            </h2>

            <div className="registration-count">
              <strong>
                {registered.length}
              </strong>

              <span>
                Upcoming events registered
              </span>
            </div>

          </div>

        </div>

        {/* UPCOMING EVENTS IN PROFILE */}

        <section className="profile-events">

          <div className="profile-section-title">
            <div>
              <span className="section-label">
                UPCOMING EVENTS
              </span>

              <h2>
                Events you're registered for
              </h2>
            </div>
          </div>

          <div className="profile-event-list">

            {upcomingEvents.map((event) => {

              const isRegistered =
                registered.includes(event.id);

              return (
                <div
                  className="profile-event"
                  key={event.id}
                >

                  <div className="profile-event-number">
                    {String(event.id).padStart(2, "0")}
                  </div>

                  <div className="profile-event-info">

                    <h3>
                      {event.title}
                    </h3>

                    <div>

                      <span>
                        <CalendarDays size={14} />
                        {event.date}
                      </span>

                      <span>
                        <Clock3 size={14} />
                        {event.time}
                      </span>

                      <span>
                        <MapPin size={14} />
                        {event.location}
                      </span>

                    </div>

                  </div>

                  <button
                    className={
                      isRegistered
                        ? "registered-btn"
                        : "register-btn"
                    }
                    onClick={() =>
                      registerEvent(event.id)
                    }
                    disabled={isRegistered}
                  >
                    {isRegistered
                      ? "✓ Registered"
                      : "Register"}
                  </button>

                </div>
              );
            })}

          </div>
        </section>

        {/* PAST EVENTS IN PROFILE */}

        <section className="profile-events past-events">

          <div className="profile-section-title">
            <div>
              <span className="section-label">
                EVENT HISTORY
              </span>

              <h2>
                Past events
              </h2>
            </div>
          </div>

          <div className="past-event-grid">

            {pastEvents.map((event) => (

              <div
                className="past-event"
                key={event.id}
              >

                <div className="past-event-icon">
                  <CalendarDays size={20} />
                </div>

                <div>
                  <h3>
                    {event.title}
                  </h3>

                  <p>
                    {event.date} · {event.location}
                  </p>
                </div>

                <span className="attended">
                  Attended
                </span>

              </div>

            ))}

          </div>
        </section>

      </div>
    </section>
  );
}

/* =========================
   APP
========================= */

function App() {
  const [page, setPage] = React.useState("home");
  const [authPage, setAuthPage] = React.useState(false);
  const [selectedEventId, setSelectedEventId] = React.useState(null);
const handleRegisterEvent = async (eventId) => {
  try {
    const data = await joinEvent(eventId);

    console.log("EVENT RESPONSE:", data);

    alert(data.message);
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    alert(error.message);
  }
};
  return (
    <div className="app">

      <Navbar
        onProfile={() => setPage("profile")}
        onHome={() => setPage("home")}
      />

      {authPage ? (
  <Auth
    onLogin={() => {
      setAuthPage(false);
      setPage("home");

      if (selectedEventId) {
        handleRegisterEvent(selectedEventId);
        setSelectedEventId(null);
      }
    }}
  />
      ) : page === "home" ? (
        <Home
  onProfile={(eventId) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      // Already logged in → directly register
      handleRegisterEvent(eventId);
    } else {
      // Not logged in → remember event and open login
      setSelectedEventId(eventId);
      setAuthPage(true);
    }
  }}
/>
      ) : (
        <Profile
          onHome={() => setPage("home")}
          onLogin={() => setAuthPage(true)}
        />
      )}

    </div>
  );
}

createRoot(
  document.getElementById("root")
).render(<App />);
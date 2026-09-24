import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Command,
  Menu,
  Play,
  Sparkles,
  Users,
  X,
  Zap,
} from "lucide-react";
import "./App.css";

const previewTasks = [
  {
    title: "Review product roadmap",
    meta: "Product · Today, 9:30 AM",
    color: "coral",
    done: false,
  },
  {
    title: "Reply to client emails",
    meta: "Work · Today, 11:00 AM",
    color: "gold",
    done: true,
  },
  {
    title: "Design exploration for onboarding",
    meta: "Design · Today, 1:30 PM",
    color: "blue",
    done: false,
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function submitEmail(event) {
    event.preventDefault();
    if (email.trim()) setSubmitted(true);
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top">
          <span className="brand-mark">
            <Check size={17} strokeWidth={3} />
          </span>
          <span>TaskFlow</span>
        </a>
        <nav className={menuOpen ? "site-nav open" : "site-nav"}>
          <a href="#features" onClick={() => setMenuOpen(false)}>
            Features
          </a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>
            How it works
          </a>
          <a href="#signup" onClick={() => setMenuOpen(false)}>
            Pricing
          </a>
        </nav>
        <div className="header-actions">
          <a className="signin-link" href="#signup">
            Sign in
          </a>
          <a className="login-button" href="#signup">
            Log in <ArrowRight size={15} />
          </a>
          <button
            className="menu-toggle"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>
      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <div className="announcement">
              <span>
                <Sparkles size={14} />
              </span>{" "}
              The calmer way to get things done <ArrowRight size={14} />
            </div>
            <h1>
              Make room for the work <em>that matters.</em>
            </h1>
            <p>
              TaskFlow brings your tasks, plans, and momentum into one focused
              space. Less noise. More progress.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#signup">
                Start for free <ArrowRight size={17} />
              </a>
              <a className="watch-button" href="#how-it-works">
                <span>
                  <Play size={13} fill="currentColor" />
                </span>{" "}
                See how it works
              </a>
            </div>
            <div className="social-proof">
              <div className="avatar-stack">
                <span>JW</span>
                <span>MR</span>
                <span>AK</span>
                <span>+</span>
              </div>
              <div>
                <strong>Loved by 12,000+ focused people</strong>
                <small>Join the people making time for what matters.</small>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="glow" />
            <div className="app-preview">
              <div className="preview-top">
                <div className="preview-brand">
                  <span className="mini-mark">
                    <Check size={10} />
                  </span>{" "}
                  TaskFlow
                </div>
                <div className="preview-profile">
                  <span className="status-dot" /> Alex Smith{" "}
                  <ChevronDown size={11} />
                </div>
              </div>
              <div className="preview-body">
                <aside className="preview-sidebar">
                  <button className="preview-add">
                    <span>+</span> Add task
                  </button>
                  <small>WORKSPACE</small>
                  <div className="preview-nav active">
                    <BarChart3 size={13} /> Today <b>4</b>
                  </div>
                  <div className="preview-nav">
                    <Clock3 size={13} /> Upcoming <b>8</b>
                  </div>
                  <div className="preview-nav">
                    <CheckCircle2 size={13} /> All tasks <b>24</b>
                  </div>
                  <small>PROJECTS</small>
                  <div className="preview-project">
                    <i className="dot coral" /> Product
                  </div>
                  <div className="preview-project">
                    <i className="dot mint" /> Design
                  </div>
                </aside>
                <div className="preview-main">
                  <div className="preview-heading">
                    <small>WEDNESDAY, SEPTEMBER 20</small>
                    <h3>
                      Good morning, Alex <span>✦</span>
                    </h3>
                    <p>A clear mind starts with a clear plan.</p>
                  </div>
                  <div className="preview-days">
                    <span>
                      MON<strong>18</strong>
                    </span>
                    <span>
                      TUE<strong>19</strong>
                    </span>
                    <span className="today">
                      WED<strong>20</strong>
                    </span>
                    <span>
                      THU<strong>21</strong>
                    </span>
                    <span>
                      FRI<strong>22</strong>
                    </span>
                  </div>
                  <div className="preview-list">
                    <div className="list-head">
                      <strong>Today's focus</strong>
                      <span>1 of 4 completed</span>
                    </div>
                    {previewTasks.map((task) => (
                      <div
                        className={`preview-task ${task.done ? "is-done" : ""}`}
                        key={task.title}
                      >
                        <span className="task-circle">
                          {task.done && <Check size={10} />}
                        </span>
                        <div>
                          <strong>{task.title}</strong>
                          <small>{task.meta}</small>
                        </div>
                        <i className={`dot ${task.color}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="floating-note">
              <Zap size={14} />
              <span>
                <strong>2h 15m</strong> of deep work today
              </span>
            </div>
          </div>
        </section>
        <section className="trust-row">
          <span>Built for people who care about their time</span>
          <div>
            <strong>northstar</strong>
            <strong>
              arc<span>°</span>
            </strong>
            <strong>hatch</strong>
            <strong>FIELDNOTE</strong>
            <strong>tandem</strong>
          </div>
        </section>
        <section className="feature-section" id="features">
          <div className="section-intro">
            <p className="kicker">A better rhythm</p>
            <h2>
              Everything you need.
              <br />
              <em>Nothing you don't.</em>
            </h2>
            <p>
              TaskFlow is intentionally simple, so your attention stays where it
              belongs: on the next meaningful thing.
            </p>
          </div>
          <div className="feature-grid">
            <article className="feature-card large">
              <div className="feature-icon lime">
                <Command size={19} />
              </div>
              <h3>Plan your day with intention</h3>
              <p>
                See what matters at a glance, shape your day around focus, and
                leave the busywork behind.
              </p>
              <div className="mini-chart">
                <span style={{ height: "34%" }} />
                <span style={{ height: "52%" }} />
                <span style={{ height: "45%" }} />
                <span className="highlight" style={{ height: "82%" }} />
                <span style={{ height: "60%" }} />
                <span style={{ height: "42%" }} />
                <span style={{ height: "67%" }} />
              </div>
            </article>
            <article className="feature-card">
              <div className="feature-icon coral-icon">
                <Zap size={19} />
              </div>
              <h3>Find your flow state</h3>
              <p>
                Time blocks and focus sessions help you make progress without
                burning out.
              </p>
              <div className="focus-pill">
                <span />
                <strong>25:00</strong>
                <small>Focus session</small>
              </div>
            </article>
            <article className="feature-card">
              <div className="feature-icon blue-icon">
                <Users size={19} />
              </div>
              <h3>Move together, clearly</h3>
              <p>
                Keep your team aligned with shared projects that never get in
                the way.
              </p>
              <div className="people-row">
                <span>JW</span>
                <span>MR</span>
                <span>AK</span>
                <span>+4</span>
              </div>
            </article>
          </div>
        </section>
        <section className="how-section" id="how-it-works">
          <div className="how-number">01</div>
          <div>
            <p className="kicker">How it works</p>
            <h2>
              Turn a busy mind
              <br />
              <em>into a clear next step.</em>
            </h2>
          </div>
          <div className="steps">
            <div>
              <span>01</span>
              <strong>Capture</strong>
              <p>
                Get every thought out of your head and into one trusted place.
              </p>
            </div>
            <div>
              <span>02</span>
              <strong>Prioritize</strong>
              <p>Give your attention to the tasks that move life forward.</p>
            </div>
            <div>
              <span>03</span>
              <strong>Flow</strong>
              <p>
                Work with focus, finish with satisfaction, and start again
                tomorrow.
              </p>
            </div>
          </div>
        </section>
        <section className="signup-section" id="signup">
          <div className="signup-copy">
            <p className="kicker">Start with a little more space</p>
            <h2>
              Your best work
              <br />
              <em>is waiting.</em>
            </h2>
            <p>
              Join TaskFlow free. No credit card, no complicated setup, no
              noise.
            </p>
          </div>
          <form className="signup-form" onSubmit={submitEmail}>
            {submitted ? (
              <div className="success-message">
                <CheckCircle2 size={21} />
                <strong>You're on the list.</strong>
                <span>We'll be in touch soon.</span>
              </div>
            ) : (
              <>
                <label htmlFor="email">Get early access</label>
                <div>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                  <button type="submit" aria-label="Join TaskFlow">
                    <ArrowRight size={18} />
                  </button>
                </div>
                <small>
                  Free forever for personal use. Upgrade when you're ready.
                </small>
              </>
            )}
          </form>
        </section>
      </main>
      <footer>
        <a className="brand" href="#top">
          <span className="brand-mark">
            <Check size={15} strokeWidth={3} />
          </span>
          <span>TaskFlow</span>
        </a>
        <span>© 2024 TaskFlow, thoughtfully made.</span>
        <div>
          <a href="#features">Features</a>
          <a href="#signup">Pricing</a>
          <a href="#signup">Contact</a>
        </div>
      </footer>
    </div>
  );
}
export default App;

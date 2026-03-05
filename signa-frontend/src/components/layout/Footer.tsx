export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 mt-16">
      <div className="mx-auto max-w-5xl px-4 text-sm text-white/60">
        © {new Date().getFullYear()} SIGNA — Astrology SaaS.
      </div>
    </footer>
  );
}

const STATS = [
  { value: "10.8s", label: "to map a 118 GB home folder" },
  { value: "2M+", label: "files walked in a single scan" },
  { value: "8", label: "ways to look at the same result" },
  { value: "0", label: "bytes sent off your Mac" },
];

export function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <span className="display block text-[clamp(2.2rem,4.6vw,3.2rem)] text-ink">
                {stat.value}
              </span>
              <span className="mt-2.5 block text-[13px] leading-snug text-ink-muted text-balance">
                {stat.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

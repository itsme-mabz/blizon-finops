'use client';

export default function ParticleBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-screen pointer-events-none -z-10">
      {/* Radial gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 30% 50%, rgba(255, 107, 53, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255, 215, 0, 0.06) 0%, transparent 50%)',
        }}
      />

      {/* Simple CSS particles - much lighter */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              background: Math.random() > 0.6 ? '#ff6b35' : '#ffd700',
              opacity: Math.random() * 0.5 + 0.2,
              animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

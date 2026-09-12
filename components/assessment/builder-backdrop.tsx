export function BuilderBackdrop() {
  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 bg-slate-50" />
      <div aria-hidden className="cyber-grid pointer-events-none fixed inset-0 z-0 opacity-70" />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[560px]"
        style={{
          background:
            "radial-gradient(900px 460px at 16% -10%, rgba(139,92,246,0.16), transparent 60%), radial-gradient(760px 420px at 92% -10%, rgba(45,212,191,0.12), transparent 60%), radial-gradient(700px 500px at 55% -20%, rgba(59,130,246,0.1), transparent 60%)",
        }}
      />
    </>
  )
}
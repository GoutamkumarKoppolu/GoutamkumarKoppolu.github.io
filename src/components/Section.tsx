import { useEffect, useRef, type ReactNode } from "react";

// `group` is the nav link this section counts toward; the heading fades up once when first seen
export function Section({ id, group, title, sub, children }: { id: string; group: string; title: string; sub?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("seen");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section id={id} data-s={group} ref={ref}>
      <h2 className="h2">{title}</h2>
      {sub && <p className="sub">{sub}</p>}
      {children}
    </section>
  );
}

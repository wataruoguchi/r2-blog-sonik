type SectionProps = {
  children: React.ReactNode;
  className?: string;
};
export function Section(props: SectionProps) {
  const { children, className, ...rest } = props;
  return (
    <section
      className={`w-full py-2 sm:py-4 md:py-8 lg:py-12 xl:py-16 ${className}`}
      {...rest}
    >
      {children}
    </section>
  );
}

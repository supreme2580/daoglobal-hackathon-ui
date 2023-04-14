interface Props {
  children: React.ReactNode;
}

export const Content: React.FC<Props> = ({ children }) => {
  return (
    <section className="h-full w-full max-w-[900px] flex-1 py-20">
      {children}
    </section>
  );
};

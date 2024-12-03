export default function Conditonal({
  children,
  condtion,
}: {
  children: React.ReactNode;
  condtion: boolean;
}) {
  return condtion && <>{children}</>;
}

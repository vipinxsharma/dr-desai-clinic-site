/** Dashed placeholder for an unconfirmed fact. Never rendered into schema or llms.txt. */
export function Ph({ children }: { children: string }) {
  return (
    <span className="ph" data-placeholder>
      [{children}]
    </span>
  );
}

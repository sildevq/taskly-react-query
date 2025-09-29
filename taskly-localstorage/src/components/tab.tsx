type TabProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

const Tab = ({ label, isActive, onClick }: TabProps) => {
  return (
    <button
      className={`px-2 py-4 cursor-pointer font-medium ${
        isActive
          ? "border-b border-b-primary text-accent"
          : "text-muted-foreground"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
export default Tab;

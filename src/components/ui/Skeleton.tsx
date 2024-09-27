interface SkeletonProps {
  height: string;
  width: string;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ height = 4, width = 16, className }) => {
  return (
    <div className="animate-pulse">
      <div
        className={`bg-gray-800/20 ${className}`}
        style={{ height, width }}
      ></div>
    </div>
  );
};

export default Skeleton;

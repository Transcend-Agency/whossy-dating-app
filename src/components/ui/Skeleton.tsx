interface SkeletonProps {
  height: string;
  width: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ height = 4, width = 16 }) => {
  return (
    <div className="animate-pulse">
      <div
        className="bg-gray-800/20 rounded-[4px]"
        style={{ height, width }}
      ></div>
    </div>
  );
};

export default Skeleton;

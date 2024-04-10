import { ISkeletonProps } from "../types/types";

const Loader = () => {
  return (
    <>
      <section className="loader">
        <div></div>
      </section>
    </>
  );
};

export default Loader;

export const SkeletonLoader = ({
  width = "unset",
  length = 3,
}: ISkeletonProps) => {
  const skeletons = Array.from({ length }, (_, index) => (
    <div key={index} className="skeleton-shape"></div>
  ));

  return (
    <div className="skeleton-loader" style={{ width }}>
      {skeletons}
    </div>
  );
};

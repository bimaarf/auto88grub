export const SkeletonConsultation = () => {
  return (
    <>
      {(function (rows, i, len) {
        while (++i <= len) {
          rows.push(
            <div key={i}>
              <div className="flex justify-center slide-in fade-in-left">
                <img
                  draggable={false}
                  loading="lazy"
                  className="rounded-full"
                  src="https://placehold.co/200x200"
                  alt=""
                />
              </div>
              <div className="text-center mt-4 slide-in fade-in-left">
                <div className="flex justify-center">
                  <p className="whitespace-pre-wrap italic h-6 w-2/3 skeleton"></p>
                </div>
                <article className="prose prose-slate mt-3">
                  <p className="whitespace-pre-wrap italic h-6 w-full skeleton"></p>
                </article>
              </div>
            </div>
          );
        }
        return rows;
      })([], 0, 4)}
    </>
  );
};

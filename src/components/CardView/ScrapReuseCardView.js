const ScrapCard = () => {
  return (
    <div className="p-1">
      <div className="flex card scrap">SCRAP</div>
    </div>
  );
};

const ReuseCard = () => {
  return (
    <div className="p-1">
      <div className="flex card reuse">REUSE</div>
    </div>
  );
};

const ScrapReuseCard = (reuse) => {
  if (reuse) {
    return <ReuseCard />;
  }
  return <ScrapCard />;
};

export default ScrapReuseCard;
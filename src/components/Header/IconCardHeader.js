const IconCardHeader = ({ header, icon }) => {
  const myIcon = "pi " + icon + " mr-2";
  return (
    <div className="card-header-primary">
      <i className={myIcon}></i>
      {header}
    </div>
  );
};

export default IconCardHeader;
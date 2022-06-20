const PageHeader = (props) => {
  return (
    <div className="p-3 mb-8">
      <span className="text-4xl capitalize text-secondary font-light">
        {props.text}
      </span>
    </div>
  );
};

export default PageHeader;

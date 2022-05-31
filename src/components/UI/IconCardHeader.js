import '../../assets/index.css'

const IconCardHeader = (props) => {
  return (
    <div className="card-header-primary">
      <i className={"pi " + props.icon + " mr-2"}></i>
      {props.children}
    </div>
  );
};

export default IconCardHeader;

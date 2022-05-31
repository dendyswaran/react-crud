import '../../assets/index.css'

const UserInfoCardView = (props) => {
    return (
      <div className="p-1">
        <div className="flex card-secondary">
          {props.children}
        </div>
      </div>
    );
};

export default UserInfoCardView;

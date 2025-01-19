import propTypes from "prop-types";
const Item = ({ task, onRemove }) => {
  return (
    <div>
      <div className="row align-items-center">
        <div className="col-auto">
          <button
            onClick={onRemove}
            type="button"
            className="btn btn-primary btn-sm"
          >
            -
          </button>
        </div>
        <div className="col">{task.text}</div>
      </div>
      <hr />
    </div>
  );
};

Item.propTypes = {
  onRemove: propTypes.func,
  task: propTypes.object,
};

export default Item;

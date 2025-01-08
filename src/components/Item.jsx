import { Component } from "react";
import propTypes from "prop-types";

class Item extends Component {
  render() {
    const { onRemove, task } = this.props;
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
  }
}

Item.propTypes = {
  onRemove: propTypes.func,
  task: propTypes.object,
};

Item.defaultProps = {
  onRemove: () => {},
  task: {},
};

export default Item;

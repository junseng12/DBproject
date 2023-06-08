import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Item.module.css";

function Item({ item_id, item_img, name, category_id, status_id }) {
  return (
    <div>
      <img src={item_img} alt={name} className={styles.item_img} />
      <div>
        <div className={styles.item_name}>
          <Link to={`/item/${item_id}`}>{name}</Link>
          {/* <div>${category_id}</div> */}
        </div>

        {/*추후에 summary 추가할 때 넣을 듯 <p>{summary.length > 235 ? `${summary.slice(0, 235)}...` : summary}</p> */}
      </div>
    </div>
  );
}

Item.propTypes = {
  item_id: PropTypes.number.isRequired,
  item_img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  // summary: PropTypes.string.isRequired,
  category_id: PropTypes.number.isRequired,
  status_id: PropTypes.number.isRequired,
};

export default Item;

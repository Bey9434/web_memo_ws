import React from "react";
import PropTypes from "prop-types";
import "./ClusterList.css";

export function ClusterList({ clusters, onRightClick, onClick }) {
  return (
    <ul className="cluster-list">
      {clusters.map((cluster) => (
        <li
          key={cluster.id}
          className="cluster-item"
          onClick={() => onClick(cluster.id)}
          onContextMenu={(e) => {
            e.preventDefault();
            onRightClick(e, cluster);
          }}
        >
          {cluster.name}
        </li>
      ))}
    </ul>
  );
}

ClusterList.propTypes = {
  clusters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      origin: PropTypes.string.isRequired, // "manual" | "auto"
    })
  ).isRequired,
  onRightClick: PropTypes.func.isRequired,
};

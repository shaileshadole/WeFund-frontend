import React, { useState } from "react";
import styles from "./PaginationWrapper.module.css";

const PaginationWrapper = ({ data = [], itemsPerPage = 5, renderItem }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  if(data.length == 0){
    return;
  }

  return (
    <div className={styles.paginationContainer0}>
      <div>{paginatedData.map((item, index) => renderItem(item, index))}</div>

      <div className={styles.paginationContainer}>
        <button
          className={styles.button1}
          disabled={currentPage == 0}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          ◀️ Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            className={`${styles.button1} ${
              currentPage === i ? styles.active : ""
            }`}
            key={i}
            onClick={() => setCurrentPage(i)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className={styles.button1}
          disabled={currentPage == totalPages - 1}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next ▶️
        </button>
      </div>
    </div>
  );
};

export default PaginationWrapper;

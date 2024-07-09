import React from 'react'
const Price = () => {

  return (
    <>
      <div className="accordion-item">
        <h2 className="accordion-header" id="panelsStayOpen-headingThree">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
            <span>Price</span>
          </button>
        </h2>
        <div
          id="collapseThree"
          className="accordion-collapse collapse show"
          aria-labelledby="panelsStayOpen-headingThree"
        >
          <div className="accordion-body">
            <div className="range-slider">
              <input
                type="text"
                className="js-range-slider"
                defaultValue=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Price;

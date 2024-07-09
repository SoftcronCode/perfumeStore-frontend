import React from "react";
import {Link} from 'react-router-dom';

const Breadcrumb = ({ pageName }) => {
  return (
    <>
      <section className="breadscrumb-section pt-0">
        <div className="container-fluid-lg">
          <div className="row">
            <div className="col-12">
              <div className="breadscrumb-contain">
                <h2 className="mb-2">{pageName}</h2>
                <nav>
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <Link to="/">
                        <i className="fa-solid fa-house"></i>
                      </Link>
                    </li>
                    <li className="breadcrumb-item active">{pageName}</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Breadcrumb;
